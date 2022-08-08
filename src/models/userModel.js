const mongoose = require('mongoose')

const userSchema = mongoose.model('users',{
    nome:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true
    },
    password:{
        type:String,
        selected: false
    },
    logado:{
        type:Boolean
    }
})

module.exports = userSchema