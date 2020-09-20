import * as path from "path";
import { applyTo, pipe, replace, flip, map, objOf, split, zipObj, last, trim, filter, startsWith, over, lensIndex, identity, init, join } from 'ramda'
import { readFileSync } from "fs";

const getSpecifiers = pipe(
  (p: string) => readFileSync(p, "utf8"), // todo: refactor with DI
  split("\n"),
  filter(startsWith("import")),
  map(pipe(split("from"), last, trim, replace(/(;|"|')/g, "")))
);

type LastOrInit = string | string[];

type MyAny = (o: any) => LastOrInit;

interface PathInfo {
  directory: string;
  fileName: string;
}

type ToPathInfo = (p: string) => PathInfo;
const toPathInfo: ToPathInfo = pipe(
  split("/"),
  applyTo,
  flip(map)([init, last]) as MyAny,
  over(lensIndex(0), join("/")),
  zipObj(["directory", "fileName"]) as (a: string[]) => any
);

const nextTree = (s) => (pathInfo) => toTree(path.join(pathInfo.directory, s));

const getStandardPath = pipe(path.normalize, replace(/\\/g, "/"));

type ToTree = (p: string) => object;
const toTree: ToTree = pipe(
  getStandardPath,
  applyTo,
  flip(map)([toPathInfo, getSpecifiers, identity]) as (a: any) => any,
  ([pathInfo, specifiers, pathToFile]) =>
    pipe(map(nextTree), map(applyTo(pathInfo)), objOf(pathToFile))(specifiers)
);

export default toTree;