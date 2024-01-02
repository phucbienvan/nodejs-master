const {Schema, model, Types} = require('mongoose'); // Erase if already required

const DOCUMENT_NAME = 'User'
const COLLECTION_NAME = 'Users'

// Declare the Schema of the Mongo model
var userSchema = new Schema({
    name:{
        type:String,
        required:true,
        unique:true,
        index:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
    status: {
        type:String,
        enum: ['active', 'inactive'],
        default: 'inactive',
    },
    verify: {
        type:Schema.Types.Boolean,
        default:false
    },
    role: {
        type:Array,
        default: []
    }
}, {
    timestamps:true,
    collation:COLLECTION_NAME
});

//Export the model
module.exports = mongoose.model(DOCUMENT_NAME, userSchema);
