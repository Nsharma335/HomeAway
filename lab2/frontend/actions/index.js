import axios from "axios";

export const USER_INFO = "user_info";
userReducer
//target action
export function fetchUserInfo() {
  //middleware call
  //receive response from backend
  //Action dispatched
  console.log("Response",response);
  return {
    type: USER_INFO,
    payload: response
  };
}



