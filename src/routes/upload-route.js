const express = require('express');
const router = express.Router();
const upload = require('../utils/imageUpload');
const cloudinary = require('../utils/cloudinary');

router.post('/', upload.single('image'), async (req, res) => {
  try {
    const buffer = req.file.buffer.toString('base64');
    const base64Image = `data:${req.file.mimetype};base64,${buffer}`;

    const result = await cloudinary.uploader.upload(base64Image, {
      folder: 'uploads',
      transformation: [
        { width: 800, height: 800, crop: 'limit' }, // resize
        { quality: "auto" },                        // auto quality
        { fetch_format: "auto" }                    // auto format (webp, etc)
      ]
    });

    res.json({ url: result.secure_url, public_id: result.public_id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
