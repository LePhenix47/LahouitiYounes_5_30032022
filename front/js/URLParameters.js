//Cette fonction permet de nous retourner la valeur du paramètre dans l'URL
function getParameter(parameterName) {
    let parameters = new URLSearchParams(window.location.search);
    if (parameters.has(parameterName)) {
      return parameters.get(parameterName);
    }
    return "Paramètre " + parameterName + " n'a pas été trouvé";
  }
  