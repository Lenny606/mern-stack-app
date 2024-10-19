import mongoose from 'mongoose';
import Message from './Message.model.js'
const contactMessageSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: false,
        lowercase: true,
        trim: true,
        validate: {
            validator: function(v) {
                return /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v);
            },
            message: props => `${props.value} is not a valid email address!`
        }
    },
})

const ContactMessage = Message.discriminator("ContactMessage", contactMessageSchema);
export default ContactMessage;