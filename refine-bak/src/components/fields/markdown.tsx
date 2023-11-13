import gfm from "remark-gfm";

import React from "react";
import ReactMarkdown from "react-markdown";

import type { MarkdownFieldProps } from "@refinedev/mui";

/**
 * This field lets you display markdown content. It supports {@link https://github.github.com/gfm/ GitHub Flavored Markdown}.
 *
 * @see {@link https://refine.dev/docs/api-reference/mui/components/fields/markdown} for more details.
 */
export const MarkdownField: React.FC<MarkdownFieldProps> = ({ value = "" }) => {
	return <ReactMarkdown plugins={[gfm]}>{value}</ReactMarkdown>;
};
