const formatDate = (dateStr) => {
  // Szétvágjuk a dátum stringet a megfelelő részekre
  const year = "20" + dateStr.substring(0, 2); // év
  const month = dateStr.substring(2, 4);       // hónap
  const day = dateStr.substring(4, 6);         // nap
  const hour = dateStr.substring(6, 8);        // óra
  const minute = dateStr.substring(8, 10);     // perc

  // Formázott dátum visszaadása
  return `${year}.${month}.${day} ${hour}:${minute}`;
}

const progressbarColor = (data) => {
	switch (data) {
		case "WORK":
			return "info"
		case "WAIT":
			return "warning"
		case "ERR ":
			return "danger"
		default:
			return "success"
	}
}



// HTML elem generálása a menü és adatbázis adatai alapján
const menuElement = (data, index) => {
  const lparId = `lpar-${index}`; // Egyedi azonosító az lpar számára

  // Minden subsystem megjelenítése
  const subsystems = data.subsystems.map((subsystem, subsystemIndex) => {
    const subsystemId = `subsystem-${index}-${subsystemIndex}`; // Egyedi azonosító a subsystem számára

    // Minden adatbázis és tábla megjelenítése a subsystem-en belül
    const databases = subsystem.databases.map((db, dbIndex) => {
      const dbId = `db-${index}-${subsystemIndex}-${dbIndex}`; // Egyedi azonosító az adatbázis számára
      const schemaId = `schema-${index}-${subsystemIndex}-${dbIndex}`; // Egyedi azonosító a schema számára

      // Minden táblázat megjelenítése
      const tables = db.tables.map((table, tableIndex) => {
        return `
          <li class="sidebar-item">
            <a href="#" class="sidebar-link">
              <span class="clickable" data-db="${db.dbName}" data-table="${table}" data-schema="${db.schema}" value="${table}">${table}</span>
            </a>
          </li>`;
      }).join('');

      return `
        <li class="sidebar-item">
          <a href="#" class="sidebar-link collapsed has-dropdown" data-bs-toggle="collapse"
            data-bs-target="#${dbId}" aria-expanded="false" aria-controls="${dbId}">
            <span>${db.dbName}</span>
          </a>
          <ul id="${dbId}" class="sidebar-dropdown list-unstyled collapse ps-2" data-schema="${db.schema}" id="${schemaId}">
            ${tables}
          </ul>
        </li>`;
    }).join('');

    return `
      <li class="sidebar-item">
        <a href="#" class="sidebar-link collapsed has-dropdown" data-bs-toggle="collapse"
          data-bs-target="#${subsystemId}" aria-expanded="false" aria-controls="${subsystemId}">
          <span>${subsystem.name}</span>
        </a>
        <ul id="${subsystemId}" class="sidebar-dropdown list-unstyled collapse ps-2">
          ${databases}
        </ul>
      </li>`;
  }).join('');

  return `
    <ul class="sidebar-nav p-0">
      <li class="sidebar-item">
        <a href="#" class="sidebar-link collapsed has-dropdown" data-bs-toggle="collapse"
          data-bs-target="#${lparId}" aria-expanded="false" aria-controls="${lparId}">
          <i class="lni lni-database"></i>
          <span>${data.lpar}</span>
        </a>
        <ul id="${lparId}" class="sidebar-dropdown list-unstyled collapse ps-2">
          ${subsystems}
        </ul>
      </li>
    </ul>
  `;
};

// Dinamikus keresési mező, ami dropdownként funkcionál
const searchBar = (uniqueKeys) => {
  let dropdownHTML = '<select class="form-select" id="selectedDropdown" aria-label="Dynamic Dropdown">';
  
  uniqueKeys.forEach(key => {
    dropdownHTML += `<option value="${key}">${key}</option>`;
  });
  
  dropdownHTML += '</select>';
  
  return dropdownHTML; // Visszatérési érték: dropdown HTML szerkezete
};


const getDbTitle = (schema, table) => {
	return `
		<h3 class="m-0 bg-light bg-gradient rounded d-inline p-2">${schema}.${table} Table</h3>
	`
}

const spinner = () => {
	return `
		<div class="d-flex justify-content-center">
			<div class="spinner-border magenta-spinner" role="status">
				<span class="visually-hidden">Loading...</span>
			</div>
		</div>
	`
}

const createPagination = (totalPages, currentPage) => {
  let paginationHTML = '<nav aria-label="Page navigation example"><ul class="pagination">';
  
  paginationHTML += `<li class="page-item ${currentPage === 1 ? 'disabled' : ''}"><a class="page-link" href="#" data-page="${currentPage - 1}">Previous</a></li>`;
  
  for (let i = 1; i <= totalPages; i++) {
    paginationHTML += `<li class="page-item ${i === currentPage ? 'active' : ''}"><a class="page-link" href="#" data-page="${i}">${i}</a></li>`;
  }
  
  paginationHTML += `<li class="page-item ${currentPage === totalPages ? 'disabled' : ''}"><a class="page-link" href="#" data-page="${currentPage + 1}">Next</a></li>`;
  paginationHTML += '</ul></nav>';
  
  return paginationHTML;
};