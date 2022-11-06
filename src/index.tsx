import React, { useEffect, useState } from 'react'
import { createRoot } from 'react-dom/client'

import * as serviceWorker from './serviceWorker'
import { Route, Routes, HashRouter } from 'react-router-dom'
import 'bootstrap/dist/js/bootstrap.esm'
import 'bootswatch/dist/minty/bootstrap.min.css'
import '@fortawesome/fontawesome-free/css/all.css'
import './css/styles.css'
import './css/styles.css.map'
import * as LoginService from './Services/LoginService'
import { LogIn } from './Helpers/Contexts'

// Components
import Login from './Components/Login'
import PhotosContainer from './Components/PhotosContainer'
import Index from './Components/Index'
import Layout from './Components/Layout'

const App = () => {
	const [loggedIn, setLoggedIn] = useState({ loggedIn: false })
	console.log(loggedIn)
	const verifyLogin = async () => {
		const res = await LoginService.verifyLogin()
		setLoggedIn(res)
		console.log('veryfyLogin', res)
	}

	useEffect(() => {
		(async () => {
			await verifyLogin()
		})()
	}, [])

	const stateLoggedIn = { loggedIn: loggedIn.loggedIn, setLoggedIn: (newState: boolean) => setLoggedIn({ loggedIn: newState }) }

	return (
		<React.StrictMode>
			<HashRouter>
				<LogIn.Provider value={stateLoggedIn}>
					<Layout>
						<main className="container">
							<Routes>
								<Route path="/" element={<Index/>} />
								<Route path="/login" element={<Login />} />
								<Route path="/:username" element={<PhotosContainer loggedIn={loggedIn.loggedIn} />} />
							</Routes>
						</main>
					</Layout>
				</LogIn.Provider>
			</HashRouter>
		</React.StrictMode>

	)
}

createRoot(document.getElementById('root')!).render(<App />)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
