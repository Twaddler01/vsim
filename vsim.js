// vsim.js
import { resourcesData, upgradeData, buildingData, jobsData, tribeData, foodSources, foodResource, goalsData, objectiveData, costsData, objectElements } from './data.js';

import * as functions from  './functions.js';

var logs = [];

//`

// *** Override console.log for exporting into a file
const originalConsoleLog = console.log;
console.log = function (message) {
    if (typeof message === 'object') {
        // Convert objects to a string representation
        message = JSON.stringify(message);
    }

    logs.push(message);

    // You can still log to the console if needed
    originalConsoleLog(message);
};

document.getElementById("exportButton").addEventListener("click", function () {
    // Save logs to a file
    let logString = logs.join('\n');

    // Create a Blob containing the text data
    const blob = new Blob([logString], { type: 'text/plain' });

    // Create a download link
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = 'logs.txt';

    // Append the link to the document
    document.body.appendChild(link);

    // Trigger the download
    link.click();

    // Remove the link from the document
    document.body.removeChild(link);
});

// *** main div sections ****

functions.createNewSection('div', 'vsim_title', null, null, 'body');
functions.createNewSection('div', 'goals_sect_id', null, '<p class="pinktxt">Goals:</p>', 'body');
functions.createNewSection('div', 'tribe_sect_id', null, '<p class="divsections">TRIBE</p>', 'body');
functions.createNewSection('div', 'tribe_leader_obj', null, null, 'tribe_sect_id');
functions.createNewSection('div', 'resources_sect_id', null, '<p class="divsections">RESOURCES</p>', 'body');
functions.createNewSection('div', 'gather_sect_id', null, '<p class="divsections">GATHER</p>', 'body');
functions.createNewSection('div', 'upgrade_sect_id', null, '<p class="divsections">UPGRADE</p>', 'body');
functions.createNewSection('div', 'building_sect_id', null, '<p class="divsections">BUILDINGS</p>', 'body');
functions.createNewSection('div', 'jobs_sect_id', null, '<p class="divsections">JOBS</p>', 'body');
functions.createNewSection('div', 'convert_sect_id', null, '<p class="divsections">CONVERT</p>', 'body');
functions.createNewSection('div', 'convert_lvl1', null, null, 'convert_sect_id');
functions.createNewSection('div', 'test_section', null, 'TEST', 'body');

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
resourcesData[0].cnt = 20;
resourcesData[1].cnt = 10;
resourcesData[2].cnt = 5;
//tribeData[0].cnt = 20

resourcesData.forEach(res => {res.cnt = 500});

// test values
/*let set_1 = tribeData.find(i => i.id === 'gatherer');
set_1.cnt = 4;
let set_2 = tribeData.find(i => i.id === 'basic_hunter');
set_2.cnt = 7;*/

let fetch_food_div = document.getElementById('food_section');
let tooltipContent = functions.createCustomTooltipContent(); // Create a custom content element

// Associate tooltip with click_text element
functions.addTooltip(fetch_food_div, tooltipContent);

// global interval updates
const interval_slow = 2000;
const interval_normal = 1000;
const interval_fast = 200;

function start_interval(s) {
    const interval_speed = s;

    setInterval(() => {
     
        // JOB DATA
        jobsData.forEach(job => {
            functions.objectUpdates_interval([job], job.costs_div);
        });
     
        // BUILDING DATA
        buildingData.forEach(building => {
            functions.objectUpdates_interval([building], building.costs_div);
        });
/*
        // UPGRADE DATA
        upgradeData.forEach(upgrade => {
            functions.objectUpdates_interval([upgrade], upgrade.costs_div);        
        });
*/
        // RESOURCES DATA
        resourcesData.forEach(resource => {
            // update gather rate
            // error
            document.getElementById(resource.gather_lbl).innerHTML = '<span class="ltgreentxt">&nbsp;+' + resource.gather_rate + ' ' + resource.lbl.toUpperCase();
            // update resource counts
            resource.cnt = Math.round(resource.cnt * 10) / 10;
            let fetched_cnt = document.getElementById(resource.res_cnt);
            let fetched_res_container = document.getElementById(resource.res_container);
            if (resource.cnt >= resource.max) {
                resource.cnt = resource.max;
                fetched_cnt.innerHTML = resource.max;
                fetched_res_container.className = 'ltbluetxt_2';
            }
            if (resource.cnt < resource.max) {
                fetched_res_container.className = 'ltbluetxt';
                fetched_cnt.innerHTML = resource.cnt;
            }
            
            // convert div (2)
            if (resource.cnt >= resource.convert) {
                document.getElementById(resource.con_id).innerHTML = '<span class="ltgreentxt">' + resource.cnt + ' / ' + resource.convert + ' ' + resource.lbl + '</span><span class="button_orange">&nbsp;[ CONVERT TO +1 ' + resource.makes.toUpperCase() + ' ] </span';
            } else {
                document.getElementById(resource.con_id).innerHTML = '<span class="ltred">' + resource.cnt + ' / ' + resource.convert + ' ' + resource.lbl + '</span><span class="button_orange">&nbsp;[ CONVERT TO +1 ' + resource.makes.toUpperCase() + ' ] </span';
            }
        });
        
        // JOBS DATA
        




    }, interval_speed);
}

start_interval(interval_normal);

// **** Setup all elements ****

// *** JOBS DATA
functions.showElementID('jobs_sect_id');
var jobs_section = document.getElementById('jobs_sect_id');

jobsData.forEach(jobsObject => {

    // container
    functions.newEl('jobs_container', 'div', jobs_section, jobsObject.id, null, null);

    // 2 parts of object
    functions.newEl('first_line_div', 'div', jobs_container, jobsObject.first_line_div_id, null, null);
    functions.newEl('toggled_details_div', 'div', jobs_container, jobsObject.toggled_details_div_id, null, null);
    toggled_details_div.style.display = 'none';

    // [ + ] details initial
    functions.newEl('button_toggle', 'span', first_line_div, null, null, null);
    button_toggle.innerHTML = '<hr class="divider" width=30% align="left"> ' + '<span id="' + jobsObject.button_id + '"> [ + ] <span class="button_orange"> ' + jobsObject.title + '&nbsp;</span></span>';

    var toggleButton = document.getElementById(jobsObject.button_id);
    var toggleDiv = document.getElementById(jobsObject.toggled_details_div_id);

    // Add an onclick event listener to the button
    toggleButton.addEventListener('click', function() {
        // Toggle the display property of toggled_details_div
        if (toggleDiv.style.display === 'none') {
            toggleDiv.style.display = 'block';

            // Change the button text to [ - ]
            toggleButton.innerHTML = '<span id="' + jobsObject.button_id + '"> [ - ] <span class="button_orange"> ' + jobsObject.title + '&nbsp;</span></span>';
        } else {
            toggleDiv.style.display = 'none';
            // Change the button text to [ + ]
            toggleButton.innerHTML = '<span id="' + jobsObject.button_id + '"> [ + ] <span class="button_orange"> ' + jobsObject.title + '&nbsp;</span></span>';
        }
    });

    // object count span
    functions.newEl('object_count', 'span', first_line_div, jobsObject.object_count_id, null, null);
    object_count.className = 'button_orange';

    functions.newEl('add_button_lbl', 'span', first_line_div, jobsObject.add_button_id, null, null);
    add_button_lbl.className = 'ltred';
    add_button_lbl.innerHTML = '[ ASSIGN ]';
    // add '***' if costs > max
    functions.newEl('maxedDisplay', 'span', first_line_div, jobsObject.maxed_display_id, null, null);

    // *** details start
    // gain label
    functions.newEl('gain_lbl', 'div', toggled_details_div, jobsObject.gain_id, null, null);
    gain_lbl.className = 'ltgreentxt';
    gain_lbl.innerHTML = jobsObject.gain_lbl;

    // gain_detail
    functions.newEl('gain_detail', 'div', toggled_details_div, jobsObject.gain_detail_id, null, null);
    gain_detail.className = 'light_small';
    gain_detail.innerHTML = jobsObject.gain_detail_lbl;

    // description
    functions.newEl('description', 'div', toggled_details_div, null, null, null);
    description.style.maxWidth = '60%';
    description.innerHTML = jobsObject.desc;

    // costs display (label)
    functions.newEl('costs_lbl', 'div', toggled_details_div, null, null, null);
    costs_lbl.innerHTML = '<p class="yellowtxt">COSTS:</p>';

    // costs display (data)
    //functions.newEl('print_costs_lbl', 'div', toggled_details_div, jobsObject.costs_div_id, null, null);

    // costs display (all data)
    functions.newEl('costs_div_all', 'div', toggled_details_div, jobsObject.costs_div, null, null);
    // append -- costs_cnt_span_DOM
    functions.newEl('costs_cnt_span_id', 'div', costs_div_all, jobsObject.costs_cnt_span, null, null);
    // append -- costs_total_span
    functions.newEl('costs_array_span_id', 'div', costs_div_all, jobsObject.costs_array_span, null, null);

}); // *** END: JOBS DATA forEach

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

    // costs display (all data)
    var costs_div_all = document.createElement('div');
    costs_div_all.id = buildingObject.costs_div;
    toggled_details_div.appendChild(costs_div_all);
    // WIP add a costs cnt element
    // append -- costs_cnt_span_DOM
    var costs_cnt_span = document.createElement('span');
    costs_div_all.appendChild(costs_cnt_span);
    costs_cnt_span.id = buildingObject.costs_cnt_span;
    // append -- costs_total_span
    var costs_array_span = document.createElement('span');
    costs_array_span.id = buildingObject.costs_array_span;
    costs_div_all.appendChild(costs_array_span);

    // Call the addObjectUpdates function with the buildingData and the ID of print_costs_lbl
    // TEST
    //functions.addObjectUpdates([buildingObject], print_costs_lbl.id);

}); // *** END: BUILDING UPGRADE DATA

/*
// ************
// NEW ARRAY TEST
// ************

// *** UPGRADE DATA
functions.showElementID('upgrade_sect_id');
var upgrade_section = document.getElementById('upgrade_sect_id');

upgradeData.forEach(upgradeObject => {








    // starting costs
    //upgradeObject.print_costs = '';

    // full container
    var upgrade_container = document.createElement('div');
    upgrade_container.id = upgradeObject.upgradeID;
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

    // costs display (all data)
    var costs_div_all = document.createElement('div');
    costs_div_all.id = upgradeObject.costs_div;
    toggled_details_div.appendChild(costs_div_all);

// moved to interval
    // Call the addObjectUpdates function with the upgradeData and the ID of costs_div_all
    //functions.addObjectUpdates([upgradeObject], costs_div_all.id);

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
*/

// RESOURCES DATA
resourcesData.forEach(resource => {

    // RESOURCES
    functions.showElementID('resources_sect_id');
    var resources_section = document.getElementById('resources_sect_id');

    let resourcesContainer = document.createElement('div');
    resourcesContainer.id = resource.res_container;
    resources_section.appendChild(resourcesContainer);
    // append -- resource.lbl
    let cur_resource_lbl_1 = document.createElement('span');
    resourcesContainer.appendChild(cur_resource_lbl_1);
    cur_resource_lbl_1.id = resource.res_cnt_lbl;
    cur_resource_lbl_1.innerHTML = resource.lbl;
    // append
    let cur_resource_lbl_2 = document.createElement('span');
    resourcesContainer.appendChild(cur_resource_lbl_2);
    cur_resource_lbl_2.innerHTML = ':&nbsp;';
    // append -- resource.cnt
    let cur_resource_lbl_3 = document.createElement('span');
    resourcesContainer.appendChild(cur_resource_lbl_3);
    cur_resource_lbl_3.id = resource.res_cnt;
    cur_resource_lbl_3.innerHTML = resource.cnt;
    // append
    let cur_resource_lbl_4 = document.createElement('span');
    resourcesContainer.appendChild(cur_resource_lbl_4);
    cur_resource_lbl_4.innerHTML = '&nbsp;/&nbsp;';
    // append -- max
    let cur_resource_lbl_5 = document.createElement('span');
    resourcesContainer.appendChild(cur_resource_lbl_5);
    cur_resource_lbl_5.id = resource.res_cnt_max;
    cur_resource_lbl_5.innerHTML = resource.max;

    // hide all
    functions.hideElementID(resource.res_container);
    
    // show starting resources
    functions.showElementID('res_container_twigs');
    functions.showElementID('res_container_pebbles');
    functions.showElementID('res_container_pine_needles');

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
    handleResourceClick('gather');
});

document.getElementById(resource.con_id).addEventListener('click', function () {
    handleResourceClick('convert');
});

// Single click event handler function
function handleResourceClick(actionType) {
    switch (actionType) {
        case 'gather':
                let update_cnt = document.getElementById(resource.res_cnt);

                // set maximum
                if (resource.cnt >= resource.max) {
                    resource.cnt = resource.max;
                    update_cnt.innerHTML = resource.max;
                } 
                if (resource.cnt < resource.max) {
                    resource.cnt += resource.gather_rate;
                    update_cnt.innerHTML = Math.round(resource.cnt * 10) / 10;
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

}); // END: RESOURCES DATA
