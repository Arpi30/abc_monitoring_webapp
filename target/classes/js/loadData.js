const createMenu = (menuElement) => {
  let embededMenuElement = ''; // Üres változó a HTML-hez
  menu.forEach((item, index) => {
    embededMenuElement += menuElement(item, index);
  })
  menulist.innerHTML += embededMenuElement;
  menulist.innerHTML += `<img class="menuLogo img-fluid mt-auto" src="../img/logo.jpg" alt="">`
};



const paginatedData = async (url, clickedItem) => {
  spinnerFlag = true
  const dbName = clickedItem.getAttribute('data-db');
  const tableName = clickedItem.getAttribute('data-table');
  const dbShema = clickedItem.getAttribute('data-schema');
  currentDb = dbName;
  currentTable = tableName;
  currentShema = dbShema;
  let embededDbElement = ''; // Üres változó a HTML-nek
  const uniqueKeys = [];    // Üres tömb a dinamikus keresőmezőnek
  

  const dataToSend = {
    dbName: dbName,
    tableName: tableName,
    dbShema: dbShema,
    page: currentPage,
    pageSize: pageSize
  };

  console.log(dataToSend);
  


  if (spinnerFlag)dbContainer.innerHTML = spinner();

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(dataToSend) // JSON formátumú adatok
    });

    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

    const responseData = await response.json();
    console.log(responseData);
    spinnerFlag = false
    responseData.items.forEach((data, index) => {               // Tömb iterálása
      
      // visszakapott JSON kulcsok tárolása tömben a dinamikus kereési funkcióhoz
      Object.keys(data).forEach(key => {
        if (!uniqueKeys.includes(key)) {
          uniqueKeys.push(key);
        }
      });
      embededDbElement += getHtmlForDatabaseTable(data, index, currentDb, currentTable);
    });
    dropdownContainer.innerHTML = searchBar(uniqueKeys)
    dbContainer.innerHTML = embededDbElement;             // A div container feltöltése HTML-lel

    // Pagination megjelenítése
    const paginationHTML = createPagination(responseData.totalPages, currentPage);
    paginationContainer.innerHTML = paginationHTML; // Pagination elhelyezése a megfelelő containerben

    dbTitle.innerHTML = getDbTitle(dataToSend.dbName, dataToSend.tableName)
    }catch (error) {
    console.error("Hiba a küldés során:", error);
  }
};


const getDbData = () => {
  const clickableItems = document.querySelectorAll('.clickable');
  clickableItems.forEach(item => {
    item.addEventListener('click', function () {
      lastClickedItem = item;
      paginatedData(list, item);
    });
  });
};

document.addEventListener('click', function(event) {
  if (event.target.matches('.page-link')) {
    event.preventDefault();
    const clickedPage = parseInt(event.target.getAttribute('data-page'));
    
    if (!isNaN(clickedPage) && clickedPage !== currentPage) {
      currentPage = clickedPage;
      paginatedData(list, lastClickedItem); // Újra elküldi az adatokat a megfelelő oldallal
    }
  }
});

document.addEventListener("DOMContentLoaded", () => {
  if (hamBurger && menulist) {
    // Esemény delegálás a menü gombhoz
    menulist.addEventListener("click", function (event) {
      if (event.target.closest(".toggle-btn")) {
        menulist.classList.toggle("expand");
        getDbData();
      }
    });

    // Menu kirajzolása
    createMenu(menuElement);
    
  }
});


