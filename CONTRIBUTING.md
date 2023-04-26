This project uses [pnpm].

[pnpm]: https://pnpm.io

## Install Pre-commit Hooks

```sh
pnpm install
pnpm run prepare
```

Thus, it will run `svelte-check`, `eslint`, and `prettier` before each commit.

If you do not want to install pre-commit hooks,
make sure you manually run the following commands before each commit:

```sh
pnpm run check
pnpm run lint
pnpm run format
```