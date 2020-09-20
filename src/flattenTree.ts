import {
  pipe,
  chain,
  flatten,
} from "ramda";

type FlattenTree = (o: object) => any[]
const flattenTree: FlattenTree = pipe(
  Object.entries,
  chain(([pathToFile, imports]) =>
    [pathToFile].concat(imports.map(flattenTree))
  ),
  flatten
);

export default flattenTree