import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import Logout from './Logout'
import { LogIn } from '../Helpers/Contexts'

export default function Navbar () {
	const { loggedIn } = useContext(LogIn)

	return (
		<nav className="navbar navbar-expand-md navbar-light bg-light">
			<div className="container-fluid">
				<a className="navbar-brand" href="#">Navbar</a>
				<button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
					<span className="navbar-toggler-icon"></span>
				</button>
				<div className="collapse navbar-collapse" id="navbarSupportedContent">
					<ul className="navbar-nav ms-auto mb-2 mb-lg-0">
						<li className="nav-item">
							<Link className="nav-link active" aria-current="page" to="/" >Home</Link>
						</li>
						{
							!loggedIn
								? (<li className="nav-item">
									<Link to="/login" className="nav-link">Login</Link>
								</li>)
								: (<Logout />)
						}
					</ul>
				</div>
			</div>
		</nav>
	)
}
