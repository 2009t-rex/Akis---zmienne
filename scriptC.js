let karty = document.querySelectorAll(".card");
let zagadnienia = document.querySelectorAll("[data-zagadnienie]");
let licznikZag = 0;

const containerSelector = "#komora";
const containers = document.querySelectorAll(containerSelector);

document.addEventListener("DOMContentLoaded", () => {
  const savedLicznik = localStorage.getItem("licznikZag");
  const savedContainerIndex = localStorage.getItem("clickedContainerIndex");

  if (savedLicznik !== null) {
    licznikZag = parseInt(savedLicznik, 10);
  }

  const usedCards = JSON.parse(localStorage.getItem("usedCards") || "[]");

  usedCards.forEach(item => {
    const idx = item.index;
    const text = item.text;

    if (typeof idx === "number" && idx >= 0 && idx < karty.length) {
      const card = karty[idx];
      const zag = zagadnienia[idx];

      if (zag) {
        zag.dataset.zagadnienie = text;
        zag.setAttribute("href", `zagad${idx + 1}.html`);
      }

      card.style.pointerEvents = "none";
      card.classList.add("uzyta");
    }
  });

  if (savedContainerIndex !== null) {
    const cIndex = parseInt(savedContainerIndex, 10);
    if (containers[cIndex]) {
      const cont = containers[cIndex];
      cont.classList.add("container-highlight");
      setTimeout(() => cont.classList.remove("container-highlight"), 4000);

      const savedScroll = localStorage.getItem("containerScroll_" + cIndex);
      if (savedScroll !== null) cont.scrollLeft = parseInt(savedScroll, 10);
    }
  }
});

karty.forEach(el => {
  el.addEventListener("click", function kilkElement(e) {

    if (el.classList.contains("uzyta")) return;

    licznikZag++;

    const obecneZagadnienieStr = el.getAttribute("data-numer-karty");
    const obecneZagadnienie = parseInt(obecneZagadnienieStr, 10) || 0;
    const odpIndex = obecneZagadnienie - 1;

    el.classList.add('is-clicked');
    void el.offsetWidth; 

    ustawZagadnienie(licznikZag, odpIndex);

    const tekst = (zagadnienia[odpIndex] && zagadnienia[odpIndex].dataset.zagadnienie) || "";
    const usedCards = JSON.parse(localStorage.getItem("usedCards") || "[]");
    usedCards.push({ index: odpIndex, text: tekst });
    localStorage.setItem("usedCards", JSON.stringify(usedCards));
    localStorage.setItem("licznikZag", String(licznikZag));

    el.removeEventListener("click", kilkElement);
    const ANIMATION_MS = 3000;
    setTimeout(() => {
      el.classList.remove('is-clicked');

      el.classList.add('uzyta');

    }, ANIMATION_MS);

  });
});

/* ───────── FUNKCJA USTAW ZAGADNIENIE ───────── */
function ustawZagadnienie(licznik, odpZagadnienie) {
  let tekst = "";

  switch(licznik) {
    case 1: tekst = "Zmienne CSS"; break;
    case 2: tekst = "Content"; break;
    case 3: tekst = "Counter + Content"; break;
    case 4: tekst = "data-*"; break;
    case 5: tekst = "data-* + JS, CSS"; break;
    case 6: tekst = "Ćwiczenie 1"; break;
    case 7: tekst = "Ćwiczenie 2"; break;
    case 8: tekst = "Zmienne z JS + media"; break;
    case 9: tekst = "Ćwiczenie 3"; break;
    case 10: tekst = "Nowe tagi - ważniejsze"; break;
    case 11: tekst = "progress + JS"; break;
    case 12: tekst = "Nowe tagi - mniej ważne"; break;
    case 13: tekst = "Gradientowe napisy"; break;
    case 14: tekst = "Stylizacja input range"; break;
    case 15: tekst = "Nowe/ciekawe style"; break;
    case 16: tekst = "Zaliczenie"; break;
    default: tekst = ""; break;
  }

  if (odpZagadnienie >= 0 && odpZagadnienie < zagadnienia.length) {
    zagadnienia[odpZagadnienie].dataset.zagadnienie = tekst;
    zagadnienia[odpZagadnienie].setAttribute("href", `zagadnienia-karty/zagad${licznikZag}.html`);
  }
  }

const resetBtn = document.getElementById("resetLS");
if (resetBtn) {
  resetBtn.addEventListener("click", () => {
    localStorage.removeItem("usedCards");
    localStorage.removeItem("licznikZag");
    localStorage.removeItem("clickedContainerIndex");
    location.reload();
  });
}
