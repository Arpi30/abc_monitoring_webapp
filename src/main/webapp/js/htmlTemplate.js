//Coloring the progressbar in the row of response
const progressbarColor = (data) => {
  switch (data) {
    case 'TBD ':
      return 'secondary';
    case 'WORK':
      return 'info';
    case 'ERR ':
      return 'danger';
    default:
      return 'success';
  }
};

//Making static progressbar with Mapdb datas
const staticData = (data) => {
  let statusData = data["statusCounts"]
  //Return the row status and calculating the percentage progressbar width propertie
  const getStatusWidth = (statusType, statusKey) => {
    const total =
      statusData[statusType].TBD +
      statusData[statusType].DONE +
      statusData[statusType].WORK +
      statusData[statusType].ERR;
    return total === 0 ? 0 : Math.round((statusData[statusType][statusKey] / total) * 100);
  };
  //Get the number of status via responsed data keys
  const getStatusLabel = (statusType, statusKey) => {
    return statusData[statusType][statusKey] || 0;
  };

  return `
    <div id="progressbarContainer">
      <div class="status-group">
        <div class="status-label" data-info="TBD: ${getStatusLabel("CPY1_STATUS", "TBD")}, DONE: ${getStatusLabel("RECA_STATUS", "DONE")}, WORK: ${getStatusLabel("RECA_STATUS", "WORK")}, ERR: ${getStatusLabel("RECA_STATUS", "ERR")}">Recall Status</div>
        <div class="progress RECA_STATUS">
          <div class="progress-bar bg-${progressbarColor('TBD ')}" role="progressbar" style="width: ${getStatusWidth("RECA_STATUS", "TBD")}%;" aria-valuenow="${getStatusWidth("RECA_STATUS", "TBD")}" aria-valuemin="0" aria-valuemax="100"></div>
          <div class="progress-bar bg-${progressbarColor('DONE')}" role="progressbar" style="width: ${getStatusWidth("RECA_STATUS", "DONE")}%;" aria-valuenow="${getStatusWidth("RECA_STATUS", "DONE")}" aria-valuemin="0" aria-valuemax="100"></div>
          <div class="progress-bar bg-${progressbarColor('WORK')}" role="progressbar" style="width: ${getStatusWidth("RECA_STATUS", "WORK")}%;" aria-valuenow="${getStatusWidth("RECA_STATUS", "WORK")}" aria-valuemin="0" aria-valuemax="100"></div>
          <div class="progress-bar bg-${progressbarColor('ERR ')}" role="progressbar" style="width: ${getStatusWidth("RECA_STATUS", "ERR")}%;" aria-valuenow="${getStatusWidth("RECA_STATUS", "ERR")}" aria-valuemin="0" aria-valuemax="100"></div>
        </div>
      </div>

      <div class="status-group">
        <div class="status-label" data-info="TBD: ${getStatusLabel("CPY1_STATUS", "TBD")}, DONE: ${getStatusLabel("CPY1_STATUS", "DONE")}, WORK: ${getStatusLabel("CPY1_STATUS", "WORK")}, ERR: ${getStatusLabel("CPY1_STATUS", "ERR ")}">Copy1 Status</div>
        <div class="progress CPY1_STATUS">
          <div class="progress-bar bg-${progressbarColor('TBD ')}" role="progressbar" style="width: ${getStatusWidth("CPY1_STATUS", "TBD")}%;" aria-valuenow="${getStatusWidth("CPY1_STATUS", "TBD")}" aria-valuemin="0" aria-valuemax="100"></div>
          <div class="progress-bar bg-${progressbarColor('DONE')}" role="progressbar" style="width: ${getStatusWidth("CPY1_STATUS", "DONE")}%;" aria-valuenow="${getStatusWidth("CPY1_STATUS", "DONE")}" aria-valuemin="0" aria-valuemax="100"></div>
          <div class="progress-bar bg-${progressbarColor('WORK')}" role="progressbar" style="width: ${getStatusWidth("CPY1_STATUS", "WORK")}%;" aria-valuenow="${getStatusWidth("CPY1_STATUS", "WORK")}" aria-valuemin="0" aria-valuemax="100"></div>
          <div class="progress-bar bg-${progressbarColor('ERR ')}" role="progressbar" style="width: ${getStatusWidth("CPY1_STATUS", "ERR")}%;" aria-valuenow="${getStatusWidth("CPY1_STATUS", "ERR")}" aria-valuemin="0" aria-valuemax="100"></div>
        </div>
      </div>

      <div class="status-group">
        <div class="status-label" data-info="TBD: ${getStatusLabel("CPY1_STATUS", "TBD")}, DONE: ${getStatusLabel("CPY2_STATUS", "DONE")}, WORK: ${getStatusLabel("CPY2_STATUS", "WORK")}, ERR: ${getStatusLabel("CPY2_STATUS", "ERR ")}">Copy2 Status</div>
        <div class="progress CPY2_STATUS">
          <div class="progress-bar bg-${progressbarColor('TBD ')}" role="progressbar" style="width: ${getStatusWidth("CPY2_STATUS", "TBD")}%;" aria-valuenow="${getStatusWidth("CPY2_STATUS", "TBD")}" aria-valuemin="0" aria-valuemax="100"></div>
          <div class="progress-bar bg-${progressbarColor('DONE')}" role="progressbar" style="width: ${getStatusWidth("CPY2_STATUS", "DONE")}%;" aria-valuenow="${getStatusWidth("CPY2_STATUS", "DONE")}" aria-valuemin="0" aria-valuemax="100"></div>
          <div class="progress-bar bg-${progressbarColor('WORK')}" role="progressbar" style="width: ${getStatusWidth("CPY2_STATUS", "WORK")}%;" aria-valuenow="${getStatusWidth("CPY2_STATUS", "WORK")}" aria-valuemin="0" aria-valuemax="100"></div>
          <div class="progress-bar bg-${progressbarColor('ERR ')}" role="progressbar" style="width: ${getStatusWidth("CPY2_STATUS", "ERR")}%;" aria-valuenow="${getStatusWidth("CPY2_STATUS", "ERR")}" aria-valuemin="0" aria-valuemax="100"></div>
        </div>
      </div>
    </div>
  `;
};


//Generate HTML element based on menu and database data
const menuElement = (data, index) => {
  //Unique identifier for the LPAR
  const lparId = `lpar-${index}`;

  //Show all subsystems
  const subsystems = data.subsystems.map((subsystem, subsystemIndex) => {
    //Unique identifier for the subsystem
    const subsystemId = `subsystem-${index}-${subsystemIndex}`; 

    //Display all databases and tables within the subsystem
    const databases = subsystem.databases.map((db, dbIndex) => {
      //Unique identifier for the database
      const dbId = `db-${index}-${subsystemIndex}-${dbIndex}`;
      //Unique identifier for the shema
      const schemaId = `schema-${index}-${subsystemIndex}-${dbIndex}`;

      //Show all tables
      const tables = db.tables.map((table, tableIndex) => {
        return `
          <li class="sidebar-item">
            <a href="#" class="sidebar-link">
              <span class="clickable" data-db="${db.dbName}" data-table="${table}" data-schema="${db.schema}" data-jndiName="${db.jndiName}" value="${table}">${table}</span>
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

//Dynamic search field that acts as a dropdown
const searchBar = (uniqueKeys) => {
  let dropdownHTML = '<select class="form-select" id="selectedDropdown" aria-label="Dynamic Dropdown">';
  
  uniqueKeys.forEach(key => {
    dropdownHTML += `<option value="${key}">${key}</option>`;
  });
  dropdownHTML += '</select>';
  //Return value: dropdown HTML structure
  return dropdownHTML;
};
//Making the dynamic Title of database and table
const getDbTitle = (schema, table) => {
	return `
		<h3 class="m-0 bg-light bg-gradient rounded d-inline px-2">${schema}.${table} Table</h3>
	`
}
//Making the spinner HTML
const spinner = () => {
	return `
		<div class="d-flex justify-content-center">
			<div class="spinner-border magenta-spinner" role="status">
				<span class="visually-hidden">Loading...</span>
			</div>
		</div>
	`
}
  //Create Pagination HTML with the page parameters
const createPagination = (totalPages, currentPage) => {
  let paginationHTML = '<nav aria-label="Page navigation example"><ul class="pagination">';

  //Previous button
  paginationHTML += `<li class="page-item ${currentPage === 1 ? 'disabled' : ''}"><a class="page-link" href="#" data-page="${currentPage - 1}">Previous</a></li>`;

  //The first 5 page
  for (let i = 1; i <= Math.min(5, totalPages); i++) {
    paginationHTML += `<li class="page-item ${i === currentPage ? 'active' : ''}"><a class="page-link" href="#" data-page="${i}">${i}</a></li>`;
  }

  //Points to indicate intermediate pages if the current page is beyond page 5
  if (currentPage > 5 && currentPage <= totalPages - 2) {
    paginationHTML += `<li class="page-item disabled"><span class="page-link">...</span></li>`;
  }

  //Dynamic display of the current page and surrounding pages if the current page is more than 5
  const start = Math.max(6, currentPage - 1);
  const end = Math.min(totalPages - 2, currentPage + 1);
  for (let i = start; i <= end; i++) {
    paginationHTML += `<li class="page-item ${i === currentPage ? 'active' : ''}"><a class="page-link" href="#" data-page="${i}">${i}</a></li>`;
  }

  //Points before the last two pages
  if (currentPage < totalPages - 2 && end < totalPages - 2) {
    paginationHTML += `<li class="page-item disabled"><span class="page-link">...</span></li>`;
  }

  //The last 2 pages
  for (let i = Math.max(totalPages - 1, 6); i <= totalPages; i++) {
    paginationHTML += `<li class="page-item ${i === currentPage ? 'active' : ''}"><a class="page-link" href="#" data-page="${i}">${i}</a></li>`;
  }

  //Next button
  paginationHTML += `<li class="page-item ${currentPage === totalPages ? 'disabled' : ''}"><a class="page-link" href="#" data-page="${currentPage + 1}">Next</a></li>`;
  paginationHTML += '</ul></nav>';

  return paginationHTML;
};