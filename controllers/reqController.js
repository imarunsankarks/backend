const schema = require('../models/Schema')
const mongoose = require('mongoose')
const fs = require('fs');
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// base64
function base64_encode(file) {
    return "data:image/gif;base64," + fs.readFileSync(file, 'base64');
}
// get all data

const getAll = async (req, res) => {
    const result = await schema.find({}).sort({ createdAt: -1 })
    res.status(200).json(result);
}


// get a single data

const getOne = async (req, res) => {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).json({ error: 'No item found' })
    const result = await schema.findById(id);
    if (!result) {
        return res.status(404).json({ error: 'No item found' })
    }
    res.status(200).json(result)
}


// add a new data
const createNew = async (req, res) => {
    try {
        // Configure multer middleware for file uploads
        const upload = multer({ storage: storage }).fields([{ name: 'image1' }, { name: 'image2' }, { name: 'image3' }]);

        // Execute multer middleware to handle file uploads
        upload(req, res, async (err) => {
            if (err) {
                return res.status(400).json({ error: err.message });
            }

            // File upload successful, continue with processing the request
            const {
                id,
                name,
                category,
                color,
                price,
                material,
                size,
                quantity,
                offer,
                status
            } = req.body;

            const { image1, image2, image3 } = req.files;

            const image1Data = image1[0].buffer.toString('base64');
            const image2Data = image2[0].buffer.toString('base64');
            const image3Data = image3[0].buffer.toString('base64');

            const dressData = {
                id,
                name,
                category,
                color,
                price,
                image1: image1Data,
                image2: image2Data,
                image3: image3Data,
                material,
                size,
                quantity,
                offer,
                status
            };

            const newDress = await schema.create(dressData);

            res.status(200).json(newDress);
        });
    } catch (e) {
        res.status(400).json({ error: e.message });
    }
}



// delete a data

const deleteOne = async (req, res) => {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).json({ error: 'No item found' })
    const result = await schema.findOneAndDelete({ _id: id });
    if (!result) {
        return res.status(400).json({ error: 'No item found' })
    }
    res.status(200).json(result)
}


// update a data
const updateOne = async (req, res) => {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).json({ error: 'No item found' });

    try {
        let updateData = { ...req.body };

        // Check if image1, image2, or image3 is being updated and convert to base64
        if (req.body.image1) {
            updateData.image1 = base64_encode(req.body.image1);
        }
        if (req.body.image2) {
            updateData.image2 = base64_encode(req.body.image2);
        }
        if (req.body.image3) {
            updateData.image3 = base64_encode(req.body.image3);
        }

        const result = await schema.findOneAndUpdate({ _id: id }, updateData, { new: true });
        if (!result) {
            return res.status(400).json({ error: 'No item found' });
        }
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}



module.exports = {
    createNew,
    getAll,
    getOne,
    deleteOne,
    updateOne
}