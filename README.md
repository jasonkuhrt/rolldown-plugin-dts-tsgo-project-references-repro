# rolldown-plugin-dts tsgo project-reference repro

`rolldown-plugin-dts`'s native TypeScript API generator opens the requested
tsconfig but not its referenced projects. When a referenced workspace package
is resolved through package exports, its source belongs to the referenced
project and cannot be emitted through the consumer project.

Run:

```sh
pnpm install
pnpm build
```

With `rolldown-plugin-dts@0.29.0`, the build fails with:

```text
tsgo did not generate a declaration file for .../lib/src/index.ts. Please check your tsconfig.
```

The expected declaration contains `readonly value: string` from the referenced
`@repro/model` package.
