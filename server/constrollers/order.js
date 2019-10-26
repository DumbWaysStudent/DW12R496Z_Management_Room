const models = require('../models')
const Order = models.orders
const Customer = models.customers
const Room = models.rooms
const Op = require('sequelize').Op;

exports.index = async (req, res) => {
    // try{
    //     await Room.findAll({
    //     include: [{model: Order,  required: false,}, ],
    //     where: {[Op.and]: [{is_done: {[Op.eq]: false}}]},
    //     });
    //     // await Order.findAll({
    //     //     include:[{
    //     //         as: 'customerData',
    //     //         model: Customer,
    //     //         include: [{
    //     //             as:'roomData',
    //     //             model: Room
    //     //         }]
    //     //     }],
    //     //     order: [
    //     //         ['createdAt', 'DESC']
    //     //     ],
    //     // }).then(result=>res.send(result))
    // }catch(err){
    //     res.send({
    //         message: "error",
    //         err
    //     })
    // }
    res.send({
        message:"soon!"
    })
}

exports.show = async (req, res) => {
    try{
        await Order.findAll({
            where:{id: req.params.id},
            include: [{
                model: Customer,
                as: "customerData",
                include: [{
                    model: Room,
                    as: "roomData"
                }]
            }],
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
        await Order.create(req.body).then(result=> {
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
        await Order.update(
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
        await Order.destroy({where: {id: req.params.id}}).then(result=> {
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
