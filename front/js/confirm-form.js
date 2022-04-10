let firstNameElement = document.getElementById("firstName");
let firstNameErrorMessageElement = document.getElementById("firstNameErrorMsg");

let lastNameElement = document.getElementById("lastName");
let lastNameErrorMessageElement = document.getElementById("lastNameErrorMsg");

let addressElement = document.getElementById("address");
let addressErrorMessageElement = document.getElementById("addressErrorMsg");

let cityElement = document.getElementById("city");
let cityErrorMessageElement = document.getElementById("cityErrorMsg");

let emailElement = document.getElementById("email");
let emailErrorMessageElement = document.getElementById("emailErrorMsg");

let orderButton = document.getElementById("order");
let formFields = document.querySelectorAll(".cart__order__form input"); //tab[]

let fullNameREGEX = /^([A-Z]{1})([a-z]){1,20}$|^([A-Z]){2,20}$/;

let cityREGEX = /^([a-z A-Z -]+)$/;

let emailREGEX =
  /^([a-z A-Z 0-9\.-]+)@([a-z A-Z 0-9]+).([a-z]{2,8})(.[a-z]{2,8})?$/;

let inputValidity = false;
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

firstNameElement.addEventListener(
  "input",
  (isFirstNameValid = () => {
    valueFirstName = firstNameElement.value;
    switch (fullNameREGEX.test(valueFirstName)) {
      case true:
        firstNameErrorMessageElement.textContent = "Prénom correct";
        return true;
        break;

      case false:
        firstNameErrorMessageElement.textContent =
          "Attention, le prénom saisi est incorrect, veuillez saisir votre prénom soit avec la première lettre en majuscule avec le reste en minuscule soit tout en majuscule";
      default:
        false;
    }
  })
);

lastNameElement.addEventListener(
  "input",
  (isLastNameValid = () => {
    valueLastName = lastNameElement.value;
    switch (fullNameREGEX.test(valueLastName)) {
      case true:
        lastNameErrorMessageElement.textContent = "Nom correct";
        return true;
        break;
      case false:
        lastNameErrorMessageElement.textContent =
          "Attention, le nom saisi est incorrect, veuillez saisir votre nom soit avec la première lettre en majuscule avec le reste en minuscule soit tout en majuscule";
        return false;
        break;
      default:
        false;
    }
  })
);

addressElement.addEventListener(
  "input",
  (isAddressValid = () => {
    valueAddress = addressElement.value;
    if (valueAddress === "" || valueAddress === null) {
      addressErrorMessageElement.textContent =
        "Veuillez remplir le champ d'adresse";
      return false;
    }
    addressErrorMessageElement.textContent = "Champ correct";
    return true;
  })
);

cityElement.addEventListener(
  "input",
  (isCityValid = () => {
    cityValue = cityElement.value;
    switch (cityREGEX.test(cityValue)) {
      case true:
        cityErrorMessageElement.textContent = "Adresse valide";
        return true;
        break;
      case false:
        cityErrorMessageElement.textContent =
          "Attention le champ de la ville est incorrect";
        return false;
        break;
      default:
        false;
    }
  })
);

emailElement.addEventListener(
  "input",
  (isEmailValid = () => {
    emailValue = emailElement.value;
    switch (emailREGEX.test(emailValue)) {
      case true:
        emailErrorMessageElement.textContent = "Adresse mail valide";
        return true;
        break;
      case false:
        emailErrorMessageElement.textContent =
          "Attention l'adresse mail saisie est invalide";
        return false;
        break;
      default:
        false;
    }
  })
);

let formFieldsInfosInputted = [
  isFirstNameValid(),
  isLastNameValid(),
  isAddressValid(),
  isCityValid(),
  isEmailValid(),
];

let valid = true;

let isFormValid = () => {
  for (formField of formFieldsInfosInputted) {
    valid &= formField;
    if (!valid) {
      console.log("%cATTENTION!!!", "background: #970505");
      break;
    }
  }
  if (!valid) {
    console.log(
      "%cLes infos rentrées sont au mauvais format!!!",
      "background: #970505"
    );
    return false;
  }
  if (valid) {
    console.log(
      "%cLETSGOOOOOOO! Les infos rentrées sont correctes!!",
      "background: #15DEA5"
    );

    return true;
  }
};
isFormValid();

// VERIFICATION du formulaire qui retourne objet contact
let sendVerfiedFormInfos = () => {
  if (isFormValid()) {
    console.log("%cFormulaire validé", "background: #15DEA5");
    orderButton.removeAttribute("disabled");
    return new contactInfo(
      valueFirstName,
      valueLastName,
      valueAdress,
      valueCity,
      valueEmail
    );
  }
  console.error("Le formulaire n'est pas valide");
};

//ENVOI du formulaire
let resultForm = "";
let contactObject = sendVerfiedFormInfos();

let sendProductsInCartToConfirm = async () => {
  try {
    let response = await fetch(urlProductsAPI + "order", {
      method: "POST",
      header: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },

      body: JSON.stringify(contactObject, arrayOfIds),
    });
    resultForm = await response.json();
    window.location.href = "./confirmation.html";
  } catch (error) {
    console.error(error);
  }
};

//   CLICK sur le bouton "Confirmer"
orderButton.addEventListener("submit", function (e) {
  sendProductsInCartToConfirm();
  e.preventDefault();
});
