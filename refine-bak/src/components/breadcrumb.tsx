import React from "react";

import {
	matchResourceFromRoute,
	useBreadcrumb,
	useLink,
	useRefineContext,
	useResource,
	useRouterContext,
	useRouterType,
} from "@refinedev/core";
import { BreadcrumbProps } from "@refinedev/mui";

import HomeOutlined from "@mui/icons-material/HomeOutlined";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import type { BreadcrumbsProps as MuiBreadcrumbProps } from "@mui/material/Breadcrumbs";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import type { LinkProps } from "@mui/material/Link";
import Typography from "@mui/material/Typography";

export const Breadcrumb: React.FC<BreadcrumbProps> = ({ breadcrumbProps, showHome = true, hideIcons = false, meta }) => {
	const { breadcrumbs } = useBreadcrumb({ meta });
	const routerType = useRouterType();
	const NewLink = useLink();
	const { Link: LegacyLink } = useRouterContext();

	const ActiveLink = routerType === "legacy" ? LegacyLink : NewLink;

	const { hasDashboard } = useRefineContext();

	const { resources } = useResource();

	const rootRouteResource = matchResourceFromRoute("/", resources);

	if (breadcrumbs.length === 1) {
		return null;
	}

	const LinkRouter = (props: LinkProps & { to?: string }) => <Link {...props} component={ActiveLink} />;

	return (
		<Breadcrumbs
			aria-label="breadcrumb"
			sx={{
				paddingY: 2,
				paddingX: 2,
				...(breadcrumbProps?.sx ?? {}),
			}}
			{...breadcrumbProps}
		>
			{showHome && (hasDashboard || rootRouteResource.found) && (
				<LinkRouter
					underline="hover"
					sx={{
						display: "flex",
						alignItems: "center",
					}}
					color="inherit"
					to="/"
				>
					{rootRouteResource?.resource?.meta?.icon ?? (
						<HomeOutlined
							sx={{
								fontSize: "18px",
							}}
						/>
					)}
				</LinkRouter>
			)}
			{breadcrumbs.map(({ label, icon, href }) => {
				return (
					<Grid
						key={label}
						sx={{
							display: "flex",
							alignItems: "center",
							"& .MuiSvgIcon-root": {
								fontSize: "16px",
							},
						}}
					>
						{!hideIcons && icon}
						{href ? (
							<LinkRouter
								underline="hover"
								sx={{
									display: "flex",
									alignItems: "center",
									fontSize: "14px",
								}}
								color="inherit"
								to={href}
								variant="subtitle1"
								marginLeft={0.5}
							>
								{label}
							</LinkRouter>
						) : (
							<Typography fontSize="14px">{label}</Typography>
						)}
					</Grid>
				);
			})}
		</Breadcrumbs>
	);
};
