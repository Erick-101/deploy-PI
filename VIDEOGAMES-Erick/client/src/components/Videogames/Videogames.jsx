import React, {  useEffect } from "react";
import Card from "../../components/Card/Card";
import "./Videogames.css"

export default function Videogames ({videogames}) {

	

  return (
    <div className="showing">
      {videogames.length > 0 ?
      videogames.map((data) => (<Card key={data.id} data={data} />))
      :<div className="t-w">BUSCANDO ...</div>
			
      }
    </div>
  );
};

