const asyncLocalStorage = require('../../services/als.service')
const dbService = require('../../services/db.service')
const logger = require('../../services/logger.service')
const utilService = require('../../services/util.service')
const ObjectId = require('mongodb').ObjectId

async function query(filterBy) {
    try {
        const criteria = _buildCriteria(filterBy)
        //ADD MORE FILTERS HERE
        console.log('criteria', criteria)
        const collection = await dbService.getCollection('stay')
        var stays = await collection.find(criteria).toArray()
        return stays
    } catch (err) {
        logger.error('cannot find stays', err)
        throw err
    }
}

async function getById(stayId) {
    try {
        const collection = await dbService.getCollection('stay')
        const stay = collection.findOne({ _id: ObjectId(stayId) })
        return stay
    } catch (err) {
        logger.error(`while finding stay ${stayId}`, err)
        throw err
    }
}

async function remove(stayId) {
    try {
        const collection = await dbService.getCollection('stay')
        await collection.deleteOne({ _id: ObjectId(stayId) })
        return stayId
    } catch (err) {
        logger.error(`cannot remove stay ${stayId}`, err)
        throw err
    }
}

async function add(stay) {
    try {
        const collection = await dbService.getCollection('stay')
        await collection.insertOne(stay)
        return stay
    } catch (err) {
        logger.error('cannot insert stay', err)
        throw err
    }
}

async function update(stay) {
    try {
        const stayToSave = {
            ...stay,
        }

        console.log(stayToSave)
        const collection = await dbService.getCollection('stay')
        await collection.updateOne({ _id: ObjectId(stay._id) }, { $set: stayToSave })
        return stay
    } catch (err) {
        logger.error(`cannot update stay ${stay._id}`, err)
        throw err
    }
}

async function addStayReview(stayId, review) {
    try {
        review.id = utilService.makeId()
        const collection = await dbService.getCollection('stay')
        await collection.updateOne({ _id: ObjectId(stayId) }, { $push: { reviews: review } })
        return review
    } catch (err) {
        logger.error(`cannot add stay review ${stayId}`, err)
        throw err
    }
}

async function removeStayReview(stayId, reviewId) {
    try {
        const collection = await dbService.getCollection('stay')
        await collection.updateOne({ _id: ObjectId(stayId) }, { $pull: { reviews: { id: reviewId } } })
        return reviewId
    } catch (err) {
        logger.error(`cannot remove stay review ${stayId}`, err)
        throw err
    }
}

async function addStayLike(stayId) {
    const store = asyncLocalStorage.getStore()
    const { loggedinUser } = store
    try {
        const collection = await dbService.getCollection('stay')
        await collection.updateOne({ _id: ObjectId(stayId) }, { $push: { likedByUsers: {_id: ObjectId(loggedinUser._id), fullname: loggedinUser.fullname, imgUrl: loggedinUser.imgUrl}  } })
        return loggedinUser
    } catch (err) {
        logger.error(`cannot add like ${stayId}`, err)
        throw err
    }
}

async function removeStayLike(stayId) {
    const store = asyncLocalStorage.getStore()
    const { loggedinUser } = store
    try {
        const collection = await dbService.getCollection('stay')
        await collection.updateOne({ _id: ObjectId(stayId) }, { $pull: { likedByUsers: {_id: ObjectId(loggedinUser._id)} } })
        return loggedinUser
    } catch (err) {
        logger.error(`cannot remove like ${stayId}`, err)
        throw err
    }
}

function _buildCriteria(filterBy) {
    const criteria = {}
    if (filterBy.location) {
        console.log('filterBy.location', filterBy.location)
       criteria.name= { $regex: filterBy.location, $options: 'i' }
    }
    if (filterBy.likedByUserId){
        console.log('filterBy.likedByUserId', filterBy.likedByUserId)
        criteria.likedByUsers = { $elemMatch: {_id:  ObjectId(filterBy.likedByUserId)}}
    }
    return criteria
}


module.exports = {
    query,
    getById,
    remove,
    add,
    update,
    addStayReview,
    removeStayReview,
    addStayLike,
    removeStayLike
}
