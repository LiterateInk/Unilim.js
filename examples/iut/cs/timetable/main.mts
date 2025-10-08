import fs from "node:fs/promises";
import path from "node:path";
import { getTimetableFromBuffer } from "unilim/iut/cs/timetable";

const buffer = await fs.readFile(path.join(__dirname, "example.pdf"));
const timetable = await getTimetableFromBuffer(buffer);

console.dir(timetable, { depth: Infinity });
