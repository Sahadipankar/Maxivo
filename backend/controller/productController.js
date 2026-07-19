import uploadOnCloudinary from "../config/cloudinary.js"
import Product from "../model/productModel.js"


export const addProduct = async (req, res) => {
    try {
        let { name, description, price, category, subCategory, sizes, bestseller } = req.body

        const imagePaths = {
            image1: req.files?.image1?.[0]?.path,
            image2: req.files?.image2?.[0]?.path,
            image3: req.files?.image3?.[0]?.path,
            image4: req.files?.image4?.[0]?.path,
        }

        if (!imagePaths.image1) {
            return res.status(400).json({ message: "At least one product image is required" })
        }

        const image1 = await uploadOnCloudinary(imagePaths.image1)
        const image2 = imagePaths.image2 ? await uploadOnCloudinary(imagePaths.image2) : undefined
        const image3 = imagePaths.image3 ? await uploadOnCloudinary(imagePaths.image3) : undefined
        const image4 = imagePaths.image4 ? await uploadOnCloudinary(imagePaths.image4) : undefined

        if (!image1) {
            return res.status(500).json({ message: "Image upload failed. Check Cloudinary credentials and file upload handling." })
        }

        let productData = {
            name,
            description,
            price: Number(price),
            category,
            subCategory,
            sizes: JSON.parse(sizes),
            bestseller: bestseller === "true" ? true : false,
            date: Date.now(),
            image1,
            ...(image2 ? { image2 } : {}),
            ...(image3 ? { image3 } : {}),
            ...(image4 ? { image4 } : {})

        }

        const product = await Product.create(productData)

        return res.status(201).json(product)

    } catch (error) {
        console.log("AddProduct error", error)
        return res.status(500).json({ message: `AddProduct error ${error}` })
    }

}


export const listProduct = async (req, res) => {

    try {
        const product = await Product.find({});
        return res.status(200).json(product)

    } catch (error) {
        console.log("ListProduct error")
        return res.status(500).json({ message: `ListProduct error ${error}` })
    }
}

export const removeProduct = async (req, res) => {
    try {
        let { id } = req.params;
        const product = await Product.findByIdAndDelete(id)
        return res.status(200).json(product)
    } catch (error) {
        console.log("RemoveProduct error")
        return res.status(500).json({ message: `RemoveProduct error ${error}` })
    }

}
