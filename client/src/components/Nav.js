import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Nav() {
  const [dog, setDog] = useState("");
  const [dogs, setDogs] = useState([]);

  useEffect(() => {

  }, []);

  async function bringDogs(params) {
    return await fetch("http://localhost:3001/dogs")
      .then((data) => data.json())
      .catch((e) => console.log(e));
  }

  return (
    <div>
      <nav className="nav">
        <Link to="/dogs">
          <span>DogsAPI</span>
        </Link>
        <div id="search">
          <form>
            <input
              id="input"
              type="text"
              placeholder="dog..."
              value={dog}
              onChange={(event) =>
                setDog((prevDog) => (prevDog = event.target.value))
              }
            />
            <input
              type="submit"
              value="Search a DOG"
              id="button"
              onClick={(e) => {
                e.preventDefault();
                setDogs(bringDogs());
                console.log(dogs);
                //Agregar funcion de busqueda de perro
                setDog("");
              }}
            />
          </form>
        </div>
        <div>
          {/* {dogs.map((e) => {
            <div>PERROS</div>;
          })} */}
        </div>

        {/* <Link to='/filter'>DOG Filter</Link> */}
        <Link to="/creator">DOG Creator</Link>
        <Link to="/about">About</Link>
      </nav>
      <div>Aca van los perros</div>
    </div>
  );
}
export default Nav;
