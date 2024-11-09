//Create menu via menu element from htmlElement.js menu array
const createMenu = (menuElement) => {
  let embededMenuElement = '';
  menu.forEach((item, index) => {
    embededMenuElement += menuElement(item, index);
  })
  menulist.innerHTML += embededMenuElement;
  menulist.innerHTML += `<img class="menuLogo img-fluid mt-auto" src="../img/logo.jpg" alt="">`
};

//start fetch API with /list route
const paginatedData = async (url, clickedItem) => { 
  console.log("loadData.js: Start fetching");
  //local scope variables. Get attribute from side menu
  const dbName = clickedItem.getAttribute('data-db');
  const tableName = clickedItem.getAttribute('data-table');
  const dbShema = clickedItem.getAttribute('data-schema');
  const jndiName = clickedItem.getAttribute('data-jndiName');
  const uniqueKeys = [];    
  //Global variables
  spinnerFlag = true
  globalJndiName = jndiName;
  currentDb = dbName;
  currentTable = tableName;
  currentShema = dbShema;
  let embededDbElement = ''; 

  //JSON data to send the Backend
  const dataToSend = {
    jndiName: jndiName,
    dbName: dbName,
    tableName: tableName,
    dbShema: dbShema,
    page: currentPage,
    pageSize: pageSize
  };
  //Create spinner if the data is loading...
  if (spinnerFlag)dbContainer.innerHTML = spinner();
  dbTitle.innerHTML = getDbTitle(dataToSend.dbName, dataToSend.tableName)

  //Start fetching the data from backend
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(dataToSend)
    });
    console.log("loadData.js: Send Data");
    //Error handling
    if (!response.ok){
      console.log("loadData.js: Response not OK....");
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    //Get the datas from backend
    const responseData = await response.json();
    console.log("loadData.js: Get Data from Backend: " + responseData);
    //Stop spinnering
    spinnerFlag = false
    //loop trough the datas
    responseData.items.forEach((data, index) => {
      
      //Storing the keys of the retrieved json data
      Object.keys(data).forEach(key => {
        if (!uniqueKeys.includes(key)) {
          uniqueKeys.push(key);
        }
      });
      //Uploding the temp variable with HTML
      embededDbElement += getHtmlForDatabaseTable(data, index, currentDb, currentTable);
    });
    //Make the dropdown menu to search
    dropdownContainer.innerHTML = searchBar(uniqueKeys)
    //Uploding HTML div container with the response data
    dbContainer.innerHTML = embededDbElement;

    //----------------------------------------------------------//
    //Uploding the static progressbar with response from Mapdb  //
    mapdbSaticData.innerHTML = staticData(responseData);        //
    //----------------------------------------------------------//

    //Create pagination
    const paginationHTML = createPagination(responseData.totalPages, currentPage);
    paginationContainer.innerHTML = paginationHTML;

    //error handling
    }catch (error) {
    console.error("Error during transmission:", error);
  }
  console.log("loadData.js: End fetching");
};

//Get data from the clicked item
const getDbData = () => {
  const clickableItems = document.querySelectorAll('.clickable');
  console.log("getDbData clickableItems: " + clickableItems);
  clickableItems.forEach(item => {
    item.addEventListener('click', function () {
      isSearchMode = false;
      lastClickedItem = item;
      console.log("getDbData: " + item);
      
      paginatedData(list, item);
    });
  });
};

//Click event for paging
document.addEventListener('click', function(event) {
  if (event.target.matches('.page-link')) {
    event.preventDefault();
    const clickedPage = parseInt(event.target.getAttribute('data-page'));
    
    if (!isNaN(clickedPage) && clickedPage !== currentPage) {
      currentPage = clickedPage;
      if (isSearchMode) {
        // If we are in search mode, we call the search function again with the new page number
        getSearchElement(search, currentShema, currentTable, currentDb);
        console.log("loadData.js: Start searching.");
      } else {
        //For normal pagination, call paginatedData
        paginatedData(list, lastClickedItem);
        console.log("loadData.js: Start listing.");
      }
    }
  }
});

//
document.addEventListener("DOMContentLoaded", () => {
  if (hamBurger && menulist) {
    // Esemény delegálás a menü gombhoz
    menulist.addEventListener("click", function (event) {
      if (event.target.closest(".toggle-btn")) {
        menulist.classList.toggle("expand");
        getDbData();
      }
    });

    //Create the menu
    createMenu(menuElement);
  }
});


