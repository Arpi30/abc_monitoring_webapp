const getSearchElement = async (url, shema, table, db) => {
  const selectedDropdown = document.getElementById("selectedDropdown").value
  const searchInput = document.getElementById("searchInput").value;
  spinnerFlag = true
  let embededDbElement = '';                     // Üres változó a HTML-nek

  const searchParams = {
    selectedDropdown: selectedDropdown,
    searchInput: searchInput.toUpperCase(),
    shema: shema,
    table: table,
    db: db,
    page: currentPage,
    pageSize: pageSize
  };

  console.log(searchParams);
  
  if (spinnerFlag) {
  dbContainer.innerHTML = spinner();
  }
  
  try {
  const response = await fetch(url, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json', // Meghatározza, hogy JSON-t küldesz
      },
      body: JSON.stringify(searchParams) // Az űrlap adatainak elküldése JSON formában
  });
  
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  
  const responseData = await response.json();
  console.log(responseData);
  spinnerFlag = false;
  if (responseData.length === 0) {
    embededDbElement = `<h1 class="mt-5 text-center">Table not selected or not found</h1>`;           // A div container feltöltése HTML-lel   
  } else {
    responseData.items.forEach((data, index) => {               // Tömb iterálása
    embededDbElement += getHtmlForDatabaseTable(data, index, currentDb, currentTable);
    });
  }
  dbContainer.innerHTML = embededDbElement;             // A div container feltöltése HTML-lel
  // Pagination megjelenítése
  const paginationHTML = createPagination(responseData.totalPages, currentPage);
  paginationContainer.innerHTML = paginationHTML; // Pagination elhelyezése a megfelelő containerben
  
  }catch (error) {
    console.error("Hiba a küldés során:", error);
  }
  selectedDropdown.value = '';
  searchInput.value = '';
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();                         // Megakadályozza az alapértelmezett űrlap elküldést
  getSearchElement(search, currentShema, currentTable, currentDb);
});
