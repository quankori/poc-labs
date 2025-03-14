# 🚀 Setting Up a Monorepo with Nx for NestJS

Welcome to your journey of building a powerful monorepo with Nx! This guide will walk you through setting up an Nx workspace, migrating existing NestJS projects, and unlocking the full potential of a scalable, organized development environment.

---

## 🌟 Getting Started: Install and Create an Nx Workspace

### Install Nx Globally

Kick things off by installing the Nx CLI globally for seamless command-line access.

```bash
npm install -g nx
```

### Create Your Nx Workspace

Let’s scaffold a new workspace tailored for NestJS. This will be the foundation of your monorepo.

```bash
npx create-nx-workspace@latest my-nestjs-monorepo --preset=nest
```

- **Options**: When prompted, name your default app (e.g., `api`) and choose your preferred package manager (npm, yarn, or pnpm).
- **Clean Up**: Remove the default app in `apps/` to start with a blank slate:
  ```bash
  rm -rf apps/api
  ```

---

## 📂 Migrating Existing NestJS Projects into Nx

Got existing NestJS projects? Let’s bring them into your shiny new monorepo!

### Update `nx.json`

Tell Nx about your projects by updating the `nx.json` file at the root of your workspace.

```json
{
  "version": 2,
  "projects": {
    "api-gateway-svc": "apps/api-gateway-svc",
    "products-svc": "apps/products-svc"
  }
}
```

- Copy your existing projects (e.g., `api-gateway-svc` and `products-svc`) into the `apps/` directory.

### Configure Each Project with `project.json`

For every project, create a `project.json` file to define how Nx builds, serves, tests, and lints it. Here’s an example for `products-svc`:

```json
{
  "name": "products-svc",
  "sourceRoot": "apps/products-svc/src",
  "targets": {
    "build": {
      "executor": "@nx/js:tsc",
      "options": {
        "rootDir": "apps/products-svc",
        "outputPath": "dist/apps/products-svc",
        "tsConfig": "apps/products-svc/tsconfig.json",
        "main": "apps/products-svc/src/main.ts"
      }
    },
    "serve": {
      "executor": "@nx/js:node",
      "options": {
        "buildTarget": "products-svc:build"
      }
    },
    "test": {
      "executor": "@nx/jest:jest",
      "options": {
        "jestConfig": "apps/products-svc/jest.config.ts",
        "passWithNoTests": true
      }
    },
    "lint": {
      "executor": "@nx/linter:eslint",
      "options": {
        "lintFilePatterns": ["apps/products-svc/**/*.ts"]
      }
    }
  }
}
```

- Repeat this for `api-gateway-svc`, adjusting paths and names as needed.

---

## 🔄 Syncing Your Projects with Nx

### Update `tsconfig.json` for Each Project

Ensure TypeScript plays nice with Nx by updating the `tsconfig.json` in each app to inherit from the root config.

```json
{
  "extends": "../../tsconfig.base.json",
  "compilerOptions": {
    "outDir": "../../dist/out-tsc",
    "module": "commonjs",
    "target": "es2019",
    "declaration": true,
    "sourceMap": true,
    "types": ["node"]
  },
  "include": ["src/**/*.ts"],
  "exclude": ["node_modules", "**/*.spec.ts"]
}
```

### Install Dependencies

Consolidate your project dependencies into the root `package.json`:

1. Copy `dependencies` and `devDependencies` from each project’s `package.json` to the root `my-nestjs-monorepo/package.json`.
2. Install everything:
   ```bash
   npm install
   ```

---

## ⚡ Running Your Monorepo

### Serve a Single App

Spin up an individual service with ease:

```bash
nx serve api-gateway-svc
nx serve products-svc
```

### Serve Multiple Apps at Once

Run all your services simultaneously like a pro:

```bash
nx run-many --target=serve --projects=api-gateway-svc,products-svc
```

### Build Your Apps

Generate production-ready builds:

```bash
nx build products-svc
```

- Check the output in `dist/apps/products-svc/`!

---

## 🛠️ Adding a Shared Library

Boost code reuse by creating a shared library for common utilities, models, or logic:

```bash
nx g @nx/js:lib shared --directory=libs/shared
```

- Find your new library in `libs/shared/`. Import it into your apps with `@my-nestjs-monorepo/shared`.

---

## 🎉 Why Nx?

- **Scalability**: Manage multiple NestJS apps in one repo.
- **Efficiency**: Share code and run tasks in parallel.
- **Consistency**: Unified tooling for building, testing, and linting.