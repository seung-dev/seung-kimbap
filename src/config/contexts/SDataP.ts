import { AxiosInstance } from "axios";

import { DataProvider } from "@refinedev/core";

import { app_axios } from "@/config";

const app_data_provider = (
	apiUrl: string,
	httpClient: AxiosInstance = app_axios,
): Omit<Required<DataProvider>, "createMany" | "updateMany" | "deleteMany"> => ({
	getList: async ({ resource, pagination, filters, sorters, meta }) => {
		return {
			data: [],
			total: 0,
		};
	},

	getMany: async ({ resource, ids, meta }) => {
		return {
			data: {} as any,
		};
	},

	create: async ({ resource, variables, meta }) => {
		return {
			data: {} as any,
		};
	},

	update: async ({ resource, id, variables, meta }) => {
		return {
			data: {} as any,
		};
	},

	getOne: async ({ resource, id, meta }) => {
		return {
			data: {} as any,
		};
	},

	deleteOne: async ({ resource, id, variables, meta }) => {
		return {
			data: {} as any,
		};
	},

	getApiUrl: () => {
		return apiUrl;
	},

	custom: async ({ url, method, filters, sorters, payload, query, headers }) => {
		let response;
		switch (method) {
			case "post":
				response = await httpClient[method](url, payload, {
					headers,
				});
				break;
			default:
				response = await httpClient[method](url, {
					headers,
				});
				break;
		}
		const { data } = response;
		return Promise.resolve({ data });
	},
});

export { app_data_provider };
