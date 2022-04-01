//La faudra envoyer la commande dans le panier en le stockant avec w/ WebStorage → localStorage + preventDefault du bouton commander dans l'Event listener
//Il doit enregistrer → L'id du canapé ainsi que: Le prix, le nom, le nombre d'articles, 
let addToCartButton = document.getElementById("addToCart");

function addedToCart(event){

  event.preventDefault();

}

addToCartButton.addEventListener("submit", addedToCart);