import React from 'react';
import {Link} from 'react-router-dom';
import NotFound from '../../components/NotFound/NotFound';
import './Card.css';

function Card({data}) {
	return (
		<div className="card">
			<Link to={`/videogames/${data.id}`}>
				{data.image ? (
					<img className="card-img-top" src={data.image} alt={data.name} />
				) : (
					<NotFound image="noimage" />
				)}
			</Link>
			<div className="card-body">
				<h5 className="card-title">{data.name}</h5>
				<ul className="list-group list-group-flush">
					<li className="list-group-item">Rating: {data.rating}</li>
					<li className="list-group-item">Genres: {data.genres}</li>
				</ul>
			</div>
		</div>

	)
}

export default Card;
