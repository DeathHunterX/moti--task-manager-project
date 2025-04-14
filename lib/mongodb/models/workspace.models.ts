import { Schema, Types, model, models } from "mongoose";

const WorkspaceSchema = new Schema({
    name: { type: String, require: true },
    image: { type: String },
    userId: { type: Types.ObjectId },
});

const Workspace = models.Workspace || model("Workspace", WorkspaceSchema);

export default Workspace;
