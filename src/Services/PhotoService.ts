import axios from '../Helpers/AxiosDefault'; //axios configurado por mi jjaljuria

axios.defaults.withCredentials = true;

export const getPhotos = async (username: string) => {
	return await (await axios.get(`photos/${username}`)).data;
}

export const savePhotos = (photo: FormData, uploadProgress: any) => {

	return axios.post(`/photos`, photo, {
		withCredentials: true,
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded',
		}, onUploadProgress: uploadProgress
	});
}

export const deletePhotos = async (checkedIds: string[]) => {
	return await axios.delete('/photos', { data: checkedIds });
}