export interface IAppRoutes {
	path: string;
	exact?: boolean;
	main: any;
	id: string;
}

export interface IAdminRoutes extends IAppRoutes {
	activeIcon?: string;
	nonActiveIcon?: string;
	name: string;
	isActive: boolean;
	show: boolean;
	children?: IAdminRoutes[];
}

export interface IUserRoutes extends IAppRoutes {
	name: string;
	isActive: boolean;
	show: boolean;
	component: any;
	children?: IUserRoutes[];
}
