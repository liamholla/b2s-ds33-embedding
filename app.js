console.log("Hey, I love B2S");

// let viz = new tableau.Viz(placeholderDiv, url, options);

let viz;

// Creating variable to store the Tableau Viz
let placeholderDiv = document.getElementById("tableauViz");

//Create variable to store URl
let url =
  "https://public.tableau.com/views/EmbeddingWorkbookProfitsAcrossME-Asia/OfficeSupplyProfitsacrossMEandAsia?:language=en-GB&:display_count=n&:origin=viz_share_link";

// Create variable to give viz options
let options = {
  device: "desktop",
  height: "800px",
  width: "1100px",
};

function initViz() {
  console.log("Viz is ready!");
  viz = new tableau.Viz(placeholderDiv, url, options);
}

// Listen to the content being loaded, when finished, load the viz

document.addEventListener("DOMContentLoaded", initViz);

// Find our buttons in the html file
let exportpdfbutton = document.getElementById("exportPDF");

let exportPPTbutton = document.getElementById("exportPPT");

let filterValuesButton = document.getElementById("FilterButton");

// Listen for a click
exportpdfbutton.addEventListener("click", exportPDFfunction);

exportPPTbutton.addEventListener("click", exportPPTfunction);

filterValuesButton.addEventListener("click", getRangeValues);

// Function when button is clicked
function exportPDFfunction() {
  viz.showExportPDFDialog();
}

function exportPPTfunction() {
  viz.showExportPowerPointDialog();
}

//  Get range values
function getRangeValues() {
  const minValue = document.getElementById("minValue").value;
  const maxValue = document.getElementById("maxValue").value;
  console.log(minValue, maxValue);

  const workbook = viz.getWorkbook();

  let activeSheet = workbook.getActiveSheet();
  let sheets = activeSheet.getWorksheets();

  let sheetToFilter = sheets[0];
  console.log(sheetToFilter);

  //do the actual filtering
  sheetToFilter
    .applyRangeFilterAsync("SUM(Sales)", { min: minValue, max: maxValue })
    .then(alert("viz filtered"));
}

// Create filterValuesFunction
