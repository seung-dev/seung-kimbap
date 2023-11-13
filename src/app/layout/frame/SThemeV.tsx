import { PropsWithChildren, createContext, useEffect, useState } from "react";

import { RefineThemes } from "@refinedev/mui";

import { ThemeProvider } from "@mui/material/styles";

interface SThemeT {
	theme: string;
	set_theme: () => void;
}

export const STheme = createContext<SThemeT>({} as SThemeT);

export const SThemeV = ({ children }: PropsWithChildren) => {
	const current_theme = localStorage.getItem("theme");

	const is_dark = window?.matchMedia("(prefers-color-scheme: dark)").matches;
	const system_theme = is_dark ? "dark" : "light";

	const [user_theme, set_user_theme] = useState(current_theme || system_theme);

	useEffect(() => {
		window.localStorage.setItem("theme", user_theme);
	}, [user_theme]);

	const theme_toggle = () => {
		set_user_theme(user_theme === "light" ? "dark" : "light");
	};

	return (
		<STheme.Provider
			value={{
				theme: user_theme,
				set_theme: theme_toggle,
			}}
		>
			<ThemeProvider theme={user_theme === "light" ? RefineThemes.Blue : RefineThemes.BlueDark}>{children}</ThemeProvider>
		</STheme.Provider>
	);
};
