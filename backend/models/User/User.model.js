import mongoose from "mongoose";

import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        trim: true,
        minlength: [2, 'Name must be at least 2 characters long'],
        maxlength: [50, 'Name cannot exceed 50 characters']
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        lowercase: true,
        trim: true,
        validate: {
            validator: function(v) {
                return /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v);
            },
            message: props => `${props.value} is not a valid email address!`
        }
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: [8, 'Password must be at least 8 characters long'],
        select: false
    },
    profilePic: {
        type: String,
        default: 'default-profile.jpg'
    },
    birthDate: {
        type: Date,
        validate: {
            validator: function(v) {
                return v && v.getTime() < Date.now();
            },
            message: 'Birth date must be in the past'
        }
    },
    phoneNumber: {
        type: String,
        validate: {
            validator: function(v) {
                return /\d{10}/.test(v);
            },
            message: props => `${props.value} is not a valid phone number!`
        }
    },
    address: {
        street: String,
        city: String,
        state: String,
        country: String,
        zipCode: String
    },
    accountActivated: {
        type: Boolean,
        default: false
    },
    lastLogin: {
        type: Date
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date
}, {
    timestamps: true,
    discriminatorKey: "role"
});

// Pre-save hook to hash password
userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 12);
    next();
});

// Method to check if password is correct
userSchema.methods.comparePassword = async function(candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
};
//Add the methods
userSchema.statics.findByEmail = async function (email) {
    return await this.findOne({email})
}
userSchema.statics.countUsers = async function () {
    return await this.countDocuments({});
};

//add methods
userSchema.methods.getProfile = function () {
    return `${this.name} (${this.email})`;
};

// instance or document method
userSchema.methods.checkPassword = function (password) {
    return password === this.password ? true : false;
};
// query builder
userSchema.query.paginate = function ({ page, limit }) {
    // some code
    const skip = limit * (page - 1);
    return this.skip(skip).limit(limit);
};

// post hook for email after registration
userSchema.post("save", async function (doc, next) {
    // send email logic
    // if succeeded
    try {
        if (doc.createdAt.getTime() === doc.updatedAt.getTime()) {
            // send email
        }
        return next();
    } catch (err) {
        // if failed
        return next(new Error("Failed to send email! " + err.message));
    }
});

const User = mongoose.model("User", userSchema);
export default User;