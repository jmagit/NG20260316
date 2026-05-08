// Learn more about Vitest configuration options at https://vitest.dev/config/

import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    // setupFiles: [ "./setup-vitest.ts" ],
    ui: true,
    coverage: {
      provider: 'v8',
      enabled: true,
      reporter: ["html", "lcov"],
      htmlDir: 'coverage',
      reportsDirectory: 'coverage',
      watermarks: {
        lines: [ 80, 95],
        statements: [ 80, 95],
        branches: [ 80, 95],
        functions: [ 80, 95],
      }
    },
    typecheck: {
      tsconfig: './tsconfig.spec.json'
    }
  },
});
