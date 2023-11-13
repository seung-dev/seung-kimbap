import React from "react";

import type { TextFieldProps } from "@refinedev/mui";

import Typography from "@mui/material/Typography";

/**
 * This field lets you show basic text. It uses Materail UI {@link https://mui.com/material-ui/react-typography/#main-content `<Typography>`} component.
 *
 * @see {@link https://refine.dev/docs/api-reference/mui/components/fields/text} for more details.
 */
const TextField: React.FC<TextFieldProps> = ({ value, ...rest }) => {
	return (
		<Typography variant="body2" {...rest}>
			{value}
		</Typography>
	);
};

export { TextField as TextFieldComponent };
