import mongoose from "mongoose";

const userSchema = mongoose.Schema(
    {
        name: String,
        profilePic: String,
        email: String,
        password: String,
        birthDate: Date,
        accountActivated: {
            type: Boolean,
            default: false
        },
    },
    {
        timestamps: true,
        discriminatorKey: "role",
    }
);
//Add the methods
userSchema.statics.findByEmail = async function (email) {
    return await this.findOne({email})
}
userSchema.statics.countUsers = function () {
    return this.countDocuments({});
};

const User = mongoose.model("User", userSchema);
export default User;