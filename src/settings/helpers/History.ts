const createHistory = require('history').createBrowserHistory;

export default createHistory({
	basename: '',
	forceRefresh: false,
	keyLength: 6,
	getUserConfirmation: (message: string, callback: any) =>
		callback(window.confirm(message)),
});
