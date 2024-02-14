//import { gatherData } from './data.js';

// **** global variables ****
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

// create new elements
function createElement(newType, newId, content, parentID) {
  var newElement = document.createElement(newType);
  newElement.id = newId;
  newElement.innerHTML = content;

  var parentElement;
  if (parentID === 'body') {
    parentElement = document.body;
  } else {
    parentElement = document.getElementById(parentID);
  }
  if (parentElement) {
    parentElement.appendChild(newElement);
  } else {
    console.error("Parent element not found with id: " + parentID);
  }
}

// GATHER options
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

// show/hide details for createObject() function 
function toggleDetails(buttonId, detailsId, title) {
    var details = document.getElementById(detailsId);
    var button = document.getElementById(buttonId);

    if (details.style.display === "none") {
        details.style.display = "block";
        button.innerHTML = '[ - ] <span class="button_orange">' + title + '</span> ';
    }
    else {
        details.style.display = "none";
        button.innerHTML = '[ + ] <span class="button_orange">' + title + '</span> ';
    }
}

// create objects function
var_obj_cnt = 0;
var_obj_add = '<span id="var_obj_add_green" class="ltred">[ ADD ]</span>';

function createObject(obj_id, obj_title, obj_desc, obj_gain, obj_costs,  obj_job, obj_consume) {
    var new_obj = document.createElement('div');
    new_obj.id = obj_id;
    if (var_obj_cnt === 0) {
        obj_qty = ''
    }
    else {
        obj_qty = '<span class="button_orange">(' + var_obj_cnt + ') </span>';
    }
    var obj_details = obj_id + '_details';
    var obj_button = obj_id + '_button';
    var obj_costs_output = '<p class="yellowtxt">COSTS:</p>';
    var obj_job_output = '<p class="yellowtxt">CIVILIAN JOB:</p>';
    
    //obj_costs array
    if (obj_costs !== null) {
        for (const item in obj_costs) {
        // 'item' will be 'Twigs' in the first iteration, and 'Pebbles' in the second
        // 'obj_costs[item]' will give you the quantity, which is 10 in both iterations
        var output = '<p class="ltred">' + ' 0' + '/' + obj_costs[item] + ' ' + item + '</p>';
        obj_costs_output += output;
        }
    }
    else {
        obj_costs_output = '';
    }
    //obj_job array
    if (obj_job !== null) {
        for (const item in obj_job) {
       var job_output = '<p class="ltred">' + ' 0' + '/' + obj_job[item] + ' ' + item + '</p>';
        obj_job_output += job_output;
        }
    }
    else {
        obj_job_output = '';
    }
    
    var obj_title_only = obj_title;

    obj_title = '<p><hr class="divider" width=30% align="left"> ' + '<span id="' + obj_button + '" onclick="toggleDetails(\'' + obj_button + '\', \'' + obj_details + '\', ' + '\'' + obj_title_only + '\')"> [ + ] <span class="button_orange"> ' + obj_title_only + ' </span></span>' + obj_qty + var_obj_add + '</p>';
  //obj_title = '<p><hr class="divider" width=30% align="left">  ' + ' <span id="' + obj_button + '" onclick="toggleDetails(' + obj_button + ', ' + obj_details + ', ' + obj_title_only + ')"> [ + ] <span class="button_orange"> ' + obj_title_only + ' </span>' + obj_qty + '</span>' + var_obj_add + '</p>';
    obj_desc = '<div id="' + obj_details + '" style="display:none">...' + obj_desc;
    obj_gain = '<p class="ltgreentxt">' + obj_gain + '</p>';
    new_obj.innerHTML = obj_title + obj_desc + obj_gain + obj_costs_output + obj_job_output + obj_consume + '</div>'; // </div> to end "details"

    section = document.getElementById('gather_sect_id');
    section.appendChild(new_obj);

}

// main div sections
createElement('div', 'vsim_title', null, 'body');
createElement('div', 'tribe_sect_id', '<p class="divsections">TRIBE</p>', 'body');

// initial object
createElement('div', 'tribe_leader_obj', null, 'tribe_sect_id');

createElement('div', 'gather_sect_id', '<p class="divsections">GATHER</p>', 'body');
var gatherSection = document.getElementById('gather_sect_id');

// **** title ****
var vsim_title = document.getElementById('vsim_title');
var vsim_h1 = document.createElement('h1');
vsim_h1.innerText = "VSIM: A village simulator.";
vsim_title.appendChild(vsim_h1);

showGatherData();
createObject('obj_tribe_leader_init', 'BECOME TRIBE LEADER', 'Become the leader of a tribe, opening up a world of possibilities!', '+1 Tribe Leader', null, null, '...consumes');
createObject('test', 'ITEM TITLE HERE', 'description', '+1 Excitement', {'Twigs':10, 'Pebbles':10}, {'Civilian:':1, 'Civ2':2}, 'consumes...');



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









      
/*
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Item Details</title>
  <style>
    .details {
      display: none;
    }
  </style>
</head>
<body>

  <div class="item">
    <button onclick="toggleDetails()">[ + ]</button> ITEM: SHARP SPEAR (0) [ ADD ]
    <div class="details" id="itemDetails">
      ...Craft sharp spears from sticks and stones.<br>
      ...Each sharpening stone will produce meat from each hunter.<br>
      +2 Meat / s<br>
      COST:<br>
      0/10 Sticks<br>
      0/10 Stones<br>
      CIVILIAN JOB:<br>
      0/1 Hunter<br>
      CONSUMES:<br>
      -1 Meat / s<br>
    </div>
  </div>

  <script>
    function toggleDetails() {
      var details = document.getElementById("itemDetails");
      var button = document.querySelector(".item button");

      if (details.style.display === "none") {
        details.style.display = "block";
        button.innerText = "[ - ]";
      } else {
        details.style.display = "none";
        button.innerText = "[ + ]";
      }
    }
  </script>

</body>
</html>



const materials = {'Twigs': 10, 'Pebbles': 10};

for (const material in materials) {
    // 'material' will be 'Twigs' in the first iteration, and 'Pebbles' in the second
    // 'materials[material]' will give you the quantity, which is 10 in both iterations
    console.log(`${material}: ${materials[material]}`);
}

*/
