import React, {  useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { searchVideogames } from "../../actions/index";
import "./Search.css";
import Card from "../../components/Card/Card";

export default function Search() {
	const dispatch = useDispatch();

	const [search, setSearch] = useState("")
	const [modalOpen, setModalOpen] = useState(false);
	const dataVG = useSelector((state) => state.searchVideogameByName)

	const onChangeSearch = (e) => {
		if (e.target.value !== "") {
			setSearch(e.target.value)
		}
	}

	function buscar(e) {
		e.preventDefault();
		dispatch(searchVideogames(search));
		setModalOpen(true)
	}


	

	const Modal = ({ isOpen, onClose, children }) => {
		if (!isOpen) return null;
		return (
			<div className="modal">
				<div className="modal-content">
					<span className="close" onClick={onClose}>
						❌
					</span>
					<h3>Resultados de busqueda</h3>

					{children}
				</div>
			</div>
		);
	};



	return (
		<div className="search-container">
			<div className="input-search f1">
				<input type="text"
					placeholder="Buscar por Nombre"
					onChange={onChangeSearch}
				/>
				<button
					className=""
					onClick={buscar}>
					🔎
				</button>
				{/*<button className="" onClick={() => setModalOpen(true)}>Ver resultados</button>*/}
				<Modal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
					{dataVG.length !== 0
						? dataVG.map(game => <Card data={game} key={game.id} className="card-search" ></Card>)
						: <div>Buscando...</div>}
				</Modal>


			</div>
			

		</div>
	)
};