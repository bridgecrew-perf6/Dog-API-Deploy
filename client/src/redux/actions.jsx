export function getAllTemperaments() {
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

export function setFilters(filters) {
  return { type: "SET_FILTERS", payload: filters};
}


export function sort(order){
  return{type: "SORT",payload: order}
}

export function newTemperamentControl(temperament) {
  return { type: "NEW_TEMPERAMENT_CONTROL", payload: temperament};
}

export function setNewTemperament(temperament) {
  return { type: "SET_NEW_TEMPERAMENT", payload: temperament};
}

export function setDogTemperament(temperament) {
  return { type: "SET_DOG_TEMPERAMENT", payload: temperament};
}

export function getDogByID(id) {
  return async function(dispatch) {
  try{
      let res = await fetch(`http://localhost:3001/dogs/${id}`)
      .then(response => response.json())
      return dispatch({ type: "GET_DOG_BY_ID", payload: res });
  }catch(e){
      console.error(e)
  }
  };
}