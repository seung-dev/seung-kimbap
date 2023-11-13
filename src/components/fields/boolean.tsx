import React from "react";
import CheckOutlined from "@mui/icons-material/CheckOutlined";
import CloseOutlined from "@mui/icons-material/CloseOutlined";
import Tooltip from "@mui/material/Tooltip";
import type { BooleanFieldProps } from "@refinedev/mui";

/**
 * This field is used to display boolean values. It uses the {@link https://mui.com/material-ui/react-tooltip/#main-content `<Tooltip>`} values from Materila UI.
 *
 * @see {@link https://refine.dev/docs/api-reference/mui/components/fields/boolean} for more details.
 */
export const BooleanField: React.FC<BooleanFieldProps> = ({
  value,
  valueLabelTrue = "true",
  valueLabelFalse = "false",
  trueIcon,
  falseIcon,
  svgIconProps,
  ...rest
}) => {
  return (
    <Tooltip title={value ? valueLabelTrue : valueLabelFalse} {...rest}>
      {value ? (
        <span>{trueIcon ?? <CheckOutlined {...svgIconProps} />}</span>
      ) : (
        <span>{falseIcon ?? <CloseOutlined {...svgIconProps} />}</span>
      )}
    </Tooltip>
  );
};
