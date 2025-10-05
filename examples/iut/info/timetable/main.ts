import fs from "node:fs/promises";
import path from "node:path";
import { iut } from "unilim";

void (async function main() {
  const buffer = await fs.readFile(path.join(__dirname, "example.pdf"));
  const timetable = await iut.info.timetable.getTimetableFromBuffer(buffer);

  console.dir(timetable, { depth: Infinity });
}());
