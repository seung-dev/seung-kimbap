import { initReactI18next } from "react-i18next";

import i18n from "i18next";
import detector from "i18next-browser-languagedetector";
import Backend from "i18next-xhr-backend";

i18n.use(Backend)
	.use(detector)
	.use(initReactI18next)
	.init({
		lng: "kr",
		supportedLngs: ["kr", "en", "de"],
		fallbackLng: ["kr", "en", "de"],
		defaultNS: "common",
		ns: ["common"],
		backend: {
			loadPath: "/locales/{{lng}}/{{ns}}.json",
		},
	});

export default i18n;
