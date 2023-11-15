import { SNumberFormatT } from "../types/form";

export const repeat = (value: string, size: number): string => value.repeat(size);

export const concat = (...values: (string | number | undefined)[]): string => values.filter(Boolean).join("");

export const left = (value: string, size: number): string => value.substring(0, size);

export const right = (value: string, size: number): string => value.slice(0, size * -1);

export const is_equal_ignore_case = (x: string | undefined, y: string | undefined): boolean =>
	x?.toLowerCase() === y?.toLowerCase();

export const text_to_color = (value: string): string => {
	let hash = 0;
	let i;
	for (i = 0; i < value.length; i += 1) {
		hash = value.charCodeAt(i) + ((hash << 5) - hash);
	}
	let color = "#";
	for (i = 0; i < 3; i += 1) {
		const value = (hash >> (i * 8)) & 0xff;
		color += `00${value.toString(16)}`.slice(-2);
	}
	return color;
};

export const number_only = (value: string): string => value.replace(/[^0-9]/g, "");

export const number_format = (value: string | number, format: SNumberFormatT = "yyyy-MM-dd"): string => {
	const text = number_only(typeof value === "string" ? value : value.toString());
	if (format === "yyyy-MM-dd") {
		return left(text, 8).replace(/(\d{4})(\d{2})(\d{2})+/g, "$1-$2-$3");
	}
	if (format === "yyyy-MM-dd HH:mm:ss") {
		return left(text, 14).replace(/(\d{4})(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})+/g, "$1-$2-$3 $4:$5:$6");
	}
	if (format === "000-0000-0000") {
		if (text.length === 7) return text.replace(/(\d{2})(\d{3})(\d{4})+/g, "$1-$2-$3");
		if (text.length === 8) return text.replace(/(\d{2})(\d{4})(\d{4})+/g, "$1-$2-$3");
		if (text.length === 10) return text.replace(/(\d{3})(\d{3})(\d{4})+/g, "$1-$2-$3");
		if (text.length === 11) return text.replace(/(\d{3})(\d{4})(\d{4})+/g, "$1-$2-$3");
	}
	return "";
};

export const number_comma = (value: string | number): string | undefined => {
	return Number(value).toLocaleString();
};
