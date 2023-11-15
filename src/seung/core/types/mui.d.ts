export interface STableColumnT {
	width?: number;
	headerAlign?: GridAlignment;
	align?: GridAlignment;
	sortable?: boolean;
	hideable?: boolean;
	disableColumnMenu?: boolean;
}

export interface SSearchInputSmallT {
	className?: string;
	sx?: SxProps;
	type?: "text" | "search";
	variant?: "outlined" | "standard" | "filled";
	size?: "small" | "medium";
	InputLabelProps?: Partial<InputLabelProps>;
	defaultValue?: string;
}

export interface SSearchSelectSmallT {
	className?: string;
	sx?: SxProps;
	select: boolean;
	type?: "text" | "search";
	variant?: "outlined" | "standard" | "filled";
	size?: "small" | "medium";
	InputLabelProps?: Partial<InputLabelProps>;
	defaultValue?: string;
}
