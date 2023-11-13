import React from "react";
import { useTranslate } from "@refinedev/core";
import ImportExportOutlined from "@mui/icons-material/ImportExportOutlined";
import LoadingButton from "@mui/lab/LoadingButton";
import type { ExportButtonProps } from "@refinedev/mui";

/**
 * `<ExportButton>` uses Material UI {@link https://mui.com/material-ui/api/loading-button/#main-content `<LoadingButton>`} with a default export icon and a default text with "Export".
 * It only has presentational value.
 *
 * @see {@link https://refine.dev/docs/api-reference/mui/components/buttons/export-button} for more details.
 */
export const ExportButton: React.FC<ExportButtonProps> = ({
  hideText = false,
  children,
  loading = false,
  svgIconProps,
  ...rest
}) => {
  const translate = useTranslate();

  const { sx, ...restProps } = rest;

  return (
    <LoadingButton
      {...rest}
      loading={loading}
      startIcon={!hideText && <ImportExportOutlined {...svgIconProps} />}
      loadingPosition={hideText ? "center" : "start"}
      sx={{ minWidth: 0, ...sx }}
      className={RefineButtonClassNames.ExportButton}
      {...restProps}
    >
      {hideText ? (
        <ImportExportOutlined fontSize="small" {...svgIconProps} />
      ) : (
        children ?? translate("buttons.export", "Export")
      )}
    </LoadingButton>
  );
};
