import { Schema, Types, model, models } from "mongoose";

const WorkspaceSchema = new Schema(
    {
        name: { type: String, require: true },
        image: { type: String },
        inviteCode: { type: String },
        userId: { type: Types.ObjectId, require: true, ref: "User" },
    },
    { timestamps: true }
);

const WorkspaceModel = models.Workspace || model("Workspace", WorkspaceSchema);

export default WorkspaceModel;
