//import { resourcesData } from './data.js';
//`

// **** global variables ****

var resourcesData = [
    { id: 'twigs', lbl: 'Twigs', gain: 1, level: 1, cnt: 0, convert: 10 },
    { id: 'pebbles', lbl: 'Pebbles', gain: 1, level: 1, cnt: 0, convert: 10 },
    { id: 'pine_needles', lbl: 'Pine Needles', gain: 1, level: 1, cnt: 0, convert: 10 },
    { id: 'sticks', lbl: 'Sticks', gain: 1, level: 2, cnt: 0, convert: 10 },
    { id: 'stones', lbl: 'Stones', gain: 1, level: 2, cnt: 0, convert: 10 },
    { id: 'leaves', lbl: 'Leaves', gain: 1, level: 2, cnt: 0, convert: 10 },
    { id: 'logs', lbl: 'Logs', gain: 1, level: 3, cnt: 0, convert: 10 },
    { id: 'rocks', lbl: 'Rocks', gain: 1, level: 3, cnt: 0, convert: 10 },
    { id: 'brush', lbl: 'Brush', gain: 1, level: 3, cnt: 0, convert: 10 },
];

const goals_data = [
    { id: 0, desc: '[*] Become tribe leader.', goal_req_met: false },
    { id: 1, desc: '[*] Gather 100 of each resource.', goal_req_met: false },
    { id: 2, desc: '[*] Convert 10 of each resource to gather new resources.', goal_req_met: false },
];

const tribeData = [
    { id: 'total_population', lbl: 'Total Population', pop: 0 },
    { id: 'tribe_leader', lbl: '-- Tribe Leader', pop: 1 },
];

// bool checks
var level2active = false;

// pause
function wait(seconds, callback) {
  setTimeout(callback, seconds * 1000);
}
/* Usage example: wait for 5 seconds before executing the next function
wait(5, function() {
  console.log("This code executes after waiting for 5 seconds.");
  // Add your code here for the delayed execution
}); */

// hide or show elements
function toggleElement(elementId) {
  var element = document.getElementById(elementId);

  if (element) {
    if (element.style.display === "none" || element.style.display === "") {
      element.style.display = "block"; // or any other display value for showing
    } else {
      element.style.display = "none"; // hide the table
    }
  } else {
    console.error("Element with ID " + elementId + " not found.");
  }
}

// Add an event listener to the element
function addClickEvent(elementId) {
    var element = document.getElementById(elementId);

    if (element) {
        element.addEventListener('click', function() {
            // Handle different tasks based on the element ID
            switch (elementId) {
                case 'add_active':
                    // Task for 'obj_add_active'
                    goalCompleted(0);
                    removeElement('obj_tribe_leader_init');
                    wait(2, function() {
                        addResources(['twigs']);
                        addGather('twigs');
                        addResources(['pebbles']);
                        addGather('pebbles');
                        addConvert('twigs');
                        addTribe();
                        // check if goal alteady completed
                        const goalIdCheck = 1;
                        const check_goal = goals_data.find(goal => goal.id === goalIdCheck);
                        if (check_goal && !check_goal.goal_req_met) {
                            createGoal(1);
                        }
                    });
                    break;
                case 'twigs_convert_btn':
                    handleResourceConversion('twigs', 1); // Specify the resource ID and level
                    sticks_cnt++;

                    resourcesData.forEach(item => {
                    var countElement = document.getElementById(item.id);
                        if (countElement) {
                            countElement.innerHTML = '<span class="ltbluetxt">' + item.lbl + ': ' + window[item.cnt];
                        }
                    });
                    break;
                case 'pebbles_convert_btn':
                    
                    break;
                case 'pine_needles_convert_btn':
                    
                    break;
                // Add more cases for other element IDs
                
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
//addClickEvent('obj_add_active');
// Add more addClickEvent calls for other element IDs as needed

// add new convert
function addConvert(resource_id) {
    var section = document.getElementById('convert_sect_id');

    // first run
    if (section.style.display === 'none') {
        section.style.display = 'block';
    }
    
    if (section) {
        var this_resource = resourcesData.find(item => item.id === resource_id);
        var container1 = document.createElement('p');
        container1.id = 'convert_' + this_resource.id;
        container1.className = 'ltred';
        container1.innerHTML = this_resource.cnt + ' / ' + this_resource.convert + ' ' + this_resource.lbl;
        section.appendChild(container1);


        
        
    }
}

// add new gather
function addGather(resource_id) {
    var gather = document.getElementById('gather_sect_id');

    // first run
    if (gather.style.display === 'none') {
        gather.style.display = 'block';
    }

    if (gather) {
        var this_resource = resourcesData.find(item => item.id === resource_id);
        var container1 = document.createElement('p');
        container1.id = this_resource.id;
        container1.className = 'button_orange';
        container1.innerHTML = `[ COLLECT ${resource_id.toUpperCase()} ]`;
        gather.appendChild(container1);

        container1.addEventListener('click', function() {
            this_resource.cnt += 1;

            // Update the display in resources_sect_id
            var resourceElement = document.getElementById(this_resource.id);
            if (resourceElement) {
                resourceElement.innerHTML = '<span class="ltbluetxt">' + this_resource.lbl + ': ' + this_resource.cnt + '</span>';
            }
            convert_id = 'convert_' + container1.id;
            // Update the display in convert_
            var resourceElement2 = document.getElementById(convert_id);
            if (resourceElement2) {
                if (this_resource.cnt >= this_resource.convert) {
                    resourceElement2.className = 'ltgreentxt';
                }
                resourceElement2.innerHTML = this_resource.cnt + ' / ' + this_resource.convert + ' ' + this_resource.lbl;
            }
        });

        var container2 = document.createElement('p');
        container2.id = this_resource.id + '2';
        container2.className = 'ltgreentxt';
        container2.innerHTML = `+1 ` + this_resource.lbl;
        gather.appendChild(container2);
    }
}


// add new resource
function addResources(resource_ids) {
    if (!Array.isArray(resource_ids)) {
        // If a single resource_id is provided, convert it to an array
        resource_ids = [resource_ids];
    }

    var section = document.getElementById('resources_sect_id');

    // first run
    if (section.style.display === 'none') {
        section.style.display = 'block';
    }

    if (section) {
        resource_ids.forEach(function(resource_id) {
            var dataItem = resourcesData.find(item => item.id === resource_id);
            if (dataItem) {
                var newResource = document.createElement('p');
                newResource.id = dataItem.id;
                var resource_cnt = dataItem.cnt;
                newResource.innerHTML = '<span class="ltbluetxt">' + dataItem.lbl + ': ' + resource_cnt + '</span>';
                section.appendChild(newResource);
            
                
                
                
                
            }
        });
    } else {
        console.error('Section not found: resources_sect_id');
    }
}
// Example usage
//var resourceIds = ['twigs', 'pebbles', 'pine_needles'];
//activate_resource(resourceIds);


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
function createNewElement(newType, newId, content, parentID) {
    var newElement = document.createElement(newType);
    newElement.id = newId;
    newElement.style.display = "none";
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
            var_obj_add = '<span id="add_active" class="ltgreentxt">[ ADD ]</span>';
        }
    }
    else {
        obj_costs_output = '';
        var_obj_add = '<span id="add_active" class="ltgreentxt">[ ADD ]</span>';
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
    
    // first run
    if (goal_section.style.display === 'none') {
        goal_section.style.display = 'block';
    }
    
    // Reset existing content before adding new goal
    goal_section.innerHTML = '<p class="pinktxt">Goals:</p>';
    var goalNumber = goals_data.find(goal => goal.id === goal_number);

    if (goalNumber && !goalNumber.goal_req_met) {
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

    if (goalToUpdate && !goalToUpdate.goal_req_met) {
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

// tribe section
function addTribe() {
    var section = document.getElementById('tribe_sect_id');
    if (section) {
        var total_population = 0;

        // Filter out items with id 'total_population'
        var filteredTribeData = tribeData.filter(item => item.id !== 'total_population');

        filteredTribeData.forEach(item => {
            var population = document.createElement('div');
            population.id = item.id;
            var population_amt = item.pop;
            total_population += item.pop;
            var population_lbl = item.lbl;
            population.innerHTML = `<p class="pinktxt">` + population_lbl + `: ` + population_amt + `</p>`;
            section.appendChild(population);
        });

        var total_lbl = document.createElement('p');
        total_lbl.id = 'total_lbl';
        total_lbl.className = 'ltbluetxt'; // Use className instead of class
        total_lbl.innerHTML = 'Total Population: ' + total_population;

        // Find the Tribe Leader element
        var tribeLeader = document.getElementById('tribe_leader');

        // Insert total_lbl before the Tribe Leader
        section.insertBefore(total_lbl, tribeLeader);
    }
}

// *** main div sections ****

createNewElement('div', 'vsim_title', null, 'body');
createNewElement('div', 'goals_sect_id', '<p class="pinktxt">Goals:</p>', 'body');
createNewElement('div', 'tribe_sect_id', '<p class="divsections">TRIBE</p>', 'body');

// initial object
createObject('obj_tribe_leader_init', 'BECOME TRIBE LEADER', 'Become the leader of a tribe, opening up a world of possibilities!', '+1 Tribe Leader', null, null, null, 'tribe_sect_id');

createNewElement('div', 'tribe_leader_obj', null, 'tribe_sect_id');
createNewElement('div', 'resources_sect_id', '<p class="divsections">RESOURCES</p>', 'body');
createNewElement('div', 'gather_sect_id', '<p class="divsections">GATHER</p>', 'body');
createNewElement('div', 'convert_sect_id', '<p class="divsections">CONVERT</p>', 'body');
createNewElement('div', 'convert_lvl1', null, 'convert_sect_id');

// **** title ****

var vsim_title = document.getElementById('vsim_title');
var vsim_h1 = document.createElement('h1');
vsim_h1.innerText = "VSIM: A village simulator.";
vsim_title.appendChild(vsim_h1);


// **** start ****

toggleElement('tribe_sect_id');
addClickEvent('add_active');
createGoal(0);
