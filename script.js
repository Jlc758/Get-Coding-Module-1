const flags = document.querySelectorAll(".flag");
/* let accordionContent = document.querySelector(".accordion-content"); */

for (const flag of flags)
  flag.addEventListener("click", () => {
    flag.style.backgroundColor = "#e5989b";
    setTimeout(() => {
      flag.style.backgroundColor = "#83c5be";
    }, 1000);
  });

let accordionHeader = document.querySelectorAll(".accordion-header");
let accordionContent = document.getElementsByClassName(".accordion-content");

accordionHeader.addEventListener("click", () => {
  if (accordionContent.style.display === "block") {
    accordionContent.style.display === "";
  } else {
    accordionContent.style.display === "block";
  }
});

/*
let accordionHeader = document.querySelectorAll(".accordion-header");


/*
for (const item of accordionHeader)
  item.addEventListener("click", () => {
    let content = item.accordionContent;
    content.display.style === "block"
      ? (content.display.style = "")
      : (content.display.style = "block");

    accordionHeader.forEach(function (otherItem) {
      if (otherItem !== item) {
        let otherContent = otherItem.accordionContent;
        if (otherContent.style.display !== "") {
          otherContent.style.display = "";
        }
      }
    });
  });

  */

let buttonSubmit = document.querySelectorAll(".button-submit");
let fillableResults = document.getElementById("fillable").value;

buttonSubmit.addEventListener("click", function () {
  console.log("Entry", fillableResults);
});
