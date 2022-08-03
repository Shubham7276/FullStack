import { CREATE, FETCH } from "../action/actiontypes";

const initialState = []

function BannerReducer(banner = [], action) {
    // const { type, payload } = action;
    console.log(banner)
    switch (action.type) {
      case CREATE:
          console.log(action.payload.data)
        return [...banner, action.payload.data]; 

      case FETCH:
          console.log(action.payload.data)
          return[action.payload.data]

        default:
           return banner;
    }
  };
  export default BannerReducer;