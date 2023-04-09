import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css"

function NavBar() {

	return (
		<div className="navBar">
			<div className="logo">
				<Link to="/">
					<p>Videogames  🎮</p>
				</Link>
			</div>
			<div className="menu">
				<ul>
					<li>
						<Link to="/home">HOME</Link>
					</li>
					<li>
						<Link to="/create">REGISTRAR</Link>
					</li>
					<li>
						<Link to="/about">INFO</Link>
					</li>
				</ul>
			</div>
		</div>

	);
}




export default NavBar;