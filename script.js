// ! I believe you had this done prior to our last session but we took it out in testing something. This is good practice to ensure your HTML is fully loaded before the script runs. This is generally more important if you have script tags in the head of your HTML. If you have script tags at the bottom of your HTML, you can usually remove this.

const flags = document.querySelectorAll(".flag");

for (const flag of flags)
  flag.addEventListener("click", () => {
    flag.style.backgroundColor = "#e5989b";
    setTimeout(() => {
      flag.style.backgroundColor = "#83c5be";
    }, 1000);
  });

// ! I think it makes more sense to select the entire section not just the header
let accordionItems = document.querySelectorAll(".accordion-item");

accordionItems.forEach((item) => {
  // ! Find the accordion content within the item
  let content = item.querySelector(".accordion-content");
  console.log("content", content);

  // ! Initialize display style
  content.style.display = "none";

  item.addEventListener("click", (event) => {
    // ! Prevent event from bubbling up from interactive elements, otherwise clicking these inside of the section may just close the section
    if (
      event.target.tagName === "BUTTON" ||
      event.target.tagName === "A" ||
      event.target.tagName === "INPUT"
    ) {
      return;
    }

    content.style.display =
      content.style.display === "block" || content.style.display === ""
        ? "none"
        : "block";

    accordionItems.forEach();
  });
});

//   accordionItems.forEach(function (otherItem) {
//     if (otherItem !== item) {
//       let otherContent = otherItem.accordionContent;
//       if (otherContent.style.display !== "") {
//         otherContent.style.display = "";
//       }
//     }
//   });
// });

// document.getElementById("submitEntry").addEventListener("submit", (event) => {
//   // Prevent the default form submission behavior
//   event.preventDefault();
//   let journalData = document.getElementById("fillableEntry").value;
//   console.log(journalData);
// ))))
