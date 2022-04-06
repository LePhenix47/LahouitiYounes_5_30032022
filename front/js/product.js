console.log("product.js");

//IDEE: Ce que l'on peut faire c'est récupérer l'id du produit et ensuite lui afficher ses details

let productPageTitle = document.querySelector("title");
let productPageDescription = document.querySelector(`meta[content]`);

let itemImage = document.getElementsByClassName("item__img")[0]; //vu qu'on récupère un TABLEAU d'éléments et que je ne veux que la 1ère valeur on ajoute l'index du tableau → [0]

let itemTitle = document.getElementById("title");
let itemPrice = document.getElementById("price");
let itemDescription = document.getElementById("description");

let itemColors = document.getElementById("colors");

let addToCartButton = document.getElementById("addToCart");

let productPrice = 0;
let imageUrlProduct = "";
let alternativeText = "";
let productName = "";
let productDescription = "";

/*
Cette fonction nous permet d'afficher les données/détails du produit grâce à son ID par appel d'API
*/

let productId = getParameter("id");

async function showProductDetails() {
  try {
    let response = await fetch(urlProductsAPI + productId);
    let couchProduct = await response.json();

    const { imageUrl, altTxt, colors, name, price, description } = couchProduct;

    productPageTitle.textContent = name;
    productName = name;

    productPageDescription.setAttribute(
      "content",
      `Description du produit ${name}: ${description}`
    );

    itemImage.innerHTML = `
        <img src="${imageUrl}" alt="${altTxt}">
                `;
    imageUrlProduct = imageUrl;
    alternativeText = altTxt;
    itemTitle.textContent = name;
    itemPrice.textContent = price;
    productPrice = price;

    itemDescription.textContent = description;
    productDescription = description;
    for (color of colors) {
      itemColors.innerHTML += `
          <option value="${color}">${color}</option>
          `;
    }
    console.log(
      imageUrlProduct +
        "\n" +
        alternativeText +
        "\n" +
        productPrice +
        "\n" +
        productDescription
    );
    return productId;
  } catch (error) {
    console.log(
      "%c↓ Attention erreur dans la fonction showProductDetails() de product.js " +
        error +
        " ↓",
      "background-color: crimson;"
    );
    console.error(error);
  }
}

showProductDetails();

let quantityProduct = document.getElementById("quantity");
let valid = true;
let colorValue = 0;
let quantityValue = 0;

//On écoute les évènements lorsqu'on change de couleur et de quantité
itemColors.addEventListener("change", function (event) {
  colorValue = event.target.value;
  console.log(colorValue);
});

quantityProduct.addEventListener("input", function (event) {
  quantityValue = event.target.value;
  console.log(quantityValue);
});

class classProductCartDetails {
  constructor(id, color, quantity, imageUrl, altTxt, price, name, description) {
    this.id = id;
    this.color = color;
    this.quantity = quantity;
    this.imageUrl = imageUrl;
    this.altTxt = altTxt;
    this.price = price;
    this.name = name;
    this.description = description;
  }
}

//La faudra envoyer la commande dans le panier en le stockant avec w/ WebStorage → localStorage + preventDefault du bouton commander dans l'Event listener
//Il doit enregistrer → L'id du canapé ainsi que: Le prix, le nom, le nombre d'articles,

//Ecoute l'évènement du click sur le bouton "Ajouter au panier" et le sauvegrade localement l'objet

/*

!ATTENTION: Faut changer la fonction parcequ'elle ajoute le même produit

*/
addToCartButton.addEventListener("click", function () {
  if (quantityValue > 0 && quantityValue <= 100 && colorValue != 0) {
    let objectProduct = new classProductCartDetails(
      productId,
      colorValue,
      Number(quantityValue),
      imageUrlProduct,
      alternativeText,
      Number(productPrice),
      productName,
      productDescription
    );

    console.table(objectProduct);

    addedToCart(objectProduct);
    alert("Votre produit a bien été ajouté au panier!");
  }
  if (colorValue == 0 && (quantityValue <= 0 || quantityValue > 100)) {
    alert("Attention! Veuillez ajouter les détails du produits");
  } else if (colorValue == 0) {
    alert("Attention! Vous devez choisir une couleur");
  } else if (quantityValue <= 0 || quantityValue > 100) {
    alert("Attention! La quantité saisie est invalide");
  }
});
