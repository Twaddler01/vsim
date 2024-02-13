import { gatherData } from './data.js';

// **** title ****

var vsim_title = document.getElementById('vsim_title');
var vsim_h1 = document.createElement('h1');
vsim_h1.innerText = "VSIM: A village simulator.";
vsim_title.appendChild(vsim_h1);

// **** global variables ****

// create sections
function createElement(newType, newId, content) {
  var newElement = document.createElement(newType);
  newElement.id = newId;
  newElement.innerHTML = content;
  document.body.appendChild(newElement);
}

// sections
createElement('div', 'gather_sect_id', '<p class="divsections">GATHER</p>');
var gatherSection = document.getElementById('gather_sect_id');

// obj creation
var gatherData = [
  { collect_btn: 'Twigs', gain: 1, level: 1 },
  { collect_btn: 'Pebbles', gain: 1, level: 1 },
  { collect_btn: 'Pine Needles', gain: 1, level: 1 },
  { collect_btn: 'Sticks', gain: 1, level: 2 },
  { collect_btn: 'Stones', gain: 1, level: 2 },
  { collect_btn: 'Leaves', gain: 1, level: 2 },
  { collect_btn: 'Logs', gain: 1, level: 3 },
  { collect_btn: 'Rocks', gain: 1, level: 3 },
  { collect_btn: 'Brush', gain: 1, level: 3 },
  // add more levels here
];

function showGatherData() {
    gatherData.forEach(item => {
      var collectBtn = document.createElement('div');
      collectBtn.innerHTML = `<span class="button_orange level-${item.level}">[ COLLECT ${item.collect_btn.toUpperCase()} ]</span>`;
    
      var gainInfo = document.createElement('div');
      gainInfo.innerHTML = `<span class="ltgreentxt level-${item.level}">+${item.gain} ${item.collect_btn}</span>`;
    
      gatherSection.appendChild(collectBtn);
      gatherSection.appendChild(gainInfo);
    });
}

showGatherData();

// switch to next level as game progresses
function toggleLevels() {
  var level1Elements = document.querySelectorAll('.level-1');
  var level2Elements = document.querySelectorAll('.level-2');
  //var level3Elements = document.querySelectorAll('.level-3');

  gatherSection.classList.toggle('active');
  level1Elements.forEach(element => {
    element.style.display = gatherSection.classList.contains('active') ? 'none' : 'inline-block';
  });
  level2Elements.forEach(element => {
    element.style.display = gatherSection.classList.contains('active') ? 'inline-block' : 'none';
  });
  //level3Elements.forEach(element => {
    //element.style.display = gatherSection.classList.contains('active') ? 'inline-block' : 'none';
  //});
}




// *** For testing
function toggleElement(elementId) {
  var element = document.getElementById(elementId);

  if (element) {
    if (element.style.display === "none" || element.style.display === "") {
      element.style.display = "table"; // or any other display value for showing
    } else {
      element.style.display = "none"; // hide the table
    }
  } else {
    console.error("Element with ID " + elementId + " not found.");
  }
}





















