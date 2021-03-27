const mongoose = require('mongoose');

const registeration = new mongoose.model('resgister',{
    fullname : {
        type:String,
        required : true,
    },
    username :{
        type: String,
        required : true,
    },
    mobile_num : {
        type: String,
        required : true,
    },
    address : {
        type: String,
        required : true,
    },
    category :{
        
    },
    password: {
        type :String,
        require:true,
    }
})

module.exports = registeration;