import axios from "axios";

import { HttpError } from "@refinedev/core";

const s_axios = axios.create();

s_axios.defaults.withCredentials = true;

s_axios.interceptors.response.use(
	(response) => {
		return response;
	},
	(error) => {
		const customError: HttpError = {
			...error,
			message: error.response?.data?.message,
			statusCode: error.response?.status,
		};
		return Promise.reject(customError);
	},
);

export { s_axios };
