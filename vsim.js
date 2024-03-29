// vsim.js

import { resourcesData, tribeData, foodSources, foodResource, goalsData, objectiveData, objectElements, costList } from './data.js';

import * as functions from  './functions.js';

//`

// *** Override console.log for exporting into a file
var logs = [];
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
// note: always hidden by default

functions.createNewSection('div', 'vsim_title', null, null, 'body');
functions.createNewSection('div', 'goals_sect_id', null, '<p class="pinktxt">Goals:</p>', 'body');
functions.createNewSection('div', 'tribe_sect_id', null, '<p class="divsections">TRIBE</p>', 'body');
functions.createNewSection('div', 'TRIBE_LEADER_obj', null, null, 'tribe_sect_id');
functions.createNewSection('div', 'resources_sect_id', null, '<p class="divsections">RESOURCES</p>', 'body');
functions.createNewSection('div', 'gather_sect_id', null, '<p class="divsections">GATHER</p>', 'body');
functions.createNewSection('div', 'upgrade_sect_id', null, '<p class="divsections">UPGRADE</p>', 'body');
functions.createNewSection('div', 'building_sect_id', null, '<p class="divsections">BUILDINGS</p>', 'body');
functions.createNewSection('div', 'jobs_sect_id', null, '<p class="divsections">JOBS</p>', 'body');
functions.createNewSection('div', 'convert_sect_id', null, '<p class="divsections">CONVERT</p>', 'body');
functions.createNewSection('div', 'convert_lvl1', null, null, 'convert_sect_id');
functions.createNewSection('div', 'test_section', null, 'TEST', 'body');
// let test_section = document.getElementById(test_section);
// functions.showElementID('test_section');

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
/*
resourcesData[0].cnt = 20;
resourcesData[1].cnt = 10;
resourcesData[2].cnt = 5;
//tribeData[0].cnt = 20
*/

// AVAILABLE_MEMBERS
tribeData[0].cnt = 0;
objectElements[14].cnt = 5;

// test array
//console.log(objectElements);

// test values
/*let set_1 = tribeData.find(i => i.id === 'gatherer');
set_1.cnt = 4;
let set_2 = tribeData.find(i => i.id === 'basic_hunter');
set_2.cnt = 7;*/

/*
// random food test
// Call the selectFoodSource function to get the selected food source
const selectedFoodSource = functions.selectFoodSource(1); // Pass the desired level as an argument

// Access the id property of the selected food source
const selectedFoodId = selectedFoodSource ? selectedFoodSource.id : null;

// Print out the selected food source id
functions.print2(selectedFoodId);
*/

// *** SETUP FOOD TOOLTIP 
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

        // add costs and click action
        functions.setup_costList();

        // RESOURCES DATA
        resourcesData.forEach(resource => {
            // auto gatherers
            let auto_lvl1_res = document.getElementById(resource.auto_lvl1_res);
            auto_lvl1_res.innerHTML = `&nbsp;(+${resource.auto_lvl1_rate}&nbsp;/s)`;
            if (resource.auto_lvl1_rate === 0) {
                auto_lvl1_res.innerHTML = '';
            }
            // update gather rate
            document.getElementById(resource.gather_lbl).innerHTML = '<span class="ltgreentxt">&nbsp;+' + (Math.round(resource.gather_rate * 10) / 10) + ' ' + resource.lbl.toUpperCase();
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
                resource.cnt += resource.auto_lvl1_rate;
                fetched_cnt.innerHTML = resource.cnt.toFixed(1);
            }
            
            // convert div (2)
            if (resource.cnt >= resource.convert) {
                document.getElementById(resource.con_id).innerHTML = '<span class="ltgreentxt">' + resource.cnt + ' / ' + resource.convert + ' ' + resource.lbl + '</span><span class="button_orange">&nbsp;[ CONVERT TO +1 ' + resource.makes.toUpperCase() + ' ] </span';
            } else {
                document.getElementById(resource.con_id).innerHTML = '<span class="ltred">' + resource.cnt + ' / ' + resource.convert + ' ' + resource.lbl + '</span><span class="button_orange">&nbsp;[ CONVERT TO +1 ' + resource.makes.toUpperCase() + ' ] </span';
            }
        });
        
        // FOOD
        functions.start_food();

    }, interval_speed);
}

// *** CREATE OBJECTS BY SECTION
functions.create_object(objectElements);

// start 1 second interval
start_interval(interval_normal);

// WIP: needs its own function
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
    
    // WIP auto gatherers
    let cur_resource_lbl_6 = document.createElement('span');
    resourcesContainer.appendChild(cur_resource_lbl_6);
    cur_resource_lbl_6.id = resource.auto_lvl1_res;
    cur_resource_lbl_6.innerHTML = '&nbsp;(+0&nbsp;/s)';

    // hide all
    functions.hideElementID(resource.res_container);
    
    // show starting resources
    functions.showElementID('res_container_TWIGS');
    functions.showElementID('res_container_PEBBLES');
    functions.showElementID('res_container_PINE_NEEDLES');

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
    functions.showElementID('gather_div_TWIGS');
    functions.showElementID('gather_div_PEBBLES');
    functions.showElementID('gather_div_PINE_NEEDLES');

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
                    update_cnt.innerHTML = (Math.round(resource.cnt * 10) / 10).toFixed(1);
                }
            break;
        case 'convert':
            // available conversions
            if (resource.id === 'TWIGS' && resource.cnt >= resource.convert) {
                resource.cnt -= resource.convert;
                resourcesData.find(res => res.id === 'sticks').cnt += 1;
            }
            if (resource.id === 'PEBBLES' && resource.cnt >= resource.convert) {
                resource.cnt -= resource.convert;
                resourcesData.find(res => res.id === 'stones').cnt += 1;
            }
            if (resource.id === 'PINE_NEEDLES' && resource.cnt >= resource.convert) {
                resource.cnt -= resource.convert;
                resourcesData.find(res => res.id === 'leaves').cnt += 1;
            }
            if (resource.id === 'STICKS' && resource.cnt >= resource.convert) {
                resource.cnt -= resource.convert;
                resourcesData.find(res => res.id === 'logs').cnt += 1;
            }
            if (resource.id === 'STONES'  && resource.cnt >= resource.convert) {
                resource.cnt -= resource.convert;
                resourcesData.find(res => res.id === 'rocks').cnt += 1;
            }
            if (resource.id === 'LEAVES' && resource.cnt >= resource.convert) {
                resource.cnt -= resource.convert;
                resourcesData.find(res => res.id === 'brush').cnt += 1;
            }
            break;
        // Add more cases as needed
    }
}

}); // END: RESOURCES DATA

// test
functions.setup_costList();
