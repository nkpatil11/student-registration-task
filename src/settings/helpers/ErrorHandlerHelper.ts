/**
 * ErrorHandlerHelper Class - For managing errors
 */
export class ErrorHandlerHelper {
	public rawError: any;
	public error: { [key: string]: any } = {
		code: 500,
		isError: true,
		timestamp: Date.now(),
		error: 'Unknown error',
		messages: [],
		data: undefined,
	};

	constructor(err: { [key: string]: any }) {
		this.rawError = err;
		this.setError();
	}

	public setError = (): void => {
		this.error.code = this.rawError.status
			? this.rawError.status
			: this.error.status;
		this.error.timestamp = Date.now();
		this.error.messages = [];
		if (this.rawError.data && typeof this.rawError.data === 'object') {
			if (this.rawError.data.hasOwnProperty('error')) {
				this.error.messages = this.rawError.data.error.message;
			}

			if (this.rawError.data) {
				this.error.messages = this.rawError.data.message;
			}
		}
		if (!this.error.messages.length) {
			this.error.error = 'Unknown';
			this.error.messages = 'Unknown error occure';
		}
	};
}
