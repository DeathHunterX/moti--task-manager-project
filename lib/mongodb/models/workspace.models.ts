import { Schema, Types, model, models } from "mongoose";

const WorkspaceSchema = new Schema({
    name: { type: String, require: true },
    image: { type: String },
    userId: { type: Types.ObjectId },
    inviteCode: { type: String },
});

const Workspace = models.Workspace || model("Workspace", WorkspaceSchema);

export default Workspace;
