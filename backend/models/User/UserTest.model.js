import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userTestSchema = new mongoose.Schema({
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
userTestSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 12);
    next();
});

// Method to check if password is correct
userTestSchema.methods.comparePassword = async function(candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
};
//Add the methods
userTestSchema.statics.findByEmail = async function (email) {
    return await this.findOne({email}).select('+password')
}
userTestSchema.statics.countUsers = async function () {
    return await this.countDocuments({});
};

//add methods
userTestSchema.methods.getProfile = function () {
    return `${this.name} (${this.email})`;
};

// instance or document method
userTestSchema.methods.checkPassword = function (password) {
    return password === this.password ? true : false;
};
// query builder
userTestSchema.query.paginate = function ({ page, limit }) {
    // some code
    const skip = limit * (page - 1);
    return this.skip(skip).limit(limit);
};

// post hook for email after registration
userTestSchema.post("save", async function (doc, next) {
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

const UserTest = mongoose.model("UserTest", userTestSchema);
export default UserTest;