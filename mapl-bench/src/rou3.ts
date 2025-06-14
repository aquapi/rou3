import { findRoute, createRouter, addRoute, compileRoute } from '../../src/index.ts';
import { ExportedCases } from '../types.ts';

const paths = [
  "/test/:id",
  "/test/:idYZ/y/z",
  "/test/:idY/y",
  "/test/foo/**",
];

const router = createRouter<[number]>();
for (let i = 0; i < paths.length; i++)
  addRoute(router, 'GET', paths[i], [i]);

export default {
  rou3: (method, path) => findRoute(router, method, path)?.data[0] ?? -1,
  // 'rou3 - jit': (() => {
  //   const fn = compileRoute(router);
  //   console.log(fn.toString());
  //   return (method, path) => fn(method, path)?.data[0] ?? -1
  // })()
} satisfies ExportedCases;
