import { AxiosInstance } from "axios";

import { AuthBindings } from "@refinedev/core";

import { seung } from "@/seung/core";

export interface AppProfileT {
	id: number;
	name_full: string;
	roles: string;
	password_expr: string;
	name_nick?: string;
	avatar?: string;
}

interface SAuthT {
	translate: (key: string, default_value?: string | undefined) => string;
	http_client: AxiosInstance;
	signin_path?: string;
	storage_profile_name?: string;
}
export const SAuthP = ({
	translate,
	http_client,
	signin_path = "/sign/in",
	storage_profile_name = "profile",
}: SAuthT): AuthBindings => ({
	login: async ({ username, password }) => {
		try {
			while (true) {
				const response = await http_client.post("/rest/sign/in/username", {
					username: username,
					password: seung.encode_hex(seung.sha256(password)),
				});
				if (response.data.error_code !== "S000") {
					break;
				}
				const profile = await http_client.get("/rest/user/profile");
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
			await http_client.get("/rest/sign/out");
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
