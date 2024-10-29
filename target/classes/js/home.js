
document.addEventListener("DOMContentLoaded", () => {	//eseménykezelő
	dbContainer.innerHTML = welcomeHomeSite();
});
logo.addEventListener("click", () => {                  //eseménykezelő
    dbTitle.innerText = "";
    paginationContainer.innerText = "";
    dbContainer.innerHTML = welcomeHomeSite();

    for (let i = 0; i < sidebarLinks.length; i++) {
        // Keressük meg a célzott összeomló elemet az adatcélja alapján
        const collapseId = sidebarLinks[i].getAttribute("data-bs-target");
        const collapseElement = document.querySelector(collapseId);
        

        // Ellenőrizzük, hogy létezik-e a collapseElement
        if (collapseElement) {
            // Bootstrap Collapse példány létrehozása
            const bsCollapse = new bootstrap.Collapse(collapseElement, {
                toggle: false
            });

            // Elem becsukása
            bsCollapse.hide();
        } 
    }
    menulist.classList.remove("expand");
});


const welcomeHomeSite = () => {
    return `
    <div class="welcomeTextWrapper">
        <svg>
            <text class="welcomeText" x="35%" y="50%"  >
                ABC Monitoring ©
            </text>
            
	    </svg>
    </div>
    `
}