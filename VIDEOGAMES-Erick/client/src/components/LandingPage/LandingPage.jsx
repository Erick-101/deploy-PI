import React from "react";
import { Link } from "react-router-dom";
import "./LandingPage.css"


export default function LandingPage() {

  return (
    <div class="background">
      <div class="flex-item title" >
        <h2>Videogame  🎮</h2>
        <Link to="/home" >
          <button type="submit" className="btn-landing">Go to Page ➡</button>
        </Link>
      </div>
			<div className="flex-item info">
				<h2>¡Bienvenidos a nuestra página de videojuegos!</h2>
				<p>Aquí encontrarás todo lo que necesitas saber sobre tus videojuegos favoritos y mucho más. Desde noticias y reseñas hasta trucos y consejos, nuestra página es el lugar ideal para los amantes de los videojuegos.</p>
				<p>¿Quieres conocer los últimos lanzamientos? ¿O tal vez estás buscando información sobre un juego en particular? ¡No te preocupes! En nuestra página encontrarás una amplia variedad de información sobre los juegos más populares del momento, así como clásicos atemporales.</p>

			</div>
	
    </div>
  );
}


