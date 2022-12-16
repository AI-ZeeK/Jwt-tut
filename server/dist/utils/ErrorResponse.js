class ErrorResponse extends Error {
    // message: any
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
    }
}
export default ErrorResponse;
