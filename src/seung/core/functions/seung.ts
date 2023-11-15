import { version } from "../../";
import * as SFormat from "./SFormat";
import * as SSecurity from "./SSecurity";

export class STool {
	constructor() {}

	static version = (): string => version;

	// text
	static repeat = SFormat.repeat;
	static concat = SFormat.concat;
	static left = SFormat.left;
	static right = SFormat.right;
	static is_equal_ignore_case = SFormat.is_equal_ignore_case;
	static text_to_color = SFormat.text_to_color;

	// number
	static number_only = SFormat.number_only;
	static number_format = SFormat.number_format;
	static number_comma = SFormat.number_comma;

	// utf8
	static utf8_wordarray = SSecurity.utf8_wordarray;
	static utf8_string = SSecurity.utf8_string;

	// hex
	static encode_hex = SSecurity.encode_hex;
	static decode_hex = SSecurity.decode_hex;

	// base64
	static encode_base64 = SSecurity.encode_base64;
	static decode_base64 = SSecurity.decode_base64;

	// hash
	static md5 = SSecurity.md5;
	static sha1 = SSecurity.sha1;
	static sha256 = SSecurity.sha256;

	// crypto
	static default_iv = SSecurity.default_iv;
	static encrypt_aes_cbc_pkcs7 = SSecurity.encrypt_aes_cbc_pkcs7;
	static decrypt_aes_cbc_pkcs7 = SSecurity.decrypt_aes_cbc_pkcs7;
}
