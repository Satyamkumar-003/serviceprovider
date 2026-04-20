import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        name: { type: String, required: true, trim: true },
        email: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            lowercase: true,
        },
        phoneno: { type: String, required: true, unique: true, trim: true },
        password: { type: String, required: true, select: false },
        role: { type: String, enum: ["user", "admin"], default: "user" },
    },
    { timestamps: true }
);

userSchema.methods.toSafeJSON = function () {
    return {
        id: this._id,
        name: this.name,
        email: this.email,
        phoneno: this.phoneno,
        role: this.role,
    };
};

const User = mongoose.model("User", userSchema);

export default User;
