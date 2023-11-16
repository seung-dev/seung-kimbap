import { Callback, TFunction, TOptions } from "i18next";

export const STranslationP = (
	t: (key: string | string[], options?: string | TOptions<object> | undefined) => string,
	i18n: { changeLanguage(lng?: string, callback?: Callback): Promise<TFunction>; language: string },
) => {
	return {
		translate: (key: string, params: object) => t(key, params),
		changeLocale: (lang: string) => i18n.changeLanguage(lang),
		getLocale: () => i18n.language,
	};
};
