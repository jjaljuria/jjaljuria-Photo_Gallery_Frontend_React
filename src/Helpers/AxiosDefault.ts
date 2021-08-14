import axios from 'axios';

const AxiosDefault = axios.create({
	baseURL: 'http://localhost:4000',
	headers: {
		'Content-Type': 'application/json'
	}
});
export default AxiosDefault;