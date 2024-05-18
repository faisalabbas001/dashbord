import mongoose from "mongoose";

const connectToDB=async()=>{
    try {
        await mongoose.connect(
            "mongodb+srv://minhaj:university@cluster0.fwgf9sj.mongodb.net/ ",
            {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            }
        );
        console.log("mongoose db has been connected that")
    } catch (error) {
        console.log(error)
    }
}

export default connectToDB;












//mongodb+srv://faisalabbas:faisalpasha@cluster0.gj3qoz1.mongodb.net/