import { Schema, model, models } from "mongoose";

const userSchema = new Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true },
        avatarUrl: { type: String },
        bio: { type: String },
        emailVerified: { type: Date, default: null },
    },
    { timestamps: true }
);

const UserModel = models.User || model("User", userSchema);
export default UserModel;
