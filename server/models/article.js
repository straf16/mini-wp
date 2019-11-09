const { Schema, model } = require('mongoose')

const articleSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, 'Title is required']
    },
    content: {
      type: String,
      required: [true, 'Desc is required']
    },
    tags: [
      {
        type: String
      }
    ],
    featured_image: {
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
