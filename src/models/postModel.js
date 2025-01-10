import mongoose from 'mongoose';
const acceptedPostSchema = new mongoose.Schema({
    username:{
        type:String,
    },
    imageUrl:{
        type:String
    },
    text:{
        type:String
    },
    title:{
        type:String
    }
},
{
    timeseries:true
})
const postsofusers = mongoose.models.AcceptedPost || mongoose.model('AcceptedPost', acceptedPostSchema);

export default postsofusers;