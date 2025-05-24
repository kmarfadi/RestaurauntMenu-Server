const multer = require('multer');
const storage = multer.memoryStorage(); // no file saved to disk
const upload = multer({ storage });

module.exports = upload;
