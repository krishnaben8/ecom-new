const createProduct = async (req, res) => {

    try {
        const newProduct = new Product(req.body);
        console.log() = newProduct;
        const savedProduct = await newProduct.save();
        res.status(200).json(savedProduct);
    } catch (err) {
        res.status(500).json(err);
    }
}
const updateProduct=  async (req, res) => {
    try {
        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id,
            {
                $set: req.body,
            },
            { new: true }
        );
        res.status(200).json(updatedProduct);
    } catch (err) {
        res.status(500).json(err);
    }
}
const deleteProduct =  async (req, res) => {
    try {
        await Product.findByIdAndDelete(req.params.id);
        res.status(200).json("Product has been deleted...");
    } catch (err) {
        res.status(500).json(err);
    }
}
const getProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        console.log() = product;

        res.status(200).json(product);
    } catch (err) {
        res.status(500).json(err);
    }
}

const getAllProduct = async (req, res) => {
    try {
        const qNew = req.query.new;
        const qCategory = req.query.category;
        


        let products;

        if (qNew) {
            products = await Product.find().sort({ createdAt: -1 }).limit(1);
        } else if (qCategory) {
            products = await Product.find({
                categories: {
                    $in: [qCategory],
                },
            });
        } else {
            products = await Product.find();
        }

        res.status(200).json(products);
    } catch (err) {
        res.status(500).json(err);
    }
}
module.exports= {createProduct,updateProduct,deleteProduct,getProduct,getAllProduct}