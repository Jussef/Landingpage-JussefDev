import { ref, onValue, set, update, remove, onChildChanged, orderByChild, equalTo, get, query } from "firebase/database";
import { db } from "../../config/firebase.js";
let xlsx = require("json-as-xlsx");

//--------------------------------------------------------------------------------------//
//-----------------------------FUNCIONES DE BASE DE DATOS-------------------------------//
//--------------------------------------------------------------------------------------//

// leer datos
export const getCollections = async (collection) => {
  let data = {};
  const dataSnapshot = await get(query(ref(db, `${collection}`)));
  if (dataSnapshot.exists()) {
    data = Object.values(dataSnapshot.val());
  }
  return data;
};

// leer datos
export const getCollectionsComplete = async (collection) => {
  let data = {};
  const dataSnapshot = await get(query(ref(db, `${collection}`)));
  if (dataSnapshot.exists()) {
    data = dataSnapshot.val();
  }
  return data;
};

// set datos
export const setData = async (collection, id, json) => {
  set(ref(db, `${collection}/${id}`), json).catch((e) => console.log(e));
};

// buscar dato por id
export const searchData = async (collection, id) => {
  let json = {};
  const dbRef = ref(db, `${collection}/${id}`);
  onValue(dbRef, (snapshot) => {
    if (snapshot.exists()) {
      json = snapshot.val();
      // console.log(snapshot.val());
    }
  });
  // console.log(json);
  return json;
};

// buscar dato por valor
export const searchDataByValue = async (collection, key, value) => {
  let data = {};
  const dataSnapshot = await get(query(ref(db, `${collection}`), orderByChild(`${key}`), equalTo(`${value}`)));
  if (dataSnapshot.exists()) {
    data = Object.values(dataSnapshot.val())[0];
  }
  return data;
};

// actualizar datos
export const updateData = async (collection, id, json) => {
  update(ref(db, `${collection}/${id}`), json).catch((e) => console.log(e));
};

// actualizar varios datos json
export const updateAll = async (collection, json) => {
  update(ref(db, `${collection}`), json).catch((e) => console.log(e));
};

// borrar datos
export const deleteData = async (collection, id) => {
  remove(ref(db, `/${collection}/${id}`))
    .then(() => {
      console.log("eliminado correctamente");
    })
    .catch((e) => {
      console.log(e);
    });
};

// child changed
export async function childChange(collection) {
  let json = {};
  const collectionRef = ref(db, `${collection}/`);
  onChildChanged(collectionRef, (data) => {
    json = data.val();
  });
  return json;
}

//--------------------------------------------------------------------------------------//
//-----------------------------FUNCIONES GENERALES--------------------------------------//
//--------------------------------------------------------------------------------------//

export function quitarAcentos(cadena) {
  const acentos = {
    á: "a",
    é: "e",
    í: "i",
    ó: "o",
    ú: "u",
    Á: "A",
    É: "E",
    Í: "I",
    Ó: "O",
    Ú: "U",
    Ñ: "n",
    ñ: "n",
  };
  return cadena
    .split("")
    .map((letra) => acentos[letra] || letra)
    .join("")
    .toString();
}

export function cambiarTextos(string) {
  const minusculas = string.toLowerCase();
  const sinEspacios = minusculas.replace(" ", "-");
  const sinTildes = quitarAcentos(sinEspacios);
  return sinTildes;
}

export function stringToArray(string, separador = ",") {
  const array = string.split(separador);
  return array;
}

// export function capitalize(string) {
//   const resultado = string.charAt(0).toUpperCase() + string.slice(1);
//   return resultado;
// }

export function cualMes(id) {
  let mes = "";
  switch (id) {
    case "01":
      mes = "Enero";
      break;
    case "02":
      mes = "Febrero";
      break;
    case "03":
      mes = "Marzo";
      break;
    case "04":
      mes = "Abril";
      break;
    case "05":
      mes = "Mayo";
      break;
    case "06":
      mes = "Junio";
      break;
    case "07":
      mes = "Julio";
      break;
    case "08":
      mes = "Agosto";
      break;
    case "09":
      mes = "Septiembre";
      break;
    case "10":
      mes = "Octubre";
      break;
    case "11":
      mes = "Noviembre";
      break;
    case "12":
      mes = "diciembre";
      break;

    default:
      break;
  }
  return mes;
}

export function getDate() {
  const today = new Date();
  const date = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate() < 10 ? `0${today.getDate()}` : today.getDate()} ${today.getHours() < 10 ? `0${today.getHours()}` : today.getHours()}:${
    today.getMinutes() < 10 ? `0${today.getMinutes()}` : today.getMinutes()
  }:${today.getSeconds() < 10 ? `0${today.getSeconds()}` : today.getSeconds()} ${today.getHours() < 12 ? "am" : "pm"}`;
  return date;
}

export function validateEmail(email) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}

export function setFavicons(favImg) {
  const headTitle = document.querySelector("head");
  const setFavicon = document.createElement("link");
  setFavicon.setAttribute("rel", "shortcut icon");
  setFavicon.setAttribute("href", favImg);
  headTitle.appendChild(setFavicon);
}

export function downloadFile(file, name) {
  const link = document.createElement("a");
  link.href = `${file}`;
  link.download = `${name}`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

// export function capitalizeFirstLetter(string) {
//   return string.charAt(0).toUpperCase() + string.slice(1);
// }

export function top() {
  window.scrollTo(0, 0);
}
export function down() {
  window.scrollTo(0, document.body.scrollHeight);
}

/* Helper function */
export function download_file(fileURL, fileName) {
  // for non-IE
  if (!window.ActiveXObject) {
    var save = document.createElement("a");
    save.href = fileURL;
    save.target = "_blank";
    var filename = fileURL.substring(fileURL.lastIndexOf("/") + 1);
    save.download = fileName || filename;
    if (navigator.userAgent.toLowerCase().match(/(ipad|iphone|safari)/) && navigator.userAgent.search("Chrome") < 0) {
      document.location = save.href;
      // window event not working here
    } else {
      var evt = new MouseEvent("click", {
        view: window,
        bubbles: true,
        cancelable: false,
      });
      save.dispatchEvent(evt);
      (window.URL || window.webkitURL).revokeObjectURL(save.href);
    }
  }

  // for IE < 11
  else if (!!window.ActiveXObject && document.execCommand) {
    var _window = window.open(fileURL, "_blank");
    _window.document.close();
    _window.document.execCommand("SaveAs", true, fileName || fileURL);
    _window.close();
  }
}

export function userActive() {
  return localStorage.getItem("6UIF_ZOFXc");
}
