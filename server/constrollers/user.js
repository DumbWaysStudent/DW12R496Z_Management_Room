const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');

const models = require('../models')
const User = models.users


exports.login = async (req, res)=>{    

    const email = req.body.email
    const password = req.body.password 

    try{
        await User.findOne({where: {email}}).then(user=>{
            if(user){
                bcrypt.compare(password, user.password, function(err, result) {
                    if(result){
                        const token = jwt.sign({ userId: user.id }, 'RahasiaIlahi');
                        res.send({
                            message:"Success!",
                            data:{
                                id: user.id.toString(),
                                username: user.username,
                                token,
                            }
                        }) 
                    }else{
                        res.send({
                            error: true,
                            message: "Wrong Password!"
                        })                    
                    }
                });            
            }else{
                res.send({
                    error: true,
                    message: "Wrong Email!"
                })
            }
        }) 
    }catch(err){
        res.send({
            message: "error",
            err
        })
    }
       

}

exports.register = async (req, res,next)=>{
    const email = req.body.email
    const password = req.body.password
    const username = req.body.username


        bcrypt.hash(password, 10, async function(err, hash) {
            await User.create({
                username,
                email,
                password: hash,
            }).then(result=> {
                const token = jwt.sign({ userId: result.dataValues.id }, 'RahasiaIlahi');
                res.send({
                    message: "success",
                    data: {
                        id: result.dataValues.id.toString(),
                        username: result.dataValues.username,
                        email: result.dataValues.email,
                        token: token
                    }
                })
            }).catch(err=>{
                res.send({
                    err
                })
            })         
    
        });   
}