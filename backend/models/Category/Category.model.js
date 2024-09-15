import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Category name is required'],
        trim: true,
        unique: true,
        maxlength: [50, 'Category name cannot exceed 50 characters']
    },
    slug: {
        type: String,
        unique: true,
        lowercase: true
    },
    description: {
        type: String,
        maxlength: [500, 'Description cannot exceed 500 characters']
    },
    parent: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        default: null
    },
    ancestors: [{
        _id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Category',
            index: true
        },
        name: String,
        slug: String
    }],
    image: {
        type: String
    },
    isActive: {
        type: Boolean,
        default: true
    },
    order: {
        type: Number,
        default: 0
    },
    metaTitle: String,
    metaDescription: String
}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

// Virtual for getting child categories
categorySchema.virtual('children', {
    ref: 'Category',
    localField: '_id',
    foreignField: 'parent'
});

// Pre-save hook to create slug from name
categorySchema.pre('save', function(next) {
    this.slug = this.name.toLowerCase().replace(/[^a-zA-Z0-9]/g, '-');
    next();
});

// Ensure parent is not set to self
categorySchema.pre('save', function(next) {
    if (this.parent && this.parent.toString() === this._id.toString()) {
        return next(new Error('A category cannot be its own parent.'));
    }
    next();
});

const Category = mongoose.model('Category', categorySchema);

export default Category;