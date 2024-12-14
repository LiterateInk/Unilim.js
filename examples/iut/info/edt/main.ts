import { getTimetableFromBuffer } from "~iut/info/edt";
import fs from "node:fs/promises";
import path from "node:path";

void async function main () {
  const buffer = await fs.readFile(path.join(__dirname, "example.pdf"));
  const timetable = await getTimetableFromBuffer(buffer);

  console.dir(timetable, { depth: Infinity });
}();
