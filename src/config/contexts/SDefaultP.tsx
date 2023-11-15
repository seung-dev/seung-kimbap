import { PropsWithChildren, createContext } from "react";

import { SDefaultT } from "@app/SDefault";

export const SDefault = createContext<SDefaultT>({} as SDefaultT);

export const SDefaultP = ({ children, value }: PropsWithChildren<{ value: SDefaultT }>) => {
	return <SDefault.Provider value={value}>{children}</SDefault.Provider>;
};
