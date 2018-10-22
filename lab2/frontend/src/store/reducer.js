const initalState = {
    user:[],
    authFlag : false,
    searchDetails: [],
    searchResults :[],
    searched:false
}

const reducer = (state = initalState,action) => {
    console.log("in action type" , action.type)
    console.log("in action status code" , action.statusCode)
    //console.log("in action.payload" , JSON.stringify(data).data)
    if(action.type === "USER_INFO" && action.statusCode == 200){
        return {
            ...state,
            user : state.user.concat(action.payload),
            authFlag: action.payload.authFlag
        }
    }

    if(action.type === "SEARCH_RESULTS" && action.statusCode == 200){
        console.log("hello..")
        console.log("SEARCH_RESULTS action.payload" ,action.payload)
        return {
            ...state,
            searchResults : state.searchResults.concat(action.payload),
            searched :true
        }
    }

    //Object.assign({},state, action.payload)
    if(action.type==="PASS_SEARCH_DETAILS")
    {
        return {
            ...state,
            searchDetails : state.searchDetails.concat(action.payload),
        }
    }


    if(action.type === "CREATE_BOOK" && action.statusCode == 200){
        return {
            ...state,
            books : state.books.concat(action.payload.data),
            bookCreated:true
        }
    }
    if(action.type === "CREATE_BOOK" && action.statusCode == 400){
        return {
            ...state,
            bookCreated:false
        }
    }
    if(action.type === "DELETE_BOOK" && action.statusCode == 200){
        console.log("Data recieved : ", action.payload.data.books);
        var b = new Array(action.payload.data.books.length);
        for (var i = 0; i < action.payload.data.books.length; i++) {
            b[i] = action.payload.data.books[i];
        }
        return {
            ...state,
            ...state.books,
            books : b,
            deletedFlag:true
        }
    }
    if(action.type === "DELETE_BOOK" && action.statusCode == 400){
        return {
            ...state,
            deletedFlag:false
        }
    }
    if(action.type === "LOGOUT"){
        return {
            ...state,
            authFlag : false,
            bookCreated : false,
            books : []
        }
    }
    if(action.type === "HOME"){
        return {
            ...state,
            bookCreated : false,
            deletedFlag : false
        }
    }
    return state;
}

export default reducer;