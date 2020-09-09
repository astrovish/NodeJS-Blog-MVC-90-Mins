const mongoose = require("mongoose");
const { default: slugify } = require("slugify");

const blogSchema = new mongoose.Schema({
    title: {
        desc: "Title of a blog",
        trim: true,
        type: String,
        required: true,
    },
    body: {
        desc: "Description of a blog",
        trim: true,
        type: String,
        required:true,
    },
    userId: {
        desc: "User id who created a blog",
        type: Number,
        default: 45,
        required: true
    },
    slug: {
        desc: "SEO friendly url created from blog title",
        type: String,
        trim: true,
        required: true
    }
})

blogSchema.pre("validate", function(next) {
    if(this.title) {
        this.slug = slugify(this.title, {
            lower: true,
            strict: true
        })
    }
    next();
})

module.exports = mongoose.model("Blog", blogSchema);