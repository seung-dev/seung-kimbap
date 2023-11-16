import axios from "axios";

import { HttpError } from "@refinedev/core";

const SAxios = axios.create();

SAxios.defaults.withCredentials = true;

SAxios.interceptors.response.use(
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

export { SAxios };
