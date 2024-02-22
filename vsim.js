//import { resourcesData } from './data.js';
//`

// **** global variables ****

// resources data array
const resourcesData = [
    { id: 'twigs', lbl: 'Twigs', level: 1, makes: 'sticks' },
    { id: 'pebbles', lbl: 'Pebbles', level: 1, makes: 'stones' },
    { id: 'pine_needles', lbl: 'Pine Needles', level: 1, makes: 'leaves' },
    { id: 'sticks', lbl: 'Sticks', level: 2, makes: 'logs' },
    { id: 'stones', lbl: 'Stones', level: 2, makes: 'rocks' },
    { id: 'leaves', lbl: 'Leaves', level: 2, makes: 'brush' },
    { id: 'logs', lbl: 'Logs', level: 3, makes: 'none' },
    { id: 'rocks', lbl: 'Rocks', level: 3, makes: 'none' },
    { id: 'brush', lbl: 'Brush', level: 3, makes: 'none' },
];

// Iterate over the array and set other variables dynamically
for (let i = 0; i < resourcesData.length; i++) {
    const resourcesIndex = resourcesData[i];
    resourcesIndex.res_lbl = 'resource_' + resourcesIndex.id;
    resourcesIndex.gatherDiv = 'gather_div_' + resourcesIndex.id;
    resourcesIndex.gather_btn = 'gather_btn_' + resourcesIndex.id;
    resourcesIndex.gather_lbl = 'gather_' + resourcesIndex.id;
    // whole convert div = con_id
    resourcesIndex.con_id = 'conDiv_' + resourcesIndex.id;
    resourcesIndex.con_lbl = 'convert_' + resourcesIndex.id;
    resourcesIndex.con_btn = 'convert_btn_' + resourcesIndex.id;
    resourcesIndex.convert = 10;
    resourcesIndex.cnt = 0;
    const updates = {};
    updates.print_resources = '<span class="ltbluetxt">' + resourcesIndex.lbl + ': ' + resourcesIndex.cnt + '</span>';
    updates.print_gather = '<span class="button_orange">[ GATHER ' + resourcesIndex.lbl.toUpperCase() + ' ]';
    updates.print_gather2 = '<span class="ltgreentxt">&nbsp;+1 ' + resourcesIndex.lbl.toUpperCase();
    updates.print_convert = '<span class="ltred">' + resourcesIndex.cnt + ' / ' + resourcesIndex.convert + ' ' + resourcesIndex.lbl + '</span>';
    updates.print_convert2 = '<span class="button_orange">&nbsp;[ CONVERT TO +1 ' + resourcesIndex.makes.toUpperCase() + ' ] </span';
    // Assign updates to resourcesIndex properties
    Object.assign(resourcesIndex, updates);
}

// objects data array
const objectsData = [
    { name: 'twigs', type: 'upgrade', lbl: 'twigs', title: 'Upgrade Twigs Collection', cnt: 0, desc: '', gain: '+20% gather efficiency', costs: { 'sticks': 20, 'pebbles': 10 }, job: null, consume: null , parentID: null },
    { name: 'tribe_leader', type: 'init', lbl: 'tribe leader', title: 'BECOME TRIBE LEADER', cnt: 0, desc: '', gain: '+1 Tribe Leader', costs: null, job: null, consume: null , parentID: '' },
];

// Iterate over the array and set other variables dynamically
for (let i = 0; i < objectsData.length; i++) {
    const objectsIndex = objectsData[i];
    //objectsIndex.res_lbl = 'resource_' + objectsIndex.id;
    const objUpdates = {};
    // 000_upgrade
    objUpdates.id = objectsIndex.name + '_' + objectsIndex.type;
    objUpdates.desc = 'Use your experience in collecting ' + objectsIndex.lbl + ' to increase the efficiency of ' + objectsIndex.lbl + ' collection efforts.';
    // 000_obj_inactive
    objUpdates.add_inactive = '<span id="' + objectsIndex.name + '"_obj_inactive" class="ltred">[ ADD ]</span>';
    // 000_obj_active
    objUpdates.add_active = '<span id="' + objectsIndex.name + '"_obj_active" class="ltgreentxt">[ ADD ]</span>';
    // Assign updates to resourcesIndex properties
    Object.assign(objectsIndex, objUpdates);
}

// static assignments
objectsData[1].desc = 'Become the leader of a tribe, opening up a world of possibilities!';

// goals data array
const goals_data = [
    { id: 0, desc: '[*] Become tribe leader.', goal_req_met: false },
    { id: 1, desc: '[*] Gather 2000 Twigs.', goal_req_met: false },
    { id: 2, desc: '[*] Build an altar to recruit a new tribe member.', goal_req_met: false },
    { id: 3, desc: '[*] Convert 10 of each resource to gather new resources.', goal_req_met: false },
];

const tribeData = [
    { id: 'total_population', lbl: 'Total Population', pop: 0 },
    { id: 'tribe_leader', lbl: '-- Tribe Leader', pop: 1 },
];

// bool checks


/* innerHTML
update_print_resources = 
// RESOURCES 
'<span class="ltbluetxt">' + resource.lbl + ': ' + resource.cnt + '</span>';
// SPAN1 CONVERT
'<span class="ltred">' + resource.cnt + ' / ' + resource.convert + ' ' + resource.lbl + '</span>';
// SPAN2 CONVERT
'<span class="button_orange">&nbsp;[ CONVERT TO +1 ' + resourcesIndex.makes.toUpperCase() + ' ] </span';
// BOTH CONVERT CON_ID DIV
'<span class="ltred">' + resource.cnt + ' / ' + resource.convert + ' ' + resource.lbl + '</span>
<span class="button_orange">&nbsp;[ CONVERT TO +1 ' + resourcesIndex.makes.toUpperCase() + ' ] </span';

// ID LIST
.res_lbl = 'resource_' + resourcesIndex.id;
.gatherDiv = 'gather_div_' + resourcesIndex.id;
.gather_btn = 'gather_btn_' + resourcesIndex.id;
.gather_lbl = 'gather_' + resourcesIndex.id;
// whole convert div = con_id
.con_id = 'conDiv_' + resourcesIndex.id;
.con_lbl = 'convert_' + resourcesIndex.id;
.con_btn = 'convert_btn_' + resourcesIndex.id;
*/

// pause
function wait(seconds, callback) {
  setTimeout(callback, seconds * 1000);
}
/* Usage example: wait for 5 seconds before executing the next function
wait(5, function() {
  console.log("This code executes after waiting for 5 seconds.");
  // Add your code here for the delayed execution
}); */

// show element
function showElementID(elementId) {
    var element = document.getElementById(elementId);
    if (element) {
        element.style.display = "block";
    }
}

// hide element
function hideElementID(elementId) {
    var element = document.getElementById(elementId);
    if (element) {
        element.style.display = "none";
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
                    //hide tribe for until call
                    hideElementID('tribe_sect_id');
                    wait(0, function() { // 3
                        // start
                        update_tribe(true);
                        // check if goal alteady completed
                        const goalIdCheck = 1;
                        const check_goal = goals_data.find(goal => goal.id === goalIdCheck);
                        if (check_goal && !check_goal.goal_req_met) {
                            createGoal(1);
                        }
                    });
                    break;
                // Add more cases for other element IDs
                default:
                    console.log('No specific task defined for element with ID ' + elementId);
                    break;
            }
        });
    }
}

// TRIBE SECTION
function update_tribe(tribe_first_run) {
    
    var tribe_section = document.getElementById('tribe_sect_id');

    if (tribe_section.style.display === 'none') {
        tribe_section.style.display = 'block';
    }

    // first run
    if (tribe_section && tribe_first_run === true) {
        tribe_first_run = false;
        
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
    // next update
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

// create new elements
function createNewElement(newType, newId, newClass, content, parentID) {
    var newElement = document.createElement(newType);
    newElement.id = newId;
    newElement.style.display = "none";
    newElement.innerHTML = content;
    
    if (newClass != null) {
        newElement.className = newClass;
    }
    
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

function removeElement(elementId) {
    var element = document.getElementById(elementId);
    if (element) {
        element.parentNode.removeChild(element);
    } else {
        console.log('Element not found: ' + elementId);
    }
}

// GOALS
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
    }
}

// new objects function replacing createObject
function createObject(obj_id, parentID) {
    
    const upgradeObjects = objectsData.filter(object => object.type === 'upgrade');
        
    // Check if there are any upgrade objects
    if (upgradeObjects.length > 0) {
        upgradeObjects.forEach(upgradeObject => {

            const upgrade_container = document.createElement('div');
            upgrade_container.id = upgradeObject.id;

            // clear var if '(0)'
            if (upgradeObject.cnt === 0) {
                obj_qty = ''
            }
            
            var obj_details = obj_id + '_details';
            var obj_button = obj_id + '_button';
            var obj_costs_output = '<p class="yellowtxt">COSTS:</p>';
            var obj_job_output = '<p class="yellowtxt">CIVILIAN JOB:</p>';
            var obj_consume_output = '<p class="yellowtxt">CONSUMES:</p>';

            // costs array WIP
            if (upgradeObject.costs !== null) {
                var allItemsAvailable = true;  // Assume all items are available initially
                for (const itemName in upgradeObject.costs) {
                    current_item_cnt = upgradeObject.costs[itemName];
                    // WIP
                    var output = '<p class="ltred">' + ' ' + current_item_cnt + '/' + upgradeObject.costs[itemName] + ' ' + itemName + '</p>';
                    if (current_item_cnt >= upgradeObject.costs[itemName]) {
                        output = '<p class="ltgreentxt">' + ' ' + current_item_cnt + '/' + upgradeObject.costs[itemName] + ' ' + itemName + '</p>';
                    }
                    obj_costs_output += output;
            
                    // Check if the current item is less than its cost
                    if (current_item_cnt < upgradeObject.cnt[itemName]) {
                        allItemsAvailable = false;  // Set flag to false if any item is not available
                    }
                
                
                }
            }

            upgrade_container.innerHTML = upgradeObject.title + upgradeObject.desc + upgradeObject.gain + obj_costs_output + obj_job_output + obj_consume_output + '</div>'; // </div> to end "details"


            upgrade_section = document.getElementById('upgrade_sect_id');
            upgrade_section.appendChild(upgrade_container);

            
        });
    }
}

// *** main div sections ****

createNewElement('div', 'vsim_title', null, null, 'body');
createNewElement('div', 'goals_sect_id', null, '<p class="pinktxt">Goals:</p>', 'body');
createNewElement('div', 'tribe_sect_id', null, '<p class="divsections">TRIBE</p>', 'body');
createNewElement('div', 'tribe_leader_obj', null, null, 'tribe_sect_id');
createNewElement('div', 'resources_sect_id', null, '<p class="divsections">RESOURCES</p>', 'body');
createNewElement('div', 'gather_sect_id', null, '<p class="divsections">GATHER</p>', 'body');
createNewElement('div', 'upgrade_sect_id', null, '<p class="divsections">UPGRADE</p>', 'body');

// upgrade object
// createObject('twigs_upgrade', 'tribe_sect_id');

createNewElement('div', 'convert_sect_id', null, '<p class="divsections">CONVERT</p>', 'body');
createNewElement('div', 'convert_lvl1', null, null, 'convert_sect_id');

// **** title ****

var vsim_title = document.getElementById('vsim_title');
var vsim_h1 = document.createElement('h1');
vsim_h1.innerText = "VSIM: A village simulator.";
vsim_title.appendChild(vsim_h1);

// **** start ****

showElementID('vsim_title');
showElementID('tribe_sect_id');
addClickEvent('add_active');
createGoal(0);

    // UPGRADE
    showElementID('upgrade_sect_id');

    upgrade_section = document.getElementById('upgrade_sect_id');

    // function call
    var upgradeContainer = document.createElement('div');
    upgradeContainer.id = 'upgrade_objects';
    
    // WIP
    createObject('twigs_upgrade', 'upgrade_objects');
    upgrade_section.appendChild(upgradeContainer);


// **** Setup all elements ****

resourcesData.forEach(resource => {
    // RESOURCES
    showElementID('resources_sect_id');
    resources_section = document.getElementById('resources_sect_id');

    var resourcesContainer = document.createElement('div');
    resourcesContainer.id = resource.res_lbl;
    resourcesContainer.innerHTML = resource.print_resources;
    resources_section.appendChild(resourcesContainer);

    // hide all
    hideElementID(resource.res_lbl);
    
    // show starting resources
    showElementID('resource_twigs');

    // show/hide elements individually
    // showElementID('resource_000');

    // GATHER
    showElementID('gather_sect_id');
    gather_section = document.getElementById('gather_sect_id');

    var gatherContainer = document.createElement('div');
    gatherContainer.id = resource.gatherDiv;

    var gatherSpan1 = document.createElement('span');
    var gatherSpan2 = document.createElement('span');

    gatherSpan1.id = resource.gather_btn;
    gatherSpan1.innerHTML = resource.print_gather;

    gatherSpan2.id = resource.gather_lbl;
    gatherSpan2.innerHTML = resource.print_gather2;

    gatherContainer.appendChild(gatherSpan1);
    gatherContainer.appendChild(gatherSpan2);
    gather_section.appendChild(gatherContainer);

    // hide all
    hideElementID(resource.gatherDiv);

    // show starting resources
    showElementID('gather_div_twigs');

    // show/hide elements individually
    // showElementID('gather_div_twigs');
    
    // CONVERT
    //showElementID('convert_sect_id');
    convert_section = document.getElementById('convert_sect_id');

    var convertContainer = document.createElement('div');
    convertContainer.id = resource.con_id;
    
    var convertSpan1 = document.createElement('span');
    var convertSpan2 = document.createElement('span');

    convertSpan1.id = resource.con_lbl;
    convertSpan1.innerHTML = resource.print_convert;

    convertSpan2.id = resource.con_btn;
    convertSpan2.innerHTML = resource.print_convert2;
    
    convertContainer.appendChild(convertSpan1);
    convertContainer.appendChild(convertSpan2);
    convert_section.appendChild(convertContainer);

    // always hide these non-convertibles
    hideElementID('conDiv_logs');
    hideElementID('conDiv_rocks');
    hideElementID('conDiv_brush');

    // show starting resources
    // showElementID('conDiv_000');

    // show/hide elements individually
    // showElementID('conDiv_000');

    // hide all
    // hideElementID(resource.con_lbl);

// if hidden
//showElementID('resource_twigs');
//showElementID('gather_div_twigs');



// Adding click event listener to both buttons
document.getElementById(resource.gather_btn).addEventListener('click', function () {
    handleButtonClick(resource, 'gather');
});

document.getElementById(resource.con_id).addEventListener('click', function () {
    handleButtonClick(resource, 'convert');
});

// Single click event handler function
function handleButtonClick(resource, actionType) {
    switch (actionType) {
        case 'gather':
            resource.cnt += 1; // Increment cnt by 1
            break;
        case 'convert':
            // available conversions
            if (resource.id === 'twigs' && resource.cnt >= resource.convert) {
                resource.cnt -= resource.convert;
                resourcesData.find(res => res.id === 'sticks').cnt += 1;
            }
            if (resource.id === 'pebbles' && resource.cnt >= resource.convert) {
                resource.cnt -= resource.convert;
                resourcesData.find(res => res.id === 'stones').cnt += 1;
            }
            if (resource.id === 'pine_needles' && resource.cnt >= resource.convert) {
                resource.cnt -= resource.convert;
                resourcesData.find(res => res.id === 'leaves').cnt += 1;
            }
            if (resource.id === 'sticks' && resource.cnt >= resource.convert) {
                resource.cnt -= resource.convert;
                resourcesData.find(res => res.id === 'logs').cnt += 1;
            }
            if (resource.id === 'stones' && resource.cnt >= resource.convert) {
                resource.cnt -= resource.convert;
                resourcesData.find(res => res.id === 'rocks').cnt += 1;
            }
            if (resource.id === 'leaves' && resource.cnt >= resource.convert) {
                resource.cnt -= resource.convert;
                resourcesData.find(res => res.id === 'brush').cnt += 1;
            }
            break;
        // Add more cases as needed
    }
}

// Function to update the display
function updateDisplay(resource) {
    // resources
    document.getElementById(resource.res_lbl).innerHTML = '<span class="ltbluetxt">' + resource.lbl + ': ' + resource.cnt + '</span>';
    // convert div (2)
    if (resource.cnt >= resource.convert) {
        document.getElementById(resource.con_id).innerHTML = '<span class="ltgreentxt">' + resource.cnt + ' / ' + resource.convert + ' ' + resource.lbl + '</span><span class="button_orange">&nbsp;[ CONVERT TO +1 ' + resource.makes.toUpperCase() + ' ] </span';
    } else {
        document.getElementById(resource.con_id).innerHTML = '<span class="ltred">' + resource.cnt + ' / ' + resource.convert + ' ' + resource.lbl + '</span><span class="button_orange">&nbsp;[ CONVERT TO +1 ' + resource.makes.toUpperCase() + ' ] </span';
    }

}

// Function to update a value from the array periodically
function interval_var_updates() {
    setInterval(function () {
        // update values
        updateDisplay(resource);
        
        
    }, 200); // Set the interval in milliseconds (1000 milliseconds = 1 second)
}

// Call the function to start periodic updates
interval_var_updates();



// ...
// inside array
});
