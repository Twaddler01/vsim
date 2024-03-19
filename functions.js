// functions.js

// import arrays
import { resourcesData, upgradeData, buildingData, jobsData, tribeData, foodSources, foodResource, goalsData, objectiveData, costsData } from './data.js';

export function newEl(name, type, parentID, id, cls, content) {
    var element = document.createElement(type);
    parentID.appendChild(element);
    
    if (id) {
        element.id = id;
    }
    
    if (cls) {
        element.className = cls;
    }
    
    if (content) {
        element.innerHTML = content;
    }

    window[name] = element;
}


// for output testing
export function print2(text, json) {
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

// called in main interval -- update costs data
export function addObjectUpdates(objectArray, parentID) {

    objectArray.forEach(object => {

        var createdElement = document.getElementById(object.costs_div);

        if (!createdElement) {
            createdElement = document.createElement('div');
            createdElement.id = object.costs_div;
            parentID.appendChild(createdElement);
        }

        objectUpdates_interval(objectArray, createdElement);
    
    });
}
// USAGE:
// buildingData.forEach(buildingObject => {
//     addObjectUpdates([buildingObject], buildingObject.costs_div);
// });

export function objectUpdates_interval(objectArray, createdElement) {

    var itemsAvailable = [];
    let isAddButtonUpdated = false;

    objectArray.forEach(object => {

        setInterval(() => {
            
            createdElement = document.getElementById(object.costs_div);

            let isAnyMaxed = false;
            
            let object_count = document.getElementById(object.object_count);
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
            const object_costs = costsData.find(cost => cost.id === object.id);
            let fetch_cnt = '';

            if (object_costs) {
                resourcesData.forEach(fetch_resource => {
                    const costValue = object_costs.costs[fetch_resource.id];
            
                    if (costValue !== undefined) {
                        fetch_resource.cnt = Math.round(fetch_resource.cnt * 10) / 10;
                        const cntToPush = Math.min(fetch_resource.cnt, costValue);
                        const colorClass = (fetch_resource.cnt >= costValue) ? 'ltgreentxt' : 'ltred';
                        itemsAvailable.push({ cnt: cntToPush, value: costValue });

                        let lineToAdd = `<span class="${colorClass}">${fetch_resource.cnt}&nbsp;/&nbsp;${costValue}&nbsp;${fetch_resource.lbl}</span>`;
                        let currentMax = fetch_resource.max;
            
                        if (costValue > currentMax) {
                            lineToAdd += '<span class="ltred">***</span>';
                            isAnyMaxed = true;
                        }
            
                        fetch_cnt += lineToAdd + '<br>';
                    }
                });
            }

            if (object_costs && object.type === 'job') {
                tribeData.forEach(tribe => {
                    if (tribe.id === 'available_members') {
                        const object_costs = costsData.find(cost => cost.id === object.id);
                        const costValue = object_costs.costs['available_members'];
                        const colorClass = (tribe.cnt >= costValue) ? 'ltgreentxt' : 'ltred';
                        const cntToPush = Math.min(tribe.cnt, costValue);
                        itemsAvailable.push({ cnt: cntToPush, value: costValue });

                        fetch_cnt += `<span class="${colorClass}">${tribe.cnt}&nbsp;/&nbsp;${costValue}&nbsp;${tribe.lbl}</span><br>`;
                
                    }
                });
            }

            // Update the costs,_div output
            if (createdElement) {
                createdElement.innerHTML = fetch_cnt;
            }

            var allValuesAvailable = itemsAvailable.every(item => item.cnt >= item.value);
            
            // Check if the upgrade has already been applied
            if (!object.applied) {
                // Check if all object_costs values can be deducted
                var allValuesAvailable = Object.entries(object_costs.costs).every(([item, value]) => {
                    const resource = resourcesData.find(r => r.id === item);
                    return resource && resource.cnt >= value && !resource.deducted;
                });

                let id_format = object.id + '_add_button';
                let update_add_button = document.getElementById(id_format);
                
                if (object.type === 'job') {
                    //let fetch_tribe_available_members = tribeData.find(tribe => tribe.id === 'available_members');
                    //let update_add_button = document.getElementById(fetch_trlibe_available_members.add_button_id);
                    allValuesAvailable = Object.entries(object_costs.costs).every(([item, value]) => {
                        const available_members = tribeData.find(t => t.id === item);
                        return available_members && available_members.cnt >= value && !available_members.deducted;
                    });
                }

                // WIP add or for available_members
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
            let maxedDisplayElement = document.getElementById(object.add_button_max);
            
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
} // end INTERVAL function 

// Outside the main function, define the click event handler
export function handlePurchaseClick(event) {
    if (event.target.classList.contains('update-button')) {
        // Retrieve the associated data attributes
        // *** Method has possible bug, use ForEach if required
        const id_format = event.target.getAttribute('data-id');
        const object = JSON.parse(event.target.getAttribute('data-object'));
        const fetch_costs_data = costsData.find(c => c.id === object.id);

        // Reset the color of all buttons
        document.querySelectorAll('.update-button').forEach(button => {
            button.className = 'ltgreentxt'; // or set the default color class
        });

        for (const [item, value] of Object.entries(fetch_costs_data.costs)) {
            let fetch_resource = resourcesData.find(r => r.id === item);
            let update_add_button = document.getElementById(id_format);

            if (fetch_resource && fetch_resource.cnt >= value && !fetch_resource.deducted) {
                fetch_resource.cnt -= value;
                fetch_resource.deducted = true;
            }
        }

        var allValuesAvailable = Object.entries(fetch_costs_data.costs).every(([item, value]) => {
            const resource = resourcesData.find(r => r.id === item);
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

            // gain details
            let gain_detail = document.getElementById(fetch_object.gain_detail_id);
            let next_rate = resource_gain.gather_rate;
            next_rate *= fetch_object.gather_increase;
            next_rate = Math.round(next_rate * 10) / 10;
            gain_detail.className = 'light_small';
            gain_detail.innerHTML = ' Next: +' + next_rate + '&nbsp;' + fetch_object.lbl.toLowerCase();

            // cost creep (same for all objects right now)
            const costCreep = fetch_object.cost_creep;
            const object_costs = fetch_costs_data.costs;
            let fetch_cnt = '';
            for (const key in object_costs) {
                if (object_costs.hasOwnProperty(key)) {
                    object_costs[key] = Math.round(object_costs[key] * costCreep);
                    const costValue = object_costs[key];
                    const fetch_resource = resourcesData.find(r => r.id === key);
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
            let update_output = document.getElementById(fetch_object.costs_div);
            update_output.innerHTML = fetch_cnt;

        } // end upgrade object if

        if (object.type === 'building') {
            // buildingData array only
            let fetch_object = buildingData.find(b => b.id === object.id);
            
            fetch_object.cnt += 1;
            fetch_object.applied = true;
            if (fetch_object.id === 'primitive_shelter_building') {
                let fetch_div = document.getElementById(fetch_object.eid);
                let fetch_available_members = tribeData.find(t => t.id === 'available_members');
                fetch_available_members.cnt += 1;
            }

            // cost creep (same for all objects right now)
            const costCreep = fetch_object.cost_creep;
            const object_costs = fetch_costs_data.costs;
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
            let update_output = document.getElementById(fetch_object.costs_div);
            update_output.innerHTML = fetch_cnt;

        } // end building object if
        
        if (object.type === 'job') {
            // jobsData array only
            let fetch_object = jobsData.find(job => job.id === object.id);
            const object_costs = fetch_costs_data.costs;

            if (object_costs && fetch_object.id === 'gatherer') {
                let fetch_available_members = tribeData.find(tribe => tribe.id === 'available_members');
                let fetch_tribe_cnt = tribeData.find(tribe => tribe.id === object.id);
                
                fetch_available_members.cnt -= 1;
                fetch_tribe_cnt.cnt += 1;
                fetch_object.cnt += 1;
                start_gathering();
            }
            
        } // end job object if
    }
}

// jobsData job.type start_gathering()
export function start_gathering() {

    let fetch_cnt = '';

    jobsData.forEach(job => {
        let job_position = job.id;
        let fetch_available_members = tribeData.find(tribe => tribe.id === 'available_members');
        const colorClass = (fetch_available_members.cnt >= 1) ? 'ltgreentxt' : 'ltred';
        fetch_cnt += `<span class="${colorClass}"><span id="MAKE_${job_position.toUpperCase()}_cnt">${fetch_available_members.cnt}</span>&nbsp;/&nbsp;1&nbsp;${job.lbl}</span><br>`;
            
            
        // Update the costs,_div output
        let update_output = document.getElementById(job.costs_div);
        update_output.innerHTML = fetch_cnt;
    });
}

// TRIBE SECTION
export function update_tribe(tribe_first_run) {
    
    var tribe_section = document.getElementById('tribe_sect_id');

    if (tribe_section.style.display === 'none') {
        tribe_section.style.display = 'block';
    }

    // first run
    if (tribe_section && tribe_first_run === true) {

        tribeData.forEach(tribe => {
            let new_div = document.createElement('div');
            tribe_section.appendChild(new_div);

            if (tribe.type === 'total') {
                new_div.className = 'button_orange';
            } else {
                new_div.className = 'ltbluetxt_2';
            }

            let new_lbl = document.createElement('span');
            new_div.appendChild(new_lbl);
            new_lbl.innerHTML = tribe.print;

            let new_cnt = document.createElement('span');
            new_div.appendChild(new_cnt);
            new_cnt.id = tribe.eid;
            new_cnt.innerHTML = tribe.cnt;
        });
        
        tribe_first_run = false;
    }

    // auto update interval
    if (tribe_section && tribe_first_run === false) {
    
        setInterval(() => {
            
            let totalCnt = 0;
   
            tribeData.forEach(tribe => {
                let fetch_tribe_eid = document.getElementById(tribe.eid);
                
                if (fetch_tribe_eid) { // Check if the element is found
                    fetch_tribe_eid.innerHTML = tribe.cnt;

                    if (tribe.type === 'job') {
                        totalCnt += tribe.cnt;
                    }
                }
            });
    
            let total_tribe = tribeData.find(tribe => tribe.type === 'total');
            total_tribe.cnt = totalCnt;
            
            let fetch_total_eid = document.getElementById(total_tribe.eid);
            fetch_total_eid.innerHTML = total_tribe.cnt;

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
        let food_level = document.createElement('span');
        food_gather_div.appendChild(food_level);
        food_level.id = 'food_level';
        food_level.innerHTML = '&nbsp;(level 1)';

        // click event
        gather_food_btn.addEventListener('click', function() {
            food.cnt = food.cnt + food.gather_rate;
            if (food.cnt >= food.max) {
                food.cnt = food.max;
                food_section.className = 'ltbluetxt_2';
            }
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
        food.net_difference = Math.round(food.net_difference * 10) / 10;
        if (food.cnt > 0) {
            let add_plus = '+';
            food.cnt = food.cnt + food.net_difference;
            if (food.cnt >= food.max) {
                food.cnt = food.max;
            }
            fetch_cnt.innerHTML = Math.round(food.cnt * 10) / 10;
            food_loss.className = 'ltgreentxt';
            if (food.net_difference < 0 ) {
                food_loss.className = 'ltred';
                add_plus = '';
            }
            if (food.cnt <= 0) {
                food.cnt = 0;
                fetch_cnt.innerHTML = 0;
                food_loss.innerHTML = '';
            } else {
                food_loss.innerHTML = '&nbsp;(' + add_plus + food.net_difference + '&nbsp;/&nbsp;s)';
                if (food.cnt >= food.max) {
                    food.cnt = food.max;
                    food_loss.innerHTML = '';
                }
            }
        }

        //let add_berries = food.cnt += berries.multiplier;
        //fetch_cnt.innerHTML = Math.round(food.cnt * 10) / 10;

    }, 1000);

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

// Function to create custom tooltip content
export function createCustomTooltipContent() {

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
    tribe_leader_lbl.id = 'tribe_leader_lbl';
    tooltipContainer.appendChild(tribe_leader_lbl);
    tribe_leader_lbl.innerHTML = '...tribe leader:&nbsp'; // WIP
    
    let tribe_leader_eid = document.createElement('span');
    tribe_leader_eid.id = 'tribe_leader_prod_cnt';
    tribe_leader_eid.className = 'ltgreentxt';
    tribe_leader_lbl.appendChild(tribe_leader_eid);

    let gatherer_prod_div = document.createElement('div');
    gatherer_prod_div.id = 'gatherer_prod_div';
    tooltipContainer.appendChild(gatherer_prod_div);
    
    let gatherer_prod_lbl = document.createElement('span');
    gatherer_prod_div.appendChild(gatherer_prod_lbl);
    gatherer_prod_lbl.id = 'gatherer_prod_lbl';
    gatherer_prod_lbl.innerHTML = '...gatherer:&nbsp;';

    let gatherer_prod = document.createElement('span');
    gatherer_prod_div.appendChild(gatherer_prod);
    gatherer_prod.id = 'gatherer_prod';
    gatherer_prod.className = 'ltgreentxt';

    let production_totals_lbl = document.createElement('div');
    tooltipContainer.appendChild(production_totals_lbl);
    production_totals_lbl.className = 'yellowtxt';
    production_totals_lbl.innerHTML = 'Production Total:&nbsp;';
    //append
    let production_totals = document.createElement('span');
    production_totals.id = 'production_totals_live';
    production_totals_lbl.appendChild(production_totals);
    production_totals.className = 'ltgreentxt';

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

    let food_dep_live = document.createElement('span');
    population.appendChild(food_dep_live);
    food_dep_live.id = 'food_dep_live_eid';
    food_dep_live.className = 'ltred';

    let spoiled_lbl = document.createElement('div');
    tooltipContainer.appendChild(spoiled_lbl);
    spoiled_lbl.innerHTML = '...spoiled food:&nbsp;';
    //append
    let spoiled_mult = document.createElement('span');
    spoiled_mult.id = 'spoiled_mult';
    spoiled_lbl.appendChild(spoiled_mult);
    //append
    let spoiled_loss = document.createElement('span');
    spoiled_lbl.appendChild(spoiled_loss);
    spoiled_loss.className = 'ltred';
    spoiled_loss.id = 'spoiled_loss';

    let consumption_totals_live = document.createElement('div');
    tooltipContainer.appendChild(consumption_totals_live);
    consumption_totals_live.className = 'yellowtxt';
    consumption_totals_live.innerHTML = 'Consumption Total:&nbsp;';
    //append
    let consumption_totals_lbl = document.createElement('span');
    consumption_totals_live.appendChild(consumption_totals_lbl);
    consumption_totals_lbl.id = 'consumption_totals_live_eid';
    consumption_totals_lbl.className = 'ltred ';

    let totals_live = document.createElement('div');
    if (foodResource[0].loss >= 0) {
        totals_live.className = 'ltgreentxt';
    }
    if (foodResource[0].loss < 0) {
        totals_live.className = 'ltred';
    }
    totals_live.id = 'totals_live_eid';
    tooltipContainer.appendChild(totals_live);

    setInterval(() => {
        
        let fetch_tribe_leader_prod = document.getElementById('tribe_leader_prod_cnt');
        let fetch_food_dep_live = document.getElementById('food_dep_live_eid');
        let fetch_consumption_totals_live = document.getElementById('consumption_totals_live_eid');
        let fetch_totals_live = document.getElementById('totals_live_eid');
        let fetch_gatherer_prod = document.getElementById('gatherer_prod');
        let gatherer_prod_lbl = document.getElementById('gatherer_prod_lbl');
        let fetch_production_totals = document.getElementById('production_totals_live');
        let spoiled_loss = document.getElementById('spoiled_loss');
        let gatherer_prod_div = document.getElementById('gatherer_prod_div');
        let spoiled_mult = document.getElementById('spoiled_mult');

        // calc
        let fetch_total_population = tribeData.find(t => t.id === 'total_population');
        var gatherer = tribeData.find(t => t.id === 'gatherer');
        var tribe_leader = tribeData.find(t => t.id === 'tribe_leader');
        var tribe_leader_food = tribe_leader.cnt * tribe_leader.food_gain;
        var gatherer_food = gatherer.cnt * gatherer.food_gain;
        // gains
        foodResource[0].gain = gatherer_food + tribe_leader_food;
        // losses
        let berries_source = foodSources.find(f => f.id === 'berries');
        foodResource[0].spoil = berries_source.spoil;
        // need foodSources to determine spoil rate
        foodResource[0].loss = foodResource[0].food_dep + foodResource[0].spoil;
        foodResource[0].net_difference = foodResource[0].gain + foodResource[0].loss;

        if (fetch_food_dep_live && fetch_consumption_totals_live && fetch_totals_live) {
            
            if (gatherer.cnt === 0) {
                gatherer_prod_div.style.display = 'none';
            } else {
                gatherer_prod_div.style.display = 'block';
                gatherer_prod.classList.add('ltgreentxt');
                gatherer_prod.innerHTML = '+' + gatherer_food;
                gatherer_prod_lbl.innerHTML = '...gatherer:&nbsp;';
            }

            fetch_tribe_leader_prod.innerHTML = tribe_leader_food;
            
            spoiled_loss.innerHTML = foodResource[0].spoil;
            
            fetch_production_totals.innerHTML = '+' + foodResource[0].gain;

            food_dep_live.innerHTML = foodResource[0].food_dep;
            
            population_cnt.innerHTML = '(' + fetch_total_population.cnt + '):&nbsp;';
            
            fetch_consumption_totals_live.innerHTML = Math.round(foodResource[0].loss * 10) / 10;            

            
            let add_plus = '+';
            if (foodResource[0].net_difference >= 0) {
                fetch_totals_live.className = 'ltgreentxt';
            }
            if (foodResource[0].net_difference < 0) {
                fetch_totals_live.className = 'ltred';
                add_plus = '';
            }
            fetch_totals_live.innerHTML = '<hr>RATE/S:&nbsp;' + add_plus + Math.round(foodResource[0].net_difference * 10) / 10;
        }
    }, 2000);

    return border_container;
}

// create dynamic objects from an array
export function create_object(obj_name, obj_data) {

    const object_name = obj_name;
    const arrayData = obj_data;

    // [obj_name]_section
    const section_name = object_name + '_section';
    
    // create new section
    createNewSection('div', section_name, null, `<p class="divsections">${object_name.toUpperCase()}</p>`, 'body');
    showElementID(section_name);
    let fetch_section = document.getElementById(section_name);

    // create dynamic elements
    arrayData.forEach(array => {

        // container
        newEl('container_id', 'div', fetch_section, array.container_id, null, null);
        
        // define object first line
        newEl('first_line_div', 'div', container_id, array.first_line_div, null, null);
        // define object details
        newEl('details_div', 'div', container_id, array.details_div, null, null);
        // hide details initially
        details_div.style.display = 'none';

        // [ + ] details initial -- here only
        newEl('button_toggle', 'span', first_line_div, null, null, null);
        button_toggle.innerHTML = '<hr class="divider" width=30% align="left"> ' + '<span id="' + array.toggle_button + '"> [ + ] <span class="button_orange"> ' + array.title + '&nbsp;</span></span>';
        
        // use button element created in above span
        let toggleButton = document.getElementById(array.toggle_button);

        // Add an onclick event listener to the button (closure method)
        toggleButton.addEventListener('click', (function(details) {
            return function() {
                // Toggle the display property of the captured 'details_div'
                if (details.style.display === 'none') {
                    details.style.display = 'block';
                    toggleButton.innerHTML = '<span id="' + array.toggle_button + '"> [ - ] <span class="button_orange"> ' + array.title + '&nbsp;</span></span>';
                } else {
                    details.style.display = 'none';
                    toggleButton.innerHTML = '<span id="' + array.toggle_button + '"> [ + ] <span class="button_orange"> ' + array.title + '&nbsp;</span></span>';
                }
            };
        })(details_div)); // Pass the current 'details_div' to the closure

        // object count span
        newEl('object_count', 'span', first_line_div, array.object_count, 'button_orange', null);
        object_count.innerHTML = `(${array.cnt})&nbsp`;

        if (array.cnt === 0) {
            object_count.innerHTML = '';
        }

        // [ BUY_BUTTON ]
        newEl('add_button_lbl', 'span', first_line_div, array.add_button, 'ltred', null);
        add_button_lbl.innerHTML = `[ ${array.add_button_lbl} ]`;

        // add '***' if costs > max
        newEl('maxedDisplayElement', 'span', first_line_div, array.add_button_max, null, null);

        // *** details start
        // gain label
        newEl('gain_lbl', 'div', details_div, array.gain_lbl, 'ltgreentxt', null);
        gain_lbl.innerHTML = array.gain_lbl;

        // gain_detail
        newEl('gain_detail', 'div', details_div, array.gain_detail_id, 'light_small', null);
        gain_detail.innerHTML = array.gain_detail_lbl;

        // description
        newEl('description', 'div', details_div, null, null, null);
        description.style.maxWidth = '60%';
        description.innerHTML = array.desc;

        // WIP hiding -- needs ID
        newEl('job_lbl', 'div', details_div, null, null, null);
        job_lbl.innerHTML = '<p class="yellowtxt">CIVILIAN JOB:</p>';
        job_lbl.style.display = 'none'; // temp

        // WIP hiding -- needs ID
        newEl('consume_lbl', 'div', details_div, null, null, null);
        consume_lbl.innerHTML = '<p class="yellowtxt">CONSUMES:</p>';
        consume_lbl.style.display = 'none'; // temp

        // costs display (label)
        newEl('costs_lbl', 'div', details_div, null, null, null);
        costs_lbl.innerHTML = '<p class="yellowtxt">COSTS:</p>';

        // costs display (all data)
        newEl('costs_div_all', 'div', details_div, array.costs_div, null, null);

        // start in interval
        // addObjectUpdates([array], costs_div_all.id);

    }); // END: arrayData
} // END: function
