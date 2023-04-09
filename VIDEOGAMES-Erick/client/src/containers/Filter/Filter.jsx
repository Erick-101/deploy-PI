import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getGenres, filterByGenre, orderByCreator, orderAsc, orderDesc } from "../../actions/index";
import "./Filter.css";

export function Filter({paginate}) {
  const dispatch = useDispatch()
  const genres = useSelector((store) => store.genres);

  useEffect(() => {
    dispatch(getGenres());
  }, []); 


  // Filtrado por genre
  const handleFilter = (e) => {
    dispatch(filterByGenre(e.target.value))
    paginate(e, 1);
  };


  // Ordenado
  const handleOrder = (e) => {
    if (e.target.value === "asc_name" || e.target.value === "asc_rating") {
      dispatch(orderAsc(e.target.value));
    } else if (e.target.value === "desc_name" || e.target.value === "desc_rating") {
      dispatch(orderDesc(e.target.value));
    } else {
      dispatch(filterByGenre(e.target.value));
    }
  };

  // Filtrado por API/DB
  const handleCreator = (e) => {
    if (e.target.value === "Api" || e.target.value === "Created") {
      dispatch(orderByCreator(e.target.value));
      paginate(e, 1);
    } else {
      dispatch(filterByGenre(e.target.value));
      paginate(e, 1);
    }
    
  };

  return (
		<div className="filter">
			<div>
				<label htmlFor="genre-filter">Genero: </label>
				<select id="genre-filter" onChange={(e) => handleFilter(e)}>
					<option value="All">Todos</option>
					{genres.map((genre) => (
						<option key={genre.id} value={genre.name}>{genre.name}</option>
					))}
				</select>
			</div>
			<div>
				<label htmlFor="order-filter">Orden: </label>
				<select id="order-filter" onChange={(e) => handleOrder(e)}>
					<option value="All">Todos</option>
					<option value="asc_name">(A-Z)</option>
					<option value="desc_name">(Z-A)</option>
					<option value="asc_rating">Rating Acendente</option>
					<option value="desc_rating">Rating Descendente</option>
				</select>
			</div>
			<div>
				<label htmlFor="creator-filter">Creador :</label>
				<select id="creator-filter" onChange={(e) => handleCreator(e)}>
					<option value="All">Todos</option>
					<option value="Api">Api Videogames</option>
					<option value="Created">User videogames</option>
				</select>
			</div>
			
			
		</div>

  );
}

export default Filter;