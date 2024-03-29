import React, { FormEvent, useState, ChangeEvent, useEffect, useContext } from 'react'
import * as UserService from '../Services/LoginService'
import { useNavigate } from 'react-router-dom'
import { LogIn } from '../Helpers/Contexts'

type InputChange = ChangeEvent<HTMLInputElement>;

const Login = () => {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const navigate = useNavigate()
	const { setLoggedIn } = useContext(LogIn)

	const handlerSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		const user = {
			email,
			password
		}

		UserService.Login(user)
			.then(response => {
				window.localStorage.setItem('token', response.token)
				setLoggedIn(true)
				navigate(-1)
			}).catch(err => {
				console.log(err)
			})
	}

	const handlerInputChange = (e: InputChange) => {
		const target = e.target

		if (target.name === 'email') {
			setEmail(target.value)
		} else if (target.name === 'password') {
			setPassword(target.value)
		}
	}

	const fetchStatus = async () => {
		const status = await UserService.verifyLogin()
		console.log(status)
		if (status.loggedIn) {
			// history.push('/');
			setLoggedIn(status.loggedIn)
			console.log(status)
		}
	}

	useEffect(() => {
		fetchStatus()
	}, [])

	return (
		<section className="row m-5">
			<div className="offset-md-4 d-flex justify-content-center col-md-4">
				<h1>Iniciar Sesión</h1>
			</div>
			<form className="col-md-4 offset-md-4 rounded bg-light shadow" onSubmit={handlerSubmit}>

				<div className="form-group d-flex flex-column m-3">
					<label htmlFor="email">Correo: </label>
					<input type="text" name="email" onChange={handlerInputChange} />
				</div>

				<div className="form-group  d-flex flex-column m-3">
					<label htmlFor="password">Contraseña: </label>
					<input type="password" name="password" onChange={handlerInputChange} />
				</div>

				<div className="my-3 mr-3 d-flex justify-content-end">
					<button className="btn btn-primary" type="submit">Ingresar</button>
				</div>
			</form>
		</section>

	)
}

export default Login
