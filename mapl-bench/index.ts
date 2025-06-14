import { run, bench, summary, do_not_optimize } from 'mitata';
import mapl from './src/mapl.ts';
import rou3 from './src/rou3.ts';
import { ExportedCases } from './types.ts';

const paths = [
  "/test/*",
  "/test/*/y/z",
  "/test/*/y",
  "/test/foo/**",
];
const createSample = (str: string) => {
  str = str.endsWith('**') ? str.slice(0, -2) + `${Math.random()}/${Math.random()}` : str;
  return str.replace(/\*/g, () => '' + Math.random());
}

// eslint-disable-next-line
const samples = paths.map((str) => new Array(500).fill(str).map(createSample));

const cases: ExportedCases = Object.assign(Object.create(null), mapl, rou3);
for (let i = 0; i < paths.length; i++)
  summary(() => {
    const pathSamples = samples[i];

    for (const name in cases) {
      const fn = cases[name];

      // Validation
      for (const pathSample of pathSamples) {
        const res = fn('GET', pathSample);
        if (res !== i) {
          console.error('expected:', i, '-', 'recieved:', res, '-', paths[i] + ':', pathSample)
          throw new Error(name + ' failed');
        }
      }

      // Setup bench
      bench(`'${paths[i]}' - ${name}`, function* () {
        yield {
          [0]: () => pathSamples,
          bench(arr: string[]) {
            for (let i = 0; i < arr.length; i++)
              do_not_optimize(fn('GET', arr[i]));
          }
        }
      });
    }
  });

run();
