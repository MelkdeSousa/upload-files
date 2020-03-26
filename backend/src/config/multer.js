const multer = require('multer')
const path = require('path')
const crypto = require('crypto')

module.exports = {
    dest: path.resolve(__dirname, '..', '..', 'tmp', 'uploads'),
    storage: multer.diskStorage({
        destination: (req, file, callback) => {
            callback(null, path.resolve(__dirname, '..', '..', 'tmp', 'uploads'))
        },
        filename: (req, file, callback) => {
            crypto.randomBytes(16, (err, hash) => {
                if (err) callback(err)
                const filename = `${hash.toString('hex')}-${file.originalname}`
                callback(null, filename)
            })
        }
    }),
    limits: {
        fileSize: 100 * 1024 * 1024,
    },
    fileFilter: (req, file, callback) => {
        const allowedMimes = [
            'image/jpeg',
            'image/png',
            'image/gif'
        ]

        if (allowedMimes.includes(file.mimetypes)) {
            callback(null, true)
        } else {
            callback(new Error('Invalid file type.'))
        }
    }
}
