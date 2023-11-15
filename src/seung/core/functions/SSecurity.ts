import CryptoJS from "crypto-js";

export const utf8_wordarray = (value: string): CryptoJS.lib.WordArray => CryptoJS.enc.Utf8.parse(value);
export const utf8_string = (value: CryptoJS.lib.WordArray): string => CryptoJS.enc.Utf8.stringify(value);

export const encode_hex = (value: string | CryptoJS.lib.WordArray): string =>
	typeof value === "string" ? CryptoJS.enc.Hex.stringify(utf8_wordarray(value)) : CryptoJS.enc.Hex.stringify(value);
export const decode_hex = (value: string): CryptoJS.lib.WordArray => CryptoJS.enc.Hex.parse(value);

export const encode_base64 = (value: string | CryptoJS.lib.WordArray) =>
	typeof value === "string" ? CryptoJS.enc.Base64.stringify(utf8_wordarray(value)) : CryptoJS.enc.Base64.stringify(value);
export const decode_base64 = (value: string) => CryptoJS.enc.Base64.parse(value);

export const md5 = (value: string | CryptoJS.lib.WordArray): CryptoJS.lib.WordArray => CryptoJS.MD5(value);
export const sha1 = (value: string | CryptoJS.lib.WordArray): CryptoJS.lib.WordArray => CryptoJS.SHA1(value);
export const sha256 = (value: string | CryptoJS.lib.WordArray): CryptoJS.lib.WordArray => CryptoJS.SHA256(value);

export const default_iv = (): CryptoJS.lib.WordArray => utf8_wordarray("0000000000000000");

export const encrypt_aes_cbc_pkcs7 = (
	value: string | CryptoJS.lib.WordArray,
	key: CryptoJS.lib.WordArray,
	iv?: CryptoJS.lib.WordArray,
): CryptoJS.lib.WordArray =>
	CryptoJS.AES.encrypt(value, key, {
		mode: CryptoJS.mode.CBC,
		padding: CryptoJS.pad.Pkcs7,
		iv: iv,
	}).ciphertext;
export const decrypt_aes_cbc_pkcs7 = (
	value: string | CryptoJS.lib.CipherParams,
	key: CryptoJS.lib.WordArray,
	iv?: CryptoJS.lib.WordArray,
): CryptoJS.lib.WordArray =>
	CryptoJS.AES.decrypt(value, key, {
		mode: CryptoJS.mode.CBC,
		padding: CryptoJS.pad.Pkcs7,
		iv: iv,
	});
