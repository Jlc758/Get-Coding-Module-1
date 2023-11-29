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
    let content = item.accordionContent;
    content.style.display === "block"
      ? (content.style.display = "none")
      : (content.style.display = "block");

    accordionHeader.forEach(function (otherItem) {
      if (otherItem !== item) {
        let otherContent = otherItem.accordionContent;
        if (otherContent.style.display !== "none") {
          otherContent.style.display = "none";
        }
      }
    });
  });

let buttonSubmit = document.querySelectorAll(".button-submit");
let fillableResults = document.getElementById("fillable").value;

buttonSubmit.addEventListener("click", function () {
  console.log("Entry", fillableResults);
});
