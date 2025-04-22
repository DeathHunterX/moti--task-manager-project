import { Schema, Types, model, models } from "mongoose";

const statusEnum = ["BACKLOG", "TODO", "IN_PROGRESS", "IN_REVIEW", "DONE"];
const TaskSchema = new Schema(
    {
        name: { type: String, required: true },
        workspaceId: { type: Types.ObjectId, required: true, ref: "Workspace" },
        projectId: { type: Types.ObjectId, required: true, ref: "Project" },
        assigneeId: { type: Types.ObjectId, required: true, ref: "User" },
        description: { type: String },
        dueDate: { type: Date, required: true },
        status: { type: String, enum: statusEnum, required: true },
        position: { type: Number, required: true },
    },
    { timestamps: true }
);

const TaskModel = models.Task || model("Task", TaskSchema);

export default TaskModel;
