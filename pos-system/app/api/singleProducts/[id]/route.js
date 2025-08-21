const { default: AddProduct } = require("@/models/AddProducts");
const { connect } = require("@/utils/db");

const handler = async (req, res,{params}) => {
  const {id} = params
  await connect();
  const product_s = await AddProduct.findById(id);
  await connect.disconnect();
 
  res.send(product_s)
};
export default handler;