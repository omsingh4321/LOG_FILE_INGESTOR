import mongoose from "mongoose";


const startServer=async()=>{
await mongoose.connect(process.env.DBURL, {
  // useNewUrlParser: true,
  // useUnifiedTopology: true,
  // useCreateIndex: true,
  // useFindAndModify: false,
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));

db.once('open', function() {
  console.log(`Connected to MongoDB database: ${process.env.dbName}`);
});

}

export default startServer;