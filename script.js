const flags = document.querySelectorAll(".flag");


for (const flag of flags) 
    flag.addEventListener ('click', () => {flag.style.backgroundColor = "#e5989b";
    setTimeout(() => {
        flag.style.backgroundColor = "#83c5be"
    }, 1000);} )
    
