
//If the site is loaded
document.addEventListener("DOMContentLoaded", () => {
    console.log("home.js: Welcome page is loaded.");
	dbContainer.innerHTML = welcomeHomeSite();
});
//If logo is clicked clear the title, pagination container, search and dropdown inputs, mapdb static container, db container
logo.addEventListener("click", () => {  
    console.log("loadData.js: Click on logo, navigate to welcome page.");
    dbTitle.innerText = "";
    paginationContainer.innerText = "";
    searchInput.value = "";
    dropdownContainer.innerHTML = "";
    mapdbSaticData.innerHTML = "";
    dbContainer.innerHTML = welcomeHomeSite();

    //Found the collapsed elements and hide the side menu
    for (let i = 0; i < sidebarLinks.length; i++) {
        const collapseId = sidebarLinks[i].getAttribute("data-bs-target");
        const collapseElement = document.querySelector(collapseId);
        

        //Checking if it existing
        if (collapseElement) {
            const bsCollapse = new bootstrap.Collapse(collapseElement, {
                toggle: false
            });

            //Hide the side menu
            bsCollapse.hide();
        } 
    }
    menulist.classList.remove("expand");
});

//Welcome text
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