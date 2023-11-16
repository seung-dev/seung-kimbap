import { AxiosInstance } from "axios";

import { DataProvider } from "@refinedev/core";

interface SDataT {
	host: string;
	http_client: AxiosInstance;
}
export const SDataP = ({
	host,
	http_client,
}: SDataT): Omit<Required<DataProvider>, "createMany" | "updateMany" | "deleteMany"> => ({
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
		return host;
	},
	custom: async ({ url, method, filters, sorters, payload, query, headers }) => {
		let response;
		switch (method) {
			case "post":
				response = await http_client[method](url, payload, {
					headers,
				});
				break;
			default:
				response = await http_client[method](url, {
					headers,
				});
				break;
		}
		const { data } = response;
		return Promise.resolve({ data });
	},
});
