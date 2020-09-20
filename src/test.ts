import {
  pipe,
  uniq,
} from "ramda";
import flattenTree from "./flattenTree";
import toPreloads from "./toPreloads";
import toTree from "./toTree";


const buildPreloads = pipe(
  toTree,
  flattenTree,
  uniq,
  toPreloads
)

console.log("GO");
const myPath = "./example/main.js";
console.log(buildPreloads(myPath));
