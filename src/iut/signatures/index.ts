import type { Cheerio } from "cheerio";
import type { AnyNode } from "domhandler";
import type { HttpResponse } from "schwi";
import type { Module, ReportCard, Semester, TeachingUnit } from "./models";
import { load as cheerio } from "cheerio";
import { HttpRequest, HttpRequestRedirection, send } from "schwi";
import { CAS, OAuth2 } from "~cas";

export * from "./models";

export class Signatures {
  public static readonly COOKIE = "session";

  public static readonly HOST = "https://signatures.unilim.fr";
  public static readonly oauth2 = new OAuth2("signatures", "https://signatures.unilim.fr/callback", ["openid", "profile"]);

  public constructor(
    public readonly session: string
  ) {}

  public static async fromCAS(cas: CAS): Promise<Signatures> {
    let request: HttpRequest, response: HttpResponse;
    let session: string, state: string;

    {
      request = new HttpRequest.Builder(Signatures.HOST + "/login")
        .setRedirection(HttpRequestRedirection.MANUAL)
        .enableUnauthorizedTLS()
        .build();

      response = await send(request);

      const cookies = response.headers.getSetCookie();
      const cookie = cookies.find((cookie) => cookie.startsWith(Signatures.COOKIE + "="));

      if (!cookie)
        throw new Error("session cookie not found");

      session = cookie.split(";")[0].split("=")[1];

      const location = new URL(response.headers.get("location")!);
      state = location.searchParams.get("state")!;
    }

    {
      const callback = await cas.authorize(Signatures.oauth2, false, state);

      request = new HttpRequest.Builder(callback)
        .setRedirection(HttpRequestRedirection.MANUAL)
        .setCookie(Signatures.COOKIE, session)
        .setCookie(CAS.COOKIE, cas.cookie)
        .enableUnauthorizedTLS()
        .build();

      response = await send(request);

      const cookies = response.headers.getSetCookie();
      const cookie = cookies.find((cookie) => cookie.startsWith(Signatures.COOKIE + "="));

      if (!cookie)
        throw new Error("session cookie not found");

      session = cookie.split(";")[0].split("=")[1];
    }

    return new Signatures(session);
  }

  public static parse(html: string): ReportCard {
    const text = <T extends AnyNode>(node: Cheerio<T>): string =>
      node.text().trim();

    const document = cheerio(html);
    const semesters: Array<Semester> = [];

    for (const button of document("button[data-bs-target*=semestre-]")) {
      const table = document(`.tab-pane[aria-labelledby="${button.attribs.id}"] tbody`);

      const units: Array<TeachingUnit> = [];
      let unit: TeachingUnit | undefined;
      let module: Module | undefined;

      for (const tr of table.find("tr")) {
        const level = parseInt(tr.attribs.class.replace("level-", ""));

        const col1 = document(tr).find("td").first();
        const col2 = col1.next();
        const col3 = col2.next();
        const col4 = col3.next();
        const col5 = col4.next();
        const col6 = col5.next();

        const name = text(col2);
        const coefficient = Number(text(col4));
        const average = text(col5) ? Number(text(col5)) : null;

        switch (level) {
          case 1: {
            unit = {
              average,
              code: text(col1),
              coefficient,
              modules: [],
              name
            };

            units.push(unit);
            break;
          }

          case 2: {
            if (!unit) break;

            module = {
              average,
              code: text(col1),
              coefficient,
              exams: [],
              name
            };

            unit.modules.push(module);
            break;
          }

          case 3: {
            if (!module) break;

            const globalAverage = text(col6).replace(/[()]/g, "");
            const date = text(col1); // DD/MM/YYYY, empty string if none.

            module.exams.push({
              average,
              coefficient,
              date: date ? new Date(date.split("/").reverse().join("-")) : null,
              globalAverage: globalAverage ? Number(globalAverage) : null,
              name
            });
          }
        }
      }
    }

    const [fullName, promotion] = document(".list-group-item").map((_, node) =>
      text(document(node.lastChild!))
    ).toArray();

    return {
      fullName,
      promotion,
      semesters
    };
  }
}
