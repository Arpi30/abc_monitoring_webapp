let pageSize = 5;
let currentPage = 1;
const list = "http://localhost:8080/abc_monitoring_webapp/db/list";
const search = "http://localhost:8080/abc_monitoring_webapp/db/search";
const schema = document.getElementById("schema");
const table = document.getElementById("table");
const form = document.getElementById("searchForm");
const paginationPage = document.getElementById("paginationPageSize");
const logo = document.getElementById("logo");
const paginationContainer = document.getElementById("paginationContainer");
const hamBurger = document.querySelector(".toggle-btn");
const menulist = document.getElementById("sidebar");
const dbContainer = document.getElementById("dbContainer");
const dbTitle = document.getElementById("dbTitle");
const pagination = document.querySelector('.pagination');
const dropdownContainer = document.getElementById("dropdownContainer");
let spinnerFlag = false
let lastClickedItem = null;
let currentShema = null;
let currentTable = null;
let currentDb = null;


const menu = [
  {
    lpar: "SY27",
    subsystems: [
      {
        name: "D4ES",
        databases: [
          {
            schema: "db2inst1",
            dbName: "MAPDB",
            tables: ["Z00RCPY1"]
          },
          {
            schema: "db2inst1",
            dbName: "TESTDB2",
            tables: ["EMPLOYEE"]
          }
        ]
      }
    ]
  }
];
