export type SNumberFormatT = "yyyy-MM-dd" | "yyyy-MM-dd HH:mm:ss";

export interface SSelectOptionT {
	key?: string;
	value: string | number | "*";
	label: string;
}

export interface SPageFormT {
	page_size: number;
	page_no: number;
	[key: string]: any;
}
