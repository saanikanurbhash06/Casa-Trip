const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

const MONGO_URL = "mongodb://127.0.0.1:27017/CasaTrip";

main()
  .then(() => {
    console.log("connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(MONGO_URL);
}

const initDB = async () => {
  await Listing.deleteMany({});
  initData.data = initData.data.map((obj) => ({
    ...obj,
    owner: "6827501e0bef9d7f77aed038",
    geometry: {
      type: "Point",
      coordinates: [85.324, 27.7172],
    },
  }));
  await Listing.insertMany(initData.data);
  console.log("data was initialized");
  mongoose.connection.close();
};

initDB();
