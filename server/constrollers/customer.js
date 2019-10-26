const models = require('../models')
const Customer = models.customers

exports.index = async (req, res) => {
    try{
        await Customer.findAll({
            order: [
                ['createdAt', 'DESC']
            ],
        }).then(result=>res.send(result))
    }catch(err){
        res.send({
            message: "error",
            err
        })
    }
}

exports.show = async (req, res) => {
    try{
        await Customer.findAll({
            where:{id: req.params.id},
            order: [
                ['createdAt', 'DESC']
            ]
        }
        ).then(result=> res.send(result))
    }catch(err){
        res.send({
            err
        })
    }
}


exports.store = async (req, res) => {
    try{
        await Customer.create(req.body).then(result=> {
            res.send({
                message: "success",
                result
            })
        })    
    }catch(err){
        res.send({
            message: "error",
            err,
            req:req.body
        })
    }
}

exports.update = async (req, res) => {
    try{
        await Customer.update(
            req.body,
            {where: {id: req.params.id}}
        ).then(result=> {
            res.send({
                message: "success",
                req:req.body
            })
        })
    }catch(err){
        err
    }
}

exports.delete = async (req, res) => {
    try{
        await Customer.destroy({where: {id: req.params.id}}).then(result=> {
            res.send({
                message: "success",
                result
            })
        })
    }catch(err){
        res.send({
            err
        })
    }
}
