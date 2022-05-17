export function getAllTemperaments() {
  console.log()
  return async function(dispatch) {
    try{
      let res = await fetch(`http://localhost:3001/temperament`)
      .then(response => response.json())
      return dispatch({ type: "GET_ALL_TEMPERAMENTS", payload: res });
    }catch(e){
      console.error(e)
    }
  };
}

export function getAllDogs() {
  return async function(dispatch) {
    const response = await fetch(`http://localhost:3001/dogs`);
    const json = await response.json();
    return dispatch({ type: "GET_ALL_DOGS", payload: json });
  };
}

export function get_a_SingleDog(name) {
  console.log(name)
  return async function(dispatch) {
    try{
      let res = await fetch(`http://localhost:3001/dogs?name=${name}`)
      .then(response => response.json())
      return dispatch({ type: "GET_A_DOG", payload: res });
    }catch(e){
      console.error(e)
    }

  };
}

