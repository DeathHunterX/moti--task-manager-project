import { Schema, models, model, Types } from "mongoose";

const roleEnum = ["ADMIN", "MEMBER"];

const MemberSchema = new Schema(
    {
        userId: { type: Types.ObjectId, required: true, ref: "User" },
        workspaceId: { type: Types.ObjectId, required: true, ref: "Workspace" },
        role: { type: String, enum: roleEnum },
        createdAt: { type: Date, default: new Date() },
        updatedAt: { type: Date, default: new Date() },
    },
    { timestamps: true }
);

const MemberModel = models.Member || model("Member", MemberSchema);

export default MemberModel;
