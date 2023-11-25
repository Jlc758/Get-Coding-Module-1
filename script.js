// ! Good query Selector to get the class, make sure you add the class to the buttons in the HTML
const flags = document.querySelectorAll(".flag");
// ! make sure to add the . for a class selector
let accordionContent = document.querySelector(".accordion-content");

// ! This looks like it should add the event listener to any element that has the flag class
for (const flag of flags)
  flag.addEventListener("click", () => {
    flag.style.backgroundColor = "#e5989b";
    setTimeout(() => {
      flag.style.backgroundColor = "#83c5be";
    }, 1000);

    // ! if you're trying to use this to toggle the accordion, you'll need to add the toggleCollapse function here
    toggleCollapse();
  });

function toggleCollapse() {
  // ! Right idea, but getComputedStyle just checks the value of the property and can't be re-assigned. You can use this method to check the current value of the property and then

  // ! My recommended approach would be to get the first child element of the element with the .flag class and then use childElement.style.display to toggle the display property

  // ! IMPORTANT: When trying to check the value of something, you need to use === (comparison operator) instead of = (assignment operator).
  if ((window.getComputedStyle = "none")) {
    window.getComputedStyle = "block";
  } else window.getComputedStyle = "none";
}

/*
click.toggleCollapse() {
    if true 
}
*/
// ! This looks good ! The only thing I notice here is that the content variable should be a querySelectorAll instead of querySelector to add the event listener to all of the accordion items

/*
document.addEventListener('DOMContentLoaded', function () { */
let accordionHeader = document.querySelectorAll(".accordion-header");
/*


    accordionItems.forEach(function (item) {
        let accordionHeader = item.querySelector('.accordion-header'); */

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

/*
        // ! if you're trying to use this to toggle the accordion, you'll need to add the toggleCollapse function here 
        toggleCollapse();
    ;
        accordionItems.addEventListener('click', function () {
            //Toggle content visibility
            let content = item.querySelectorAll('.accordion-content');
            content.style.display = content.style.display === 'block' ? 'none' : 'block';

            //Close other open items
            accordionItems.forEach(function (otherItem) {
                if (otherItem !== item) {
                    otherItem.querySelector('.accordion-content').style.display = 'none';
                }
            })

        })
    */
