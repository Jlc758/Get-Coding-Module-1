// ! I believe you had this done prior to our last session but we took it out in testing something. This is good practice to ensure your HTML is fully loaded before the script runs. This is generally more important if you have script tags in the head of your HTML. If you have script tags at the bottom of your HTML, you can usually remove this.

const flags = document.querySelectorAll(".flag");

for (const flag of flags)
  flag.addEventListener("click", () => {
    flag.style.backgroundColor = "#e5989b";
    setTimeout(() => {
      flag.style.backgroundColor = "#83c5be";
    }, 1000);
  });

let accordionItems = document.querySelectorAll(".accordion-item");

accordionItems.forEach((item) => {
  let content = item.querySelector(".accordion-content");
  console.log("content", content);

  content.style.display = "none";

  item.addEventListener("click", (event) => {
    //! Using closest over TagName is better because it will work even if you change the HTML structure. For example, if you changed the button to a div, this would still work. If you used tagName, it would not. The issue you were having is because your button was actually an img nested inside a button so TagName was not registering it as button. The closest() method works by looking at the element itself and then traversing up through its ancestors in the DOM tree (parents, grandparents, etc.) until it finds a node that matches the provided selector string. It returns the first matching node or null if there is no matching node.

    // ! This is just a cleaner way to write the line here. Basically, if the target of the event is NOT a button, a link, or an input, then run the code.
    if (!event.target.closest("button, a, input")) {
      content.style.display =
        content.style.display === "block" ? "none" : "block";
    }

    accordionItems.forEach((otherItem) => {
      if (otherItem !== item) {
        let content = otherItem.querySelector(".accordion-content");
        if (content.style.display !== "none") {
          content.style.display = "none";
        }
      }
    });
  });
});

//! Nice use of a function !
const addMedication = () => {
  // Get the input value
  // ! var is outdated and rarely used now, use const if the variable shouldn't change or use let if it should be able to change. Generally best to use const everywhere uless you can't
  const newMedInput = document.getElementById("newMedication");
  const newMedText = newMedInput.value;

  const medCount = 2;

  //! Now what if someone submits an empty string?

  //! Select your medList into a variable so you don't have to keep selecting it
  let medList = document.getElementById("medList");

  //! But what if it doesn't exist ???

  //! Dynamically create the 'ul' element to append your list items to, if it doesn't exist
  if (!medList) {
    medList = document.createElement("ul");
    medList.id = "medList";
    document.querySelector(".medListContainer").appendChild(medList);
  }

  // Create a new list item
  const newMed = document.createElement("li");
  newMed.appendChild(
    document.createTextNode(`${newMedText} - Count: ${medCount}`)
  );

  //! Make sure medList exists before appending to it, see above
  // Add the new item to the list
  medList.appendChild(newMed);

  //! This should clear the input field not the medlists
  // Clear the input field
  newMedInput.value = "";
};

//! Lets talk about Arrow Functions !
//! const func = () => {} is the same as function func() {}. Arrow functions are a newer way to write functions and are generally preferred. They are also more flexible. For example, you can write const func = (param1, param2) => {} and it will work the same as function func(param1, param2) {}. The only time you can't use arrow functions is when you need to use the this keyword (don't worry about that for now).

//! Add event listener here for the add medication button

let addMedbtn = document.querySelector("#addMedicationForm");

addMedbtn.addEventListener("submit", (event) => {
  event.preventDefault();
  addMedication();
});
