const flags = document.querySelectorAll(".flag");
let accordionHeader = document.querySelector(".accordion-header")
let accordionContent = document.querySelector("accordion-content")

for (const flag of flags) 
    flag.addEventListener ('click', () => {flag.style.backgroundColor = "#e5989b";
    setTimeout(() => {
        flag.style.backgroundColor = "#83c5be"
    }, 1000);} )
;

function toggleCollapse() {
    let element = document.getElementsByClassName("accordion-header");
    if (element.style.display === ""){
        element.style.display = 'block'; 
    }
    else element.style.display = "";
    }


function collapse () {
    document.getElementsByClassName(accordionHeader).click(toggleCollapse);
}


/*
document.addEventListener('DOMContentLoaded', function () {
    let accordionItems = document.querySelector('.accordion-item');

    accordionItems.forEach(function (item) {
        let accordionHeader = item.querySelector('.accordion-header');

        accordionHeader.addEventListener('click', function () {
            //Toggle content visibility
            let content = item.querySelector('.accordion-content');
            content.style.display = content.style.display === 'block' ? 'none' : 'block';

            //Close other open items
            accordionItems.forEach(function (otherItem) {
                if (otherItem !== item) {
                    otherItem.querySelector('.accordion-content').style.display = 'none';
                }
            })

        })
    })
} */