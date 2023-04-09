import React from "react";
import "./Pagination.css";

export const Pagination = ({ videogamesPerPage, totalVideogames, paginate }) => {
	const totalPages = Math.ceil(totalVideogames / videogamesPerPage);

	return (
		<nav className="pagination">
			{Array.from({ length: totalPages }, (_, pageNumber) => (
				<div key={pageNumber} className="item">
					<button className="p-item" onClick={(e) => paginate(e, pageNumber + 1)}>
						{pageNumber + 1}
					</button>
				</div>
			))}
		</nav>
	);
};
