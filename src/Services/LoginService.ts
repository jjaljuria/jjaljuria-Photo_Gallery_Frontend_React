import axios from '../Helpers/AxiosDefault'; //axios configurado por mi jjaljuria
axios.defaults.withCredentials = true;

export const Login = async (user: {email:string, password: string})=>{
	
	return await (await axios.post(`/user/login`, user)).data;
}

export const verifyLogin = async () =>{
	return await (await axios.get(`/user/login`)).data;
}