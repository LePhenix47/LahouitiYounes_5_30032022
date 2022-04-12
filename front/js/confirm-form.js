let firstNameElement = document.getElementById("firstName");
let firstNameErrorMessageElement = document.getElementById("firstNameErrorMsg");
let firstNameElementValid = false;

let lastNameElement = document.getElementById("lastName");
let lastNameErrorMessageElement = document.getElementById("lastNameErrorMsg");
let lastNameElementValid = false;

let addressElement = document.getElementById("address");
let addressErrorMessageElement = document.getElementById("addressErrorMsg");
let addressElementValid = false;

let cityElement = document.getElementById("city");
let cityErrorMessageElement = document.getElementById("cityErrorMsg");
let cityElementValid = false;

let emailElement = document.getElementById("email");
let emailErrorMessageElement = document.getElementById("emailErrorMsg");
let emailElementValid = false;

let orderButton = document.getElementById("order");
let formFields = document.querySelectorAll(".cart__order__form input"); //tab[]

let fullNameREGEX = /^([A-Z]{1})([a-z]){1,20}( +)?$|^([A-Z]){2,20}( )?$/;

let cityREGEX = /^([a-z A-Z \.-]+)$/;

let emailREGEX =
  /^([a-z A-Z 0-9\.-]+)@([a-z A-Z 0-9]+).([a-z]{2,8})(.[a-z]{2,8})?$/;

//********--------------------Classe pour créer des objects de contact--------------------********//
class contactInfo {
  constructor(firstName, lastName, address, city, email) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.address = address;
    this.city = city;
    this.email = email;
  }
}

orderButton.setAttribute("disabled", "true"); //On va l'enlever une fois le champ rempli et validé

let valueFirstName = "";
let valueLastName = "";
let valueAddress = "";
let valueCity = "";
let valueEmail = "";

firstNameElement.addEventListener("input", () => {
  valueFirstName = firstNameElement.value;
  firstNameElementValid = fullNameREGEX.test(valueFirstName);
  if (!firstNameElementValid || valueFirstName === "") {
    firstNameErrorMessageElement.textContent =
      "Attention, le prénom saisi est incorrect, veuillez saisir votre prénom soit avec la première lettre en majuscule avec le reste en minuscule soit tout en majuscule";
  } else {
    console.log(valueFirstName);
  }
  isFormFilled();
});

lastNameElement.addEventListener("input", () => {
  valueLastName = lastNameElement.value;
  lastNameElementValid = fullNameREGEX.test(valueLastName);
  if (!lastNameElementValid || valueLastName === "") {
    lastNameErrorMessageElement.textContent =
      "Attention, le nom saisi est incorrect, veuillez saisir votre prénom soit avec la première lettre en majuscule avec le reste en minuscule soit tout en majuscule";
  } else {
    console.log(valueLastName);
  }
  isFormFilled();
});

addressElement.addEventListener("input", () => {
  valueAddress = addressElement.value;
  if (valueAddress === "") {
    addressErrorMessageElement.textContent =
      "Attention, veuillez saisir une adresse qu'avec des tirets '-' ou des points '.' ";
  } else {
    addressElementValid = true;
    console.log(valueAddress);
  }
  isFormFilled();
});

cityElement.addEventListener("input", () => {
  valueCity = cityElement.value;
  cityElementValid = cityREGEX.test(valueCity);
  if (!cityElementValid || valueCity === "") {
    cityErrorMessageElement.textContent =
      "Attention, veuillez saisir une ville";
  } else {
    console.log(valueCity);
  }
  isFormFilled();
});

emailElement.addEventListener("input", () => {
  valueEmail = emailElement.value;
  emailElementValid = emailREGEX.test(valueEmail);
  if (!emailElementValid || valueEmail === "") {
    emailErrorMessageElement.textContent =
      "Attention! L'email rentré est invalide";
  } else {
    console.log(valueEmail);
  }
  isFormFilled();
});

//Verifie si tous les champs sont corrects
const formIsValid = () => {
  return (
    firstNameElementValid &&
    lastNameElementValid &&
    addressElementValid &&
    cityElementValid &&
    emailElementValid
  );
};

//VERIFIE si tous les champs de formulaire sont saisis
let isFormFilled = () => {
  let notFilledField = 0;
  for (i = 0; i < formFields.length; i++) {
    input = formFields[i].value;
    if (input === "") {
      notFilledField++;
    }
  }
  if (notFilledField === 0) {
    orderButton.removeAttribute("disabled");
    console.log("Les champs sont remplis → Bouton 'Commander' activé");
  } else {
    console.log("Il y a encore " + notFilledField + " champ(s) NON rempli(s)");
    orderButton.setAttribute("disabled", "true");
  }
};

// VERIFICATION du formulaire qui retourne objet contact
let sendVerfiedFormInfos = () => {
  if (formIsValid) {
    console.log("%cObjet contact crée", "background: #15DEA5; color: black;");
    return new contactInfo(
      valueFirstName,
      valueLastName,
      valueAddress,
      valueCity,
      valueEmail
    );
  }
  console.error("Le formulaire n'est pas valide → Objet non crée");
};

//ENVOI du formulaire
let resultForm = "";
let contactObject = "";

let sendProductsInCartToConfirm = async () => {
  try {
    let response = await fetch(urlProductsAPI + "order", {
      method: "POST",
      headers: {
        "Accept" : "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ contact: contactObject, products: arrayOfIds }),
    });

    resultForm = await response.json();
    if (response.ok) {
      alert("Code statut: " + response.status + ", redirection...");

      console.log("Résultat du formulaire: " + resultForm);

      window.location.href = "./confirmation.html?id=" + resultForm.orderId;
    } else {
      alert("Erreur, statut code de la réponse: " + response.status);
      console.log(
        "%cERREUR: STATUT " + response.status,
        "background: crimson; font-size: 24px;"
      );
    }
  } catch (error) {
    console.error(error);
  }
};

let articlesInCart = getProducts();
let amountOfArticlesInCart = articlesInCart.length;
//   CLICK sur le bouton "Confirmer"
orderButton.addEventListener("click", function (e) {
  e.preventDefault();
  if (formIsValid() && amountOfArticlesInCart > 0 && amountOfDeletedItems < amountOfArticlesInCart) {
    contactObject = sendVerfiedFormInfos();
    console.log(contactObject);
    console.log("URL: ", urlProductsAPI);
    sendProductsInCartToConfirm();
    alert("Formulaire envoyé");
  }
 else if (amountOfArticlesInCart <= 0 || amountOfDeletedItems >= amountOfArticlesInCart) {
    alert("Votre panier est vide, veuillez remplir votre panier");
    console.log("Non envoyé car panier vide");
  }
  else if (!formIsValid()) {
    alert("ATTENTION!!!! Des champs de formulaire ne sont pas valides ou");
    console.error("Form pas valide → champ incomplet ou incorrect");
  }
  else{
    console.error("ERREUR le formulaire n'est pas valide")
  }
});
