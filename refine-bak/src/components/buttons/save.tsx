import React from "react";

import { useTranslate } from "@refinedev/core";
import type { SaveButtonProps } from "@refinedev/mui";

import SaveOutlined from "@mui/icons-material/SaveOutlined";
import LoadingButton from "@mui/lab/LoadingButton";

/**
 * `<SaveButton>` uses Material UI {@link https://mui.com/material-ui/api/loading-button/#main-content `<LoadingButton>`} component.
 * It uses it for presantation purposes only. Some of the hooks that refine has adds features to this button.
 *
 * @see {@link https://refine.dev/docs/api-reference/mui/components/buttons/save-button} for more details.
 */
export const SaveButton: React.FC<SaveButtonProps> = ({ hideText = false, svgIconProps, children, ...rest }) => {
	const translate = useTranslate();

	const { sx, ...restProps } = rest;

	return (
		<LoadingButton
			startIcon={!hideText && <SaveOutlined {...svgIconProps} />}
			sx={{ minWidth: 0, ...sx }}
			variant="contained"
			className={RefineButtonClassNames.SaveButton}
			{...restProps}
		>
			{hideText ? <SaveOutlined fontSize="small" {...svgIconProps} /> : children ?? translate("buttons.save", "Save")}
		</LoadingButton>
	);
};
