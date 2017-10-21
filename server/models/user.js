/* Mongoose is ORM, like models.py in django */
import mongoose, {Schema} from 'mongoose';

// Define model. 
const userSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        lowercase: true,
        minlength: 1,
    },
    createdAt: {
        type: Date,
        default: null
    },
    stats: {
        type: JSON,
        default: {
            calendar: []
        }
    }
});


// On save hook, encrypt password
// Before saving a model, run this function
userSchema.pre('save', function (next) {
    // get access to the user model. User is an instance of the user model.
    const user = this;
    if (this.isNew) {
        console.log("Created new user")
        this.createdAt = new Date();
    } else {
        console.log("Updated user.")
        next();
    }
});


// Create model class
const ModelClass = mongoose.model('user', userSchema);

// Export model
module.exports = ModelClass;
