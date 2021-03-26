const mongoose = require('mongoose')

var l = mongoose.connect('mongodb://127.0.0.1:27017/road_mate',{
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify:false,
    useUnifiedTopology:true
})

console.log(l);
