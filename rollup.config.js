import typescript from '@rollup/plugin-typescript'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import pkg from './package.json'

/** @type {import('rollup').RollupDirOptions} */
const config = {
  input: {
    index: 'src/index.ts',
    cli: 'src/cli.ts'
  },
  output: {
    dir: 'dist',
    format: 'cjs'
  },

  plugins: [
    typescript({ tsconfig: './tsconfig.build.json' }),
    nodeResolve({
      preferBuiltins: true
    }),
    commonjs()

  ],
  external: [...Object.keys(pkg.dependencies)]

}

export default config
