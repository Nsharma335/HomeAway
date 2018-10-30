const initalState = {
    user:[],
   authFlag : false,
    searchResults :[],
    searched:false,
    location : "",
    checkin: "",
    checkout: "",
    guests: "",
    registered: false,
    userProfileUpdated: false,
    propertyCreated: false,
    booked: false,
}

const reducer = (state = initalState,action) => {
    //console.log("in action.payload" , JSON.stringify(data).data)
    if(action.type === "USER_INFO" && action.statusCode == 200){
        return {
            ...state,
            user : state.user.concat(action.payload.user),
           authFlag: action.payload.authFlag
        }
    }

    if(action.type === "SEARCH_RESULTS" && action.statusCode == 200){
        state.searchResults=[];
        console.log("hello..")
        console.log("SEARCH_RESULTS action.payload" ,action.payload)
        return {
            ...state,
            searchResults : state.searchResults.concat(action.payload),
            searched :true
        }
    }


    if(action.type === "SEARCH_PARAMETER"){
        console.log("hello..")
        console.log("SEARCH_PARAMETER action.payload" ,action.searchData)
        return {
            ...state,
            location : action.searchData.location,
            checkin : action.searchData.checkin,
            checkout : action.searchData.checkout,
            guests : action.searchData.location,
        
        }
    }

    if(action.type === "REGISTER_USER" && action.statusCode == 200){
        return {
            ...state,
            registered:true
        }
    }

    if(action.type === "UPDATE_PROFILE" && action.statusCode == 200){
        return {
            ...state,
            userProfileUpdated:true
        }
    }

    if(action.type === "ADD_PROPERTY" && action.statusCode == 201){
        return {
            ...state,
            propertyCreated:true
        }
    }
    if(action.type === "BOOKING_INFO" && action.statusCode == 201){
        return {
            ...state,
            booked:true
        }
    }
    
   
    return state;
}

export default reducer;