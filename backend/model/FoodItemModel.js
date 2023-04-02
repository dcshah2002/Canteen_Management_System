const mongoose = require('mongoose')

const FoodItemSchema = mongoose.Schema({
    itemId: {
        type: Number,
        min: 0000,
        max: 1000
    },
    itemName: {
        type: String,
        required: [true, 'Please add a text value']
    },
    itemCategory: {
        type: String,
        enum: {
            values: ['General','Chinese','Indian','Italian','Continental']
        }
    },
    quantity: {
        type: Number,
        min: 1,
        max: 10
    },
    unitPrice: {
        type: Number,
        min: 10,
        max: 2000
    }
})

module.exports = mongoose.model('FoodItem', FoodItemSchema)
