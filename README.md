# seung-kimbap

Template React Application

- Vite
- React
- Typescript
- React Route
- Material UI

### Install

```console
$ npm install
```

### Run

```console
$ npm run loc
```

### Build

```console
$ npm run build
```

### refine-project

<div align="center" style="margin: 30px;">
    <a href="https://refine.dev">
    <img src="https://refine.ams3.cdn.digitaloceanspaces.com/refine_logo.png"  align="center" />
    </a>
</div>
<br/>

This [refine](https://github.com/refinedev/refine) project was generated with [superplate](https://github.com/pankod/superplate).

##### Getting Started

**refine** is a React-based framework for building data-intensive applications in no time ✨

Refine offers lots of out-of-the box functionality for rapid development, without compromising extreme customizability. Use-cases include, but are not limited to admin panels, B2B applications and dashboards.

##### Learn More

To learn more about **refine**, please check out the [Documentation](https://refine.dev/docs)

- **REST Data Provider** [Docs](https://refine.dev/docs/core/providers/data-provider/#overview)
- **Ant Design** [Docs](https://refine.dev/docs/ui-frameworks/antd/tutorial/)
- **Inferencer** [Docs](https://refine.dev/docs/packages/documentation/inferencer)
- **Custom Auth Provider** [Docs](https://refine.dev/docs/core/providers/auth-provider/)
- **i18n** [Docs](https://refine.dev/docs/core/providers/i18n-provider/)
- **React Router** [Docs](https://refine.dev/docs/core/providers/router-provider/)

### History

##### 00. generate refine project

[https://refine.new/projects](https://refine.new/projects)

##### 01. npm install

```console
$ npm install
```

##### 02. refine swizzle

```console
$ npm run refine swizzle
$ mkdir -p refine-bak/swizzle
$ cp src refine-bak/src
```

##### 03. add path alias

```console
$ npm install -D vite-tsconfig-paths
$ vi vite.config.ts
import react from "@vitejs/plugin-react";
import * as path from "path";
import { defineConfig } from "vite";
import paths from "vite-tsconfig-paths";

export default defineConfig({
	plugins: [react(), paths()],
	resolve: {
		alias: [
			{
				find: "@",
				replacement: path.resolve(__dirname, "./src"),
			},
			{
				find: "@app",
				replacement: path.resolve(__dirname, "./src/app"),
			},
		],
	},
});

$ vi tsconfig.json
{
	"compilerOptions": {
		...
		"baseUrl": "",
		"paths": {
			"@/*": ["src/*"],
			"@app/*": ["src/app/*"],
		}
	},
	...
}
```

##### 04. add sass

```console
$ npm install -D sass
```

### License

MIT
