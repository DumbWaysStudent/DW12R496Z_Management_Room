const models = require('../models')
const Room = models.rooms

exports.index = async (req, res) => {
    try{
        await Room.findAll({
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
        await Room.findAll({
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
        await Room.create(req.body).then(result=> {
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
        await Room.update(
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
        await Room.destroy({where: {id: req.params.id}}).then(result=> {
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
