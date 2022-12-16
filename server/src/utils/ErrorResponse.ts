class ErrorResponse extends Error {
	statusCode: any;
	// message: any
	constructor(message: any, statusCode: any) {
		super(message);
		this.statusCode = statusCode;
	}
}

export default ErrorResponse;
