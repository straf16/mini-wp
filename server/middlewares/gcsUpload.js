const gcsUpload = require('gcs-upload')
const upload = gcsUpload({
  limits: {
    fileSize: 1e6 // in bytes
  },
  gcsConfig: {
    keyFilename: './keyfile.json',
    bucketName: process.env.CLOUD_BUCKET
  }
})

module.exports = {
  upload
}
