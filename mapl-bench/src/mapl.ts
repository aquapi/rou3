import { insertItem } from '@mapl/router/method/index.js';
import matcher from '@mapl/router/method/matcher.js';
import { ExportedCases } from '../types';

const paths = [
  "/test/*",
  "/test/*/y/z",
  "/test/*/y",
  "/test/foo/**"
];

const router = {};
for (let i = 0; i < paths.length; i++)
  insertItem<number>(router, 'GET', paths[i], i);

export default {
  mapl: (() => {
    const [methodMap] = matcher<number>(router, 0);

    return (method, path) => {
      const match = methodMap.get(method);
      if (match == null) return -1;

      const params = [];
      return match[1](path, params) ?? -1;
    }
  })()
} satisfies ExportedCases;
