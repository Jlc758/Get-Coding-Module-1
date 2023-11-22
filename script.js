const flags = document.querySelectorAll(".flag");

for (const flag of flags)
    flag.addEventListener('click', () => {
        flag.style.backgroundColor = "black"})