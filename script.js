const flags = document.querySelectorAll(".flag");


for (const flag of flags) 
    flag.addEventListener ('click', () => {flag.style.backgroundColor = "#e5989b";
    setTimeout(() => {
        flag.style.backgroundColor = "#83c5be"
    }, 1000);} )
;

document.addEventListener('DOMContentLoaded', function () {
    let accordionItems = document.querySelector('.accordion-item');

    accordionItem.forEach(function (item) {
        let header = item.querySelector('.accordion-header');

        header.addEventListener('click', function () {
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
})