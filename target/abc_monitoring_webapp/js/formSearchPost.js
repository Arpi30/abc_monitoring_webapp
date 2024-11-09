//start fetch API with /saerch route
const getSearchElement = async (url, shema, table, db) => {
  console.log("formSearchPost.js: Start fetching");
  
  //Empty variable to HTML
  let embededDbElement = '';
  //Spinner and searching mode flag
  spinnerFlag = true;
  isSearchMode = true;
  //Selected HTML tag to searching
  const selectedDropdown = document.getElementById("selectedDropdown").value
  const searchInputElement = searchInput.value;
  
                 
  //JSON Object to send to backend
  const searchParams = {
    jndiName: globalJndiName,
    selectedDropdown: selectedDropdown,
    searchInput: searchInputElement.toUpperCase().trim(),
    shema: shema,
    table: table,
    db: db,
    page: currentPage,
    pageSize: pageSize
  };
  //Display the spinner
  if (spinnerFlag)  dbContainer.innerHTML = spinner();
  //Start the fetch API
  try {
  const response = await fetch(url, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(searchParams)
  });
  console.log("formSearchPost.js: Send Data");
  //Error handling
  if (!response.ok) {
    console.log("formSearchPost.js: Error by the data sending....");
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  //Responsed data from /search route
  const responseData = await response.json();
  console.log("formSearchPost.js: Get Data from Backkend");
  //Set the spinner flag to false
  spinnerFlag = false;
  //Error handling
  if (responseData.length === 0) {
    embededDbElement = `<h1 class="mt-5 text-center">Table not selected or not found</h1>`;
  } else {
    responseData.items.forEach((data, index) => {
    embededDbElement += getHtmlForDatabaseTable(data, index, currentDb, currentTable);
    });
  }
  //Uploading the HTML div tag with response data
  dbContainer.innerHTML = embededDbElement;
  //Display pagination
  const paginationHTML = createPagination(responseData.totalPages, currentPage);
  paginationContainer.innerHTML = paginationHTML;
  //Error handling
  }catch (error) {
    console.error("Hiba a küldés során:", error);
  }
  console.log("formSearchPost.js: End");
}

//Start searching with submit event
form.addEventListener("submit", async (e) => {
  console.log("formSearchPost.js: Start event.");
  e.preventDefault();                         
  //Error handling
  if (!maxCharacterRegex.test(searchInput.value)) {
    alert("Search input must be a maximum of 15 characters and can only contain letters, numbers, spaces, and the following special characters: #, -, : . Please correct your input.");
    return;
  }
  //Get the response from DB via /search route
  getSearchElement(search, currentShema, currentTable, currentDb);
});
