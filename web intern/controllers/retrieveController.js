const Image = require('../models/imageModel');

const retrieveFile = async (req, res) => {
    try {
        const { key } = req.params;
        const image = await Image.findOne({ key });

        if (!image) {
            return res.status(404).json({ message: 'File not found' });
        }

        res.json({ url: image.url });
    } catch (err) {
        res.status(500).json({ error: 'Error retrieving file' });
    }
};

module.exports = { retrieveFile };