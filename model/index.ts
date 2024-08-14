import mongoose from 'mongoose';
import userSchema from './userModel';
import todoListSchema from './todolistModel';

var uri = 'mongodb://Ivy:W8023you1314@cluster0-shard-00-00.cqnlz.mongodb.net:27017,cluster0-shard-00-01.cqnlz.mongodb.net:27017,cluster0-shard-00-02.cqnlz.mongodb.net:27017/?ssl=true&replicaSet=atlas-xp76jn-shard-0&authSource=admin&retryWrites=true&w=majority&appName=Cluster0'

async function main() {
    mongoose.connect(uri)
}

main().then(() => {
    console.log('MongoDB connected')
}).catch((err) => {
    console.log('MongoDB connection error')
    console.log(err)
})

const User = mongoose.model("User", userSchema);
const TodoList = mongoose.model("TodoList", todoListSchema);
export { User , TodoList };