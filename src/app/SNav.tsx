import { IResourceItem } from "@refinedev/core";

import { Dashboard, People } from "@mui/icons-material";

export const s_nav: IResourceItem[] = [
	{
		name: "dashboard",
		list: "/dashboard",
		meta: {
			icon: <Dashboard />,
			label: "view.dashboard.title",
		},
	},
	{
		name: "admin",
		meta: {
			label: "view.admin.title",
			icon: <People />,
		},
	},
	{
		name: "admin.t010000",
		list: "/admin/t010000",
		meta: {
			parent: "admin",
			label: "view.admin.t010000.title",
		},
	},
];
