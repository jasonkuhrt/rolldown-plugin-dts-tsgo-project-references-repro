import path from 'node:path'
import { build } from 'rolldown'
import { dts } from 'rolldown-plugin-dts'

const root = import.meta.dirname
const result = await build({
  cwd: root,
  input: path.join(root, 'app/src/index.ts'),
  plugins: [
    dts({
      generator: 'tsgo',
      tsconfig: path.join(root, 'app/tsconfig.json'),
      tsgo: { moduleUrl: import.meta.resolve('typescript') },
    }),
  ],
  write: false,
})

const declarations = result.output
  .filter((file) => file.fileName.endsWith('.d.ts'))
  .map((file) => (file.type === 'chunk' ? file.code : file.source))
  .join('\n')

console.log(declarations)
if (!declarations.includes('readonly value: string')) {
  throw new Error('Expected declarations from the referenced project source')
}
