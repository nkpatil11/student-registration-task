import Axios from 'axios';
import { AppConfig } from '../configs/AppConfigs';
import { ErrorHandlerHelper } from './ErrorHandlerHelper';
import { SuccessHandlerHelper } from './SuccessHandlerHelper';
import { logger } from './Common';
import * as constants from './constants';

let CancelToken = Axios.CancelToken;
let cancel: any;

/**
 * ApiHelper Class - FOR MAKING API REQUEST
 */
export class ApiHelper {
	public _portalGateway: string;
	public _apiVersion: string | number;

	constructor() {
		this._portalGateway = AppConfig.API_ENDPOINT;
		this._apiVersion = AppConfig.API_VERSION;
	}

	setHost = (host: string) => {
		this._portalGateway = host;
	};

	setApiVersion = (version: string | number) => {
		this._apiVersion = version;
	};

	/**
	 * Fetches from the Gateway defined by the instantiated object. Accepts <T> as output object.
	 * @example <caption>"/Auth/UserAccount", "/GetCurrentUser", "GET", "JWT Content"</caption>
	 * @param {service} service - wanting to be access ex. "UserAuth/Auth"
	 * @param {endpoint} endpoint - you wish to call ex. "/Login"
	 * @param {method} mehotd - method (GET, UPDATE, DELETE, POST)
	 * @param {jwt} JWT - JSON Web Token (Optional)
	 * @param {queryOptions} Query - query options for "GET" methods (Optional)
	 * @param {body} body - JSON body for "UPDATE, DELETE and POST" methods (Optional)
	 * @param {progressCallback} - To get the upload file progress events
	 */
	async FetchFromServer(
		service: string,
		endpoint: string,
		method: any,
		authenticated: boolean = false,
		queryOptions: any = undefined,
		body: any = undefined,
		progressCallback: {
			[key: string]: (progressEvent: { loaded: number; total: number }) => void;
		} = {},
		responseType: string = 'json'
	) {
		let url: string = this._apiVersion + service + endpoint;
		let options: { [key: string]: any } = { method: method, responseType };
		options = { ...options, headers: { 'Content-Type': 'application/json' } };
		if (authenticated) {
			options = {
				...options,
				headers: {
					...options.headers,
					authorization:
						localStorage.getItem(constants.id) ||
						sessionStorage.getItem(constants.id),
				},
			};
		}
		if (progressCallback) {
			options = {
				...options,
				onUploadProgress: progressCallback.onUploadProgress,
			};
		}
		// html query for "GET", json body for others.
		if (queryOptions && typeof queryOptions === 'object') {
			let queryParams: Array<any> = [];
			await Promise.all(
				Object.keys(queryOptions).map(key => {
					return (queryParams = [
						...queryParams,
						`${key}=${queryOptions[key]}`,
					]);
				})
			);
			url += `?${queryParams.join('&')}`;
		}

		if (body) {
			options.data = body;
		}

		try {
			let response = await Axios({
				...options,
				url: url,
				baseURL: this._portalGateway,
				cancelToken: new CancelToken(function executor(c) {
					cancel = c; // An executor function receives a cancel function as a parameter
				}),
			});
			if (response.status < 200 || response.status >= 300) {
				let errorObject = {
					code: response.status,
					response: response.data,
				};

				throw errorObject;
			}
			const data = new SuccessHandlerHelper(response);
			return data.data;
		} catch (err) {
			if (Axios.isCancel(err) || !err.response) {
				logger('%s REQ CANCELLED:  ', err);
				return {
					isError: true,
					error: 'Request cancelled',
					messages: 'Request cancelled',
				};
			} else {
				const errorHelper = new ErrorHandlerHelper(err.response);
				logger('%s ERR RESPONSE:  ', err.response);
				return errorHelper.error;
			}
		}
	}

	/**
	 * CANCEL THE LAST REQUEST
	 */
	cancelRequest = () => {
		cancel && cancel();
	};
}
