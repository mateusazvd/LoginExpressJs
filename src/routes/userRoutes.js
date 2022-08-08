const router = require('express').Router()
const User = require('../models/userModel')

router.post('/',async(req,res)=>{
    const {nome,email,password,logado} = req.body
    if(!nome || !email || !password){
        return res.status(422).json({erro:"Todos os campo são obrigatórios"})
    }

    const usuario = {
        nome,
        email,
        password,
        logado,
    }
    if(await User.findOne({email})){
        res.json({mensagem:"Este Email já foi cadastrado"})
    }
    try{
        const createdUser = await User.create(usuario)
        res.status(200).json({mensagem:'usuário Criado com sucesso',createdUser})
    }catch(e){
        res.status(500).json({erro:e})
    }
})

//pegar todos os usuários
router.get('/',async (req,res)=>{
    try{
        const allUsers = await User.find()
        res.status(200).json(allUsers)
    }catch(e){
        res.status(500).json({erro:e})
    }
})


//Fazer login 

router.patch('/login',async (req,res)=>{
   const {email,password} = req.body
   const user = await User.findOne({email:email})
   if(user.password == password){
    user.logado = true
    await user.save()
    res.json({mensagem:"usuário logado com sucesso",user})
   }else{
    res.json({menssagem:'Email ou senha incorretos'})

   }

})


// fazer logout
router.patch('/logout/:id', async(req,res)=>{
    const id = req.params.id
    let usuario = await User.findOne({_id:id})
    if(!usuario){
        res.json({mensagem:'usuário nao encontrado'})
    }
    else{
        if(usuario.logado===true){
            usuario.logado = false
            await usuario.save()
            res.json({mensagem: 'Usuário saiu'})
        }
        else{
            res.json({mensagem: 'Usuário precisa estar logado para fazer logout'})
        }
    }
    
})
module.exports = router