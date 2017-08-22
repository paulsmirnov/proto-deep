import rollupPluginBabel from 'rollup-plugin-babel';
import rollupPluginJson from 'rollup-plugin-json';
import { version, author } from './package.json';

export default {
  input: 'src/proto-deep.js',
  plugins: [
    rollupPluginJson(),
    rollupPluginBabel({
      exclude: 'node_modules/**',
    }),
  ],
  banner: `/* proto-deep v${version} Copyright (c) 2017 ${author} */`,
  output: [{
    file: 'dist/proto-deep.js',
    format: 'umd',
    name: 'protoDeep',
  }, {
    file: 'dist/proto-deep.module.js',
    format: 'es',
  }],
};
