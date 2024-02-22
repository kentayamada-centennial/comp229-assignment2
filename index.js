import { express, db } from "./config/index.js"
import { app } from "./express/index.js"
import mongoose from "mongoose"

mongoose.connect(db.mongoUri, { dbName: db.dbName }).then(() => {
  console.log("Connected to the database!");
})

mongoose.connection.on("error", () => {
  throw new Error(`Unable to connect to database: ${db.mongoUri}`)
})

app.listen(express.port, (err) => {
  if (err) throw new Error(`Unable to start server on port ${express.port}`)
  console.log(`Server started on port ${express.port}`)
})
