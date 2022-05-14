
export function getAllDogs() {
  return async function(dispatch){
      try {
    const response = await fetch('http://localhost:3001/dogs', {
      method: 'GET',
    });

    if (!response.ok) {
      throw new Error(`Error! status: ${response.status}`);
    }

    const result = await response.json();
    return dispatch({ type: "GET_ALL_DOGS", payload: result });
  } catch (err) {
    console.log(err);
  }
  }

}


export function getAllTEmperaments() {
  return async function(dispatch) {
    const response = await fetch('http://localhost:3001/temperament');
    const json = await response.json();
    return dispatch({ type: "GET_ALL_TEMPERAMENTS", payload: json });
  };
}

// export function getAllDogs() {
//   return async function(dispatch) {
//     const response = await fetch('http://localhost:3001/dogs');
//     const json = await response.json();
//     return dispatch({ type: "GET_ALL_DOGS", payload: json });
//   };
// }