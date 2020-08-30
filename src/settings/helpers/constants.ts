// IMPORTS
import icon_empty from '../../assets/img/Icon_Empty.svg';

export { icon_empty };

export interface IReactSelect {
	label: string;
	value: string;
}

export const homeUrl = '/';

// LOCAL STORAGE KEYS
export const id = 'id';
export const userId = 'userId';
export const rememberMe = 'rememberMe';
export const email = 'email';
export const password = 'password';

export const countrySchema: any[] = [
	{ value: "AU", label: "Australia", id: '13' },
	{ value: "AT", label: "Austria", id: '14' },
	{ value: "BE", label: "Belgium", id: '21' },
	{ value: "CA", label: "Canada", id: '38' },
	{ value: "CZ", label: "Czech Republic", id: '57' },
	{ value: "DK", label: "Denmark", id: '58' },
	{ value: "EE", label: "Estonia", id: '68' },
	{ value: "FI", label: "Finland", id: '74' },
	{ value: "FR", label: "France (Metropolitan France only)", id: '75' },
	{ value: "DE", label: "Germany", id: '82' },
	{ value: "GR", label: "Greece", id: '85' },
	{ value: "HK", label: "Hong Kong", id: '98' },
	{ value: "IE", label: "Ireland", id: '105' },
	{ value: "IT", label: "Italy", id: '107' },
	{ value: "JP", label: "Japan", id: '109' },
	{ value: "LV", label: "Latvia", id: '120' },
	{ value: "LT", label: "Lithuania", id: '126' },
	{ value: "LU", label: "Luxembourg", id: '127' },
	{ value: "MX", label: "Mexico (only supported for marketplaces within Mexico or the USA)", id: '142' },
	{ value: "NL", label: "Netherlands", id: '155' },
	{ value: "NZ", label: "New Zealand", id: '157' },
	{ value: "NO", label: "Norway", id: '164' },
	{ value: "PL", label: "Poland", id: '175' },
	{ value: "PT", label: "Portugal", id: '176' },
	{ value: "RO", label: "Romania", id: '180' },
	{ value: "SG", label: "Singapore", id: '196' },
	{ value: "SK", label: "Slovakia", id: '197' },
	{ value: "SI", label: "Slovenia", id: '198' },
	{ value: "ES", label: "Spain", id: '205' },
	{ value: "SE", label: "Sweden", id: '211' },
	{ value: "CH", label: "Switzerland", id: '212' },
	{ value: "GB", label: "United Kingdom", id: '230' },
	{ value: "US", label: "United States", id: '231' },
]