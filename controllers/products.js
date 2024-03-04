const { search } = require("../routes/products");
const Product = require("./../models/product");
const getAllProductsStatic = async (req, res) => {
  const product = await Product.find().sort("name price");
  res.status(200).json({
    product,
    nbHits: product.length,
  });
};

const getAllProducts = async (req, res) => {
  const { featured, company, name, sort, fields, page, limit } = req.query;
  const queryObject = {};
  if (featured) {
    queryObject.featured = true;
  }
  if (company) {
    queryObject.company = company;
  }
  if (name) {
    queryObject.name = { $regex: name, $options: "i" }; //i-flag used for case-insensitive
  }
  console.log(req.query.sort);
  let product = Product.find(queryObject); //here is no await as sort method is only chained on the query , not on the result
  if (sort) {
    const sortList = req.query.sort.split(",").join(" ");
    product = Product.find(queryObject).sort(sortList);
  } else {
    product = Product.find(queryObject).sort("createdAt");
  }
  if (fields) {
    const fieldList = req.query.fields.split(",").join(" ");
    product = Product.find(queryObject).select(fieldList);
  }
  const pagination = req.query.page * 1 || 1;
  const limited = req.query.limit * 1 || 10;
  const skipped = (pagination - 1) * limited;
  product = product.skip(skipped).limit(limited);
  product = await product;
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
