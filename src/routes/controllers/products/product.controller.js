import { Product } from "../../model/product.js"


export const create = (req, res) => {
    try {
        res.json(":) 123")
    } catch (err) {
        console.log(err);
        res.status(404).json({ message: "Something went wrong" })
        
    }
}


export const get = async (req, res) => {
    try {
        const products = await Product.find()

        // res.json(products);
    } catch (error) {
        console.log(err);
        res.status(404).json({ message: "Something went wrong" })
    }
}