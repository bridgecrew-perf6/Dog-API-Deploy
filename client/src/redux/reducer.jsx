const initialState = {
  dogs: [],
  temperaments: [],
};

export default function rootReducer(state = initialState, action) {
  switch (action.type) {
    case 'GET_ALL_DOGS':
      return {
        ...state,
        dogs: action.payload,
      };
    case 'GET_ALL_TEMPERAMENTS':
      return {
        ...state,
        temperaments: action.payload,
    };
    case 'GET_A_DOG':
      return {
        ...state,
        dogs: action.payload,
    };
    // case 'GET_ALL_COMMENTS_POST':
    //   return{
    //     ...state,
    //     commentsPost: action.payload,
    // };
    // case 'GET_ALL_USERS_POST':
    //   return{
    //     ...state,
    //     userPosts: action.payload,
    // };

    default:
      return state;
  }
}