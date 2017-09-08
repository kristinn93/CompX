import babel from 'rollup-plugin-babel';
import pkg from './package.json';
export default [
  {
    input: './src/index.js',
    name: 'CompX',
    plugins: [babel()],
    external: ['react', 'prop-types'],
    output: [
      {
        format: 'es',
        file: pkg.module,
      },
      {
        format: 'cjs',
        file: pkg.main,
      },
    ],
  },
];
