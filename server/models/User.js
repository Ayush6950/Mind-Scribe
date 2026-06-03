import moongoose from 'mongoose';


const userSchema = new.mongoose.Schema({
   username:{
    type:String,
    required:true,
    },

   password:{
    type:String,
    required:true,
   },
   credits:{
    type:Number,
    default:0,
   },
   iscreditAvailable:{
    type:Boolean,
    default:true,
   },
   notes:{
    type:[moongoose.Schema.Types.ObjectId],
    ref:'Note',
    default:[],
}
});

const UserModel = mongoose.model('User',userSchema);

export default UserModel;