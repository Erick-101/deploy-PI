import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getVideogameById } from "../../actions/index";
import NotFound from "../../components/NotFound/NotFound";
import "./GameDetail.css";

function GameDetail({ id }) {
  const dispatch = useDispatch();
  const videogame = useSelector((store) => store.searchVideogameById);
	
  useEffect(() => {
    dispatch(getVideogameById(id));
		console.log({ videogame });
  }, []);
	
	useEffect(() => {
		console.log({ videogame });
	}, [dispatch]);
  return (    
		<div className="detail">
			<div className="info">
				<div className="image">
					{videogame.image === null || !videogame.image ? (
						<NotFound image={"noimage"} />
					) : (
						<img src={videogame.image} alt={videogame.name} />
					)}
					<div>
						<h1>{videogame.name} </h1>
						<h5>({videogame.released})</h5>
					</div>
				</div>
				<div className="details">
					
					<div className="info-box">
						<div className="info-item">
							<div className="value">ID:{videogame.id}</div>
						</div>
						<div className="info-item">
							<div className="value">Genres:
							<br />
							{videogame.genres}</div>
						</div>
						<div className="info-item">
							<div className="value">Rating:
							<br />
							 {videogame.rating}</div>
						</div>
						<div className="info-item">
							<div className="value">Platforms:
							<br />
							{videogame.platforms}</div>
						</div>
					</div>
					<div className="text">
						<p>{videogame.description}</p>
						<p></p>
					</div>
				</div>
			</div>
			<Link to="/home">
				<button className="button" type="submit">🡸</button>
			</Link>
		</div>
  
  );
}

export default GameDetail;