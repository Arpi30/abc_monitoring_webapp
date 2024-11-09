// Pages global variable
let pageSize = 40;
let currentPage = 1;

//It will be the webspahre server ip Address
//https://53.113.100.157:20906/


//Localhost endpoints
//const list = "http://localhost:8080/abc_monitoring_webapp/api/db/list";
//const search = "http://localhost:8080/abc_monitoring_webapp/api/db/search";
//Websphere endpoints
const list = "https://53.113.100.157/abc_monitoring_webapp/api/db/list";
const search = "https://53.113.100.157/abc_monitoring_webapp/api/db/search";

//-----------------------------------------------------------------------------------//
//Selected HTML tags
const schema = document.getElementById("schema");
const table = document.getElementById("table");
const form = document.getElementById("searchForm");
const paginationPage = document.getElementById("paginationPageSize");
const logo = document.getElementById("logo");
const paginationContainer = document.getElementById("paginationContainer");
const hamBurger = document.querySelector(".toggle-btn");
const menulist = document.getElementById("sidebar");
const sidebarLinks = document.getElementsByClassName("sidebar-link")
const dbContainer = document.getElementById("dbContainer");
const dbTitle = document.getElementById("dbTitle");
const pagination = document.querySelector('.pagination');
const dropdownContainer = document.getElementById("dropdownContainer");
const mapdbSaticData = document.getElementById("staticData");
const searchInput = document.getElementById("searchInput");
//-----------------------------------------------------------------------------------//

//-----------------------------------------------------------------------------------//
//Global variables
let spinnerFlag = false;
let isSearchMode = false;
let lastClickedItem = null;
let currentShema = null;
let currentTable = null;
let currentDb = null;
let globalJndiName = "";
//Regex validation to search function
const maxCharacterRegex = /^[a-zA-Z0-9#\-:\s]{0,15}$/;
//-----------------------------------------------------------------------------------//

//Menu array
const menu = [
  {
    lpar: "SY27",
    subsystems: [
      {
        name: "DSE4",
        databases: [
          {
            schema: "D$PZ00",
            dbName: "MAPDB",
            jndiName: "jdbc/sy27conn.db",
            tables: ["Z00RCPY1"]
          }
        ]
      }
    ]
  }
];

console.log("htmlElement.js is loaded");

