const logger = require('../../services/logger.service')
const userService = require('../user/user.service')
const authService = require('../auth/auth.service')
// const socketService = require('../../services/socket.service')
const stayService = require('../stay/stay.service')
const orderService = require('./order.service')
const { restart } = require('nodemon')

async function getOrders(req, res) {
    try {
        const orders = await orderService.query(req.query)
        res.send(orders)
    } catch (err) {
        logger.error('Cannot get orders', err)
        res.status(500).send({ err: 'Failed to get orders' })
    }
}

async function addOrder(req, res) {
    //ASK ABOUT LOGGED IN USER BEING ON REQ OR FROM AUTHSERVICE
    var { loggedinUser } = req
    try {
        var order = req.body
        order.buyerId = loggedinUser._id
        order = await orderService.add(order)
        
        order.buyer= await userService.getById(order.buyerId)
        order.stay = await stayService.getById(order.stayId)
        const loginToken = authService.getLoginToken(loggedinUser)
        res.cookie('loginToken', loginToken)
        delete order.buyerId
        delete order.stayId

        // socketService.broadcast({ type: 'order-added', data: order, userId: loggedinUser._id })
        // socketService.emitToUser({ type: 'order-for-you', data: order, userId: order.hostId })

        const fullUser = await userService.getById(loggedinUser._id)

        // socketService.emitTo({type: 'user-updated', data: fullUser, label: fullUser._id})
        res.json(order)
    } catch (err) {
        logger.error('Failed to add order', err)
        res.status(500).send({ err: 'Failed to add order' })
    }
}

async function updateOrder(req, res) {
    try {
        const order = req.body
        console.log(order)
        const updatedOrder = await orderService.update(order)
        console.log(updatedOrder, 'updatedOrder')
        res.json(updatedOrder)
    } catch (err) {
        logger.error('Failed to update order', err)
        res.status(500).send({ err: 'Failed to update order' })
    }
}

async function deleteOrder(req, res) {
    try {
        const orderId = req.params.id
        const deletedCount = await orderService.remove(orderId)
        if (deletedCount === 1) {
            res.send({ msg: 'Deleted successfully' })
        } else {
            res.status(400).send({ err: 'Cannot remove order' })
        }
    } catch (err) {
        logger.error('Failed to delete order', err)
        res.status(500).send({ err: 'Failed to delete order' })
    }
}

async function addOrderMsg(req, res) {
    const { loggedinUser } = req
    try {
        const orderId = req.params.id
        const msg = {
            txt: req.body.txt,
            by: loggedinUser
          }
          const savedMsg = await orderService.addOrderMsg(orderId, msg)
          res.json(savedMsg)

        // socketService.broadcast({ type: 'order-added', data: order, userId: loggedinUser._id })
        // socketService.emitToUser({ type: 'order-for-you', data: order, userId: order.hostId })
        res.json(savedMsg)
    } catch (err) {
        logger.error('Failed to update order', err)
        res.status(500).send({ err: 'Failed to update order' })
    }
}

async function removeOrderMsg(req, res) {
    try {
        const orderId = req.params.id
        const {msgId} = req.params


        const removedMsgId = await orderService.removeOrderMsg(orderId, msgId)
        console.log(removedMsgId, 'removedMsgId')
        res.send(removedMsgId)
    } catch (err) {
        logger.error('Failed to remove order msg', err)
        res.status(500).send({ err: 'Failed to remove order msg' })
    }
}






module.exports = {
    getOrders,
    addOrder,
    updateOrder,
    deleteOrder,
    addOrderMsg,
    removeOrderMsg

}