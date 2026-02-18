// import app from "./app";
import express from "express";
import dotenv from "dotenv";
import routes from "./routes";

dotenv.config();

const app= express();
app.use(express.json());
const PORT = process.env.PORT || 3005;
console.log("okkk")
app.use("/api", routes);


app.listen(PORT, () => {
  console.log(`Server heree is running on port ${PORT}`);
});
