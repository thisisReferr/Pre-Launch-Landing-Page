1. Create a new branch from `dev` and push you changes there
2. Create a PR and target the `dev` branch instead of `main`
3. PRs from `feature-branch` to `dev` will be squash merged
4. PRs from `dev` to `main` will be merged as default
5. Always run prettier before pushing your code

```bash
npx prettier --write .
```
