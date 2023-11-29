const flags = document.querySelectorAll(".flag");

for (const flag of flags)
  flag.addEventListener("click", () => {
    flag.style.backgroundColor = "#e5989b";
    setTimeout(() => {
      flag.style.backgroundColor = "#83c5be";
    }, 1000);
  });

let accordionHeader = document.querySelectorAll(".accordion-header");
let accordionContent = document.querySelectorAll(".accordion-content");

for (const item of accordionHeader)
  item.addEventListener("click", () => {
    accordionContent.display === "block"
      ? (accordionContent.display = "none")
      : (accordionContent.display = "block");

    console.log("is this working??");
  });
/*
    item.accordionHeader.forEach(function (otherItem) {
      if (otherItem !== item) {
        let otherContent = otherItem.accordionContent;
        if (otherContent.display !== "none") {
          otherContent.display = "none";
        }
      } 
    });
  });

let buttonSubmit = document.querySelectorAll(".button-submit");
let fillableResults = document.getElementById("fillable").value;

buttonSubmit.addEventListener("click", function () {
  console.log("Entry", fillableResults);
}); */
