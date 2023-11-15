import { seung } from "@seung/core";

import { AxiosInstance } from "axios";

import { AuthBindings } from "@refinedev/core";

import { s_axios } from "@/config";

export interface AppProfileT {
	id: number;
	name_full: string;
	roles: string;
	password_expr: string;
	name_nick?: string;
	avatar?: string;
}

export const s_auth_provider = (
	axios: AxiosInstance = s_axios,
	translate: (key: string, default_value?: string | undefined) => string,
	storage_profile_name: string = "profile",
	signin_path: string = "/sign/in",
): AuthBindings => ({
	login: async ({ username, password }) => {
		try {
			while (true) {
				const response = await axios.post("/rest/sign/in/username", {
					username: username,
					password: seung.encode_hex(seung.sha256(password)),
				});
				if (response.data.error_code !== "S000") {
					break;
				}
				const profile = await axios.get("/rest/user/profile");
				if (profile.data.error_code === "S000") {
					localStorage.setItem(
						storage_profile_name,
						seung.encode_base64(
							seung.encrypt_aes_cbc_pkcs7(
								JSON.stringify(profile.data.data),
								seung.sha256(seung.concat(window.location.host, "/", storage_profile_name)),
								seung.default_iv(),
							),
						),
					);
					return {
						success: true,
						redirectTo: "/",
					};
				}
				break;
			} // end of while
		} catch (error) {
			return {
				success: false,
				error: {
					message: translate("messages.500", "죄송합니다. 서비스가 원활하지 않습니다."),
					name: "( Internal Server Error )",
				},
			};
		}
		return {
			success: false,
			error: {
				message: translate("messages.signin.fail", "아이디 또는 비밀번호를 확인하세요."),
				name: "( Invalid username or password )",
			},
		};
	},
	logout: async () => {
		localStorage.removeItem(storage_profile_name);
		try {
			await axios.get("/rest/sign/out");
		} catch (error) {}
		return {
			success: true,
			redirectTo: "/sign/in",
		};
	},
	check: async () => {
		const profile = localStorage.getItem(storage_profile_name);
		if (profile) {
			return {
				authenticated: true,
			};
		}
		return {
			authenticated: false,
			redirectTo: "/sign/in",
		};
	},
	getPermissions: async () => null,
	getIdentity: async () => {
		const profile = localStorage.getItem(storage_profile_name);
		if (profile) {
			return JSON.parse(
				seung.utf8_string(
					seung.decrypt_aes_cbc_pkcs7(
						profile,
						seung.sha256(seung.concat(window.location.host, "/", storage_profile_name)),
						seung.default_iv(),
					),
				),
			);
		}
		return null;
	},
	onError: async (error) => {
		if (error.response?.status === 401) {
			localStorage.removeItem(storage_profile_name);
			return {
				logout: true,
				redirectTo: "/sign/in",
				error: new Error(error.response?.statusText),
			};
		}
		return { error };
	},
});
