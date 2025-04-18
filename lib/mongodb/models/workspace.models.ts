import { Schema, Types, model, models } from "mongoose";

const WorkspaceSchema = new Schema(
    {
        name: { type: String, required: true },
        image: { type: String },
        inviteCode: { type: String },
        userId: { type: Types.ObjectId, required: true, ref: "User" },
    },
    { timestamps: true }
);

const Workspace = models.Workspace || model("Workspace", WorkspaceSchema);

export default Workspace;
