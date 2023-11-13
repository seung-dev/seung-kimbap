import { PropsWithChildren, createContext } from "react";

import { SSearchT } from "@/seung";

interface SDefaultT {
	search_options: SSearchT;
}

const default_pagination: SSearchT = { page_no: 1, page_size: 10 };

const s_default: SDefaultT = { search_options: default_pagination };

const SDefault = createContext<SDefaultT>({} as SDefaultT);

export const SDefaultV = ({ children }: PropsWithChildren) => {
	return <SDefault.Provider value={s_default}>{children}</SDefault.Provider>;
};
