const { OAuth2Client } = require('google-auth-library')
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID)

module.exports = {
  googleVerify: function(req, res, next) {
    client
      .verifyIdToken({
        idToken: req.body.id_token,
        audience: process.env.GOOGLE_CLIENT_ID
      })
      .then(tiket => {
        const payload = tiket.getPayload()
        req.decoded = payload
        next()
      })
      .catch(next)
  }
}
