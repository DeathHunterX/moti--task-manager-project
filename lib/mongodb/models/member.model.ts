import { Schema, models, model, Types } from "mongoose";

const roleEnum = ["ADMIN", "MEMBER"];

const MemberSchema = new Schema({
    userId: { type: Types.ObjectId, require: true },
    workspaceId: { type: Types.ObjectId, require: true },
    role: { type: String, enum: roleEnum },
});

const Member = models.Member || model("Member", MemberSchema);

export default Member;
