/* version qui marche pas complètement */

"use strict";
// La date dans le cadre bleu

const dateNow = moment();
dateNow.locale("fr");
const today = document.createElement("p");
today.textContent = `Bonjour ! Nous sommes le ${dateNow.format(
  "dddd DD/MM/YYYY"
)}`;
const place = document.querySelector("#cadredate");
place.prepend(today);

//fin de la date

//---------------------------------------------------

//affichage par défaut trié par dates et lancement des fonctions pour que chaque filtre fonctionnement indépendamment
const uniqueTags = allTags(entries);
console.log("unique", uniqueTags);
let filterCat = "toutes";
const selectEl2 = document.getElementById("categ");
let filtre = entries;
//triDate(entries);
affcat();

//---
category(entries);
affichage(filtre);
checkbox(filtre);

tri(filtre);
//tri(filtre);

//fin affichage par défaut

//----------------------------------------------------

//checkbox

function checkbox(A) {
  //category(filtre);
  const transDate = dateNow.format("DD/MM/YYYY");
  console.log("const transDate", transDate);
  const checkBox = document.getElementById("mycheck");
  checkBox.addEventListener("change", () => {
    console.log("coché", checkBox.checked);
    console.log("pas coché", !checkBox.checked);
    if (checkBox.checked === true) {
      filtre = A.filter(
        vIncoming =>
          moment(vIncoming.date, "DD/MM/YYYY") > moment(transDate, "DD/MM/YYYY")
      );
      tri(filtre);
      category(filtre);
    } else {
      filtre = A;

      tri(filtre);
      category(filtre);
    }
  });
}

console.log("rage", filtre);

//fin checkbox

//------------------------------------------------

//tri alpha-date

function tri(Z) {
  const selectEl = document.getElementById("filteralphadate");
  let filterTag = "par date";

  affichage(Z);

  selectEl.addEventListener("change", () => {
    filterTag = selectEl.value;
    console.log(filterTag);
    if (filterTag == 1) {
      filtre = Z.sort(
        (a, b) => moment(a.date, "DD/MM/YYYY") - moment(b.date, "DD/MM/YYYY")
      );
      affichage(filtre);
    } else if (filterTag == 2) {
      filtre = Z.sort(triAz);
      affichage(filtre);
    } else if (filterTag == 3) {
      filtre = Z.sort(triZa);
      affichage(filtre);
    }
  });
}

// Début de la fonction (triDate) - triage par date
/*
function triDate(A) {
  let B = A.sort(
    (a, b) => moment(a.date, "DD/MM/YYYY") - moment(b.date, "DD/MM/YYYY")
  );
}
*/
// Fin de la fonction (triDate) - triage par date

// Début de la fonction (triAz) - ordre alphabétique

function triAz(a, b) {
  return a.subject > b.subject ? 1 : -1;
}

// Fin de la fonction (triAz) - ordre alphabétique

// Début de la fonction (triZa) - ordre alphabétique inversé

function triZa(a, b) {
  return a.subject < b.subject ? 1 : -1;
}
// Fin de la fonction (triZa) - ordre alphabétique inversé

// fin du tri

//-------------------------------------------------------------

// Début de la fonction (affichage)

function affichage(desespoir) {
  const veilles = document.querySelector("#debut");
  const ul = document.createElement("ul");
  ul.classList.add("row", "list-unstyled");
  veilles.after(ul);

  let compteur = 0;
  for (let veil of desespoir) {
    const liste = document.createElement("li");
    liste.innerHTML = `<div class="my-1 container card  py-2 col-8 offset-2 mx-auto shadow-sm"><h2>${
      veil.subject
    }</h2>
  <p class="bg-primary px-1 text-light mr-auto rounded-sm">${veil.category}</p>
  <p>${veil.date}</p></div>`;

    compteur += 1;
    if (compteur % 2 === 0) {
      let A = liste.querySelector("div");
      A.classList.add("bg-light");
    }

    ul.append(liste);
  }
}

// Fin de la fonction (affichage)

//-----------------------------------------------------------------------

// fonction des tags uniques

function allTags(list) {
  /* retourner la liste des tags uniques */
  let listTotal = [];
  for (let element of list) {
    if ("category" in element) {
      listTotal = listTotal.concat(element.category);
    }
  }
  const listTagsUnique = [];
  listTotal.forEach(el => {
    if (!listTagsUnique.includes(el)) {
      //listTagsUnique = listTagsUnique.concat([el])
      listTagsUnique.push(el);
    }
  });
  return listTagsUnique;
}

//fin fonction des tags uniques

//affichage des catégories uniques

function affcat() {
  uniqueTags.sort();
  for (let category of uniqueTags) {
    const option = document.createElement("option");
    option.textContent = category;
    option.value = category;
    selectEl2.append(option);
  }
}
//fin affichage des catégories uniques

//filtreParTag();

function category(C) {
  // tri(C);
  selectEl2.addEventListener("change", () => {
    filterCat = selectEl2.value;
    console.log("selcat", filterCat);

    let cat = C.filter(el => {
      if (filterCat === "Toutes") {
        return C;
      } else {
        return el.category.includes(filterCat);
      }
    });
    return (filtre = cat);
    console.log("filtredescat", filtre);
  });
}
