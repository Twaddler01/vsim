import { 
    add_resourcesData, 
    add_upgradeData, 
    add_buildingData, 
    add_tribeData, 
    add_foodSources, 
    add_foodResource, 
    add_goalsData, 
    add_objectiveData 
} from './data.js'; // Array data

import * as functions from  './functions.js';

//`

// **** imported arrays ****

// From data.js
const resourcesData = add_resourcesData();
const upgradeData = add_upgradeData();
const buildingData = add_buildingData();
const tribeData = add_tribeData();
const foodSources = add_foodSources();
const foodResource = add_foodResource();
const goalsData = add_goalsData();
const objectiveData = add_objectiveData();

// WIP: eventually add functions.js with a main.js
// *** main div sections ****

functions.createNewSection('div', 'vsim_title', null, null, 'body');
functions.createNewSection('div', 'goals_sect_id', null, '<p class="pinktxt">Goals:</p>', 'body');
functions.createNewSection('div', 'tribe_sect_id', null, '<p class="divsections">TRIBE</p>', 'body');
functions.createNewSection('div', 'tribe_leader_obj', null, null, 'tribe_sect_id');
functions.createNewSection('div', 'resources_sect_id', null, '<p class="divsections">RESOURCES</p>', 'body');
functions.createNewSection('div', 'gather_sect_id', null, '<p class="divsections">GATHER</p>', 'body');
functions.createNewSection('div', 'upgrade_sect_id', null, '<p class="divsections">UPGRADE</p>', 'body');
functions.createNewSection('div', 'building_sect_id', null, '<p class="divsections">BUILDINGS</p>', 'body');

// upgrade object
// createObject('twigs_upgrade', 'tribe_sect_id');

functions.createNewSection('div', 'convert_sect_id', null, '<p class="divsections">CONVERT</p>', 'body');
functions.createNewSection('div', 'convert_lvl1', null, null, 'convert_sect_id');

// **** title ****

var vsim_title = document.getElementById('vsim_title');
var vsim_h1 = document.createElement('h1');
vsim_h1.innerText = "VSIM: A village simulator.";
vsim_title.appendChild(vsim_h1);

// **** start ****

functions.showElementID('vsim_title');
functions.showElementID('tribe_sect_id');
functions.update_tribe(true);
functions.food_section(true);

/*
// Use setTimeout to log the values after some time
setTimeout(() => {
    console.log(foodResource[0]);
}, 5000); // Adjust the time as needed
*/

functions.addClickEvent('add_active');
functions.createGoal(0);

// TESTING
resourcesData[0].cnt = 500;
resourcesData[1].cnt = 500;
resourcesData[2].cnt = 500;

let fetch_food_div = document.getElementById('food_section');
let tooltipContent = functions.createCustomTooltipContent(); // Create a custom content element

// Associate tooltip with click_text element
functions.addTooltip(fetch_food_div, tooltipContent);

// **** Setup all elements ****

// OBJECTS

// *** BUILDING DATA
functions.showElementID('building_sect_id');
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
    
    var add_button_lbl = document.createElement('span');
    first_line_div.appendChild(add_button_lbl);
    add_button_lbl.className = 'ltred';
    add_button_lbl.id = buildingObject.add_button;
    add_button_lbl.innerHTML = '[ BUILD ]';

    // add '***' if costs > max
    let maxedDisplayElement = document.createElement('span');
    first_line_div.appendChild(maxedDisplayElement);
    maxedDisplayElement.id = buildingObject.add_button + '_maxed_display';

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

    // Call the addObjectUpdates function with the buildingData and the ID of print_costs_lbl
    functions.addObjectUpdates([buildingObject], print_costs_lbl.id);

}); // *** END: BUILDING UPGRADE DATA

// *** UPGRADE DATA
functions.showElementID('upgrade_sect_id');
var upgrade_section = document.getElementById('upgrade_sect_id');

upgradeData.forEach(upgradeObject => {

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

    // add '***' if costs > max
    let maxedDisplayElement = document.createElement('span');
    first_line_div.appendChild(maxedDisplayElement);
    maxedDisplayElement.id = upgradeObject.add_button + '_maxed_display';

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

    // Call the addObjectUpdates function with the buildingData and the ID of print_costs_lbl
    functions.addObjectUpdates([upgradeObject], print_costs_lbl.id);

    // WIP hiding
    var job_lbl = document.createElement('div');
    toggled_details_div.appendChild(job_lbl);
    job_lbl.innerHTML = '<p class="yellowtxt">CIVILIAN JOB:</p>';
    job_lbl.style.display = 'none'; // temp
    
    // WIP hiding
    var consume_lbl = document.createElement('div');
    toggled_details_div.appendChild(consume_lbl);
    consume_lbl.innerHTML = '<p class="yellowtxt">CONSUMES:</p>';
    consume_lbl.style.display = 'none'; // temp

}); // *** END: OBJECTS UPGRADE DATA

// RESOURCES DATA
resourcesData.forEach(resource => {

    // RESOURCES
    functions.showElementID('resources_sect_id');
    var resources_section = document.getElementById('resources_sect_id');

    var resourcesContainer = document.createElement('div');
    resourcesContainer.id = resource.res_lbl;
    resourcesContainer.innerHTML = resource.print_resources;
    resources_section.appendChild(resourcesContainer);

    // hide all
    functions.hideElementID(resource.res_lbl);
    
    // show starting resources
    functions.showElementID('resource_twigs');
    functions.showElementID('resource_pebbles');
    functions.showElementID('resource_pine_needles');

    // show/hide elements individually
    // showElementID('resource_000');

    // GATHER
    functions.showElementID('gather_sect_id');
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
    functions.hideElementID(resource.gatherDiv);

    // show starting resources
    functions.showElementID('gather_div_twigs');
    functions.showElementID('gather_div_pebbles');
    functions.showElementID('gather_div_pine_needles');

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
    functions.hideElementID('conDiv_logs');
    functions.hideElementID('conDiv_rocks');
    functions.hideElementID('conDiv_brush');

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
    handleResourceClick(resource, 'gather');
});

document.getElementById(resource.con_id).addEventListener('click', function () {
    handleResourceClick(resource, 'convert');
});

// Single click event handler function
function handleResourceClick(resource, actionType) {
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
        updateOnInterval(resource);
    }, 1000); // Set the interval in milliseconds (1000 milliseconds = 1 second)
}
// Call the function to start periodic updates
interval_var_updates(); // temp for TESTING

}); // END: RESOURCES DATA

// Function to update a value from the array
function updateOnInterval(resource) {

    // update gather rate
    document.getElementById(resource.gather_lbl).innerHTML = '<span class="ltgreentxt">&nbsp;+' + resource.gather_rate + ' ' + resource.lbl.toUpperCase();
    // update resource counts
    resource.cnt = Math.round(resource.cnt * 10) / 10;
    if (resource.cnt >= resource.max) {
        let fetched_res_lbl = document.getElementById(resource.res_lbl);
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

    // global live updates of resource cnt
    resourcesData.forEach((resource, index) => {
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
    
    functions.update_tribe(false);
}
