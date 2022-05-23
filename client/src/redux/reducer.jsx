const initialState = {
  dogs: [],
  temperaments: [],
  dogsFiltres: [],
  ordersDogs: [],
  temperamentsForNewDog: [],
  temperamentsNews: [],
  newTempControl: []
};

export default function rootReducer(state = initialState, action) {
  switch (action.type) {
    case 'GET_ALL_DOGS':
      return {
        ...state,
        ordersDogs: action.payload,
        dogs: action.payload
      };
    case 'GET_ALL_TEMPERAMENTS':
      return {
        ...state,
        temperaments: [...new Set(action.payload)]
    };
    case 'GET_A_DOG':
      return {
        ...state,
        ordersDogs: action.payload,
    };
    case 'SET_FILTERS':
      return {
        ...state,
        dogsFiltres: [...action.payload],
    };
    case 'SORT':
      let newDogsSort = [...state.dogs]
      if(action.payload === "ascendente" || action.payload === "descendente"){
        newDogsSort = newDogsSort.sort((a, b)=>{
          if(a.name < b.name) {
            return action.payload === "ascendente" ? -1 : 1
          }
          if(a.name > b.name) {
            return action.payload === "ascendente" ? 1 : -1
          }
          return 0
        })
      }
      if(action.payload === "weigthAsc" ){
        newDogsSort = newDogsSort.sort((a, b) =>
            a.weight.metric.replace(/ /g, "").split("-")[1] - b.weight.metric.replace(/ /g, "").split("-")[1]
        );
      }
      if (action.payload === "weigthDesc") {
        newDogsSort = newDogsSort.sort((a, b) =>
            b.weight.metric.replace(/ /g, "").split("-")[1] - a.weight.metric.replace(/ /g, "").split("-")[1]
        );
      }
      return {
        ...state,
        ordersDogs: newDogsSort
    };
    case 'SET_NEW_TEMPERAMENT':
      return {
        ...state,
        temperamentsForNewDog: [],
        temperamentsNews: [...state.temperamentsNews , action.payload.name],
        temperaments: [...new Set(state.temperaments), action.payload]
    }; 
    case 'SET_DOG_TEMPERAMENT':
      return {
        ...state,
        temperamentsForNewDog: action.payload,
    }; 
    case 'NEW_TEMPERAMENT_CONTROL':
      return {
        ...state,
        newTempControl: action.payload,
    };

    default:
      return state;
  }
}