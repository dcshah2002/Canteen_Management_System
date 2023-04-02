const asyncHandler = require('express-async-handler')
const FoodItem = require('../model/FoodItemModel')

// @desc   Get Item from DB
// @route  GET /api/db
// @access Private
const getItem = asyncHandler( async (req,res) => {
    const response = await FoodItem.find()

    res.status(200).json({message: 'Reading All', response: response})
})

// @desc   Set New Item in DB
// @route  POST /api/db
// @access Private
const setItem = asyncHandler( async (req,res) => {
    if (!req.body.itemId || !req.body.itemName || !req.body.itemCategory || !req.body.quantity || !req.body.unitPrice) {
        res.status(400)
        throw new Error('Please add data to missing text field')
    }

    const payload = await FoodItem.create({
        itemId       : parseInt(req.body.itemId),
        itemName     : req.body.itemName,
        itemCategory : req.body.itemCategory,
        quantity     : parseInt(req.body.quantity),
        unitPrice    : parseFloat(req.body.unitPrice)
    })

    res.status(200).json({message: 'Sending Payload', payload: payload})
})

// @desc   Update Existing Item in DB with :id
// @route  PUT /api/db/:id
// @access Private
const updateItem = asyncHandler( async (req,res) => {
    const response = await FoodItem.findById(req.params.id)

    const payload = {
        itemId       : parseInt(req.body.itemId),
        itemName     : req.body.itemName,
        itemCategory : req.body.itemCategory,
        quantity     : parseInt(req.body.quantity),
        unitPrice    : parseFloat(req.body.unitPrice)
    }

    if (!response) {
        res.status(400)
        throw new Error('Object Not Found')
    }

    const operate = await FoodItem.findByIdAndUpdate(
        req.params.id,
        payload,
        {new: true}
    )

    res.json({message: `Updating Item ${req.params.id}`, oldpayload: response, payload: payload})
})

// @desc   Delete Item from DB
// @route  DELETE /api/db/:id
// @access Private
const deleteItem = asyncHandler( async (req,res) => {
    const response = await FoodItem.findById(req.params.id)

    if (!response) {
        res.status(400)
        throw new Error('Object Not Found')
    }

    await FoodItem.deleteOne(response)

    res.json({ message: `Deleting Item ${req.params.id}`, oldpayload: response})
})

module.exports = {
    getItem,
    setItem,
    updateItem,
    deleteItem
}
