var urlProductsAPI = "http://localhost:3000/api/products/";

function addedToCart(productObject) {
    let listOfProducts = getProducts();
    verifyProducts(productObject, listOfProducts);
    registerProducts(listOfProducts);
  }
  
  //Récupère les produits dans un tableau stockés en local
  function getProducts() {
    let listOfProducts = localStorage.getItem("List of products added to cart");
    if (listOfProducts == null) {
      return [];
    } else {
      return JSON.parse(listOfProducts);
    }
  }
  
  let verifyProducts = (objectToVerify,arrayOfObjects) => {
    let verifyProduct = arrayOfObjects.find((object) => 
   object.id === objectToVerify.id && object.color === objectToVerify.color
    ); 
  
    if(verifyProduct){
      verifyProduct.quantity = objectToVerify.quantity;
    }else{
      arrayOfObjects.push(objectToVerify);
    }
  }

  
let removeProducts = (objectToRemove) => {
    let listOfProducts = getProducts();
    listOfProducts.filter((object) => object.id != objectToRemove);
  };
  
  //Enregistre les produits localment dans un tableau d'objet
  function registerProducts(listOfProducts) {
    localStorage.setItem(
      "List of products added to cart",
      JSON.stringify(listOfProducts)
    );
  }