import React from "react";
import { createRoot } from "react-dom/client";

import App from "./App";
import "./i18n";

const container = document.getElementById("root") as HTMLElement;

const app_root_class = import.meta.env.VITE_APP_ROOT_CLASS;
container.setAttribute("class", app_root_class);

const root = createRoot(container);

root.render(
	<React.StrictMode>
		<React.Suspense fallback="loading">
			<App />
		</React.Suspense>
	</React.StrictMode>,
);
