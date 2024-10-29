// Eltároljuk a HTML struktúrát
const htmlTemplates = {
  // MAPDB adatbázis
  "MAPDB": {
    //Z00RCPY1 tábla
    "Z00RCPY1": (data, index) => `
      <div class="accordion ms-3 my-1" id="accordion${index}">
        <div class="accordion-item">
          <h2 class="accordion-header" id="heading${index}">
              <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse${index}" aria-expanded="false" aria-controls="collapse${index}">
                  ${data.NUMBER}
              </button>
          </h2>
          <div id="collapse${index}" class="accordion-collapse collapse" aria-labelledby="heading${index}" data-bs-parent="#accordion${index}">
            <div class="accordion-body">
              <ul class="list-group list-group-flush">
                  <li class="list-group-item">
                    <div class= "d-flex flex-column">
                      <div class= "d-flex flex-row my-3 justify-content-evenly">
                        <span class="fs-4"><span class="bg-light bg-gradient p-2 rounded">Number:</span> <span class="fw-bold">${data.NUMBER}</span></span>
                        <span class="fs-4"><span class="bg-light bg-gradient p-2 rounded">Recall Status:</span> <span class="fw-bold">${data.RECA_STATUS}</span></span>
                        <span class="fs-4"><span class="bg-light bg-gradient p-2 rounded">Recall Time:</span> <span class="fw-bold">${data.RECA_TIME}</span></span>
                      </div>
                      <div class="progress my-3">
                        <div class="progress-bar bg-${progressbarColor(data.RECA_STATUS)}" role="progressbar" style="width: 100%" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100"></div>
                      </div>
                    </div>
                  </li>
                  <li class="list-group-item">
                    <div class= "d-flex flex-column">
                      <div class= "d-flex flex-row my-3 justify-content-evenly">
                        <span class="fs-4"><span class="bg-light bg-gradient p-2 rounded">Copy 1 Status:</span> <span class="fw-bold">${data.CPY1_STATUS}</span></span>
                        <span class="fs-4"><span class="bg-light bg-gradient p-2 rounded">Copy 1 Net:</span> <span class="fw-bold">${data.CPY1_NET}</span></span>
                        <span class="fs-4"><span class="bg-light bg-gradient p-2 rounded">Copy 1 Time:</span> <span class="fw-bold">${data.CPY1_TIME}</span></span>
                      </div>
                      <div class="progress my-3">
                        <div class="progress-bar bg-${progressbarColor(data.CPY1_STATUS)}" role="progressbar" style="width: 100%" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100"></div>
                      </div>
                    </div>
                  </li>
                  <li class="list-group-item">
                    <div class= "d-flex flex-column">
                      <div class= "d-flex flex-row my-3 justify-content-evenly">
                        <span class="fs-4"><span class="bg-light bg-gradient p-2 rounded">Copy 2 Status:</span> <span class="fw-bold">${data.CPY2_STATUS}</span></span>
                        <span class="fs-4"><span class="bg-light bg-gradient p-2 rounded">Copy 2 Net:</span> <span class="fw-bold">${data.CPY2_NET}</span></span>
                        <span class="fs-4"><span class="bg-light bg-gradient p-2 rounded">Copy 2 Time:</span> <span class="fw-bold">${data.CPY2_TIME}</span></span>
                      </div>
                      <div class="progress my-3">
                        <div class="progress-bar bg-${progressbarColor(data.CPY2_STATUS)}" role="progressbar" style="width: 100%" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100"></div>
                      </div>
                    </div>
                  </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    `
  },
  // TESTDB2 adatbázis
  "TESTDB2": {
    // EMPLOYEE tábla
    "EMPLOYEE": (data, index) =>`
      <table class="table">
        <tbody>
          <tr>
            <th scope="row">${index}</th>
            <td class="text-start w-25">${data.NAME}</td>
            <td class="text-start w-25">${data.AGE}</td>
            <td class="text-start w-25">${data.POSITION}</td>
            <td class="text-start w-25">${data.SALARY}</td>
          </tr>
        </tbody>
      </table>
    `
  }
}

// Meghívjuk a kiváalsztott HTML-t
const getHtmlForDatabaseTable = (data, index, dbName, tableName) => {
  const dbTables = htmlTemplates[dbName];
  if (dbTables && dbTables[tableName]) {
    return dbTables[tableName](data, index);
  }
  return '<div>Alapértelmezett HTML</div>';
}