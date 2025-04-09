import { Schema, model, models } from "mongoose";

const userSchema = new Schema(
    {
        name: { type: String, require: true },
        email: { type: String, require: true },
        avatarUrl: { type: String },
        bio: { type: String },
        emailVerified: { type: Date, default: null },
    },
    { timestamps: true }
);

const User = models.User || model("User", userSchema);
export default User;
