import { createRouter } from "../test/_utils";

const router = createRouter([
  "/test",
  "/test/:id",
  "/test/:idYZ/y/z",
  "/test/:idY/y",
  "/test/foo",
  "/test/foo/*",
  "/test/foo/**",
  "/test/foo/bar/qux",
  "/test/foo/baz",
  "/test/fooo",
  "/another/path",
  "/wildcard/**",
]);

// Static paths leak into the dynamic tree
// idk if this is expected or not but it slows down compilation by a bit
console.log(
  router.static['/another/path'] ===
  router.root.static!['another'].static!['path']
);
console.log(
  router.static['/test'] ===
  router.root.static!['test']
);
console.log(
  router.static['/test/foo'] ===
  router.root.static!['test'].static!['foo']
);
console.log(
  router.static['/test/fooo'] ===
  router.root.static!['test'].static!['fooo']
);
