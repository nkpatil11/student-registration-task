import { toast } from 'react-toastify';

export function showDefaultToast(content: string) {
	toast.dismiss();
	toast(content);
}

export function showSuccessToast(content: string) {
	toast.dismiss();
	toast.success(content);
}

export function showErrorToast(content: string) {
	toast.dismiss();
	toast.error(content);
}

export function showWarnToast(content: string) {
	toast.dismiss();
	toast.warn(content);
}

export function showInfoToast(content: string) {
	toast.dismiss();
	toast.info(content);
}
