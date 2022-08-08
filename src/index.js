const express = require('express')
const mongoose = require('mongoose') 
const userRoute = require('./routes/userRoutes')

const app = express()
app.use(express.urlencoded({
    extended:true
}))

app.use(express.json())

app.use('/user',userRoute)

//configurando bando de dados
const DB_USER = 'mateusazevedo'
const DB_PASSWORD = encodeURIComponent('2001spfc')

mongoose.connect(`mongodb+srv://${DB_USER}:${DB_PASSWORD}@apicluster.cekslgi.mongodb.net/apiLogin?retryWrites=true&w=majority`)
.then(()=>{
    app.listen(3333,()=>{
        console.log('servidor criado com sucesso');
    })
}).catch((e)=>{
    console.log(e);
})


    

