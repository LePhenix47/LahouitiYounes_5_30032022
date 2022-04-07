var cartItemsElement = document.getElementById("cart__items");
var totalQuantityItemsElement = document.getElementById("totalQuantity");
var totalPriceItemsElement = document.getElementById("totalPrice");

let firstNameErrorMessageElement = document.getElementById("firstNameErrorMsg");

let cartItemsList = [];

let idProductCart = "";

let colorProductCart = "";

let productPrice = 0;
let totalQuantityProductValue = 0;
let totalPriceProductValue = 0;

let productDetailsList = [];

console.groupCollapsed("Dans la fonction getCartProducts");

console.groupEnd("Dans la fonction getCartProducts");
//-----------------------------------------------------------//

console.groupCollapsed("Dans la fonction getProductDetails");

let getProductDetails = async () => {
  try {
    let response = await fetch(urlProductsAPI);
    productDetailsList = await response.json();

    getCartProducts();
  } catch (error) {
    console.log(
      "%cAttention! ERREUR detectée" + " voir les détails ↓ ",
      "background: red"
    );
    console.error(error);
  }
};

getProductDetails();

console.groupEnd("Dans la fonction getProductDetails");

let getCartProducts = () => {
  try {
    cartItemsList = getProducts(); //cartItemsList est la liste des produits stockés localement

    console.log(
      "%cListe de TOUS nos produits fetchés par l'API:",
      "background: orange; color: black;"
    );
    console.log(productDetailsList); //productDetailsListe contient la liste de TOUS les objets disponibles

    for (item of cartItemsList) {
      const { id, color, quantity } = item; //item est une case du tableau cartItemsList, contenant un produit ajouté au panier de type objet w/ propriétés→ id, couleur & quantité
      idProductCart = id;
      colorProductCart = color;
      quantityProductCart = quantity;
      //On stocke globalement ces valeurs

      const productInCart = productDetailsList.find(
        //productInCart est le produit FILTRé de type Objet stocké localement AVEC les propriétés → name, imageUrl, altTxt & price
        (content) => content._id === idProductCart
      );

      console.log(productInCart);
      const { name, imageUrl, altTxt, price } = productInCart;

      console.log(
        "%c Détails du produit dans le localStorage:",
        "background: purple"
      );
      //-----------------------------------------------------------//
      var article = document.createElement("article"); //<article>
      article.classList.add("cart__item");
      article.setAttribute("data-id", id);
      article.setAttribute("data-color", color);

      var divItemImage = document.createElement("div");
      divItemImage.classList.add("cart__item__img");

      var itemImage = document.createElement("img");
      itemImage.setAttribute("src", imageUrl);
      itemImage.setAttribute("alt", altTxt);

      divItemImage.appendChild(itemImage); //<div item__img> <img/> </div>

      var divItemContent = document.createElement("div"); //<div content> </div>
      divItemContent.classList.add("cart__item__content");

      var divItemDescription = document.createElement("div"); //<div description> </div>
      divItemDescription.classList.add("cart__item__content__description");

      var itemNameHeading2 = document.createElement("h2"); //<h2></h2>
      itemNameHeading2.textContent = name;

      var itemColorParagraph = document.createElement("p"); //<p color></p>
      itemColorParagraph.textContent = "Couleur: " + color;

      var itemPriceParagraph = document.createElement("p"); //<p price></p>
      itemPriceParagraph.textContent = "Prix à l'unité: " + price + " €";

      divItemDescription.appendChild(itemNameHeading2); // <div description> <h2></h2> </div>
      divItemDescription.appendChild(itemColorParagraph); //  <div description> <h2></h2> <p color></p></div>
      divItemDescription.appendChild(itemPriceParagraph); //  <div description> <h2></h2> <p color></p>  <p price></p> </div>

      var divItemSettings = document.createElement("div"); //<div settings></div>
      divItemSettings.classList.add("cart__item__content__settings");

      var divItemQuantity = document.createElement("div"); //<div quantity></div>
      divItemQuantity.classList.add("cart__item__content__settings__quantity");

      var quantityParagraph = document.createElement("p"); // <p quantité>${quantity}</p>
      quantityParagraph.textContent = "Qté : " + quantity;

      var numberOfProductsInput = document.createElement("input");
      numberOfProductsInput.classList.add("itemQuantity");
      numberOfProductsInput.setAttribute("type", "number");
      numberOfProductsInput.setAttribute("name", "itemQuantity");
      numberOfProductsInput.setAttribute("min", "1");
      numberOfProductsInput.setAttribute("max", "100");
      numberOfProductsInput.setAttribute("value", quantity); //<input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${quantity}">

      divItemQuantity.appendChild(quantityParagraph); //<div quantity> <p quantité>${quantity}</p> </div>
      divItemQuantity.appendChild(numberOfProductsInput); //<div quantity> <p quantité>${quantity}</p> <input/></div>

      var divCartDeleteItems = document.createElement("div"); //<div delete></div>
      divCartDeleteItems.classList.add("cart__item__content__settings__delete");

      var deleteItemActualItemParagraph = document.createElement("p"); //<p deleteItem></p>
      deleteItemActualItemParagraph.classList.add("deleteItem");
      deleteItemActualItemParagraph.textContent = "Supprimer";

      divCartDeleteItems.appendChild(deleteItemActualItemParagraph); //<div delete> <p deleteItem></p> </div>

      divItemSettings.appendChild(divItemQuantity);
      divItemSettings.appendChild(divCartDeleteItems);

      divItemContent.appendChild(divItemDescription);
      divItemContent.appendChild(divItemSettings);

      article.appendChild(divItemImage);
      article.appendChild(divItemContent);

      cartItemsElement.appendChild(article);

      //-----------------------------------------------------------//

      deleteItemActualItemParagraph.addEventListener("click", () => {
        console.log(removeProducts(item));
        console.log("ID actuel du produit: ", id);
        removeProducts(item);
        cartItemsElement.removeChild(article);
      });

      numberOfProductsInput.addEventListener("change", (e) => {
        console.log(
          "Valeur de l'input = " + e.target.value + " qui est dans le produit: "
        );
        console.log(id);
      });

      //-----------------------------------------------------------//
      totalQuantityProductValue += quantity;
      productPrice = price * quantity;
      totalPriceProductValue += productPrice;
      totalQuantityItemsElement.textContent = totalQuantityProductValue;
      totalPriceItemsElement.textContent =
        totalPriceProductValue.toLocaleString(undefined, {
          minimumFractionDigits: 0,
        });
      //[element].toLocaleString(undefined, { minimumFractionDigits: 0 }) pour rendre: 23790€ → 23 790€
    }

    //À partir de l'ID → faut récupérer l'ID du produit pour lui afficher → Image w/ txt alt, Nom, Couleur & Prix
    //On stocke tous les ID dans un tableau
  } catch (error) {
    console.error(error);
  }
};

//--------------------------------------------------------------
