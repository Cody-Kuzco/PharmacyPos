export default async function getPrducts(_id) {
  const response = await fetch(`http://localhost:3000/api/fetchProduct`);
  const product = await response.json();

  return product;
}
