const flags = document.querySelectorAll(".flag");
let accordionContent = document.querySelector(".accordion-content");

for (const flag of flags)
  flag.addEventListener("click", () => {
    flag.style.backgroundColor = "#e5989b";
    setTimeout(() => {
      flag.style.backgroundColor = "#83c5be";
    }, 1000);
  });

let accordionHeader = document.querySelectorAll(".accordion-header");

for (const item of accordionHeader)
  item.addEventListener("click", () => {
    let content = item.firstElementChild;
    content.style.display === "block"
      ? (content.style.display = "none")
      : (content.style.display = "block");

    console.log("Hello World!");
    accordionHeader.forEach(function (otherItem) {
      if (otherItem !== item) {
        let otherContent = otherItem.firstElementChild;
        if (otherContent.style.display !== "none") {
          otherContent.style.display = "none";
        }
      }
    });
  });
