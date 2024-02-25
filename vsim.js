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
    { 
    name: 'Twigs', 
    type: 'upgrade', 
    lbl: 'twigs', 
    title: 'Upgrade Twigs Collection', 
    cnt: 0, 
    desc: '', 
    gain: '+20% gather efficiency', 
    costs: { 'Twigs': 20, 'Pebbles': 10 }, 
    job: null, 
    consume: null , 
    parentID: null, 
    // id, desc, add_active, add_inactive
    // details, button, costs_output, job_lbl, consume_lbl
    },
    { name: 'tribe_leader', type: 'init', lbl: 'tribe leader', title: 'BECOME TRIBE LEADER', cnt: 0, desc: '', gain: '+1 Tribe Leader', costs: null, job: null, consume: null , parentID: '' },
];

// Iterate over the array and set other variables dynamically
for (let i = 0; i < objectsData.length; i++) {
    const objectsIndex = objectsData[i];
    //objectsIndex.res_lbl = 'resource_' + objectsIndex.id;
    const objUpdates = {};
    // 000_upgrade
    // function: add_button_active, add_button_inactive 
    objUpdates.id = objectsIndex.name + '_' + objectsIndex.type;
    objUpdates.desc = 'Use your experience in collecting ' + objectsIndex.lbl + ' to increase the efficiency of ' + objectsIndex.lbl + ' collection efforts.';
    objUpdates.details = objectsIndex.name + '_' + objectsIndex.type + '_details';
    objUpdates.button = objectsIndex.name + '_' + objectsIndex.type + '_button';
    objUpdates.add_button = objectsIndex.name + '_' + objectsIndex.type + '_add_button';
    objUpdates.add_button_lbl = '<span class="ltred" id="' + objectsIndex.name + '_' + objectsIndex.type + '_add_button' + '">[ ADD ]</span>';
    objUpdates.costs_lbl = '<p class="yellowtxt">COSTS:</p>';
    objUpdates.print_costs = '';
    objUpdates.job_lbl = '<p class="yellowtxt">CIVILIAN JOB:</p>';
    objUpdates.consume_lbl = '<p class="yellowtxt">CONSUMES:</p>';
    // Assign updates to resourcesIndex properties
    Object.assign(objectsIndex, objUpdates);
}

// TESTING
resourcesData[0].cnt = 55;
resourcesData[1].cnt = 44;

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
.res_lbl = 'resource_000' + resourcesIndex.id;
.gatherDiv = 'gather_div_000' + resourcesIndex.id;
.gather_btn = 'gather_btn_000' + resourcesIndex.id;
.gather_lbl = 'gather_000' + resourcesIndex.id;
// createObject vars
.details = 000_upgrade + '_details';
.button = 000_upgrade + '_button';

// whole convert div = con_id
.con_id = 'conDiv_000' + resourcesIndex.id;
.con_lbl = 'convert_000' + resourcesIndex.id;
.con_btn = 'convert_btn_000' + resourcesIndex.id;
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
        button.innerHTML = '[ - ] <span class="button_orange">' + title + '&nbsp;</span> ';
    }
    else {
        details.style.display = "none";
        button.innerHTML = '[ + ] <span class="button_orange">' + title + '&nbsp;</span> ';
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

// **** Setup all elements ****

// OBJECTS

// *** OBJECTS UPGRADE DATA
showElementID('upgrade_sect_id');
upgrade_section = document.getElementById('upgrade_sect_id');

objectsData
  .filter(object => object.type === 'upgrade')
  .forEach(upgradeObject => {
    
    // ITERATION DATA
    
    upgradeObject.print_costs = '';

    // Adding all objects
    var upgrade_container = document.createElement('div');
    upgrade_container.id = upgradeObject.id;
    upgrade_section.appendChild(upgrade_container);
    var costs_lbl = document.createElement('div');
    costs_lbl.innerHTML = upgradeObject.costs_lbl;
    upgrade_container.appendChild(costs_lbl);

    // Display costs data
    const object_costs = upgradeObject.costs;

    for (const item in object_costs) {
        const value = object_costs[item];

        // Find the corresponding resource in current_resources_cnt
        const resource = resourcesData.find(r => r.lbl === item);

        if (resource) {
            // print the data
            const currentPrint = `${resource.cnt}/${value} ${item}`;
            upgradeObject.print_costs += currentPrint + '<br>';  // Concatenate values

            // Display the result
            var print_costs_lbl = document.createElement('div');
            upgrade_container.appendChild(print_costs_lbl);
            print_costs_lbl.id = upgradeObject.id + '_print_test';
    }
}

}); // *** END: OBJECTS UPGRADE DATA





// RESOURCES DATA
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
    showElementID('resource_pebbles');

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
    showElementID('gather_div_pebbles');

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
        // update object resources available from resourcesData.cnt -> objectsData.current_resources
        //update_objectsDataCNT();
        
    }, 200); // Set the interval in milliseconds (1000 milliseconds = 1 second)
}
// Call the function to start periodic updates
//interval_var_updates(); // temp for TESTING

}); // END: RESOURCES DATA


// **** temp for TESTING: manual refresh

// Function to update a value from the array
function updateOnClick(resource) {
    // update values
    document.getElementById(resource.res_lbl).innerHTML = '<span class="ltbluetxt">' + resource.lbl + ': ' + resource.cnt + '</span>';
    // convert div (2)
    if (resource.cnt >= resource.convert) {
        document.getElementById(resource.con_id).innerHTML = '<span class="ltgreentxt">' + resource.cnt + ' / ' + resource.convert + ' ' + resource.lbl + '</span><span class="button_orange">&nbsp;[ CONVERT TO +1 ' + resource.makes.toUpperCase() + ' ] </span';
    } else {
        document.getElementById(resource.con_id).innerHTML = '<span class="ltred">' + resource.cnt + ' / ' + resource.convert + ' ' + resource.lbl + '</span><span class="button_orange">&nbsp;[ CONVERT TO +1 ' + resource.makes.toUpperCase() + ' ] </span';
    }

}

const updateButton = document.createElement("button");
updateButton.textContent = "Update";
updateButton.id = "updateButton";

document.body.appendChild(updateButton);

// primary event listener
updateButton.addEventListener("click", function() {
    const twigsResource = resourcesData.find(resource => resource.id === 'twigs');
    const pebblesResource = resourcesData.find(resource => resource.id === 'pebbles');

    upgrade_section = document.getElementById('upgrade_sect_id');
    upgrade_container = document.getElementById(objectsData.id);

    resourcesData.forEach(resource => {
        updateOnClick(resource);
    });

    if (twigsResource && pebblesResource) {
        updateOnClick(twigsResource);
        updateOnClick(pebblesResource);
    } else {
        console.log("Either 'twigs' or 'pebbles' not found in resourcesData");
    }

    // update UPGRADE OBJECTS
    objectsData
    .filter(object => object.type === 'upgrade')
    .forEach(upgradeObject => {        // Display costs data
        
        upgradeObject.print_costs = '';

        const object_costs = upgradeObject.costs;
    
        for (const item in object_costs) {
            const value = object_costs[item];
            
             // Find the corresponding resource in current_resources_cnt
            const resource = resourcesData.find(r => r.lbl === item);

            if (resource) {
            // Manipulate the data
            const currentPrint = `${resource.cnt}/${value} ${item}`;
            upgradeObject.print_costs += currentPrint + '<br>';  // Concatenate values

            // Display the result
            var print_costs_lbl = document.getElementById(upgradeObject.id + '_print_test');
            print_costs_lbl.innerHTML = upgradeObject.print_costs;

            }
        }
    });
    
    
    
}); // end event listener

//RECONSTRUCTING FUNCTION
/*
function start_objects_upgrade() {
    
    const filtered_upgradeObject = objectsData.filter(object => object.type === 'upgrade');

    // Check if there are any upgrade objects
    if (filtered_upgradeObject.length > 0) {
        filtered_upgradeObject.forEach(upgradeObject => {

            const upgrade_container = document.createElement('div');
            upgrade_container.id = upgradeObject.id; // twigs_upgrade

            upgrade_section.appendChild(upgrade_container);

            
            // clear var if '(0)'
            if (upgradeObject.cnt === 0) {
                obj_qty = ''
            } else {
                obj_qty = '<span class="button_orange">(' + (upgradeObject.cnt + 1) + ')&nbsp</span>';
            }
            
            var allItemsAvailable = true;  // Assume all items are available initially
            let costsOutput = '';

            // first display update
            for (const itemName in upgradeObject.costs) {
                const objCount = upgradeObject.costs[itemName];
                var resourcesCntValues = resourceValueCNT([itemName]);
                const currentResource = resourcesData.find(resource => resource.id === itemName);
                            
                if (itemName in resourcesCntValues) {

                    // (FIRST RUN) Do not subtract cnt from array
                    //if (currentResource.cnt >= objCount && allItemsAvailable) {
                        //currentResource.cnt -= objCount;
                    //} 

                    const output = `<p class="${currentResource.cnt >= objCount ? 'ltgreentxt' : 'ltred'}">${currentResource.cnt}/${objCount} ${itemName}</p>`;
                    costsOutput += output;

                    // update new count for object 
                    upgradeObject.print_costs = costsOutput;
                                
                    // Check if the current item is less than its cost
                    if (currentResource.cnt < objCount) {
                        allItemsAvailable = false;
                        upgradeObject.add_button_lbl = `<span class="ltred" id="${upgradeObject.name}_${upgradeObject.type}_add_button">[ ADD ]</span>`;
                    }
                } else {
                    console.log(`Resource ${itemName} not found in resourcesData`);
                }
            }
            
            // Use the updated costsOutput in the rest of your code
            upgradeObject.print_costs = costsOutput; //+ new_values;

            //obj_job array
            if (upgradeObject.job !== null) {
                for (const item in upgradeObject.job) {
                    var job_lbl = '<p class="ltred">' + ' 0' + '/' + upgradeObject.consume[item] + ' ' + item + '</p>';
                    upgradeObject.job_lbl += job_lbl;
                }
            }
            else {
                upgradeObject.job_lbl = '';
            }
            
            //obj_consume array
            if (upgradeObject.consume !== null) {
                for (const item in upgradeObject.consume) {
                    var obj_consume = '<p class="ltred">' + ' 0' + '/' + upgradeObject.consume[item] + ' ' + item + '</p>';
                    upgradeObject.consume_lbl += upgradeObject.consume;
                }
            }
            else {
                upgradeObject.consume_lbl = '';
            }
            
            // Check if all items are available
            if (allItemsAvailable) {
                // Change [ ADD ] to green and allow purchase
                upgradeObject.add_button_lbl = `<span class="ltgreentxt" id="${upgradeObject.name}_${upgradeObject.type}_add_button">[ ADD ]</span>`;
                
                // WIP
                // **** Add click event listener using event delegation
                upgrade_container.addEventListener('click', function (event) {
                    if (event.target.id === upgradeObject.name + '_' + upgradeObject.type + '_add_button' && allItemsAvailable) {
                        // Subtract costs and update display
                        let newCostsOutput = '';  // Use a new variable to store the updated costs

                        for (const itemName in upgradeObject.costs) {
                            const objCount = upgradeObject.costs[itemName];
                            var resourcesCntValues = resourceValueCNT([itemName]);
                            const currentResource = resourcesData.find(resource => resource.id === itemName);

                            if (itemName in resourcesCntValues) {

                                if (currentResource.cnt >= objCount) {
                                    // Subtract cnt from array
                                    currentResource.cnt -= objCount;
                                    // assign new values back to array

                                }

                                const output = `<p class="${currentResource.cnt >= objCount ? 'ltgreentxt' : 'ltred'}">${currentResource.cnt}/${objCount} ${itemName}</p>`;
                                newCostsOutput += output;
                                
                                // update new count for object 
                                upgradeObject.print_costs = newCostsOutput;
                                
                                // Check if the current item is less than its cost
                                if (currentResource.cnt < objCount) {
                                    allItemsAvailable = false;
                                    upgradeObject.add_button_lbl = `<span class="ltred" id="${upgradeObject.name}_${upgradeObject.type}_add_button">[ ADD ]</span>`;
                                }
                            } else {
                                console.log(`Resource ${itemName} not found in resourcesData`);
                            }
                        }
                        
                        // TESTING
                        get_resource_values();
                        console.log(objectsData.current_resources_cnt);
                        
                        // Update the costs in the upgradeObject
                        upgradeObject.print_costs = newCostsOutput;

                        // Update the upgrade_container with the new data
                        title = '<hr class="divider" width=30% align="left"> ' + '<span id="' + upgradeObject.button + '" onclick="toggleDetails(\'' + upgradeObject.button + '\', \'' + upgradeObject.details + '\', ' + '\'' + upgradeObject.title + '\')"> [ - ] <span class="button_orange"> ' + upgradeObject.title + '&nbsp;</span></span>' + obj_qty + upgradeObject.add_button_lbl;
                        // show details on click
                        upgradeObject.button.innerHTML = '[ - ] <span class="button_orange">' + title + '&nbsp;</span> ';
                        description = '<div id="' + upgradeObject.details + '" style="display:block">...' + upgradeObject.desc;
                        upgradeObject.gain = '<p class="ltgreentxt">' + upgradeObject.gain + '</p>';
                        
                        upgrade_container.innerHTML = title + description + upgradeObject.gain + upgradeObject.costs_lbl + upgradeObject.print_costs + upgradeObject.job_lbl + upgradeObject.consume_lbl + '</div>'; // </div> to end "details"
                    }
                });
            } else {
                upgradeObject.add_button_lbl = `<span class="ltred" id="${upgradeObject.name}_${upgradeObject.type}_add_button">[ ADD ]</span>`;
            }
            
            upgradeObject.print_costs = costsOutput;
            
            // shows object
            title = '<hr class="divider" width=30% align="left"> ' + '<span id="' + upgradeObject.button + '" onclick="toggleDetails(\'' + upgradeObject.button + '\', \'' + upgradeObject.details + '\', ' + '\'' + upgradeObject.title + '\')"> [ + ] <span class="button_orange"> ' + upgradeObject.title + '&nbsp;</span></span>' + obj_qty + upgradeObject.add_button_lbl;
            description = '<div id="' + upgradeObject.details + '" style="display:none">...' + upgradeObject.desc;
            upgradeObject.gain = '<p class="ltgreentxt">' + upgradeObject.gain + '</p>';
            upgrade_container.innerHTML = title + description + upgradeObject.gain + upgradeObject.costs_lbl + upgradeObject.print_costs + upgradeObject.job_lbl + upgradeObject.consume_lbl + '</div>'; // </div> to end "details"
            
            
        });
    }

} // end function: start_objects_upgrade()
// Example:
//start_objects_upgrade();
*/
