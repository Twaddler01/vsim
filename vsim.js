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
// CRAFT_SPEAR
objectElements[14].cnt = 1;

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

// *** CREATE OBJECTS BY SECTION
functions.create_object(objectElements);

// global interval updates
const interval_slow = 2000;
const interval_normal = 1000;
const interval_fast = 200;

function start_interval(s) {
    const interval_speed = s;

    setInterval(() => {

        // update costs and click actions
        functions.update_costList();

// *** objectElements updates

// CRAFT_SPEAR
objectElements.forEach(objectMod => {

    if (objectMod.id === 'CRAFT_SPEAR') {

        // update object_count
        let object_count = document.getElementById(objectMod.object_count);
        if (objectMod.cnt !== 0) {
            object_count.innerHTML = `(${objectMod.cnt})&nbsp`;
        } else {
            object_count.innerHTML = '';
        }

        let basic_hunter = tribeData.find(t => t.id === 'POP_BASIC_HUNTER');
        
        // Calculate remaining time
        let time = objectMod.decay_value / objectMod.decay_rate;
        let minutes = Math.floor(time / 60);
        let seconds = Math.floor(time % 60);

        // requirements met
        if (objectMod.cnt > 0 && basic_hunter.cnt > 0) {
            basic_hunter.food_gain_flag = true; // flagged in food function to add food_gain

            let decay_value_lbl = document.getElementById(objectMod.decay_value_lbl);
            let decay_container = document.getElementById(objectMod.decay_container);

            decay_container.style.display = 'block';
            // Update decay value
            objectMod.decay_value -= objectMod.decay_rate;
            if (objectMod.decay_value < objectMod.decay_rate) {
                objectMod.decay_value = 0;
            }

            // Display remaining time
            decay_value_lbl.innerHTML = (Math.round(objectMod.decay_value * 10) / 10) + ` (${minutes}:${seconds < 10 ? '0' : ''}${seconds} remaining) `;
            
            if (objectMod.decay_value <= 0) {
                objectMod.cnt -= 1;
                objectMod.decay_value = objectMod.decay_value_start;
            } else {
                decay_value_lbl.className = 'ltgreentxt';
            }
        // requirements not met
        } else {
            basic_hunter.food_gain_flag = false;
            decay_value_lbl.className = 'ltred';
            decay_value_lbl.innerHTML = '0 -- New spears are needed.';
        }
        if (basic_hunter.cnt === 0) {
            decay_container.style.display = 'none';
        }
    } 
});

        // RESOURCES DATA
        resourcesData.forEach(resource => {
            // auto gatherers
            let auto_lvl1_res = document.getElementById(resource.auto_lvl1_res);
            resourcesData.forEach(res => {
                if (res.level === 1) {
                    if (resource.auto_lvl1_rate === 0 || resource.cnt >= resource.max) {
                        auto_lvl1_res.innerHTML = '';
                    } else {
                        auto_lvl1_res.innerHTML = `&nbsp;(+${resource.auto_lvl1_rate}&nbsp;/s)`;
                    }
                }
            });
            
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
        functions.update_food();

    }, interval_speed);
}

// start 1 second interval
start_interval(interval_normal);

// display resources data
functions.showElementID('resources_sect_id');
// display gather buttons
functions.showElementID('gather_sect_id');
// display convert -- WIP: hidden
//functions.showElementID('convert_sect_id');

// start gather/convert function
functions.start_gather(resourcesData);
