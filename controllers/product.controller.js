import { Product } from "../models/product.model.js"
import { getErrorMessage, getMessage } from "./helper.controller.js"
import extend from "lodash/extend.js"
import { STATUS_CODE } from "../constants/index.js"

// Function to create a new product
const create = async (req, res) => {
  try {
    const product = new Product(req.body)
    await product.save()
    res.status(STATUS_CODE.CREATED).json(getMessage("Product created.", product))
  } catch (err) {
    res.status(STATUS_CODE.BAD_REQUEST).json(getErrorMessage("Unable to create product.", err))
  }
}

// Function to retrieve a list of products
const list = async (req, res) => {
  try {
    // Find products based on optional query parameters
    const products = await Product.find({ name: { $regex: req.query?.name ?? "" } })
    res.status(STATUS_CODE.OK).json(getMessage("All products fetched.", products))
  } catch (err) {
    res.status(STATUS_CODE.BAD_REQUEST).json(getErrorMessage("Unable to fetch all products.", err))
  }
}

// Middleware function to find a product by its ID
const productByID = async (req, res, next, id) => {
  try {
    // Find a product by ID
    let product = await Product.findOne({ "_id": id })
    if (!product) return res.status(STATUS_CODE.NOT_FOUND).json(getMessage("Product not found.", null))
    req.product = product
    // Pass control to the next route handler
    next()
  } catch (err) {
    res.status(STATUS_CODE.BAD_REQUEST).json(getErrorMessage("Unable to find product.", err))
  }
}

// Function to read details of a single product
const read = (req, res) => res.status(STATUS_CODE.OK).json(getMessage("Product found.", req.product))

// Function to update an existing product
const update = async (req, res) => {
  try {
    let product = req.product
    // Extend the product with new data from the request body
    product = extend(product, req.body)
    await product.save()
    res.status(STATUS_CODE.OK).json(getMessage("Product updated.", product))
  } catch (err) {
    res.status(STATUS_CODE.BAD_REQUEST).json(getErrorMessage("Unable to update product.", err))
  }
}

// Function to remove a single product
const removeOne = async (req, res) => {
  try {
    await req.product.deleteOne()
    res.status(STATUS_CODE.OK).json(getMessage("Product removed successfully.", req.product))
  } catch (err) {
    res.status(STATUS_CODE.BAD_REQUEST).json(getErrorMessage("Unable to remove product.", err))
  }
}

// Function to remove all products
const removeAll = async (_, res) => {
  try {
    await Product.deleteMany({})
    res.status(STATUS_CODE.OK).json(getMessage("All products removed.", []))
  } catch (err) {
    res.status(STATUS_CODE.BAD_REQUEST).json(getErrorMessage("Unable to remove all products.", err))
  }
}

export default { create, list, productByID, read, update, removeOne, removeAll }
