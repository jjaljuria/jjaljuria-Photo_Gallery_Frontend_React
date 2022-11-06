import React from 'react'

export const LogIn = React.createContext({
	loggedIn: false,
	setLoggedIn: (newState: boolean) => {}
})

export const CheckedsHandler = React.createContext({
	checked: (id: string) => { },
	unchecked: (id: string) => { }
})
