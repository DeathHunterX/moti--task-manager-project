import { Schema, Types, model, models } from "mongoose";

const ProjectSchema = new Schema(
    {
        workspaceId: { type: Types.ObjectId, required: true, ref: "Workspace" },
        name: { type: String, required: true },
        image: { type: String },
    },
    { timestamps: true }
);

const ProjectModel = models.Project || model("Project", ProjectSchema);

export default ProjectModel;
