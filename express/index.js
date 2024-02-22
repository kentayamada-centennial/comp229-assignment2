import express from "express"
import compress from "compression"
import bodyParser from "body-parser"
import cors from "cors"
import helmet from "helmet"
import productRoutes from "../routes/product.routes.js"

export const app = express()

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(compress())
app.use(helmet())
app.use(cors())

// Routes
app.use("/", productRoutes);

// Welcome Screen
app.get("/", (_, res) => {
  res.status(200).json({
    message: "Welcome to DressStore application."
  })
})
