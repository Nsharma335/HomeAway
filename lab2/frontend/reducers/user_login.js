
import { USER_INFO } from "../actions";
const initalState = {
	signInEmail: '',
	signInPassword : '',
	AuthFlag : false,
}

export const userReducer = (state=initalState,action={}) =>{
	switch(action.type)
	{
		case USER_INFO:	 
			state={
 				...state,
				signInEmail : action.payload.signInEmail,
				AuthFlag :  true
			};
			break;
	}
			return state;
}


