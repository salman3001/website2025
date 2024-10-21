import { Schema } from "mongoose";
import { mongoConection } from "../mongo-connection.js";

const userSchema = new Schema({
  fullName: String,
});

export const User = mongoConection.model("User", userSchema);
