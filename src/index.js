import dotenv from "dotenv";
import connectDB from "./db/index.js";
import app from "./app.js";

dotenv.config({ path: "./env" });

// it is an async function so it will return a promise
connectDB()
  .then(() => {
    app.listen(process.env.PORT || 8000, () =>
      console.log("Listening on port:", process.env.PORT)
    );
  })

  .catch((error) => {
    console.log("Error:", error);
    throw error;
  });

// iffi syntax to connect to the mongoose database
/*
(async()=> {
    try {
        await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        app.on(error, (error) => console.log("Error:", error));
        throw error;

        app.listen(process.env.PORT, ()=> console.log("Listening on port:", process.env.PORT))
    } catch (error) {
        console.log("Error:", error);
        throw error;
    }
})()
*/
