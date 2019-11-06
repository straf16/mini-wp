const { Schema, model } = require('mongoose')

const articleSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, 'Title is required']
    },
    desc: {
      type: String,
      required: [true, 'Desc is required']
    },
    tags: [
      {
        type: String
      }
    ],
    imgUrl: {
      type: String
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    }
  },
  {
    timestamps: true
  }
)

const Article = model('Article', articleSchema)

module.exports = Article
