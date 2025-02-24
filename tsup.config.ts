import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/components/index.ts'],
  format: ['cjs', 'esm'],
  dts: true,
  sourcemap: true,
  clean: true,
  external: ['react', 'react-dom', 'antd', 'styled-components'],
});
