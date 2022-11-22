import React, { useContext } from 'react'
import { Logout as logoutService } from '../Services/LoginService'
// import { useNavigate } from 'react-router-dom'
import { LogIn } from '../Helpers/Contexts'

export default function Logout () {
	const logIn = useContext(LogIn)
	const logoutHandler = () => {
		logoutService()
		logIn.setLoggedIn(!logIn.loggedIn)
	}

	return (
		<div>
			<button className="btn btn-secondary" onClick={logoutHandler}>Log out</button>
		</div>
	)
}
