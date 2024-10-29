document.addEventListener("DOMContentLoaded", () => {										//eseménykezelő
	dbContainer.innerHTML = welcomeHomeSite();
});
logo.addEventListener("click", () => {                  //eseménykezelő
    dbTitle.innerText = "";
    paginationContainer.innerText = "";
    dbContainer.innerHTML = welcomeHomeSite();
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