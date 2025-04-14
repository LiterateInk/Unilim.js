import { iut } from "unilim";

import fs from "node:fs/promises";
import path from "node:path";

void async function main () {
  const buffer = await fs.readFile(path.join(__dirname, "example.pdf"));
  const timetable = await iut.info.timetable.getTimetableFromBuffer(buffer);

  console.dir(timetable, { depth: Infinity });
}();
