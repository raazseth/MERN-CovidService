import { combineReducers } from "redux";
import authReducer from "./authReducer";
import userReducer from "./userReducer";
import categoryReducer from "./categoryReducer";
import donorReducer from "./donorReducer";

const rootReducer = combineReducers({
  user: userReducer,
  auth: authReducer,
  category: categoryReducer,
  donor: donorReducer,
});
export default rootReducer;
