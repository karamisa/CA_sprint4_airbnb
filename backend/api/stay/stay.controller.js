const stayService = require('./stay.service.js');
const userService = require('../user/user.service.js');


const logger = require('../../services/logger.service');

async function getStays(req, res) {
    try {
        logger.debug('Getting Stays')
        const filterBy = {
        txt: req.query.txt || '',
        category: req.query.category || '',
        }
        const stays = await stayService.query(filterBy)
        res.json(stays)
    } catch (err) {
        logger.error('Failed to get stays', err)
        res.status(500).send({ err: 'Failed to get stays' })
    }
    }

async function getStayById(req, res) {
    try {
        const stayId = req.params.id
        const stay = await stayService.getById(stayId)
        res.json(stay)
    } catch (err) {
        logger.error('Failed to get stay', err)
        res.status(500).send({ err: 'Failed to get stay' })
    }
}

async function addStay(req, res) {
    const {loggedinUser} = req

    try {
        const stay = req.body
        stay.host = loggedinUser
        const addedStay = await stayService.add(stay)

        // if (loggedinUser._id && !loggedinUser.isOwner) {
        //     loggedinUser.isOwner = true
        //     await userService.update(loggedinUser)
        // }
        res.json(addedStay)
    } catch (err) {
        logger.error('Failed to add stay', err)
        res.status(500).send({ err: 'Failed to add stay' })
    }
}

async function updateStay(req, res) {
    try {
        const stay = req.body
        const updatedStay = await stayService.update(stay)
        res.json(updatedStay)
    } catch (err) {
        logger.error('Failed to update stay', err)
        res.status(500).send({ err: 'Failed to update stay' })

    }
}

async function removeStay(req, res) {
    try {
        const stayId = req.params.id
        const removedId = await stayService.remove(stayId)
        res.json(removedId)
    } catch (err) {
        logger.error('Failed to remove stay', err)
        res.status(500).send({ err: 'Failed to remove stay' })
    }
}

async function addStayReview(req, res) {
    const {loggedinUser} = req
    try {
        const stayId = req.body.id
        const review = {
            txt: req.body.review.txt,
            rate: req.body.review.rate,
            by: loggedinUser
        }
       const addedReview = await stayService.addStayReview(stayId, review)
        res.json(addedReview)
    } catch (err) {
        logger.error('Failed to add stay review', err)
        res.status(500).send({ err: 'Failed to add stay review' })
    }
}

async function removeStayReview(req, res) {

    //1.ASK ABOUT WHEN TO PUT ID IN PARAMS OR BODY
    //2. ASK ABOUT LOGGEDinUser on request
    try {
        const stayId = req.body.id
        const {reviewId} = req.params
        const removedReviewId = await stayService.removeStayReview(stayId, reviewId)
        res.send(removedReviewId)
    } catch (err) {
        logger.error('Failed to remove stay review', err)
        res.status(500).send({ err: 'Failed to remove stay review' })
    }
}


module.exports = {
    getStays,
    getStayById,
    addStay,
    updateStay,
    removeStay,
    addStayReview,
    removeStayReview,
}