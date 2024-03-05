// functions.js

// import arrays
import { 
    add_resourcesData, 
    add_upgradeData, 
    add_buildingData, 
    add_tribeData, 
    add_foodSources, 
    add_foodResource, 
    add_goalsData, 
    add_objectiveData 
} from './data.js';

// import functions
import * as functions from  './functions.js';

// declare imported arrays
const resourcesData = add_resourcesData();
const upgradeData = add_upgradeData();
const buildingData = add_buildingData();
const tribeData = add_tribeData();
const foodSources = add_foodSources();
const foodResource = add_foodResource();
const goalsData = add_goalsData();
const objectiveData = add_objectiveData();

// Function to add tooltips
export function addTooltip(element, tooltipContent) {
  let tapHoldTimer;
  let tooltipVisible = false; // Track tooltip visibility

  element.addEventListener('mousedown', () => handleTapHoldStart(element, tooltipContent));
  element.addEventListener('touchstart', () => handleTapHoldStart(element, tooltipContent));

  document.addEventListener('click', handleDocumentClick); // Listen for clicks outside the tooltip

  function handleTapHoldStart(element, tooltipContent) {
    event.preventDefault();

    const clickX = event.clientX || event.touches[0].clientX;
    const clickY = event.clientY || event.touches[0].clientY;

    tapHoldTimer = setTimeout(() => {
      // Append the provided tooltip content to the body
      document.body.appendChild(tooltipContent);

      // Position the tooltip at the click location
      const offset = 10;
      tooltipContent.style.position = 'absolute';
      tooltipContent.style.left = clickX + offset + 'px';
      tooltipContent.style.top = clickY + offset + 'px';
      tooltipContent.style.zIndex = '9999';
      tooltipContent.style.backgroundColor = '#333333';
      tooltipContent.style.opacity = '0.9';
      tooltipContent.style.width = '200px';
      tooltipContent.style.display = 'block';

      tooltipVisible = true; // Tooltip is now visible

      // Optionally, you can set a timeout to remove the tooltip after a certain period
      setTimeout(() => {
      if (document.body.contains(tooltipContent)) {
        document.body.removeChild(tooltipContent);
        tooltipVisible = false; // Tooltip is no longer visible
      }
    }, 30000); // Remove after 30 seconds (adjust as needed)
}, 500);

    document.addEventListener('mouseup', () => handleTapHoldEnd(tapHoldTimer));
    document.addEventListener('touchend', () => handleTapHoldEnd(tapHoldTimer));
  }

  function handleDocumentClick(event) {
    if (tooltipVisible && !element.contains(event.target) && !tooltipContent.contains(event.target)) {
      // Clicked outside the tooltip and its associated element
      document.body.removeChild(tooltipContent);
      tooltipVisible = false; // Tooltip is no longer visible
    }
  }

  function handleTapHoldEnd(tapHoldTimer) {
    clearTimeout(tapHoldTimer);

    document.removeEventListener('mouseup', handleTapHoldEnd);
    document.removeEventListener('touchend', handleTapHoldEnd);
  }
}

// for output testing
export function print(text, json) {
    let new_div = document.createElement('div');
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
export function wait(seconds, callback) {
  setTimeout(callback, seconds * 1000);
}
/* Usage example: wait for 5 seconds before executing the next function
wait(5, function() {
  console.log("This code executes after waiting for 5 seconds.");
  // Add your code here for the delayed execution
}); */

// IN INTERVAL: update costs data
export function addObjectUpdates(objectArray, parentID) {
    // for testing ids
    const createdIDs = [];
    var itemsAvailable = [];
    
    objectArray.forEach(object => {

        var createdElement = document.getElementById(object.id + '_costs_div');

        if (!createdElement) {
            createdElement = document.createElement('div');
            createdElement.id = object.id + '_costs_div';
            parentID.appendChild(createdElement);
        }

        // for testing ids
        createdIDs.push(createdElement.id);
        
        let isAddButtonUpdated = false;

        setInterval(() => {
            
            let isAnyMaxed = false;
            
            let object_count = document.getElementById(object.object_count_id);
            if (object.cnt === 0) {
                object_count.innerHTML = '';
            } else {
                object_count.innerHTML = '(' + object.cnt + ')&nbsp';
            }
            resourcesData.forEach((resource, index) => {
                if (resource.hasOwnProperty('deducted')) {
                    resource.deducted = false;
                }
            });
            if (object.hasOwnProperty('applied')) {
                object.applied = false;
            }    
            const object_costs = object.costs;
            let fetch_cnt = '';
            for (const [item, value] of Object.entries(object_costs)) {
                const fetch_resource = resourcesData.find(r => r.lbl === item);
                if (fetch_resource) {
                    // flat increase of cost_creep based on new values
                    const adjustedCost = value;
                    let fetch_resource_rnd = Math.round(fetch_resource.cnt * 10) / 10;
                    const cntToPush = Math.min(fetch_resource_rnd, adjustedCost);
                    const colorClass = (fetch_resource_rnd >= adjustedCost) ? 'ltgreentxt' : 'ltred';
                    itemsAvailable.push({ cnt: cntToPush, adjustedCost });

                    fetch_cnt += '<span class="' + colorClass + '">';
                    fetch_cnt += '<span id="' + object.id + '_' + item + '_cnt' + '">' + fetch_resource_rnd + '</span>&nbsp;/&nbsp;' + adjustedCost + '&nbsp;' + item.toLowerCase();

                    let currentMax = fetch_resource.max;

                    if (adjustedCost > currentMax) {
                        fetch_cnt += '***';
                        isAnyMaxed = true;
                    }
            
                    fetch_cnt += '</span><br>';
                }           
            }

            // Update the costs,_div output
            createdElement.innerHTML = fetch_cnt;

            var allValuesAvailable = itemsAvailable.every(item => item.cnt >= item.value);
            
            // Check if the upgrade has already been applied
            if (!object.applied) {
                // Check if all object_costs values can be deducted
                var allValuesAvailable = Object.entries(object_costs).every(([item, value]) => {
                    const resource = resourcesData.find(r => r.lbl === item);
                    return resource && resource.cnt >= value && !resource.deducted;
                });

                let id_format = object.id + '_add_button';
                let update_add_button = document.getElementById(id_format);

                if (allValuesAvailable) {
                    // Add a 'update-button' class and a 'data-id' attribute
                    update_add_button.className = 'ltgreentxt';
                    update_add_button.classList.add('update-button');
                    update_add_button.setAttribute('data-id', id_format);
                    update_add_button.setAttribute('data-object', JSON.stringify(object));

                    // function handlePurchaseClick()
                    update_add_button.addEventListener('click', handlePurchaseClick);
                }
                if (!allValuesAvailable) {
                    update_add_button.className = 'ltred';
                }
            }

            // update to *** if cannot purchase due to max
            let maxedDisplayElement = document.getElementById(object.add_button + '_maxed_display');
            
            if (isAnyMaxed) {
                maxedDisplayElement.className = 'ltred';
                maxedDisplayElement.innerHTML = '&nbsp;***';
                isAddButtonUpdated = true;
            } else if (!isAnyMaxed && isAddButtonUpdated) {
                maxedDisplayElement.innerHTML = '';
                isAddButtonUpdated = false;
            }
        }, 2000);
    });

    // for testing ids
    return createdIDs;
}
// USAGE:
// buildingData.forEach(buildingObject => {
//     addObjectUpdates([buildingObject], print_costs_lbl.id);
// });

// Outside the main function, define the click event handler
export function handlePurchaseClick(event) {
    if (event.target.classList.contains('update-button')) {
        // Retrieve the associated data attributes
        // *** Method has possible bug, use ForEach if required
        const id_format = event.target.getAttribute('data-id');
        const object = JSON.parse(event.target.getAttribute('data-object'));

        // Reset the color of all buttons
        document.querySelectorAll('.update-button').forEach(button => {
            button.className = 'ltgreentxt'; // or set the default color class
        });

        for (const [item, value] of Object.entries(object.costs)) {
            let fetch_resource = resourcesData.find(r => r.lbl === item);
            let update_add_button = document.getElementById(id_format);

            if (fetch_resource && fetch_resource.cnt >= value && !fetch_resource.deducted) {
                fetch_resource.cnt -= value;
                fetch_resource.deducted = true;
            }
        }

        var allValuesAvailable = Object.entries(object.costs).every(([item, value]) => {
            const resource = resourcesData.find(r => r.lbl === item);
            return resource && resource.cnt >= value && !resource.deducted;
        });

        if (!allValuesAvailable) {
            let update_add_button = document.getElementById(id_format);
            update_add_button.className = 'ltred';
        }

        // *** object specific actions ***

        if (object.type === 'upgrade') {
            // upgradeData array only
            const fetch_object = upgradeData.find(u => u.id === object.id);
            
            fetch_object.cnt += 1;
            fetch_object.applied = true;

            // resource gain
            let resource_gain = resourcesData.find(r => r.lbl === fetch_object.lbl);
            resource_gain.gather_rate *= fetch_object.gather_increase;
            resource_gain.gather_rate = Math.round(resource_gain.gather_rate * 10) / 10;
            
            // gsin details
            let gain_detail = document.getElementById(fetch_object.gain_id);
            let next_rate = resource_gain.gather_rate;
            next_rate *= fetch_object.gather_increase;
            next_rate = Math.round(next_rate * 10) / 10;
            gain_detail.className = 'light_small';
            gain_detail.innerHTML = ' Next: +' + next_rate + '&nbsp;' + fetch_object.lbl.toLowerCase();
            
            // cost creep (same for all objects right now)
            const costCreep = fetch_object.cost_creep;
            const object_costs = fetch_object.costs;
            let fetch_cnt = '';
            for (const key in object_costs) {
                if (object_costs.hasOwnProperty(key)) {
                    object_costs[key] = Math.round(object_costs[key] * costCreep);
                    const costValue = object_costs[key];
                    const fetch_resource = resourcesData.find(r => r.lbl === key);
                    fetch_resource.cnt = Math.round(fetch_resource.cnt * 10) / 10;                    

                    if (fetch_resource) {
                        const colorClass = (fetch_resource.cnt >= costValue) ? 'ltgreentxt' : 'ltred';

                        fetch_cnt += `<span class="${colorClass}"><span id="${fetch_object.id}_${key}_cnt">${fetch_resource.cnt}</span>&nbsp;/&nbsp;${costValue}&nbsp;${key.toLowerCase()}</span><br>`;

                        let currentMax = fetch_resource.max;

                        if (costValue > currentMax) {
                            fetch_cnt += '***';
                        }
                    }
                }
            }
            
            // Update the costs_div output
            let update_output = document.getElementById(fetch_object.id + '_costs_div');
            update_output.innerHTML = fetch_cnt;

        } // end upgrade object if

        if (object.type === 'building') {
            // buildingData array only
            let fetch_object = buildingData.find(u => u.id === object.id);
            
            fetch_object.cnt += 1;
            fetch_object.applied = true;
            if (fetch_object.id === 'primitive_shelter_building') {
                let fetch_div = document.getElementById(fetch_object.eid);
                let fetch_available_members = tribeData.find(t => t.id === 'available_members');
                fetch_available_members.cnt += 1;
            }

            // cost creep (same for all objects right now)
            const costCreep = fetch_object.cost_creep;
            const object_costs = fetch_object.costs;
            let fetch_cnt = '';
            for (const key in object_costs) {
                if (object_costs.hasOwnProperty(key)) {
                    object_costs[key] = Math.round(object_costs[key] * costCreep);
                    const costValue = object_costs[key];
                    const fetch_resource = resourcesData.find(r => r.lbl === key);
            
                    if (fetch_resource) {
                        const colorClass = (fetch_resource.cnt >= costValue) ? 'ltgreentxt' : 'ltred';

                        fetch_cnt += `<span class="${colorClass}"><span id="${fetch_object.id}_${key}_cnt">${fetch_resource.cnt}</span>&nbsp;/&nbsp;${costValue}&nbsp;${key.toLowerCase()}</span><br>`;

                        let currentMax = fetch_resource.max;

                        if (costValue > currentMax) {
                            fetch_cnt += '***';
                        }
                    }
                }
            }

            // Update the costs,_div output
            let update_output = document.getElementById(fetch_object.id + '_costs_div');
            update_output.innerHTML = fetch_cnt;

        } // end building object if
    }
}

export function showElementID(elementId) {
    var element = document.getElementById(elementId);
    if (element) {
        element.style.display = "block";
    }
}

// hide element
export function hideElementID(elementId) {
    var element = document.getElementById(elementId);
    if (element) {
        element.style.display = "none";
    }
}

export function handleElements(create, parentID, element_type, childID, elementID, class_name, inner_HTML) {
    // create: true/false

    // first 4 required
    if (create === null || parentID === null || element_type === null || childID === null) {
        console.error("Required variables are not defined in handleElement().");
        return;
    }

    let new_parentID;

    if (create) {
        new_parentID = document.createElement(element_type);
        if (parentID === 'body') {
            document.body.appendChild(new_parentID);
        } else if (window[parentID] instanceof Node) {
            window[parentID].appendChild(new_parentID);
        } else {
            console.error("Invalid parentID specified.");
            return;
        }
        if (class_name) {
            new_parentID.className = class_name;
        }
        if (inner_HTML) {
            new_parentID.innerHTML = inner_HTML;
        }
    }

    if (!create) {
        new_parentID = document.getElementById(elementID);
        if (class_name) {
            new_parentID.className = class_name;
        }
        if (inner_HTML) {
            new_parentID.innerHTML = inner_HTML;
        }
    }

    if (create) {
        parentID = new_parentID;
    }
}
// USAGE:
//handleElements(true, 'vsim_title', 'div', 'child_div', null, null, null);
//handleElements(true, 'vsim_title', 'div', 'child_div', null, null, 'hello inner_HTML');

// Add an event listener to the element
export function addClickEvent(elementId) {
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
                        const check_goal = goalsData.find(goal => goal.id === goalIdCheck);
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
export function update_tribe(tribe_first_run) {
    
    var tribe_section = document.getElementById('tribe_sect_id');

    if (tribe_section.style.display === 'none') {
        tribe_section.style.display = 'block';
    }
    
    
    // first run
    if (tribe_section && tribe_first_run === true) {

        // all tribeData
        tribeData.forEach(tribe => {
            
            // setup 'total' only
            if (tribe.id === 'total_population') {
                let total_div = document.createElement('div');
                tribe_section.appendChild(total_div);
                total_div.className = 'button_orange';
                // label + cnt
                let total_lbl = document.createElement('span');
                total_div.appendChild(total_lbl);
                total_lbl.innerHTML = tribe.lbl;
                let total_cnt = document.createElement('span');
                total_cnt.id = tribe.eid;
                total_div.appendChild(total_cnt);
                total_cnt.innerHTML = tribe.cnt;
            }
            // setup all but 'total'
            if (tribe.id !== 'total_population') {
                let new_div = document.createElement('div');
                tribe_section.appendChild(new_div);
                new_div.className = 'ltbluetxt_2';
                    
                // label + cnt
                let new_lbl = document.createElement('span');
                new_div.appendChild(new_lbl);
                new_lbl.innerHTML = tribe.lbl;
            
                let new_cnt = document.createElement('span');
                new_div.appendChild(new_cnt);
                new_cnt.id = tribe.eid;
                new_cnt.innerHTML = tribe.cnt;
            }

        });
        
        // Accumulate cnt values for types other than 'total'
        let totalCnt = 0;
        tribeData.forEach(entry => {
            if (entry.type !== 'total') {
                totalCnt += entry.cnt;
            }
        });

        // Update 'total_population' entry with the sum
        tribeData.find(entry => entry.id === 'total_population').cnt += totalCnt;

        tribe_first_run = false;
    }

    // auto update interval
    // WIP: adding gatherers and hunters
    if (tribe_section && tribe_first_run === false) {
    
        setInterval(() => {
            tribeData.forEach(tribe => {
                if (tribe.type !== 'total') {
                    let fetch_tribe_eid = document.getElementById(tribe.eid);
                    fetch_tribe_eid.innerHTML = tribe.cnt;
                } 
            });

            // Accumulate cnt values for types other than 'total'
            let totalCnt = 0;
            tribeData.forEach(entry => {
                if (entry.type !== 'total') {
                    totalCnt += entry.cnt;
                }
            });
    
            let total_tribe = tribeData.find(tribe => tribe.eid === 'total_population_eid');
            total_tribe.cnt = totalCnt;
            
            let fetch_total_eid = document.getElementById('total_population_eid');
            fetch_total_eid.innerHTML = total_tribe.cnt;
//console.log('total_tribe.cnt (after)' + total_tribe.cnt);
//console.log(total_tribe.cnt)
    
        }, 2000);
    }
}

// FOOD SECTION
export function food_section(food_first_run) {

    let resources_section = document.getElementById('resources_sect_id');
    let food = foodResource[0];

    if (food_first_run === true) {

        // food section -- always first
        let food_section = document.createElement('div');
        resources_section.appendChild(food_section);
        food_section.id = 'food_section';
        food_section.className = 'ltbluetxt';

        let food_lbl = document.createElement('span');
        food_section.appendChild(food_lbl);
        food_lbl.innerHTML = food.lbl;
        
        let food_cnt = document.createElement('span');
        food_section.appendChild(food_cnt);
        food_cnt.id = 'food_cnt';
        food_cnt.innerHTML = food.cnt;
        
        let food_spc = document.createElement('span');
        food_section.appendChild(food_spc);
        food_spc.innerHTML = '&nbsp;/&nbsp;';
        
        let food_max = document.createElement('span');
        food_section.appendChild(food_max);
        food_max.id = 'food_max';
        food_max.innerHTML = food.max;
        
        let food_loss = document.createElement('span');
        food_section.appendChild(food_loss);
        food_loss.id = 'food_loss';
        
        // food gathering
        let gather_section = document.getElementById('gather_sect_id');
        let first_resource = document.getElementById('gather_div_twigs');
        let food_gather_div = document.createElement('div');
        if (gather_section) {
            if (first_resource) {
                gather_section.insertBefore(food_gather_div, first_resource);
            } else {
                gather_section.appendChild(food_gather_div);
            }
        } else {
            gather_section.appendChild(food_gather_div);
        }
        let gather_food_btn = document.createElement('span');
        let gather_food_gain = document.createElement('span');
        food_gather_div.appendChild(gather_food_btn);
        food_gather_div.appendChild(gather_food_gain);
        gather_food_btn.id = 'gather_food_btn';
        gather_food_gain.id = 'gather_food_gain';
        gather_food_btn.className = 'button_orange';
        gather_food_gain.className = 'ltgreentxt';
        gather_food_btn.innerHTML = '[ GATHER&nbsp;' + foodSources[0].lbl.toUpperCase() + ']&nbsp;';
        food.gather_rate = food.gather_rate * foodSources[0].multiplier;
        gather_food_gain.innerHTML = '+' + food.gather_rate + '&nbsp;FOOD';

        // click event
        gather_food_btn.addEventListener('click', function() {
            food.cnt = food.cnt + food.gather_rate;
            food_cnt.innerHTML = Math.round(food.cnt * 10) / 10;
        });
        
    food_first_run = false;

    }

    let total_population = tribeData.find(tribe => tribe.id === 'total_population');
    let tribe_leader = tribeData.find(tribe => tribe.id === 'tribe_leader');
    let fetch_cnt = document.getElementById('food_cnt');
    let food_loss = document.getElementById('food_loss');
    let food_source = foodSources[0];
    food.net_difference = 0;
    //let berries = foodSources.find(source => source.id === 'berries');

    // interval
    setInterval(() => {

        // food consumption based on tribeData
        let food_dep = total_population.cnt * -0.2; // using 20% loss / second
        // assign new variables to foodResource[0]
        food.food_dep = food_dep;
        food.loss = food_dep + food_source.spoil;
        food.gain = tribe_leader.cnt * tribe_leader.food_gain; // 20% from tribe_leader
        food.net_difference = food.loss + food.gain;
        food.net_difference = Math.round(food.net_difference * 10) / 10;
        if (food.cnt > 0) {
            food.cnt += food.net_difference;
            fetch_cnt.innerHTML = Math.round(food.cnt * 10) / 10;

            if (food.net_difference < 0 ) {
                food_loss.className = 'ltred';
            }
            food_loss.innerHTML = '&nbsp;(' + food.net_difference + '&nbsp;/&nbsp;s)';
        }
        
        //let add_berries = food.cnt += berries.multiplier;
        //fetch_cnt.innerHTML = Math.round(food.cnt * 10) / 10;

    }, 1000);

}

// Function to create custom tooltip content
export function createCustomTooltipContent() {

//setTimeout(() => {
// TEST
//}, 5000);

    // array: food
    let food = foodResource[0];
    // array: food sources
    let food_source = foodSources[0];
    let tribe_leader = tribeData.find(tribe => tribe.id === 'tribe_leader');
    let total_population = tribeData.find(tribe => tribe.id === 'total_population');

    let border_container = document.createElement('div');
    border_container.className = 'tooltip-style';

    let tooltipContainer = document.createElement('div');
    tooltipContainer.style.padding = '10px';
    border_container.appendChild(tooltipContainer);

    let content_title = document.createElement('p');
    tooltipContainer.appendChild(content_title);
    content_title.style.textAlign = 'center';
    content_title.className = 'yellowtxt';
    content_title.innerHTML = 'Food<hr>';

    let production = document.createElement('div');
    tooltipContainer.appendChild(production);
    production.innerHTML = 'Production:&nbsp;';

    let tribe_leader_lbl = document.createElement('div');
    tribe_leader_lbl.id = ('tribe_leader_lbl');
    tooltipContainer.appendChild(tribe_leader_lbl);
    tribe_leader_lbl.innerHTML = '...tribe leader:&nbsp'; // WIP
    
    let tribe_leader_eid = document.createElement('span');
    tribe_leader_eid.id = tribe_leader_eid;
    tribe_leader_eid.className = 'ltgreentxt';
    tribe_leader_lbl.appendChild(tribe_leader_eid);
    tribe_leader_eid.innerHTML = '+' + tribe_leader.food_gain;

    let production_totals_lbl = document.createElement('div');
    tooltipContainer.appendChild(production_totals_lbl);
    production_totals_lbl.className = 'yellowtxt';
    production_totals_lbl.innerHTML = 'Production Total:&nbsp;';
    //append
    let production_totals = document.createElement('span');
    production_totals.id = 'production_totals_live';
    production_totals_lbl.appendChild(production_totals);
    production_totals.className = 'ltgreentxt';
    let net_difference_prod = tribe_leader.food_gain; // WIP
    production_totals.innerHTML = '+' + net_difference_prod;

    let auto_tick = document.createElement('div');
    tooltipContainer.appendChild(auto_tick);
    let food_loss = document.getElementById('food_loss');
    auto_tick.innerHTML = food_loss.innerHTML;
    
    let consumption = document.createElement('div');
    tooltipContainer.appendChild(consumption);
    consumption.innerHTML = '<hr>Consumption:&nbsp;';

    let population = document.createElement('span');
    tooltipContainer.appendChild(population);
    population.innerHTML = '...population&nbsp';
    
    let population_cnt = document.createElement('span');
    population.appendChild(population_cnt);
    // array: population
    population_cnt.innerHTML = '(' + total_population.cnt + '):&nbsp;';
    //append

    let food_dep_live = document.createElement('span');
    population.appendChild(food_dep_live);
    food_dep_live.id = 'food_dep_live_eid';
    food_dep_live.className = 'ltred';
    food_dep_live.innerHTML = foodResource[0].food_dep;

    let spoiled = document.createElement('div');
    tooltipContainer.appendChild(spoiled);
    spoiled.innerHTML = '...spoiled food:&nbsp;';
    //append
    let spoiled_lbl = document.createElement('span');
    spoiled.appendChild(spoiled_lbl);
    spoiled_lbl.className = 'ltred';
    spoiled_lbl.innerHTML = food_source.spoil;

    let consumption_totals_live = document.createElement('div');
    tooltipContainer.appendChild(consumption_totals_live);
    consumption_totals_live.className = 'yellowtxt';
    consumption_totals_live.innerHTML = 'Consumption Total:&nbsp;';
    //append
    let consumption_totals_lbl = document.createElement('span');
    consumption_totals_live.appendChild(consumption_totals_lbl);
    consumption_totals_lbl.id = 'consumption_totals_live_eid';
    consumption_totals_lbl.className = 'ltred ';
    // rounded consumption
    consumption_totals_lbl.innerHTML = Math.round(foodResource[0].loss * 10) / 10;

    let totals_live = document.createElement('div');
    if (foodResource[0].loss >= 0) {
        totals_live.className = 'ltgreentxt';
    }
    if (foodResource[0].loss < 0) {
        totals_live.className = 'ltred';
    }
    totals_live.id = 'totals_live_eid';
    tooltipContainer.appendChild(totals_live);
    totals_live.innerHTML = '<hr>RATE/S:&nbsp;' + foodResource[0].loss;

    setInterval(() => {
        
        let fetch_food_dep_live = document.getElementById('food_dep_live_eid');
        let fetch_consumption_totals_live = document.getElementById('consumption_totals_live_eid');
        let fetch_totals_live = document.getElementById('totals_live_eid');

        if (fetch_food_dep_live && fetch_consumption_totals_live && fetch_totals_live) {
            
            food_dep_live.innerHTML = foodResource[0].food_dep;
            
            population_cnt.innerHTML = '(' + total_population.cnt + '):&nbsp;';
            
            fetch_consumption_totals_live.innerHTML = Math.round(foodResource[0].loss * 10) / 10;            
            
            let net_difference = foodResource[0].gain + foodResource[0].loss;
            foodResource[0].net_difference = net_difference;
            let add_plus = '+';
            if (foodResource[0].loss >= 0) {
                totals_live.className = 'ltgreentxt';
            }
            if (foodResource[0].loss < 0) {
                totals_live.className = 'ltred';
                add_plus = '';
            }
            fetch_totals_live.innerHTML = '<hr>RATE/S:&nbsp;' + add_plus + Math.round(foodResource[0].net_difference * 10) / 10;
        }
    }, 2000);

    return border_container;
}

// create new elements
export function createNewSection(newType, newId, newClass, content, parentID) {
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

export function removeElement(elementId) {
    var element = document.getElementById(elementId);
    if (element) {
        element.parentNode.removeChild(element);
    } else {
        console.log('Element not found: ' + elementId);
    }
}

// GOALS
export function createGoal(goal_number) {
    var goal_section = document.getElementById('goals_sect_id');
    
    // first run
    if (goal_section.style.display === 'none') {
        goal_section.style.display = 'block';
    }
    
    // Reset existing content before adding new goal
    goal_section.innerHTML = '<p class="pinktxt">Goals:</p>';
    var goalNumber = goalsData.find(goal => goal.id === goal_number);

    if (goalNumber && !goalNumber.goal_req_met) {
        var newGoal = document.createElement('div');
        newGoal.id = 'goal_' + goalNumber.id;
    
        var goalContent_desc = document.createElement('p');
        goalContent_desc.textContent = goalNumber.desc;

        newGoal.appendChild(goalContent_desc);
        goal_section.appendChild(newGoal);
    }
}

export function goalCompleted(goalId) {
    var goal_section = document.getElementById('goals_sect_id');

    // Find the goal in the goalsData array based on its ID
    var goalToUpdate = goalsData.find(goal => goal.id === goalId);

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
