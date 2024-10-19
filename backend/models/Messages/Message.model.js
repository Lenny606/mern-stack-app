import mongoose from 'mongoose';


const messageSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Title is required'],
        trim: true,
        minlength: [10, 'Title must be at least 2 characters long'],
        maxlength: [30, 'Title cannot exceed 30 characters']
    },
    message: {
        type: String,
        required: [true, 'Message is required'],
        minlength: [10, 'Message must be at least 10 characters long'],
        select: false
    },
}, {
    timestamps: true,
    discriminatorKey: "type"
});

// Pre-save hook to hash password
// messageSchema.pre('save', async function(next) {
//
//     next();
// });


//Add the methods
messageSchema.statics.findByEmail = async function (email) {
    return await this.findOne({email})
}
// messageSchema.statics.countUsers = async function () {
//     return await this.countDocuments({});
// };

// query builder
// userSchema.query.paginate = function ({ page, limit }) {
//     // some code
//     const skip = limit * (page - 1);
//     return this.skip(skip).limit(limit);
// };

// post hook for email after registration
// userSchema.post("save", async function (doc, next) {
//     // send email logic
//     // if succeeded
//     try {
//         if (doc.createdAt.getTime() === doc.updatedAt.getTime()) {
//             // send email
//         }
//         return next();
//     } catch (err) {
//         // if failed
//         return next(new Error("Failed to send email! " + err.message));
//     }
// });

const Message = mongoose.model("Message", messageSchema);
export default Message;