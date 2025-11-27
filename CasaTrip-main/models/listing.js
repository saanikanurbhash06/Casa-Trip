const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review = require("./review.js");

const listingSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        default: "No description provided",
    },
    image: {
        type: String,
        default: "https://images.pexels.com/photos/159711/books-book-pages-read-literature-159711.jpeg", // Direct image link
        set: (v) => {
            // Check if 'v' is an object, and extract the URL if so
            if (v && typeof v === 'object' && v.url) {
                return v.url;  // Use the 'url' property of the object
            }
            // If 'v' is an empty string or undefined, use the default image
            return v === "" || v === undefined ? "https://images.pexels.com/photos/159711/books-book-pages-read-literature-159711.jpeg" : v;
        },
    },
    price: Number,
    location: String,
    country: String,
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: "Review",
        },
    ],
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    geometry: {
        type: {
            type: String, // Don't do `{ location: { type: String } }`
            enum: ['Point'], // 'location.type' must be 'Point'
            required: true
        },
        coordinates: {
            type: [Number],
            required: true
        }
    }
});

listingSchema.post("findOneAndDelete", async (listing) => {
    if (listing) {
        await Review.deleteMany({ _id: { $in: listing.reviews } });
    }
});

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;
