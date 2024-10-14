import mongoose from 'mongoose'

const connectionDB = async () => {

    if (mongoose.connection.readyState === 1) {
        return true
    }

    try {
        // @ts-ignore
        await mongoose.connect(process.env.MONGO_URL)
        return true
    } catch (err) {
        console.log(err)
    }

}


export default connectionDB;


