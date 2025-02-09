import mongoose from "mongoose";

await mongoose.connect("mongodb://localhost:27017");
//mongodb://127.0.0.1:27017
let db = mongoose.connection
localhost:27017

export default db;