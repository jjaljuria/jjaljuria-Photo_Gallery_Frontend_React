import { render, screen } from '@testing-library/react'
import React from 'react'
import PhotoCollection from '../Components/PhotoCollection'
import { Photo } from '../Helpers/Types/Photo'

class MockPhoto implements Photo {
	_id: string = '1'
	idUser: string = '1'
	url: string = 'http://localhost:4000/img/photo-example.jpg'
	position?: number | undefined
}

describe('PhotoCollection component', () => {
	it('should show PhotoCollection', () => {
		render(<PhotoCollection />)
	})

	it('should show one photo', () => {
		const mockPhoto : Photo[] = [new MockPhoto()]

		render(<PhotoCollection photos={mockPhoto} />)

		screen.getByAltText('http://localhost:4000/img/photo-example.jpg')
	})
})
