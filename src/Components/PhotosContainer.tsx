import React, { useEffect, useState, useContext } from 'react'
import Avatar from './Avatar'
import PhotoCollection from './PhotoCollection'
import * as PhotoService from '../Services/PhotoService'
import * as AvatarService from '../Services/AvatarService'
import { Photo } from '../Helpers/Types/Photo'
import { useParams } from 'react-router-dom'
import BarSavePhoto from './BarSavePhoto'
import DeleteButtom from './DeleteButton'
import { CheckedsHandler, LogIn } from '../Helpers/Contexts'

function PhotosContainer () {
	const params = useParams<{username:string}>()
	const { loggedIn } = useContext(LogIn)
	const [username, setUsername] = useState('')
	const [avatarURL, setAvatarURL] = useState('')
	// eslint-disable-next-line no-array-constructor
	const [photos, setPhotos] = useState(Array<Photo>())
	const [progress, setProgress] = useState(0)
	// eslint-disable-next-line no-array-constructor
	const [checkeds, setCheckeds] = useState(Array<string>())

	const loadAvatar = async () => {
		const res = await AvatarService.getAvatar(params.username ?? '')
		setAvatarURL(res)
	}

	const loadPhotos = async () => {
		const res = await PhotoService.getPhotos(params.username ?? '')
		setPhotos(res)
	}

	const savePhoto = async (file: FormData) => {
		const uploadProgress = (data: ProgressEvent) => {
			setProgress(Math.round(data.loaded / data.total * 100))
		}

		PhotoService.savePhotos(file, uploadProgress)
			.then(response => {
				alert('Foto subida exitosamente')
				loadPhotos()
			})
			.catch(error => {
				console.log(error)
				setProgress(0)
			})
	}

	const selectedPhotoHandler = (id: string) => {
		const copy = Array.from(checkeds)
		copy.push(id)
		setCheckeds(copy)
	}

	const unselectedPhotoHandler = (id: string) => {
		const res = checkeds.filter((check) => check !== id)
		setCheckeds(res)
	}

	const selectedHandlers = {
		checked: selectedPhotoHandler,
		unchecked: unselectedPhotoHandler
	}

	const deletePhotos = async () => {
		const res = await PhotoService.deletePhotos(checkeds)
		console.log(res)
		loadPhotos()
	}

	const changeImageAvatar = async (avatar: FormData) => {
		const res = await AvatarService.updateAvatar(avatar)
		console.log(res)
		loadAvatar()
	}

	useEffect(() => {
		loadAvatar()
		loadPhotos()
		setUsername(params.username ?? '')
	}, [])

	return (
		<div className="mt-4">

			{avatarURL
				? <div>
					<Avatar image={avatarURL} onChangeAvatar={changeImageAvatar} logged={{ loggedIn }}>
						<h3>{username}</h3>
					</Avatar>
					{loggedIn
						? <>
							<DeleteButtom onDelete={deletePhotos} />
							<BarSavePhoto savePhoto={savePhoto} logged={{ loggedIn }} progress={progress} />
						</>
						: ''}
					<CheckedsHandler.Provider value={selectedHandlers}>
						<PhotoCollection photos={photos} />
					</CheckedsHandler.Provider>
				</div>
				:				<div className="text-center">
					<h1>User Not Found</h1>
				</div>
			}
		</div>
	)
}

export default PhotosContainer
