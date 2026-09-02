import mongoose from "mongoose";
async function connectdb(params) {
    try {
        mongoose.connect('mongodb+srv://ayushmshra9999_db_user:Sa850kwKLLAj8GhA@cluster1.rmlobhe.mongodb.net/DocConnect')
        console.log("mongo connected successfully");
    } catch (error) {
        console.log(error);
    }
}
export default connectdb