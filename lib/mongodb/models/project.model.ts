import { Schema, Types, model, models } from "mongoose";

const ProjectSchema = new Schema(
    {
        workspaceId: { type: Types.ObjectId, require: true, ref: "Workspace" },
        name: { type: String, require: true },
        image: { type: String },
    },
    { timestamps: true }
);

const ProjectModel = models.Project || model("Project", ProjectSchema);

export default ProjectModel;
