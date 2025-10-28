import { GET_ALL_PRODUCTS } from "./constants";

export class ProductController {
  constructor({ productsDB }) {
    this.productsDB = productsDB;
  }

  getAllProducts = async (req, res) => {
    getFirstRow = (result) => result?.rows?.[0] || result?.[0];
    try {
      const result = await this.productsDB.query(GET_ALL_PRODUCTS);
      const products = this.getAllProducts(result);
      res.status(200).json(products);
    } catch (error) {
      res
        .status(500)
        .json({ mesage: "Error en el servidor: " + error.message });
    }
  };
}
