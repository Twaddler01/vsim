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
    resourcesIndex.gather_rate = 1;
    // whole convert div = con_id
    resourcesIndex.con_id = 'conDiv_' + resourcesIndex.id;
    resourcesIndex.con_lbl = 'convert_' + resourcesIndex.id;
    resourcesIndex.con_btn = 'convert_btn_' + resourcesIndex.id;
    resourcesIndex.convert = 10;
    resourcesIndex.cnt = 0;
    resourcesIndex.max = 100;
    const updates = {};
    updates.print_resources = '<span class="ltbluetxt">' + resourcesIndex.lbl + ': ' + resourcesIndex.cnt + ' / ' + resourcesIndex.max + '</span>';
    updates.print_gather = '<span class="button_orange">[ GATHER ' + resourcesIndex.lbl.toUpperCase() + ' ]';
    updates.print_gather2 = '<span class="ltgreentxt">&nbsp;+' + resourcesIndex.gather_rate + ' ' + resourcesIndex.lbl.toUpperCase();
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
    cnt: 1, 
    desc: '', 
    gain: '+20% Gather Rate', 
    gather_increase: 1.2, 
    cost_creep: 1.4, 
    // need costs to increase per upgrade
    costs: { 'Twigs': 20, 'Pebbles': 10 }, 
    job: null, 
    consume: null , 
    parentID: null, 
}, 
{ 
    name: 'Pebbles', 
    type: 'upgrade', 
    lbl: 'pebbles', 
    title: 'Upgrade Pebbles Collection', 
    cnt: 1, 
    desc: '', 
    gain: '+20% Gather Rate', 
    gather_increase: 1.2, 
    cost_creep: 1.4, 
    // need costs to increase per upgrade
    costs: { 'Twigs': 10, 'Pebbles': 20 }, 
    job: null, 
    consume: null , 
    parentID: null, 
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
    objUpdates.costs_div = objectsIndex.name + '_' + objectsIndex.type + '_costs_div';
    objUpdates.object_count_id = objectsIndex.name + '_' + objectsIndex.type + '_object_count_id';
    objUpdates.desc = 'Use your experience in collecting ' + objectsIndex.lbl + ' to increase the efficiency of ' + objectsIndex.lbl + ' collection efforts.';
    objUpdates.toggled_details_div = objectsIndex.name + '_' + objectsIndex.type + '_details';
    objUpdates.button = objectsIndex.name + '_' + objectsIndex.type + '_button';
    objUpdates.add_button = objectsIndex.name + '_' + objectsIndex.type + '_add_button';
    objUpdates.add_button_lbl = '<span class="ltred" id="' + objectsIndex.name + '_' + objectsIndex.type + '_add_button' + '">[ ADD ]</span>';
    objUpdates.gain_id = 'gain_id_' + objectsIndex.name;
    objUpdates.costs_lbl = '<p class="yellowtxt">COSTS:</p>';
    objUpdates.print_costs = '';
    objUpdates.job_lbl = '<p class="yellowtxt">CIVILIAN JOB:</p>';
    objUpdates.consume_lbl = '<p class="yellowtxt">CONSUMES:</p>';
    objUpdates.maxed = false;
    // Assign updates to resourcesIndex properties
    Object.assign(objectsIndex, objUpdates);
}

// static assignments
objectsData[0].desc = '... Use your experience from gathering resources to increase your efficiency of collection efforts.';
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

// for output testing
function print(text) {
    new_div = document.createElement('div');
    document.body.insertBefore(new_div, document.body.firstChild);
    new_div.innerHTML = text;
}
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

// TESTING
resourcesData[0].cnt = 187;
resourcesData[1].cnt = 145;


// **** Setup all elements ****

// OBJECTS

// *** OBJECTS UPGRADE DATA
showElementID('upgrade_sect_id');
upgrade_section = document.getElementById('upgrade_sect_id');

objectsData
  .filter(object => object.type === 'upgrade')
  .forEach(upgradeObject => {
    
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
    upgrade_container.appendChild(first_line_div);
    // define object toggle details
    var toggled_details_div = document.createElement('div');
    // hide details initially
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
        object_count.innerHTML = ''
    }
    
    // add button span
    //upgradeObject.add_button_lbl
    //objUpdates.add_button_lbl = '<span class="ltred" id="' + objectsIndex.name + '_' + objectsIndex.type + '_add_button' + '">[ ADD ]</span>';

    var add_button = document.createElement('span');
    first_line_div.appendChild(add_button);

// replacing objUpdates.add_button_lbl
    var add_button_lbl = document.createElement('span');
    add_button.appendChild(add_button_lbl);
    add_button_lbl.className = 'ltred';
    add_button_lbl.id = upgradeObject.add_button;
    add_button_lbl.innerHTML = '[ UPGRADE ]';
    
    var button_toggle2 = document.createElement('span');
    first_line_div.appendChild(button_toggle2);
    button_toggle2.id = upgradeObject.toggled_details_div;

    // *** details start
    // gain label
    gain_lbl = document.createElement('div');
    gain_lbl.className = 'ltgreentxt';
    gain_lbl.innerHTML = upgradeObject.gain;
    toggled_details_div.appendChild(gain_lbl);
    
    // gain_detail
    var gain_detail = document.createElement('div');
    toggled_details_div.appendChild(gain_detail);
    gain_detail.id = upgradeObject.gain_id;
    gain_detail.className = 'light_small';
    gain_detail.innerHTML = ' Next: +' + upgradeObject.gather_increase + '&nbsp;' + upgradeObject.name;

    // description
    var description = document.createElement('div');
    toggled_details_div.appendChild(description);
    description.style.maxWidth = '60%';
    description.innerHTML = upgradeObject.desc;
    
    // costs display (label)
    var costs_lbl = document.createElement('div');
    toggled_details_div.appendChild(costs_lbl);
    costs_lbl.innerHTML = upgradeObject.costs_lbl;
    
    // costs display (data)
    var print_costs_lbl = document.createElement('div');
    print_costs_lbl.id = upgradeObject.costs_div;
    toggled_details_div.appendChild(print_costs_lbl);

    // object costs data
    // INITIAL DISPLAY ONLY
    const object_costs = upgradeObject.costs;
    var itemsAvailable = [];
    
    for (const item in object_costs) {
        const value = object_costs[item];
    
        // Find the corresponding resource in current_resources_cnt
        const resource = resourcesData.find(r => r.lbl === item);
    
        if (resource) {
            // Push an object with resource.cnt and value into itemsAvailable array
            itemsAvailable.push({ cnt: resource.cnt, value });

            // Determine the class based on the condition
            const textClass = resource.cnt >= value ? 'ltgreentxt' : 'ltred';

            // Get the data with color styling using CSS classes
            const currentPrint = `<span class="${textClass}">${resource.cnt}/${value} ${item}</span>`;

            upgradeObject.print_costs += currentPrint + '<br>';  // Concatenate values
    
            // Print the data
            var print_costs_lbl2 = document.getElementById(upgradeObject.costs_div);
            print_costs_lbl2.innerHTML = upgradeObject.print_costs;
        }
    }
    
    // Check if all .cnt values are greater than or equal to their corresponding value
    const allValuesAvailable = itemsAvailable.every(item => item.cnt >= item.value);
        
    // Perform an action if all values are available
    if (allValuesAvailable) {
        // Your action here
        // upgradeObject.add_button
        var update_add_color = document.getElementById(upgradeObject.add_button);
        update_add_color.className = 'ltgreentxt';
    }

    // usung this fornat in div elements
    // first line / details
    // first_line_div = button_toggle + object_count + 
    
    //(contents) 
    //+  + upgradeObject.add_button_lbl;
    //toggled_details_div = upgradeObject.gain + upgradeObject.costs_lbl + upgradeObject.print_costs + upgradeObject.job_lbl + upgradeObject.consume_lbl;
    //complete_div = first_line + toggled_details;

}); // *** END: OBJECTS UPGRADE DATA

// *********************
// *********************
// *********************
// *********************


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
    // update gather
    document.getElementById(resource.gather_lbl).innerHTML = '<span class="ltgreentxt">&nbsp;+' + resource.gather_rate + ' ' + resource.lbl.toUpperCase();
    // update values
    resource.cnt = Math.round(resource.cnt * 10) / 10;    
    document.getElementById(resource.res_lbl).innerHTML = '<span class="ltbluetxt">' + resource.lbl + ': ' + resource.cnt + ' / ' + resource.max + '</span>';
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
    
    // *** update UPGRADE OBJECTS

    // Reset the 'deducted' property for all resources
    resourcesData.forEach(resource => {
        if (resource.hasOwnProperty('deducted')) {
            resource.deducted = false;
        }
    });

    objectsData
    .filter(object => object.type === 'upgrade')
    .forEach(upgradeObject => {        // Display costs data
        
        if (upgradeObject.hasOwnProperty('applied')) {
            upgradeObject.applied = false;
        }
        
        upgradeObject.print_costs = '';

        // object costs data
        const object_costs = upgradeObject.costs;
        var itemsAvailable = [];
        
        for (const item in object_costs) {
            const value = object_costs[item];
        
            // Find the corresponding resource in current_resources_cnt
            const resource = resourcesData.find(r => r.lbl === item);
        
            if (resource) {
                // Push an object with cntToPush and value into itemsAvailable array
                const cntToPush = Math.min(resource.cnt, value);
                itemsAvailable.push({ cnt: cntToPush, value });
        
                // Determine the class based on the condition
                const textClass = resource.cnt >= value ? 'ltgreentxt' : 'ltred';
        
                // Get the data with color styling using CSS classes
                let currentPrint = `<span class="${textClass}">${resource.cnt}/${value} ${item}</span>`;
        
                if (upgradeObject.maxed === true && value > resource.max) {
                    currentPrint = `<span class="${textClass}">${resource.cnt}/${value} ${item}***</span>`;
                }
        
                upgradeObject.print_costs += currentPrint + '<br>';  // Concatenate values
        
                // Print the data
                var print_costs_lbl2 = document.getElementById(upgradeObject.costs_div);
                print_costs_lbl2.innerHTML = upgradeObject.print_costs;
            }
        }
        
        // Check if all .cnt values are greater than or equal to their corresponding value
        const allValuesAvailable = itemsAvailable.every(item => item.cnt >= item.value);
            
        // Perform an action if all values are available
        if (allValuesAvailable) {
            // Your action here
            var update_add_color = document.getElementById(upgradeObject.add_button);
            update_add_color.className = 'ltgreentxt';
            
            // update resouces after purchase
            // Add a click event to upgradeObject.add_button
            update_add_color.addEventListener('click', function() {

                for (const item in object_costs) {
                    const value = object_costs[item];
            
                    // Find the corresponding resource in current_resources_cnt
                    const resource = resourcesData.find(r => r.lbl === item);
            
                    if (resource && resource.cnt >= value) {
                        // Deduct the cost from resource.cnt
                        purchase_upgrade(objectsData);
                    }

                    itemsAvailable = [];
                    update_add_color.className = 'ltred';
                }
            });
        }

    }); // end objectsData loop
    
}); // end event listener

function purchase_upgrade(costs) {
    if (!(Array.isArray(costs))) {
        costs = [costs];
    }

    return costs
        .filter(object => object.type === 'upgrade' && object.costs)
        .flatMap(upgradeObject => {
            const object_costs = upgradeObject.costs;

            // Check if the upgrade has already been applied
            if (!upgradeObject.applied) {
                // Check if all object_costs values can be deducted
                const allValuesAvailable = Object.entries(object_costs).every(([item, value]) => {
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
                    var item = upgradeObject.name;
                    
                    // uograde gain
                    const resource_gain = resourcesData.find(r => r.lbl === item);
                    resource_gain.gather_rate *= upgradeObject.gather_increase;
                    resource_gain.gather_rate = Math.round(resource_gain.gather_rate * 10) / 10;
                    
                    // display current/next rate
                    const gain_detail = document.getElementById(upgradeObject.gain_id);
                    var next_rate = resource_gain.gather_rate;
                    next_rate *= upgradeObject.gather_increase;
                    next_rate = Math.round(next_rate * 10) / 10;
                    gain_detail.className = 'light_small';
                    gain_detail.innerHTML = ' Next: +' + next_rate + '&nbsp;' + upgradeObject.name;

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

            return { upgradeObject };
        });
}

//var result = purchase_upgrade(objectsData);
//console.log(result);

//var cost_to_get = purchase_upgrade(objectsData);

// Accessing the first element in the array
//var firstCost = cost_to_get[0];

// Accessing properties of the first cost
//console.log(firstCost.item);      // Accessing 'item' property
//console.log(firstCost.value);     // Accessing 'value' property
//console.log(firstCost.resource);  // Accessing 'resource' property
