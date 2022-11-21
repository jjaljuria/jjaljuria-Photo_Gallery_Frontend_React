import React from 'react'
import { render, screen, fireEvent, act } from '@testing-library/react'
import UserEvent from '@testing-library/user-event'
import PhotoCard from '../Components/PhotoCard'
import { Photo } from '../Helpers/Types/Photo'
import { LogIn, CheckedsHandler } from '../Helpers/Contexts'

class MockPhoto implements Photo {
	_id: string = '1'
	idUser: string = '1'
	url: string = 'http://localhost:4000/img/photo-example.jpg'
	position?: number | undefined
}

describe('PhotoCard Component', () => {
	it('should exist PhotoCard', () => {
		render(<PhotoCard photo={new MockPhoto()}/>)
	})

	it('should show one card with alt text', () => {
		render(<PhotoCard photo={new MockPhoto()}/>)

		screen.getByAltText('http://localhost:4000/img/photo-example.jpg')
	})

	it('should checking card if user is loggedIn', async () => {
		const user = UserEvent.setup()
		const mockHandlers = {
			checked: jest.fn(),
			unchecked: jest.fn()
		}

		render(
			<CheckedsHandler.Provider value={mockHandlers}>
				<LogIn.Provider value={{ loggedIn: true, setLoggedIn: (newState: boolean) => {} }}>
					<PhotoCard photo={new MockPhoto()} />
				</LogIn.Provider>
			</CheckedsHandler.Provider>
		)

		const checkbox = screen.getByRole('checkbox')
		fireEvent.click(checkbox, { target: { checked: true } })

		expect(checkbox.checked).toEqual(true)

		fireEvent.click(checkbox, {
			target: {
				checked: false
			}
		})

		expect(checkbox.checked).toEqual(false)
	})
})
