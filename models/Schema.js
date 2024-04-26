const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const dressSchema = new Schema({
    id: {
        type: String,
        required: true,
        unique: true,
    },
    name: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    color: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    image1: {
        data: Buffer,
        type: String,
        required: true

    },
    image2: {
        data: Buffer,
        type: String,
        required: true

    },
    image3: {
        data: Buffer,
        type: String,
        required: true

    },
    material: {
        type: String,
        required: true
    },
    size: {
        type: Array,
        required: true
    },
    quantity: {
        type: Array,
        required: true
    },
    offer: {
        type: Number,
        required: false
    },
    status: {
        type: Boolean,
        required: true,
        default: true
    },
}, { timestamps: true })

const Dress = mongoose.model('Dress', dressSchema);
module.exports = Dress;