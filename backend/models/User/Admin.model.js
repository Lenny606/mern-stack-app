import mongoose from "mongoose";
import User from "./User.model.js";

export const adminSchema = mongoose.Schema(
    {
        permissions: Array,
        assignedTasks: Array,
        department: String,
    }
);

const Admin = User.discriminator("Admin", adminSchema);
export default Admin;