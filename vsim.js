import { add_resourcesData, add_upgradeData, add_buildingData } from './data.js'; // Array data
//`

// **** imported arrays ****

const resourcesData = add_resourcesData(); // From data.js
const upgradeData = add_upgradeData(); // From data.js
const buildingData = add_buildingData(); // From data.js

// TESTING
for (let i = 0; i < upgradeData.length; i++) {
    //print(upgradeData[i].000);
    //print(JSON.stringify(upgradeObject.costs));
}

// static assignments
//objectsData[1].desc = 'Become the leader of a tribe, opening up a world of possibilities!';

// goals data array
const goals_data = [
    { id: 0, desc: '[*] Become tribe leader.', goal_req_met: false },
    { id: 1, desc: '[*] Gather 2000 Twigs.', goal_req_met: false },
    { id: 2, desc: '[*] Build an altar to recruit a new tribe member.', goal_req_met: false },
    { id: 3, desc: '[*] Convert 10 of each resource to gather new resources.', goal_req_met: false },
];

// goal objective
const objectiveData = [
{ name: 'tribe_leader', type: 'init', lbl: 'tribe leader', title: 'BECOME TRIBE LEADER', cnt: 0, desc: '', gain: '+1 Tribe Leader', costs: null, job: null, consume: null , parentID: '' },
];

const tribeData = [
    { id: 'total_population', lbl: 'Total Population', pop: 0 },
    { id: 'tribe_leader', lbl: '-- Tribe Leader', pop: 1 },
];

// for output testing
function print(text, json) {
    new_div = document.createElement('div');
    document.body.insertBefore(new_div, document.body.firstChild);
    if (json === 'y') {
        new_div.innerHTML = JSON.stringify(text);
    } else {
        new_div.innerHTML = text;
    }
}
//print(variable, 'y');
//print('hello' + resourcesData[0].id);

// pause
function wait(seconds, callback) {
  setTimeout(callback, seconds * 1000);
}
/* Usage example: wait for 5 seconds before executing the next function
wait(5, function() {
  console.log("This code executes after waiting for 5 seconds.");
  // Add your code here for the delayed execution
}); */

// WIP: adding add_button usage
// IN INTERVAL: update costs data
function showObjectCosts(objectArray, parentID) {
    const createdIDs = [];

    objectArray.forEach(object => {
        var createdElement = document.getElementById(object.id + '_costs_div');

        if (!createdElement) {
            createdElement = document.createElement('div');
            createdElement.id = object.id + '_costs_div';
            parentID.appendChild(createdElement);
        }
        
        createdIDs.push(createdElement.id);

        setInterval(() => {
            const object_costs = object.costs;
            let fetch_cnt = '';
            for (const [item, value] of Object.entries(object_costs)) {
                const fetch_resource = resourcesData.find(r => r.lbl === item);

                // upgradeUpdates.add_button = 000.id + '_upgrade' + '_add_button'; (ex: twigs_upgrade_add_button)
                // buildingUpdates.add_button = 000.id + '_add_button'; (ex: primitive_shelter_building_add_button)
                // get all ids for add_button
                
                if (object.type === 'upgrade' && fetch_resource) {
                    let id_format = object.id + '_upgrade' + '_add_button';
                    let upgrade_button = document.getElementById(id_format);
                }
                
                if (object.type === 'building' && fetch_resource) {
                    let id_format = object.id + '_add_button';
                    let building_button = document.getElementById(id_format);

                }

                if (fetch_resource) {
                    const colorClass = (fetch_resource.cnt >= value) ? 'ltgreentxt' : 'ltred';
                    fetch_cnt += '<span class="' + colorClass + '">';
                    fetch_cnt += '<span id="' + object.id + '_' + item + '_cnt' + '">' + fetch_resource.cnt + '</span>&nbsp;/&nbsp;' + value + '&nbsp;' + item.toLowerCase();
                    fetch_cnt += '</span>';
                    fetch_cnt += '<br>';
                }
            }
            createdElement.innerHTML = fetch_cnt;
        }, 5000);
    });

    // confirm ids
    return createdIDs;
}
// USAGE:
// buildingData.forEach(buildingObject => {
//     showObjectCosts([buildingObject], print_costs_lbl.id);
// });

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
            tribe_section.appendChild(population);
        });

        var total_lbl = document.createElement('p');
        total_lbl.id = 'total_lbl';
        total_lbl.className = 'ltbluetxt'; // Use className instead of class
        total_lbl.innerHTML = 'Total Population: ' + total_population;

        // Find the Tribe Leader element
        var tribeLeader = document.getElementById('tribe_leader');

        // Insert total_lbl before the Tribe Leader
        tribe_section.insertBefore(total_lbl, tribeLeader);
    }
    // next update
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

// WIP: eventually add functions.js with a main.js
// *** main div sections ****

createNewElement('div', 'vsim_title', null, null, 'body');
createNewElement('div', 'goals_sect_id', null, '<p class="pinktxt">Goals:</p>', 'body');
createNewElement('div', 'tribe_sect_id', null, '<p class="divsections">TRIBE</p>', 'body');
createNewElement('div', 'tribe_leader_obj', null, null, 'tribe_sect_id');
createNewElement('div', 'resources_sect_id', null, '<p class="divsections">RESOURCES</p>', 'body');
createNewElement('div', 'gather_sect_id', null, '<p class="divsections">GATHER</p>', 'body');
createNewElement('div', 'upgrade_sect_id', null, '<p class="divsections">UPGRADE</p>', 'body');
createNewElement('div', 'building_sect_id', null, '<p class="divsections">BUILDINGS</p>', 'body');

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
update_tribe(true);
addClickEvent('add_active');
createGoal(0);

// TESTING
resourcesData[0].cnt = 87;
resourcesData[1].cnt = 45;


// **** Setup all elements ****

// OBJECTS

// *** BUILDING DATA
showElementID('building_sect_id');
var building_section = document.getElementById('building_sect_id');

buildingData.forEach(buildingObject => {
    
    buildingObject.print_costs = '';
    
    // full container
    var building_container = document.createElement('div');
    building_container.id = buildingObject.id;
    building_section.appendChild(building_container);

    // define object first line
    var first_line_div = document.createElement('div');
    first_line_div.id = buildingObject.first_line_div_id;
    building_container.appendChild(first_line_div);
    // define object toggle details
    var toggled_details_div = document.createElement('div');
    // hide details initially
    toggled_details_div.id = buildingObject.toggled_details_div;
    toggled_details_div.style.display = 'none';
    building_container.appendChild(toggled_details_div);

    // [ + ] details initial
    var button_toggle = document.createElement('span');
    first_line_div.appendChild(button_toggle);
    button_toggle.innerHTML = '<hr class="divider" width=30% align="left"> ' + '<span id="' + buildingObject.button + '"> [ + ] <span class="button_orange"> ' + buildingObject.title + '&nbsp;</span></span>';

    // Assuming upgradeObject.button is the ID of the button element
    var toggleButton = document.getElementById(buildingObject.button);

    // Add an onclick event listener to the button
    toggleButton.addEventListener('click', function() {
        // Toggle the display property of toggled_details_div
        if (toggled_details_div.style.display === 'none') {
            toggled_details_div.style.display = 'block';
            // Change the button text to [ - ]
            toggleButton.innerHTML = '<span id="' + buildingObject.button + '"> [ - ] <span class="button_orange"> ' + buildingObject.title + '&nbsp;</span></span>';
        } else {
            toggled_details_div.style.display = 'none';
            // Change the button text to [ + ]
            toggleButton.innerHTML = '<span id="' + buildingObject.button + '"> [ + ] <span class="button_orange"> ' + buildingObject.title + '&nbsp;</span></span>';
        }
    });
    
    // object count span
    var object_count = document.createElement('span');
    object_count.id = buildingObject.object_count_id;
    object_count.className = 'button_orange';
    first_line_div.appendChild(object_count);
    object_count.innerHTML = '(' + buildingObject.cnt + ')&nbsp';

    if (buildingObject.cnt === 1) {
        document.getElementById(object_count.id).innerHTML = ''
    }
    
    var add_button_lbl = document.createElement('span');
    first_line_div.appendChild(add_button_lbl);
    add_button_lbl.className = 'ltred';
    add_button_lbl.id = buildingObject.add_button;
    add_button_lbl.innerHTML = '[ BUILD ]';

    // *** details start
    // gain label
    var gain_lbl = document.createElement('div');
    gain_lbl.className = 'ltgreentxt';
    // need id and content
    gain_lbl.id = buildingObject.gain_id;
    gain_lbl.innerHTML = buildingObject.gain_lbl;
    toggled_details_div.appendChild(gain_lbl);
 
    // gain_detail
    var gain_detail = document.createElement('div');
    toggled_details_div.appendChild(gain_detail);
    gain_detail.id = buildingObject.gain_detail_id;
    gain_detail.className = 'light_small';
    gain_detail.innerHTML = buildingObject.gain_detail_lbl;

    // description
    var description = document.createElement('div');
    toggled_details_div.appendChild(description);
    description.style.maxWidth = '60%';
    description.innerHTML = buildingObject.desc;

    // costs display (label)
    var costs_lbl = document.createElement('div');
    toggled_details_div.appendChild(costs_lbl);
    costs_lbl.innerHTML = '<p class="yellowtxt">COSTS:</p>';

    // costs display (data)
    var print_costs_lbl = document.createElement('div');
    print_costs_lbl.id = buildingObject.costs_div;
    toggled_details_div.appendChild(print_costs_lbl);

    // Call the showObjectCosts function with the buildingData and the ID of print_costs_lbl
    showObjectCosts([buildingObject], print_costs_lbl.id);



    

}); // *** END: BUILDING UPGRADE DATA

// *** UPGRADE DATA
showElementID('upgrade_sect_id');
var upgrade_section = document.getElementById('upgrade_sect_id');

upgradeData.forEach(upgradeObject => {

    // TESTING
    //upgradeObject.cnt = 3;
    
    // starting costs
    upgradeObject.print_costs = '';

    // full container
    var upgrade_container = document.createElement('div');
    upgrade_container.id = upgradeObject.id;
    upgrade_section.appendChild(upgrade_container);

    // define object first line
    var first_line_div = document.createElement('div');
    first_line_div.id = upgradeObject.first_line_div_id;
    upgrade_container.appendChild(first_line_div);
    // define object toggle details
    var toggled_details_div = document.createElement('div');
    // hide details initially
    toggled_details_div.id = upgradeObject.toggled_details_div;
    toggled_details_div.style.display = 'none';
    upgrade_container.appendChild(toggled_details_div);
    
    // [ + ] details initial
    var button_toggle = document.createElement('span');
    first_line_div.appendChild(button_toggle);
    button_toggle.innerHTML = '<hr class="divider" width=30% align="left"> ' + '<span id="' + upgradeObject.button + '"> [ + ] <span class="button_orange"> ' + upgradeObject.title + '&nbsp;</span></span>';

    // Assuming upgradeObject.button is the ID of the button element
    var toggleButton = document.getElementById(upgradeObject.button);
    
    // Add an onclick event listener to the button
    toggleButton.addEventListener('click', function() {
        // Toggle the display property of toggled_details_div
        if (toggled_details_div.style.display === 'none') {
            toggled_details_div.style.display = 'block';
            // Change the button text to [ - ]
            toggleButton.innerHTML = '<span id="' + upgradeObject.button + '"> [ - ] <span class="button_orange"> ' + upgradeObject.title + '&nbsp;</span></span>';
        } else {
            toggled_details_div.style.display = 'none';
            // Change the button text to [ + ]
            toggleButton.innerHTML = '<span id="' + upgradeObject.button + '"> [ + ] <span class="button_orange"> ' + upgradeObject.title + '&nbsp;</span></span>';
        }
    });

    // object count span
    var object_count = document.createElement('span');
    object_count.id = upgradeObject.object_count_id;
    object_count.className = 'button_orange';
    first_line_div.appendChild(object_count);
    object_count.innerHTML = '(' + upgradeObject.cnt + ')&nbsp';

    if (upgradeObject.cnt === 1) {
        document.getElementById(object_count.id).innerHTML = ''
    }
    
    var add_button_lbl = document.createElement('span');
    first_line_div.appendChild(add_button_lbl);
    add_button_lbl.className = 'ltred';
    add_button_lbl.id = upgradeObject.add_button;
    add_button_lbl.innerHTML = '[ UPGRADE ]';

    // *** details start
    // gain label
    var gain_lbl = document.createElement('div');
    gain_lbl.className = 'ltgreentxt';
    gain_lbl.innerHTML = '+20% Gather Rate';
    toggled_details_div.appendChild(gain_lbl);
    
    // gain_detail
    var gain_detail = document.createElement('div');
    toggled_details_div.appendChild(gain_detail);
    gain_detail.id = upgradeObject.gain_id;
    gain_detail.className = 'light_small';
    gain_detail.innerHTML = ' Next: +' + upgradeObject.gather_increase + '&nbsp;' + upgradeObject.lbl.toLowerCase();

    // description
    var description = document.createElement('div');
    toggled_details_div.appendChild(description);
    description.style.maxWidth = '60%';
    description.innerHTML = upgradeObject.desc;
    
    // costs display (label)
    var costs_lbl = document.createElement('div');
    toggled_details_div.appendChild(costs_lbl);
    costs_lbl.innerHTML = '<p class="yellowtxt">COSTS:</p>';

    // costs display (data)
    var print_costs_lbl = document.createElement('div');
    print_costs_lbl.id = upgradeObject.costs_div;
    toggled_details_div.appendChild(print_costs_lbl);

    // WIP hiding
    var job_lbl = document.createElement('div');
    toggled_details_div.appendChild(job_lbl);
    job_lbl.innerHTML = '<p class="yellowtxt">CIVILIAN JOB:</p>';
    job_lbl.style.display = 'none';
    
    // WIP hiding
    var consume_lbl = document.createElement('div');
    toggled_details_div.appendChild(consume_lbl);
    consume_lbl.innerHTML = '<p class="yellowtxt">CONSUMES:</p>';
    consume_lbl.style.display = 'none';

    // object costs data
    // INITIAL DISPLAY ONLY
    const object_costs = upgradeObject.costs;
    const itemsAvailable = [];
    
    for (const [item, value] of Object.entries(object_costs)) {
        const resource = resourcesData.find(r => r.lbl === item);
        const item_display = item.toLowerCase();

        if (resource) {
            const textClass = resource.cnt >= value ? 'ltgreentxt' : 'ltred';
            const currentPrint = `<span class="${textClass}">${resource.cnt} / ${value} ${item_display}</span>`;
            
            itemsAvailable.push({ cnt: resource.cnt, value });
            upgradeObject.print_costs += currentPrint + '<br>';
            
            // Print the data
            const costs_div = document.getElementById(upgradeObject.costs_div);
            costs_div.innerHTML = upgradeObject.print_costs;
        }
    }
    
    // WIP: needs to be rechecked after any purchase
    // Check if all .cnt values are greater than or equal to their corresponding value
    const allValuesAvailable = itemsAvailable.every(item => item.cnt >= item.value);
        
    // Perform an action if all values are available
    if (allValuesAvailable) {
        var update_add_button = document.getElementById(upgradeObject.add_button);
        update_add_button.className = 'ltgreentxt';
    }

    // usung this fornat in div elements
    // first line / details
    // first_line_div = button_toggle + object_count + 
    
}); // *** END: OBJECTS UPGRADE DATA

// *********************
// *********************
// *********************
// *********************


// RESOURCES DATA
resourcesData.forEach(resource => {

// END: global resource storage

    // RESOURCES
    showElementID('resources_sect_id');
    var resources_section = document.getElementById('resources_sect_id');

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
    var gather_section = document.getElementById('gather_sect_id');

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
    var convert_section = document.getElementById('convert_sect_id');

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
                resource.cnt += resource.gather_rate;
                // set maximum
                if (resource.cnt > resource.max) {
                    resource.cnt = resource.max;
                }
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

// Function to update a value from the array periodically
function interval_var_updates() {
    setInterval(function () {
        // update values
        updateOnClick(resource);
    }, 1000); // Set the interval in milliseconds (1000 milliseconds = 1 second)
}
// Call the function to start periodic updates
interval_var_updates(); // temp for TESTING

}); // END: RESOURCES DATA

// Function to update a value from the array
function updateOnClick(resource) {

    // update gather rate
    document.getElementById(resource.gather_lbl).innerHTML = '<span class="ltgreentxt">&nbsp;+' + resource.gather_rate + ' ' + resource.lbl.toUpperCase();
    // update resource counts
    resource.cnt = Math.round(resource.cnt * 10) / 10;
    if (resource.cnt >= resource.max) {
        fetched_res_lbl = document.getElementById(resource.res_lbl);
        fetched_res_lbl.innerHTML = '<span class="ltbluetxt_2">' + resource.lbl + ': ' + resource.cnt + ' / ' + resource.max + '</span>';
    } else {
        document.getElementById(resource.res_lbl).innerHTML = '<span class="ltbluetxt">' + resource.lbl + ': ' + resource.cnt + ' / ' + resource.max + '</span>';
    }
    // convert div (2)
    if (resource.cnt >= resource.convert) {
        document.getElementById(resource.con_id).innerHTML = '<span class="ltgreentxt">' + resource.cnt + ' / ' + resource.convert + ' ' + resource.lbl + '</span><span class="button_orange">&nbsp;[ CONVERT TO +1 ' + resource.makes.toUpperCase() + ' ] </span';
    } else {
        document.getElementById(resource.con_id).innerHTML = '<span class="ltred">' + resource.cnt + ' / ' + resource.convert + ' ' + resource.lbl + '</span><span class="button_orange">&nbsp;[ CONVERT TO +1 ' + resource.makes.toUpperCase() + ' ] </span';
    }
    /* function testing
    // update building cnt display
    buildingData.forEach(building => {
        const object_costs = building.costs;
        let fetch_cnt = '';
        for (const [item, value] of Object.entries(object_costs)) {
            const fetch_resource = resourcesData.find(r => r.lbl === item);
            if (fetch_resource) {
                const colorClass = (fetch_resource.cnt >= value) ? 'ltgreentxt' : 'ltred';
                fetch_cnt += '<span class="' + colorClass + '">';
                fetch_cnt += '<span id="' + building.id + '_' + item + '_cnt' + '">' + fetch_resource.cnt + '</span>&nbsp;/&nbsp;' + value + '&nbsp;' + item.toLowerCase();
                fetch_cnt += '</span>';
                fetch_cnt += '<br>';
            }
        }
        var ResCnt = document.getElementById(building.ResCnt);
        ResCnt.innerHTML = fetch_cnt;
    });*/

/* interval test 
}

const updateButton = document.createElement("button");
updateButton.textContent = "Update";
updateButton.id = "updateButton";

document.body.appendChild(updateButton);

// manual update event listener
updateButton.addEventListener("click", function() {

    resourcesData.forEach(resource => {
        updateOnClick(resource);
    });
interval test  */
    // *** update UPGRADE OBJECTS
    // Reset the 'deducted' property for all resources
    resourcesData.forEach((resource, index) => {
        if (resource.hasOwnProperty('deducted')) {
            resource.deducted = false;
        }
    
        // global live updates of resource cnt
        var resource_div = document.getElementById('live_cnt_' + resource.id);
            if (!resource_div) {
            resource_div = document.createElement('div');
            resource_div.style.display = 'none';
            var resource_live_cnt = 'live_cnt_' + resource.id;
            resource_div.id = resource.resource_live_cnt;
            document.body.appendChild(resource_div);
        }
        resource_div.innerHTML = resource.cnt;
    });

    upgradeData.forEach(upgradeObject => {

        if (upgradeObject.hasOwnProperty('applied')) {
            upgradeObject.applied = false;
        }
        
        upgradeObject.print_costs = '';

        // update costs dosplay
        const object_costs = upgradeObject.costs;
        var itemsAvailable = [];
        
        for (const [item, value] of Object.entries(object_costs)) {
            const resource = resourcesData.find(r => r.lbl === item);
            const item_display = item.toLowerCase();

            if (resource) {
                const textClass = resource.cnt >= value ? 'ltgreentxt' : 'ltred';
                const cntToPush = Math.min(resource.cnt, value);
                resource.cnt = Math.round(resource.cnt * 10) / 10;

                let currentPrint = `<span class="${textClass}">${resource.cnt} / ${value} ${item_display}</span>`;
                itemsAvailable.push({ cnt: cntToPush, value });

                if (upgradeObject.maxed === true && value > resource.max) {
                    currentPrint = `<span class="${textClass}">${resource.cnt} / ${value} ${item_display}***</span>`;
                }
        
                upgradeObject.print_costs += currentPrint + '<br>';  // Concatenate values
        
                var costs_div = document.getElementById(upgradeObject.costs_div);
                costs_div.innerHTML = upgradeObject.print_costs;
            }
        }

        // Check if all .cnt values are greater than or equal to their corresponding value
        var allValuesAvailable = itemsAvailable.every(item => item.cnt >= item.value);
        
        var update_add_button = document.getElementById(upgradeObject.add_button);
        update_add_button.className = 'ltred';

        
        // Perform an action if all values are available
        if (allValuesAvailable) {
            // Your action here
            var update_add_button = document.getElementById(upgradeObject.add_button);
            update_add_button.className = 'ltgreentxt';

            // update resouces after purchase
            // Add a click event to upgradeObject.add_button
            update_add_button.addEventListener('click', function() {

                for (const item in object_costs) {
                    const value = object_costs[item];
            
                    // Find the corresponding resource in current_resources_cnt
                    const resource = resourcesData.find(r => r.lbl === item);
            
                    if (resource && resource.cnt >= value) {
                        // Deduct the cost from resource.cnt
                        purchase_upgrade(upgradeObject);
                        // WIP: for every object every update
                        //allValuesAvailable = itemsAvailable.every(item => item.cnt >= item.value);
                    }

                    itemsAvailable = [];
                    update_add_button.className = 'ltred';
                }
            });
        }

    }); // end objectsData loop
    /* interval test 
}); // end event listener
interval test  */
function purchase_upgrade(costs) {
    if (!(Array.isArray(costs))) {
        costs = [costs];
    }

    return costs
        .flatMap(upgradeObject => {
            const object_costs = upgradeObject.costs;

            // Check if the upgrade has already been applied
            if (!upgradeObject.applied) {
                // Check if all object_costs values can be deducted
                var allValuesAvailable = Object.entries(object_costs).every(([item, value]) => {
                    const resource = resourcesData.find(r => r.lbl === item);
                    return resource && resource.cnt >= value && !resource.deducted;
                });

                if (allValuesAvailable) {
                    // Deduct values, mark resources as deducted, and increase upgradeObject.cnt
                    Object.entries(object_costs).forEach(([item, value]) => {
                        const resource = resourcesData.find(r => r.lbl === item);
                        if (resource) {
                            resource.cnt -= value;
                            resource.deducted = true;
                         }
                    });

                    upgradeObject.cnt += 1;  // Increase cnt by 1
                    var object_count = document.getElementById(upgradeObject.object_count_id);
                    object_count.innerHTML = '(' + upgradeObject.cnt + ')&nbsp';
                    
                    // uograde gain
                    const resource_gain = resourcesData.find(r => r.lbl === upgradeObject.lbl);
                    resource_gain.gather_rate *= upgradeObject.gather_increase;
                    resource_gain.gather_rate = Math.round(resource_gain.gather_rate * 10) / 10;
                    
                    // display current/next rate
                    const gain_detail = document.getElementById(upgradeObject.gain_id);
                    var next_rate = resource_gain.gather_rate;
                    next_rate *= upgradeObject.gather_increase;
                    next_rate = Math.round(next_rate * 10) / 10;
                    gain_detail.className = 'light_small';
                    gain_detail.innerHTML = ' Next: +' + next_rate + '&nbsp;' + upgradeObject.lbl.toLowerCase();

                    // cost creep
                    // Increase costs values by 40% for objects with type 'upgrade' using cost_creep
                    const costCreep = upgradeObject.cost_creep;

                    for (const key in upgradeObject.costs) {
                        if (upgradeObject.costs.hasOwnProperty(key)) {
                            upgradeObject.costs[key] = Math.round(upgradeObject.costs[key] * costCreep);
                    
                            const resource = resourcesData.find(r => r.lbl === key);
                            const costValue = upgradeObject.costs[key];
                    
                            // Log the key and value of each item
                            
                            let currentPrint = `<span class="${resource.cnt >= costValue ? 'ltgreentxt' : 'ltred'}">${resource.cnt}/${costValue} ${key}`;
                            
                            // WIP: need condition if costValue is hidden
                            if (costValue > resource.max) {
                                // If cost exceeds the maximum, add ***
                                currentPrint += '***';
                                upgradeObject.maxed = true;
                            }
                    
                            currentPrint += '</span>';
                            upgradeObject.print_costs += currentPrint + '<br>';  // Concatenate values
                            
                        }
                    }

                    upgradeObject.applied = true;  // Mark the upgrade as applied
                                
                }
            }
        });
}

} // test end interval

//var result = purchase_upgrade(objectsData);
//console.log(result);

//var cost_to_get = purchase_upgrade(objectsData);

// Accessing the first element in the array
//var firstCost = cost_to_get[0];

// Accessing properties of the first cost
//console.log(firstCost.item);      // Accessing 'item' property
//console.log(firstCost.value);     // Accessing 'value' property
//console.log(firstCost.resource);  // Accessing 'resource' property
