import typescript from '@rollup/plugin-typescript'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import pkg from './package.json'

const openSourceMap = Boolean(process.env.SOURCEMAP)
/** @type {import('rollup').RollupOptions} */
const config = {
  input: {
    index: 'src/index.ts',
    cli: 'src/cli.ts'
  },
  output: {
    dir: 'dist',
    format: 'cjs',
    sourcemap: openSourceMap
  },

  plugins: [
    typescript({ tsconfig: './tsconfig.build.json', sourceMap: openSourceMap }),
    nodeResolve({
      preferBuiltins: true
    }),
    commonjs()

  ],
  external: [...Object.keys(pkg.dependencies)]

}

export default config
