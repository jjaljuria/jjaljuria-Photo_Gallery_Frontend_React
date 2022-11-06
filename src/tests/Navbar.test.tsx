/* global jest describe beforeEach afterEach it expect */
import { cleanup, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { debug } from 'console'
import React from 'react'
import Navbar from '../Components/Navbar'
import { LogIn } from '../Helpers/Contexts'

const mockedUseNavigate = jest.fn()

jest.mock('react-router-dom', () => ({
	...jest.requireActual('react-router-dom'),
	Link: ({ children } : any) => (<a href="#" onClick={mockedUseNavigate}>{children}</a>)
}))

describe('Navbar component', () => {
	beforeEach(() => {
		render(<Navbar/>)
	})

	afterEach(() => cleanup())

	it('should to be typepf function', () => {
		expect(typeof Navbar).toBe('function')
	})

	it('should have a link login', () => {
		screen.getByRole('link', { name: 'Login' })
	})

	it('should click login link', async () => {
		const loginButton = screen.getByRole('link', { name: 'Login' })
		const user = userEvent.setup()
		await user.click(loginButton)
		expect(mockedUseNavigate).toHaveBeenCalled()
	})

	it('should user can see button "Log out"', () => {
		cleanup()

		const state = {
			loggedIn: true,
			setLoggedIn: jest.fn()
		}
		render(
			<LogIn.Provider value={state}>
				<Navbar />
			</LogIn.Provider>)

		screen.getByRole('button', { name: 'Log out' })
	})

	it('should user can\'t see button "Log out"', () => {
		cleanup()

		const state = {
			loggedIn: false,
			setLoggedIn: jest.fn()
		}
		render(
			<LogIn.Provider value={state}>
				<Navbar />
			</LogIn.Provider>)

		expect(screen.queryByRole('button', { name: 'Log out' })).toBe(null)
	})
})
