let mode: string = process.env.NODE_ENV;

if (!mode || mode === 'development') {
	mode = 'dev';
} else if (mode === 'production') {
	mode = 'live';
} else {
	mode = 'stage';
}

let data: any extends string
	? { [key: string]: string }
	: { [key: string]: any };
switch (mode) {
	case 'live':
		data = {
			SITE_ENDPOINT: 'http://localhost:3000',
			API_ENDPOINT: 'http://localhost:3005/',
			API_VERSION: 'api',
		};
		break;
	case 'stage':
		data = {
			SITE_ENDPOINT: 'http://localhost:3000',
			API_ENDPOINT: 'http://localhost:3005/',
			API_VERSION: 'api',
		};
		break;
	case 'dev':
		data = {
			SITE_ENDPOINT: 'http://localhost:3000',
			API_ENDPOINT: 'http://localhost:3005/',
			API_VERSION: 'api',
		};
		break;
	default:
		data = {};
		break;
}

data['itemsPerPage'] = 10;
data['defaultDateFormat'] = 'ddd, Do MMMM YYYY';
data['defaultActivityDateFormat'] = 'YYYY-MM-DD HH:mm:s';

export const isProd = mode === 'live';
export const AppConfig = data;

export const AcceptedImageFormat = [
	'image/jpg',
	'image/JPG',
	'image/png',
	'image/PNG',
	'image/bmp',
	'image/BMP',
	'image/jpeg',
	'image/JPEG',
];
