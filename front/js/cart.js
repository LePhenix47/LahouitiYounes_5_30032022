//La faudra envoyer la commande dans le panier en le stockant avec w/ WebStorage → localStorage + preventDefault du bouton commander dans l'Event listener
//Il doit enregistrer → L'id du canapé ainsi que: Le prix, le nom, le nombre d'articles, 

let addToCartButton = document.getElementById("addToCart");

/*
Faut qu'on ait aussi l'id du produit!!!!!!

let colorProduct = document.getElementById("colors");
let quantityProduct = document.getElementById("quantity");

/*
let objectProductCartDetails ={
id: 'color',
color: colorProduct,
quantity: quantityProduct
}

class classProductCartDetails{
  constructor(id, color, quantity){
    this.id = id; 
    this.color = color;
    this.quantity = quantity
  }
}

let objectProduct = new classProductCartDetails([ID], [COULEUR], [QUANTITé]);

 Objet ou classe?

 */

//Ajoute les produits 1 par 1 !!!!Faut faire plutot un tableau d'objets w/: ID, QUANTITé Prouit & COULEUR produit
function addedToCart(productObject){
  let listOfProducts = getProducts();
  listOfProducts.push(productObject);
  registerProducts(listOfProducts); 
}

/*
Récupère les produits
*/
function getProducts(){
  let listOfProducts = localStorage.getItem("listOfProducts");
  if(listOfProducts == null){
    return [];
  }else{
    return JSON.parse(listOfProducts); 
    //'Parse'r parceque l'on a un GETTER → On recoit un objet JSON stringifié et on veut récupérer variable + type de la variable
  }
}

function registerProducts(listOfProducts){
  localStorage.setItem("listOfProducts", JSON.stringify(listOfProducts));
  //'Stringify'er parce que l'on a un SETTER → le localStorage DOIT enregistrer les types complexes (tableaux & objets) au format texte sinon on perd le type
}


