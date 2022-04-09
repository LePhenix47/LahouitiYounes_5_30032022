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

firstNameElement.addEventListener("input", (e) => {
  valueFirstName = e.target.value;
  switch (fullNameREGEX.test(valueFirstName)) {
    case true:
      firstNameErrorMessageElement.textContent = "Prénom correct";
      break;

    case false:
      firstNameErrorMessageElement.textContent =
        "Attention, le prénom saisi est incorrect, veuillez saisir votre prénom soit avec la première lettre en majuscule avec le reste en minuscule soit tout en majuscule";
    default:
      false;
  }
});

lastNameElement.addEventListener("input", (e) => {
  valueLastName = e.target.value;
  switch (fullNameREGEX.test(valueLastName)) {
    case true:
      lastNameErrorMessageElement.textContent = "Nom correct";
      break;
    case false:
      lastNameErrorMessageElement.textContent =
        "Attention, le nom saisi est incorrect, veuillez saisir votre nom soit avec la première lettre en majuscule avec le reste en minuscule soit tout en majuscule";
    default:
      false;
  }
});

addressElement.addEventListener("input", (e) => {
 valueAddress = e.target.value;
  if(valueAddress === "" || valueAddress === null){
    addressErrorMessageElement.textContent=  "Veuillez remplir le champ d'adresse";
  }
 })

cityElement.addEventListener("input", (e) => {
  cityValue = e.target.value;
  switch(cityREGEX.test(cityValue)){
    case true:
     cityErrorMessageElement.textContent = "Adresse valide";
      break;
      case false:
     cityErrorMessageElement.textContent  = "Attention le champ de la ville est incorrect" ;
      break;
     default: false;
  }
 });


 emailElement
 .addEventListener("input", (e) => {
  emailValue  = e.target.value;
    switch(emailREGEX.test(emailValue)){
      case true:
       emailErrorMessageElement.textContent = "Adresse mail valide";
        break;
        case false:
       emailErrorMessageElement.textContent  = "Attention l'adresse mail saisie est invalide" ;
        break;
       default: false;
    }
   }
   )

/*
.addEventListener("input", (e) => {
   = e.target.value;
   switch(.test()){
     case true:
      .textContent = "";
       break;
       case: false:
      .textContent  = "" ;
       break;
      default: false;
   }
  }
  )
*/
/*/ VERIFICATION du formulaire qui retourne objet contact

let sendVerfiedFormInfos = () => {
  if([expression qui permet de vérifier que tous les patterns REGEX respectifs sont respectés]){
  orderButton.removeAttribute("disabled");
  return new contactInfo(valueFirstName, valueLastName, valueAdress, valueCity, valueEmail); 
  }
};

/*/

/*/ ENVOI du formulaire

let resultForm = '';
let contactObject = sendVerfiedFormInfos();

let sendProductsInCartToConfirm = async () =>{
    try{
       let response = await fetch(urlProductsAPI + "order",{
     method: "POST",
     header:{
         'Accept': 'application/json'
         'Content-Type': 'application/json'
     },

     body: JSON.stringify(contactObject, arrayOfIds)
       }
      )

      resultForm = response.json();

       window.location.href = "./confirmation.html";
 ;

    }catch(error){
        console.error(error);
    }
}
   CLICK sur le bouton "Confirmer"
orderButton.addEventListener("submit", function(e){
  sendProductsInCartToConfirm();
  e.preventDefault();
 
}
/*/
