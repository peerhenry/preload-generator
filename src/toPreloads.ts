import { pipe, map, join } from 'ramda'

const toPreloads = pipe(
  map((p) => `<link rel="modulepreload" href="${p}" />`),
  join("\n")
);

export default toPreloads;