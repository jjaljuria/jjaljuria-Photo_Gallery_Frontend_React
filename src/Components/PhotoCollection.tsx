import React from 'react'
import { Photo } from '../Helpers/Types/Photo'
import PhotoCard from './PhotoCard'

const PhotoCollection = (props: { photos: Photo[] }) => {
	let photoCards: React.ReactElement[] = []
	const photos: Photo[] = props.photos ?? []

	if (photos.length) {
		photoCards = photos.map(photo => {
			return (
				<div className="col-md-3 my-1 px-1" key={photo._id}>
					<PhotoCard photo={photo} />
				</div>
			)
		})
	}

	return (
		<section className="row" >
			{photoCards}
		</section>
	)
}

PhotoCollection.defaultProps = {
	photos: []
}
export default PhotoCollection
