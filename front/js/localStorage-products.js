let urlProductsAPI = "http://localhost:3000/api/products/";

//********--------------------Ajoute les produits en local--------------------********//
function addedToCart(productObject) {
  let listOfProducts = getProducts();
  verifyProducts(productObject, listOfProducts);
  registerProducts(listOfProducts);
}

//********--------------------Récupère les produits en local--------------------********//
function getProducts() {
  let listOfProducts = localStorage.getItem("List of products added to cart");
  if (listOfProducts == null) {
    return [];
  } else {
    return JSON.parse(listOfProducts);
  }
}

//********--------------------Vérifie les doublons--------------------********//
let verifyProducts = (objectToVerify, arrayOfObjects) => {
  let verifyProduct = arrayOfObjects.find(
    (object) =>
      object.id === objectToVerify.id && object.color === objectToVerify.color
  );

  if (verifyProduct) {
    verifyProduct.quantity =
      Number(objectToVerify.quantity) + Number(verifyProduct.quantity);
  } else {
    arrayOfObjects.push(objectToVerify);
  }
};

//********--------------------Supression de l'éléments du panier--------------------********//
let removeProducts = (objectToRemove) => {
  let listOfProducts = getProducts();
  return listOfProducts.filter(
    (objectInCart) =>
      objectInCart.color !== objectToRemove.color &&
      objectInCart.id !== objectToRemove.id
  );
};

//********--------------------Enregistre les produits localment dans un tableau d'objet--------------------********//
function registerProducts(listOfProducts) {
  sortProducts(listOfProducts);
  localStorage.setItem(
    "List of products added to cart",
    JSON.stringify(listOfProducts)
  );
}

//********--------------------Range les produits par ID--------------------********//
let sortById = (objectA, objectB) => {
  let comparison = 0;
  if (objectA.id < objectB.id) {
    comparison = -1;
  } else if (objectA.id > objectB.id) {
    comparison = 1;
  }
  return comparison;
};

let sortProducts = (listOfProductsToSort) => {
  return listOfProductsToSort.sort(sortById);
};
