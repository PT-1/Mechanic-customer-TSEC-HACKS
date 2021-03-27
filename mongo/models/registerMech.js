const mongoose = require('mongoose');

const registeration = new mongoose.model('registerMech',{
    fullname : {
        type:String,
        required : true,
    },
    username :{
        type: String,
        unique : true,
        required : true,
        dropDups: true
    },
    mobileNo : {
        type: String,
        required : true,
    },
    address : {
        type: String,
        required : true,
    },
    category :{
        type: String,
        required : true,
    },
    password: {
        type :String,
        require:true,
    }
})

module.exports = registeration;