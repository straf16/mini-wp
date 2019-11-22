const { Schema, model } = require('mongoose')
const { hashPassword } = require('../helpers/bcryptjs')

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required']
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      validate: {
        validator: function (value) {
          return new Promise(function (resolve, reject) {
            User.find({ email: value }, function (err, users) {
              if (users.length > 0) {
                resolve(false)
              } else {
                resolve(true)
              }
            });
          });
        },
        message: props => `Email already exist`
      },
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        'Invalid email format'
      ]
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: [8, 'password minimum contain 8 characthers']
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
)

userSchema.pre('save', function(next) {
  this.password = hashPassword(this.password)
  next()
})

const User = model('User', userSchema)

module.exports = User
