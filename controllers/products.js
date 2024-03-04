const Product = require("./../models/product");
const getAllProductsStatic = async (req, res) => {
  const product = await Product.find();
  res.status(200).json({
    product,
    nbHits: product.length,
  });
};

const getAllProducts = async (req, res) => {
  const product = await Product.find(req.query);
  res.status(200).json({
    message: "Success",
    product,
    nbHits: product.length,
  });

  throw new Error("Testing error");
};

module.exports = {
  getAllProducts,
  getAllProductsStatic,
};
