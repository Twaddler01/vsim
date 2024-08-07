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

// *** allow exporting of HTML to inspect/debug elements
// Create the "Export HTML" button
const exportHTMLButton = document.createElement('button');
exportHTMLButton.id = 'exportHTMLButton';
exportHTMLButton.textContent = 'Export HTML';

// Append the button to the document body
document.body.appendChild(exportHTMLButton);

// Add an event listener to the "Export HTML" button
exportHTMLButton.addEventListener("click", function () {
    // Get the HTML content of the entire document
    let htmlContent = document.documentElement.outerHTML;

    // Create a Blob containing the HTML content
    const blob = new Blob([htmlContent], { type: 'text/html' });

    // Create a download link
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = 'vsim_page.html';

    // Append the link to the document
    document.body.appendChild(link);

    // Trigger the download
    link.click();

    // Remove the link from the document
    document.body.removeChild(link);
});

// *** main div sections ****
// SPECIAL: title, goals, tribe, resources, gather, convert

functions.createNewSection('div', 'vsim_title', null, null, 'body');

functions.createNewSection('div', 'goals_sect_title', 'section_title', '<p class="divsections_no_ul">&nbsp;[&nbsp;--&nbsp;]<span class="divsections">GOALS</span></p>', 'body');
functions.showElementID('goals_sect_title');
functions.createNewSection('div', 'goals_sect_id', 'section_text', '<p class="ppinktxt"GOALS</p>', 'body');
functions.section_collapse('goals');

functions.createNewSection('div', 'tribe_sect_title', 'section_title', '<p class="divsections_no_ul">&nbsp;[&nbsp;--&nbsp;]<span class="divsections">TRIBE</span></p>', 'body');
functions.showElementID('tribe_sect_title');
functions.createNewSection('div', 'tribe_sect_id', 'section_text', null, 'body');

functions.section_collapse('tribe');
functions.createNewSection('div', 'TRIBE_LEADER_obj', null, null, 'tribe_sect_id');

functions.createNewSection('div', 'resources_sect_title', 'section_title', '<p class="divsections_no_ul">&nbsp;[&nbsp;--&nbsp;]<span class="divsections">RESOURCES</span></p>', 'body');
//functions.showElementID('resources_sect_title');
functions.createNewSection('div', 'resources_sect_id', 'section_text', null, 'body');
functions.section_collapse('resources');

functions.createNewSection('div', 'gather_sect_title', 'section_title', '<p class="divsections_no_ul">&nbsp;[&nbsp;--&nbsp;]<span class="divsections">GATHER</span></p>', 'body');
//functions.showElementID('gather_sect_title');
functions.createNewSection('div', 'gather_sect_id', 'section_text', null, 'body');
functions.section_collapse('gather');

functions.createNewSection('div', 'convert_sect_title', 'section_title', '<p class="divsections_no_ul">&nbsp;[&nbsp;--&nbsp;]<span class="divsections">CONVERT</span></p>', 'body');
//functions.showElementID('convert_sect_title');
functions.createNewSection('div', 'convert_sect_id', 'section_text', null, 'body');
functions.createNewSection('div', 'convert_lvl1', null, null, 'convert_sect_id');
functions.section_collapse('convert');

// **** other sections created in create_object(objectElements) ****
// obj_type: upgrade, building, job, craft

// **** title ****

var vsim_title = document.getElementById('vsim_title');
var vsim_h1 = document.createElement('h1');
vsim_h1.innerText = "VSIM: A village simulator.";
vsim_title.appendChild(vsim_h1);

// **** start ****

functions.showElementID('vsim_title');

functions.update_tribe(true);

functions.food_section(true);

/*
// Use setTimeout to log the values after some time
setTimeout(() => {
    console.log(foodResource[0]);
}, 5000); // Adjust the time as needed
*/

// TESTING
/*resourcesData.forEach(res => {
    res.gather_rate = 250;
    res.cnt = 2000;
});*/
//resourcesData[0].gather_rate = 250;
//resourcesData[1].gather_rate = 250;
//resourcesData[2].gather_rate = 250;
resourcesData[0].cnt = 190;
//resourcesData[1].cnt = 10;
//resourcesData[2].cnt = 5;
//tribeData[0].cnt = 20

// AVAILABLE_MEMBERS
//tribeData[0].cnt = 5;
// CRAFT_SPEAR
//objectElements[15].cnt = 2;

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

// *** CREATE objectElements SECTIONS
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

objectElements.forEach(objectMod => {

    // CRAFT_SPEAR
    if (objectMod.id === 'CRAFT_SPEAR') {

        // update object_count
        let object_count = document.getElementById(objectMod.object_count);
        if (objectMod.cnt !== 0) {
            object_count.innerHTML = `&nbsp;(${objectMod.cnt})&nbsp`;
        } else {
            object_count.innerHTML = '';
        }
        
        // assign initial total_decay_value
        if (objectMod.decay_value === objectMod.decay_value_start) {
            objectMod.total_decay_value = objectMod.decay_value_start * objectMod.cnt;
        }


        let basic_hunter = tribeData.find(t => t.id === 'POP_BASIC_HUNTER');
        
        // Calculate remaining time
        let time = objectMod.decay_value / objectMod.decay_rate;
        let minutes = Math.floor(time / 60);
        let seconds = Math.floor(time % 60);
        
        let time_total = objectMod.total_decay_value / objectMod.decay_rate;
        let minutes_total = Math.floor(time_total / 60);
        let seconds_total = Math.floor(time_total % 60);

        // requirements met
        if (objectMod.cnt > 0 && basic_hunter.cnt > 0) {
            basic_hunter.food_gain_flag = true; // flagged in food function to add food_gain

            let decay_value_lbl = document.getElementById(objectMod.decay_value_lbl);
            let decay_container = document.getElementById(objectMod.decay_container);

            decay_container.style.display = 'block';

            // Update decay value
            objectMod.decay_value -= objectMod.decay_rate;
            objectMod.total_decay_value = objectMod.decay_value + (objectMod.decay_value_start * objectMod.cnt) - objectMod.decay_value_start;

            // Check if decay_value is less than 0
            let displayValue = Math.round(objectMod.decay_value * 10) / 10;
            let displayValue_total = Math.round(objectMod.total_decay_value * 10) / 10;
            if (displayValue < 0) {
                displayValue = 0; // Set displayValue to 0 if it's less than 0
            }
            if (displayValue_total < 0) {
                displayValue_total = 0; // Set displayValue_total to 0 if it's less than 0
            }
            // Display remaining time
            decay_value_lbl.innerHTML = 
            `<span class="regtxt">CURRENT:</span> ` + 
            displayValue + ` (${minutes}:${seconds < 10 ? '0' : ''}${seconds})` + 
            `<br><span class="regtxt">TOTAL:</span> ` + 
            displayValue_total + ` (${minutes_total}:${seconds_total < 10 ? '0' : ''}${seconds_total})`;
            // store total timer in array
            objectMod.decay_timer = ` ${minutes_total}:${seconds_total < 10 ? '0' : ''}${seconds_total}`;
            
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
    // UPDATE extras: bonus
    // for BUILDING_PRIMITIVE_ALTAR
    let altar_obj = objectElements.find(o => o.id === 'BUILDING_PRIMITIVE_ALTAR');
    if (altar_obj.cnt >= 5) {
        let fetch_bonus_txt_id = document.getElementById(altar_obj.bonus_txt_id);
        fetch_bonus_txt_id.className = 'ltgreentxt';
        // WIP: add action
    }
});

        // RESOURCES DATA
        resourcesData.forEach(resource => {
            // UPDATE auto gatherers
            let auto_lvl1_res = document.getElementById(resource.auto_lvl1_res);
            resourcesData.forEach(res => {
                if (res.level === 1 && res.hidden === false) {
                    if (resource.auto_lvl1_rate === 0 || resource.cnt >= resource.max) {
                        if (resource.auto_lvl1_rate > 0) {
                            auto_lvl1_res.className = 'button_faded';
                        } else {
                            auto_lvl1_res.innerHTML = '';
                        }
                    } else {
                        auto_lvl1_res.className = 'ltgreentxt';
                        auto_lvl1_res.innerHTML = `&nbsp;(+${resource.auto_lvl1_rate}&nbsp;/s)`;
                    }
                }
            });
            
            // UPDATE gather rate
            document.getElementById(resource.gather_lbl).innerHTML = '<span class="ltgreentxt">&nbsp;+' + (Math.round(resource.gather_rate * 10) / 10) + ' ' + resource.lbl.toUpperCase();
            // UPDATE resource counts
            resource.cnt = Math.round(resource.cnt * 10) / 10;
            let fetched_cnt = document.getElementById(resource.res_cnt);
            let fetched_res_cnt_max = document.getElementById(resource.res_cnt_max);
            let fetched_res_container = document.getElementById(resource.res_container);
            if (resource.cnt >= resource.max) {
                resource.cnt = resource.max;
                fetched_cnt.innerHTML = functions.number_format(resource.max);
                fetched_res_cnt_max.innerHTML = functions.number_format(resource.max);
                if (resource.id !== 'KNOWLEDGE') {
                    fetched_res_container.className = 'ltbluetxt';
                    fetched_res_container.style.fontWeight = 'bold';
                } 
                if (resource.id === 'KNOWLEDGE') {
                    fetched_res_container.className = 'pinktxt';
                    fetched_res_container.style.fontWeight = 'bold';
                }
            }
            if (resource.cnt < resource.max) {
                if (resource.id !== 'KNOWLEDGE') {
                    fetched_res_container.className = 'ltbluetxt';
                    fetched_res_container.style.fontWeight = 'normal';
                } else {
                    fetched_res_container.className = 'pinktxt';
                    fetched_res_container.style.fontWeight = 'normal';
                }
                resource.cnt += resource.auto_lvl1_rate;
                fetched_cnt.innerHTML = functions.number_format(resource.cnt.toFixed(1));
            }
            if (resource.level === 1 || resource.level === 2) {
                if (resource.cnt > 0 && resource.hidden === true) {
                    functions.showElementID('res_container_' + resource.id);
                    resource.hidden = false;
                }
            }
            
            // UPDATE convert div (2)
            if (resource.makes !== 'none') {
                let altar = objectElements.find(o => o.id === 'BUILDING_PRIMITIVE_ALTAR');
                let made_res = resourcesData.find(r => r.id === resource.makes);
                if (made_res && altar.cnt > 0 && made_res.level === 2) {
                    resource.convert_gain = altar.cnt * resource.convert_mult;
                }
                // UPDATE output display
                if (resource.cnt >= resource.convert) {
                    document.getElementById(resource.con_id).innerHTML = '<button class="button">CONVERT 10 ' + resource.lbl + '</button>&nbsp;<span class="ltgreentxt">+' + resource.convert_gain + '&nbsp;' + resource.makes.toUpperCase() + '</span>&nbsp;<div class="ltgreentxt">' + resource.cnt + ' / ' + resource.convert + ' ' + resource.lbl + '</div>';
                } else {
                    document.getElementById(resource.con_id).innerHTML = '<button class="button">CONVERT 10 ' + resource.lbl + '</button>&nbsp;<span class="ltgreentxt">+' + resource.convert_gain + '&nbsp;' + resource.makes.toUpperCase() + '</span>&nbsp;<div class="ltred">' + resource.cnt + ' / ' + resource.convert + ' ' + resource.lbl + '</div>';            
                }
            }
        });
        
        // FOOD
        functions.update_food();

    }, interval_speed);
}

// start 1 second interval
start_interval(interval_normal);

// display goals data
functions.showElementID('goals_sect_id');
// display resources data
//functions.showElementID('resources_sect_id');
// display gather buttons
//functions.showElementID('gather_sect_id');
// display convert buttons
//functions.showElementID('convert_sect_id');

// start goals function
functions.startGoals();

// start gather/convert function
functions.start_gather(resourcesData);

//Setup event listeners for each toggleButton
functions.attachEventListeners();
