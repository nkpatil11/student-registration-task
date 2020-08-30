/**
 * SuccessHandlerHelper Class - For managing successful response
 */
export class SuccessHandlerHelper {
	public rawData: any;
	public data: { [key: string]: any } = {
		code: 200,
		isError: false,
		timestamp: Date.now(),
		error: undefined,
		messages: [],
	};

	constructor(data: { [key: string]: any }) {
		this.rawData = data.data;
		this.setSucccess();
	}

	setSucccess = () => {
		let messages: any[] = [];

		for (let i in this.rawData) {
			if (typeof this.rawData[i] === 'string') {
				messages = [...messages, this.rawData[i]];
			}
		}

		this.data.data = this.rawData;
		this.data.messages = messages;
	};
}
