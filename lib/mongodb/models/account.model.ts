import { model, models, Schema, Types } from "mongoose";

const accountSchema = new Schema(
    {
        access_token: { type: String },
        refresh_token: { type: String },
        id_token: { type: String, require: true },
        expires_at: { type: Number, require: true },
        scope: { type: String },
        token_type: { type: String },
        providerAccountId: { type: String, require: true },
        provider: { type: String, require: true },
        type: {
            type: String,
            enum: ["oauth", "oidc", "email", "webauthn"],
            require: true,
        },
        userId: { type: Types.ObjectId, required: true, ref: "User" },
        password: { type: String },
    },
    { timestamps: true }
);

const AccountModel = models.Account || model("Account", accountSchema);

export default AccountModel;
