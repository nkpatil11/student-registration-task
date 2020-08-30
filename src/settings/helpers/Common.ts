import { isProd, AcceptedImageFormat } from '../configs/AppConfigs';
import Swal from 'sweetalert2';
import { ApiHelper } from './ApiHelper';

/**
 * logs the text only if the process mode is development
 */
export function logger(...args: any[]) {
	if (!isProd) {
		for (let index = 0; index < args.length; index++) {
			const data = args[index];
			console.log('LOG: -------------------------');
			console.log('LOG: ', data);
			console.log('LOG: -------------------------');
		}
	}
}

/**
 * Async Set State
 */
export const asyncSetState = (instance: any) => (newState: any) =>
	new Promise(resolve => instance.setState(newState, resolve));

/**
 * FUNCTION TO CREATE SWEET ALERT
 * yard add sweetalert2
 * USAGE: const { value } = await confirmBox({
			title: 'Are you sure?',
			text: text,
		});
		if (value) {} else {}
 */
export async function confirmBox(obj: any) {
	if (!obj) {
		obj = {};
	}
	let {
		title,
		text,
		type,
		confirmButtonColor,
		cancelButtonColor,
		confirmButtonText,
		input,
		inputOptions,
		inputValidator,
		cancelButtonText
	} = obj;
	return await Swal.fire({
		title: title || 'Are you sure?',
		text: text || "You won't be able to revert this!",
		type: type || 'warning',
		input: input || '',
		inputOptions: inputOptions || {},
		inputValidator: inputValidator || {},
		showCancelButton: true,
		confirmButtonColor: confirmButtonColor || '#3085d6',
		cancelButtonColor: cancelButtonColor || '#d33',
		confirmButtonText: confirmButtonText || 'Yes!',
		cancelButtonText: cancelButtonText || 'Cancel'
	});
}

export const getImageBlob = async (name: string): Promise<File | null> => {
	try {
		const fileRes: any = await new ApiHelper().FetchFromServer(
			'/commons',
			'/files/downloadFile',
			'POST',
			false,
			undefined,
			{ name },
			undefined,
			'blob'
		);

		if (fileRes.isError) {
			throw new Error(fileRes.messages);
		}

		const { data } = fileRes;
		const file: File = new File([data], name, {
			type: data.type,
		});
		return file;
	} catch (error) {
		logger(error);
		return null;
	}
};

/**
 * FUNCTION TO STOP RE-RENDRING OF IMAGES BLOB
 * PROTECTS MEMORY LEAKS
 * USAGE: const imageUrl = image && blobImageUrl(image);
 * @param blob
 */
export const blobImageUrl = (blob: any) => {
	if (!blob.url) {
		blob.url = URL.createObjectURL(blob);
	}
	return blob.url;
};

export const blobUrl = (blob: any) => {
	let url: any = blob
	if (blob && blob.name) {
		if (!blob.url) {
			url = URL.createObjectURL(blob);
		} else {
			url = blob.url;
		}
	}
	return url;
};

// PROCESS IMAGE TO GET IT'S DIMENSIONS
const imageProcess = (
	src: string
): Promise<{ width: number; height: number }> => {
	return new Promise((resolve, reject) => {
		let img = new Image();
		img.onload = () => resolve({ width: img.width, height: img.height });
		img.onerror = reject;
		img.src = src;
	});
};

// CHECK RESOLUTION OF IMAGES
export const checkResolution = async (
	file: File,
	width: number,
	height: number
): Promise<boolean> => {
	const url: string = URL.createObjectURL(file),
		minImageWidth: number = width,
		minImageHeight: number = height;

	const imgResolution: {
		width: number;
		height: number;
	} = await imageProcess(url);

	if (
		imgResolution.width >= minImageWidth &&
		imgResolution.height >= minImageHeight
	) {
		return true;
	} else {
		return false;
	}
};

// VALIDATION FOR IMAGE BY CHECKING FILE TYPE OF SELECTED FILE
export const imageValidate = (type: string): boolean => {
	const fileType: string = type
		.substring(type.lastIndexOf('/') + 1)
		.toLowerCase();

	let indx: number = 0;

	while (indx < AcceptedImageFormat.length) {
		const accFileType: string = AcceptedImageFormat[indx]
			.substring(type.lastIndexOf('/') + 1)
			.toLowerCase();

		if (fileType === accFileType) {
			return true;
		} else {
			indx++;
		}
	}

	return false;
};

// CHECK IMAGE RESOLUTION AND RETURN IT'S PASS VALUE
export const imageValidateAndSave = (
	file: File | null,
	setFieldValue: any,
	setFieldError: any,
	name: string,
	width?: number,
	height?: number
): void => {
	if (file && imageValidate((file || {}).type)) {
		checkResolution(file, width ? width : 1000, height ? height : 1000)
			.then((val: boolean) => {
				if (val) {
					setFieldValue(name, file);
				} else {
					setFieldError(
						name,
						`Please select high resolution image (${width ? width : 1000} x ${
						height ? height : 1000
						})`
					);
				}
			})
			.catch(err => logger(err));
	} else {
		setFieldError(name, 'Only PNG, JPG, JPEG, BMP & GIF are accepted');
	}
};
