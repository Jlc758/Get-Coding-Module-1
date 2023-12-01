// ! I believe you had this done prior to our last session but we took it out in testing something. This is good practice to ensure your HTML is fully loaded before the script runs. This is generally more important if you have script tags in the head of your HTML. If you have script tags at the bottom of your HTML, you can usually remove this.
document.addEventListener("DOMContentLoaded", () => {
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

      // ! Toggle the display of the content
      content.style.display =
        content.style.display === "block" || content.style.display === ""
          ? "none"
          : "block";
    });
  });

  // let accordionHeader = document.querySelectorAll(".accordion-header");
  // let accordionContent = document.querySelectorAll(".accordion-content");

// for (const item of accordionHeader)
//   item.addEventListener("click", () => {
//     let content = accordionContent;
//     content.display === "block"
//       ? (content.display = "none")
//       : (content.display = "block");

//     console.log("is this working??");
//   });

/*
    accordionContent.display === "block"
      ? (accordionContent.display = "none")
      : (accordionContent.display = "block");

      */

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
});
