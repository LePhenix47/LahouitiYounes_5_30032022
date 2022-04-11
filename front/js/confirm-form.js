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

let fullNameREGEX = /^([A-Z]{1})([a-z]){1,20}$|^([A-Z]){2,20}$/;

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
let valueAdress = "";
let valueCity = "";
let valueEmail = "";

firstNameElement.addEventListener("input", () => {
  valueFirstName = firstNameElement.value;
  firstNameElementValid = fullNameREGEX.test(valueFirstName);
  if (!firstNameElementValid) {
    firstNameErrorMessageElement.textContent =
      "Attention, le prénom saisi est incorrect, veuillez saisir votre prénom soit avec la première lettre en majuscule avec le reste en minuscule soit tout en majuscule";
  } else {
    firstNameErrorMessageElement.textContent = "Prénom correct";
  }
});

lastNameElement.addEventListener("input", () => {
  valueLastName = firstNameElement.value;
  lastNameElementValid = fullNameREGEX.test(valueLastName);
  if (!lastNameElementValid) {
    firstNameErrorMessageElement.textContent =
      "Attention, le nom saisi est incorrect, veuillez saisir votre prénom soit avec la première lettre en majuscule avec le reste en minuscule soit tout en majuscule";
  } else {
    lastNameErrorMessageElement.textContent = "Nom correct";
  }
});

addressElement.addEventListener("input", () => {
  valueAdress = addressElement.value;
  if (valueAdress === "") {
    addressErrorMessageElement.textContent =
      "Attention, veuillez saisir une adresse qu'avec des tirets '-' ou des points '.' ";
  } else {
    addressErrorMessageElement.textContent = "Adresse valide";
    addressElementValid = true;
  }
});

cityElement.addEventListener("input", () => {
  valueCity = cityElement.value;
  cityElementValid = cityREGEX.test(valueCity);
  if (!cityElementValid) {
    cityErrorMessageElement.textContent =
      "Attention, veuillez saisir une ville qu'avec des tirets '-' ou des points '.' ";
  } else {
    cityErrorMessageElement.textContent = "Ville valide";
  }
});

emailElement.addEventListener("input", () => {
  valueEmail = emailElement.value;
  emailElementValid = emailREGEX.test(valueEmail);
  if (!emailElementValid) {
    emailErrorMessageElement.textContent =
      "Attention! L'email rentré est invalide";
  } else {
    emailErrorMessageElement.textContent = "Email correct";
  }
});

/*

.addEventListener("input", ()=>{
   = .value;
   =  REGEX.test();
   if(){
         .textContent = "";
   }else{
         .textContent = "";
   }

})
*/

let valid = true;

const formIsValid = () => {
  return (
    firstNameElementValid &&
    lastNameElementValid &&
    addressElementValid &&
    cityElementValid &&
    emailElementValid
  );
};

let enableOrderButton = () => {
  if (formIsValid) {
    orderButton.removeAttribute("disabled");
    console.log(
      "%cPARFAIT MON REUF!!! Le formulaire est valide → Bouton marche",
      "background: #15DEA5; color: black;"
    );
  } else {
    console.error("CATASTROPHE!!!! Le formulaire n'a pas été envoyé");
  }
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
    console.log("Il y a " + notFilledField + " champ(s) rempli(s)");
  }
};

// VERIFICATION du formulaire qui retourne objet contact
let sendVerfiedFormInfos = () => {
  if (formIsValid) {
    console.log("%cFormulaire validé", "background: #15DEA5; color: black;");
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
  e.preventDefault();
  if (formIsValid()) {
    sendProductsInCartToConfirm();
    alert("Formulaire enovyé");
  } else {
    alert("ATTENTION!!!! Des champs de formulaire ne sont pas valides");
    console.error("Form pas valide → champ incomplet ou incorrect");
  }
});
