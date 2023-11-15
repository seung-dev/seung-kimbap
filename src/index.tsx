import React from "react";
import { createRoot } from "react-dom/client";

import "@/config/filters/SLocale";

import SApp from "@app/SApp";

const container = document.getElementById("root") as HTMLElement;

const app_root_class = import.meta.env.VITE_APP_ROOT_CLASS;
container.setAttribute("class", app_root_class);

const root = createRoot(container);

root.render(
	<React.StrictMode>
		<React.Suspense fallback="loading">
			<SApp />
		</React.Suspense>
	</React.StrictMode>,
);
