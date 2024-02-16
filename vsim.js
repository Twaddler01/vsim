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

const goals_data = [
    { id: 0, desc: '[*] Become tribe leader.', goal_req_met: false },
    { id: 1, desc: '[*] Gather 100 of each resource.', goal_req_met: false },
    { id: 2, desc: 'goal3 description', goal_req_met: false },
    // add more levels here
];

function wait(seconds, callback) {
  setTimeout(callback, seconds * 1000);
}

/*
// Usage example: wait for 5 seconds before executing the next function
wait(5, function() {
  console.log("This code executes after waiting for 5 seconds.");
  // Add your code here for the delayed execution
}); */

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
function showGatherDetails(levelNumber) {
  var gatherSection = document.getElementById('gather_sect_id');

  gatherData.forEach(item => {
    var collectBtn = document.createElement('div');
    collectBtn.innerHTML = `<span id="collect" class="button_orange level-${item.level}">[ COLLECT ${item.collect_btn.toUpperCase()} ]</span>`;
    var gather_id = 'collect_' + item.collect_btn;

    var gainInfo = document.createElement('div');
    gainInfo.innerHTML = `<span class="ltgreentxt level-${item.level}">+${item.gain} ${item.collect_btn}</span>`;

    gatherSection.appendChild(collectBtn);
    gatherSection.appendChild(gainInfo);

    collectBtn.style.display = item.level === levelNumber ? 'block' : 'none';
    gainInfo.style.display = item.level === levelNumber ? 'block' : 'none';
  });

  var allLevelElements = document.querySelectorAll('.level');
  allLevelElements.forEach(element => {
    element.classList.remove('active'); // Remove 'active' class from all levels
  });

  var selectedLevel = document.querySelector('.level-' + levelNumber);
  if (selectedLevel) {
    selectedLevel.classList.add('active'); // Add 'active' class to the selected level
  } else {
    console.error('Level not found: level-' + levelNumber);
  }
}

// create objects function
var_obj_cnt = 0;
var_obj_add = '<span id="var_obj_inactive" class="ltred">[ ADD ]</span>';

function createObject(obj_id, obj_title, obj_desc, obj_gain, obj_costs,  obj_job, obj_consume, obj_parent) {
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
    var obj_consume_output = '<p class="yellowtxt">CONSUMES:</p>';
    
    //obj_costs array
    if (obj_costs !== null) {
        var allItemsAvailable = true;  // Assume all items are available initially
        for (const itemName in obj_costs) {
            current_item = window[itemName + '_cnt'];
            var output = '<p class="ltred">' + ' ' + current_item + '/' + obj_costs[itemName] + ' ' + itemName + '</p>';
            if (current_item >= obj_costs[itemName]) {
                output = '<p class="ltgreentxt">' + ' ' + current_item + '/' + obj_costs[itemName] + ' ' + itemName + '</p>';
            }
            obj_costs_output += output;
    
            // Check if the current item is less than its cost
            if (current_item < obj_costs[itemName]) {
                allItemsAvailable = false;  // Set flag to false if any item is not available
            }
        }
    
        // Check if all items are available after the loop
        if (allItemsAvailable) {
            // Change [ ADD ] to green and allow purchase
            var_obj_add = '<span id="var_obj_active" class="ltgreentxt">[ ADD ]</span>';
        }
    }
    else {
        obj_costs_output = '';
        var_obj_add = '<span id="var_obj_active" class="ltgreentxt">[ ADD ]</span>';
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
    //obj_consume array
    if (obj_consume !== null) {
        for (const item in obj_consume) {
        var obj_consume = '<p class="ltred">' + ' 0' + '/' + obj_consume[item] + ' ' + item + '</p>';
        obj_consume_output += obj_consume;
        }
    }
    else {
        obj_consume_output = '';
    }
    
    var obj_title_only = obj_title;

    obj_title = '<p><hr class="divider" width=30% align="left"> ' + '<span id="' + obj_button + '" onclick="toggleDetails(\'' + obj_button + '\', \'' + obj_details + '\', ' + '\'' + obj_title_only + '\')"> [ + ] <span class="button_orange"> ' + obj_title_only + ' </span></span>' + obj_qty + var_obj_add + '</p>';
    obj_desc = '<div id="' + obj_details + '" style="display:none">...' + obj_desc;
    obj_gain = '<p class="ltgreentxt">' + obj_gain + '</p>';
    new_obj.innerHTML = obj_title + obj_desc + obj_gain + obj_costs_output + obj_job_output + obj_consume_output + '</div>'; // </div> to end "details"

    section = document.getElementById(obj_parent);
    section.appendChild(new_obj);

}

function removeElement(elementId) {
    var element = document.getElementById(elementId);
    if (element) {
        element.parentNode.removeChild(element);
    } else {
        console.log('Element not found: ' + elementId);
    }
}

// goals
function createGoal(goal_number) {
    var goal_section = document.getElementById('goals_sect_id');
    
    // Reset existing content before adding new goal
    goal_section.innerHTML = '<p class="pinktxt">Goals:</p>';
    var goalNumber = goals_data.find(goal => goal.id === goal_number);

    if (goalNumber) {
        var newGoal = document.createElement('div');
        newGoal.id = 'goal_' + goalNumber.id;
    
        var goalContent_desc = document.createElement('p');
        goalContent_desc.textContent = goalNumber.desc;

        newGoal.appendChild(goalContent_desc);
        goal_section.appendChild(newGoal);
    }
    else {
        console.error('No goal matched the goals_data array.');
    }
}

function goalCompleted(goalId) {
    var goal_section = document.getElementById('goals_sect_id');

    // Find the goal in the goals_data array based on its ID
    var goalToUpdate = goals_data.find(goal => goal.id === goalId);

    if (goalToUpdate) {
        // Update the goal_req_met property
        goalToUpdate.goal_req_met = true;

        // Create a new goal element with the updated description and styling
        var updatedGoalElement = document.createElement('div');
        updatedGoalElement.id = 'goal_' + goalToUpdate.id;

        var goalContent_desc = document.createElement('p');
        goalContent_desc.textContent = goalToUpdate.desc;

        updatedGoalElement.appendChild(goalContent_desc);

        goalContent_desc.classList.add('crossed-out');

        // Add a new paragraph with the word "COMPLETE" and a class
        var completeParagraph = document.createElement('p');
        completeParagraph.textContent = ' (COMPLETE)';
        completeParagraph.classList.add('ltgreentxt'); // Add your class name here
        completeParagraph.style.display = 'inline';
        updatedGoalElement.appendChild(completeParagraph);

        // Replace the existing goal element in the DOM
        var existingGoalElement = document.getElementById('goal_' + goalId);
        if (existingGoalElement) {
            existingGoalElement.replaceWith(updatedGoalElement);
        } else {
            // If the existing goal element is not found, append the updated one
            goal_section.appendChild(updatedGoalElement);
        }
    } else {
        console.error('Goal with ID ' + goalId + ' not found in goals_data array.');
    }
}

// Example usage
//goalCompleted(0); // Replace 0 with the desired goal ID

// Example usage: Assuming you want to update the description for goal with ID 0
// Make sure createGoal is called before goalCompleted
//createGoal();
//goalCompleted(0);

// global variables
var Twigs_cnt = 57;
var Pebbles_cnt = 69;
var PineNeedles_cnt = 0;
var Sticks_cnt = 0;
var Stones_cnt = 0;
var Leaves_cnt = 0;
var TribeLeader_cnt = 1;

// *** main div sections ****

createElement('div', 'vsim_title', null, 'body');
createElement('div', 'goals_sect_id', '<p class="pinktxt">Goals:</p>', 'body');
createElement('div', 'tribe_sect_id', '<p class="divsections">TRIBE</p>', 'body');

// initial object
createObject('obj_tribe_leader_init', 'BECOME TRIBE LEADER', 'Become the leader of a tribe, opening up a world of possibilities!', '+1 Tribe Leader', null, null, null, 'tribe_sect_id');

createElement('div', 'tribe_leader_obj', null, 'tribe_sect_id');
createElement('div', 'resources_sect_id', '<p class="divsections">RESOURCES</p>', 'body');
createElement('div', 'gather_sect_id', '<p class="divsections">GATHER</p>', 'body');
// gather object...SEE showGatherData()

createElement('div', 'convert_sect_id', '<p class="divsections">CONVERT</p>', 'body');
createElement('div', 'craft_sect_id', '<p class="divsections">CRAFT</p>', 'body');

// craft objects
//createObject('test', 'ITEM TITLE HERE', 'description', '+1 Excitement', {'Twigs':10, 'Pebbles':10}, {'Civilian:':1, 'Civ2':2}, {'Comsume1':1}, 'craft_sect_id');

// **** title ****

var vsim_title = document.getElementById('vsim_title');
var vsim_h1 = document.createElement('h1');
vsim_h1.innerText = "VSIM: A village simulator.";
vsim_title.appendChild(vsim_h1);

// add resource to resource section
function activate_resource(resource_names) {
  if (!Array.isArray(resource_names)) {
    // If a single resource_name is provided, convert it to an array
    resource_names = [resource_names];
  }

  var section = document.getElementById('resources_sect_id');

  if (section) {
    resource_names.forEach(function(resource_name) {
      var newResource = document.createElement('p');
      newResource.id = resource_name;
      var resource_cnt = window[resource_name + '_cnt'];
      newResource.innerHTML = '<span class="ltbluetxt">' + resource_name + ': ' + resource_cnt + '</span>';
      section.appendChild(newResource);
    });
  } else {
    console.error('Section not found: resources_sect_id');
  }
}

//event listeners
addClickEvent('var_obj_active');
//var obj_add_active = document.getElementById('var_obj_active');
/*
// Add an event listener to the element
obj_add_active.addEventListener('click', function() {
    goalCompleted(0);
    removeElement('obj_tribe_leader_init');
    wait(2, function() { // 5
        // activate init resources
        activate_resource(['Twigs', 'Pebbles', 'PineNeedles']);
        showGatherDetails(1);
        createGoal(1);
    });
});*/

// Add an event listener to the element
function addClickEvent(elementId) {
    var element = document.getElementById(elementId);

    if (element) {
        element.addEventListener('click', function() {
            // Handle different tasks based on the element ID
            switch (elementId) {
                case 'var_obj_active':
                    // Task for 'obj_add_active'
                    goalCompleted(0);
                    removeElement('obj_tribe_leader_init');
                    wait(2, function() {
                        activate_resource(['Twigs', 'Pebbles', 'PineNeedles']);
                        showGatherDetails(1);
                        createGoal(1);
                    });
                    break;

                // Add more cases for other element IDs
                case 'another_element_id':
                    // Task for 'another_element_id'
                    // ...
                    break;

                default:
                    console.log('No specific task defined for element with ID ' + elementId);
                    break;
            }
        });
    } else {
        console.error('Element with ID ' + elementId + ' not found.');
    }
}

// Example usage
//setupClickEventForId('obj_add_active');
// Add more setupClickEventForId calls for other element IDs as needed





// **** start--WIP ****

createGoal(0);









// For testing
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
______

const materials = {'Twigs': 10, 'Pebbles': 10};

for (const material in materials) {
    // 'material' will be 'Twigs' in the first iteration, and 'Pebbles' in the second
    // 'materials[material]' will give you the quantity, which is 10 in both iterations
    console.log(`${material}: ${materials[material]}`);
}
______

// obj_costs array
if (obj_costs !== null) {
    for (const item in obj_costs) {
        // 'item' will be 'Twigs' in the first iteration, and 'Pebbles' in the second
        // 'obj_costs[item]' will give you the quantity, which is 10 in both iterations

        // WIP
        window['obj_cost_' + item] = obj_costs[item];
        console.log(obj_costs[item]);
    }
}





if (obj_costs !== null) {
    var allItemsAvailable = true;  // Assume all items are available initially
    for (const itemName in obj_costs) {
        current_item = window[itemName + '_cnt'];
        var output = '<p class="ltred">' + ' ' + current_item + '/' + obj_costs[itemName] + ' ' + itemName + '</p>';
        if (current_item >= obj_costs[itemName]) {
            output = '<p class="ltgreentxt">' + ' ' + current_item + '/' + obj_costs[itemName] + ' ' + itemName + '</p>';
        }
        obj_costs_output += output;

        // Check if the current item is less than its cost
        if (current_item < obj_costs[itemName]) {
            allItemsAvailable = false;  // Set flag to false if any item is not available
        }
    }

    // Check if all items are available after the loop
    if (allItemsAvailable) {
        // Change [ ADD ] to green and allow purchase
        var_obj_add = '<span id="var_obj_add_green" class="ltgreen">[ ADD ]</span>';
    }
}





function goalCompleted(goalId) {
    var goal_section = document.getElementById('goals_sect_id');

    // Find the goal in the goals_data array based on its ID
    var goalToUpdate = goals_data.find(goal => goal.id === goalId);

    if (goalToUpdate) {
        // Update the goal_req_met property
        goalToUpdate.goal_req_met = true;

        // Create a new goal element with the updated description and styling
        var updatedGoalElement = document.createElement('div');
        updatedGoalElement.id = 'goal_' + goalToUpdate.id;

        var goalContent_desc = document.createElement('p');
        goalContent_desc.textContent = goalToUpdate.desc;

        updatedGoalElement.appendChild(goalContent_desc);

        // Apply crossed-out styling if goal_req_met is true
        if (goalToUpdate.goal_req_met === true) {
            goalContent_desc.classList.add('crossed-out');

            // Add a new paragraph with the word "COMPLETE" and a class
            var completeParagraph = document.createElement('p');
            completeParagraph.textContent = ' (COMPLETE)';
            completeParagraph.classList.add('ltgreentxt'); // Add your class name here
            completeParagraph.style.display = 'inline';
            updatedGoalElement.appendChild(completeParagraph);
        }

        // Replace the existing goal element in the DOM
        var existingGoalElement = document.getElementById('goal_' + goalId);
        if (existingGoalElement) {
            existingGoalElement.replaceWith(updatedGoalElement);
        } else {
            // If the existing goal element is not found, append the updated one
            goal_section.appendChild(updatedGoalElement);
        }
    } else {
        console.error('Goal with ID ' + goalId + ' not found in goals_data array.');
    }
}

// Example usage
goalCompleted(0); // Replace 0 with the desired goal ID

*/
