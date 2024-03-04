const getAllProductsStatic = async (req, res) => {
  res.status(200).json({ message: "Product fetch testing" });
};

const getAllProducts = async (req, res) => {
  res.status(200).json({ message: "Product route" });
  throw new Error("Testing error");
};

module.exports = {
  getAllProducts,
  getAllProductsStatic,
};
