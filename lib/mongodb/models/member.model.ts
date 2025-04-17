import { Schema, models, model, Types } from "mongoose";

const roleEnum = ["ADMIN", "MEMBER"];

const MemberSchema = new Schema(
    {
        userId: { type: Types.ObjectId, require: true, ref: "User" },
        workspaceId: { type: Types.ObjectId, require: true, ref: "Workspace" },
        role: { type: String, enum: roleEnum },
    },
    { timestamps: true }
);

const MemberModel = models.Member || model("Member", MemberSchema);

export default MemberModel;
