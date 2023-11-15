export interface SResponseT<T> {
	trace_id: string;
	request_time: number;
	response_time: number;
	elapsed_time: string;
	error_code: string;
	error_message: string;
	data: T;
}
