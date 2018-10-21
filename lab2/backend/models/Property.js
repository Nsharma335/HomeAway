var mongoose =require('mongoose');

var Property= mongoose.model('',{
    address :{
        type : String
    },
    headline :{
        type : String
    },
    description: {
        type : String
    },
    bedroom: {
        type : String
            },
    bathroom :{
                type : String
            },
    accomodates :{
                type : String
            },
    amenities: {
                type : String
            },
    availableFrom: {
        type : String
    },
    avialableTo :{
        type : String
    },
    propertyType :{
        type : String
    },
    bookingType: {
        type : String
    },
    currency: {
        type : String
            },

    baseRate :{
         type : String
            },
    owner: {
             type : String
            },
    iamges: {
                type : String
                    }
},"Property")

module.exports = {Property};