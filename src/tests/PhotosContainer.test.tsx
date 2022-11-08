import { render, RenderResult, screen } from '@testing-library/react'
import React from 'react'
import PhotosContainer from '../Components/PhotosContainer'
import { Photo } from '../Helpers/Types/Photo'
import { getAvatar } from '../Services/AvatarService'
import { getPhotos } from '../Services/PhotoService'

class MockPhoto implements Photo {
	_id: string = '1'
	idUser: string = '1'
	url: string = 'http://localhost:4000/img/Avatar.jpg'
	position?: number | undefined
}

jest.mock('../Services/AvatarService.ts')
jest.mock('../Services/PhotoService.ts')

describe('PhotosContainer component', () => {
	it('should PhotosContainer to be defined', async () => {
		const result: RenderResult = render(<PhotosContainer />)

		result.findByText('User Not Found')
	})

	it('should user can see Avatar image', async () => {
		getAvatar.mockReturnValueOnce('http://localhost:4000/img/Avatar.jpg')
		getPhotos.mockReturnValueOnce([new MockPhoto()])
		render(<PhotosContainer />)

		await screen.findByAltText('Avatar')
	})

	it('should user can see one photo', async () => {
		getAvatar.mockReturnValueOnce('http://localhost:4000/img/Avatar.jpg')
		getPhotos.mockReturnValueOnce([new MockPhoto()])
		render(<PhotosContainer />)

		await screen.findByAltText('http://localhost:4000/img/Avatar.jpg')
	})

	it('should if not user exists see "User Not Found"', async () => {
		getAvatar.mockReturnValueOnce('')
		render(<PhotosContainer />)

		screen.findByText('User Not Found')
	})
})
