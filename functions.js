// functions.js

// import arrays
import { resourcesData, tribeData, foodSources, foodResource, goalsData, objectiveData, objectElements, costList } from './data.js';

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

// TRIBE SECTION
export function update_tribe(tribe_first_run) {
    
    var tribe_section = document.getElementById('tribe_sect_id');

    if (tribe_section.style.display === 'none') {
        tribe_section.style.display = 'block';
    }

    // first run
    if (tribe_section && tribe_first_run === true) {

        newEl('first_goal', 'div', tribe_section, 'first_goal', null, null);
        first_goal.innerHTML = '<button class="button_orange" style="background-color:#000000;">BECOME TRIBE LEADER</button>';
        first_goal.addEventListener('click', function() {
            goalCompleted('goal_0');
            tribe_section.removeChild(first_goal);
//});
// create tribe data after goal_0
        tribeData.forEach(tribe => {
            let new_div = document.createElement('div');
            tribe_section.appendChild(new_div);

            if (tribe.type === 'total') {
                new_div.className = 'button_orange';
            } else {
                new_div.className = 'ltbluetxt_2';
            }
            if (tribe.id === 'AVAILABLE_MEMBERS') {
                new_div.style.fontWeight = 'bold';
            }

            let new_lbl = document.createElement('span');
            new_div.appendChild(new_lbl);
            new_lbl.innerHTML = tribe.print;

            let new_cnt = document.createElement('span');
            new_div.appendChild(new_cnt);
            new_cnt.id = tribe.eid;
            new_cnt.innerHTML = tribe.cnt;
        });
        
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
            if (fetch_total_eid) {
                fetch_total_eid.innerHTML = total_tribe.cnt;
            }

        }, 2000);
    }
}

// FOOD SECTION
export function food_section(food_first_run) {

    let resources_section = document.getElementById('resources_sect_id');
    let food = foodResource[0];
    let updated_gather_rate = 1;

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
        gather_food_btn.innerHTML = '<button class="button_orange" style="background-color:#000000;">GATHER FOOD</button>&nbsp;';

        let food_level = document.createElement('span');
        food_gather_div.appendChild(food_level);
        food_level.id = 'food_level';
        food_level.innerHTML = '&nbsp;(level 1)&nbsp';
        // gather rate
        food.gather_rate = food.gather_rate * foodSources[0].multiplier;

        gather_food_gain.innerHTML = '+0.8 / +1.0 / +1.1 FOOD';
        
        // click event
        gather_food_btn.addEventListener('click', async function() {
            // Call the selectFoodSource function to get the selected food source
            let selectedFoodSource = await selectFoodSource(1); // process first for sync
            // for upgraded to level 2
            if (food.selected_food_level === 2) {
                selectedFoodSource = await selectFoodSource(2); // process first for sync
            }
            // food gather rate adjustment to multiplier
            updated_gather_rate = await food.gather_rate * selectedFoodSource.multiplier;

            food.cnt = food.cnt + updated_gather_rate; // food.gather_rate
            if (food.cnt >= food.max) {
                food.cnt = food.max;
                food_section.style.fontWeight = 'bold';
            }
            food_cnt.innerHTML = Math.round(food.cnt * 10) / 10;
        });

    food_first_run = false;

    }

    let TOTAL_POPULATION = tribeData.find(tribe => tribe.id === 'TOTAL_POPULATION');
    let TRIBE_LEADER = tribeData.find(tribe => tribe.id === 'TRIBE_LEADER');
    let fetch_cnt = document.getElementById('food_cnt');
    let food_loss = document.getElementById('food_loss');
    let food_source = foodSources[0];
    food.net_difference = 0;
    //let berries = foodSources.find(source => source.id === 'berries');

    // interval
    setInterval(() => {

        // food consumption based on tribeData
        let food_dep = TOTAL_POPULATION.cnt * -0.2; // using 20% loss / second
        // assign new variables to foodResource[0]
        food.food_dep = food_dep;
        food.loss = food_dep + food_source.spoil;
        food.gain = TRIBE_LEADER.cnt * TRIBE_LEADER.food_gain; // 20% from TRIBE_LEADER
        food.net_difference = Math.round(food.net_difference * 10) / 10;

        if (food.cnt > 0) {
            let add_plus = '+';
            food.cnt = food.cnt + food.net_difference;
            
            let fetch_food_section = document.getElementById('food_section');
            if (food.cnt >= food.max) {
                food.cnt = food.max;
                fetch_food_section.style.fontWeight = 'bold';
            } else {
                fetch_food_section.style.fontWeight = 'normal';
            }
            fetch_cnt.innerHTML = Math.round(food.cnt * 10) / 10;
            food_loss.className = 'ltgreentxt';
            if (food.net_difference < 0 ) {
                food_loss.className = 'ltred';
                add_plus = '';
            }
            if (food.cnt < 0) {
                food.cnt = 0;
                fetch_cnt.innerHTML = 0;
                food_loss.innerHTML = '';
            } else {
                food_loss.innerHTML = '&nbsp;(' + add_plus + food.net_difference + '&nbsp;/&nbsp;s)';
                if (food.cnt >= food.max) {
                    food.cnt = food.max;
                    food_loss.className = 'button_faded';
                }
                if (food.net_difference === 0) {
                    food_loss.innerHTML = '';
                }
            }
        }

        //let add_berries = food.cnt += berries.multiplier;
        //fetch_cnt.innerHTML = Math.round(food.cnt * 10) / 10;

    }, 1000);

}

// Function to randomly select a food source based on rarity and level
export function selectFoodSource(level) {
    // Filter food sources with level equal to the specified level
    const filteredFoodSources = foodSources.filter(food => food.lvl === level);

    // If there are no food sources for the specified level, return null or handle the case accordingly
    if (filteredFoodSources.length === 0) {
        return null; // or handle the case based on your application's logic
    }

    // Create an array to store all entries based on rarity score
    let weightedEntries = [];

    // Iterate over each food source
    filteredFoodSources.forEach(food => {
        // Add each food source to the weightedEntries array based on its rarity score
        for (let i = 0; i < food.rare; i++) {
            weightedEntries.push(food);
        }
    });

    // Generate a random index to select a food source from the weightedEntries array
    const randomIndex = Math.floor(Math.random() * weightedEntries.length);
    // Return the randomly selected food source
    return weightedEntries[randomIndex];
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

//// WIP GOALS
// case 'gather':
export function startGoals() {
    var goal_section = document.getElementById('goals_sect_id');

    goalsData.forEach(goal => {
        
        newEl('container', 'div', goal_section, goal.container_id, null, null);
        
        newEl('goal_desc', 'span', container, goal.desc_id, null, null);
        goal_desc.innerHTML = goal.desc;
        hideElementID(goal.desc_id);
        //attach
        newEl('complete_lbl', 'span', goal_desc, goal.complete_id, null, null);
        complete_lbl.style.display = 'none';
        complete_lbl.className = 'ltgreentxt_b';
        complete_lbl.innerHTML = '&nbsp;(&#10003;&nbsp;COMPLETE)';

        newEl('sub_goal', 'p', container, goal.sub_id, null, null);
        hideElementID(goal.sub_id);
        sub_goal.className = 'light_small';
        sub_goal.innerHTML = goal.sub;

        if (goal.sub2) {
            newEl('sub_goal2', 'p', container, goal.sub_id2, null, null);
            hideElementID(goal.sub_id2);
            sub_goal2.className = 'light_small';
            sub_goal2.innerHTML = goal.sub2;
        }
        
        if (goal.sub3) {
            newEl('sub_goal3', 'p', container, goal.sub_id3, null, null);
            hideElementID(goal.sub_id3);
            sub_goal3.className = 'light_small';
            sub_goal3.innerHTML = goal.sub3;
        }
        
        newEl('next_goal', 'p', container, goal.next_goal_id, null, null);

        if (goal.active_goal === true) {
            showElementID(goal.desc_id);
            showElementID(goal.sub_id);
        }
//console.log(goal);
    });
}

export function goalCompleted(goalId) {
    var goal_section = document.getElementById('goals_sect_id');

    // Find the goal in the goalsData array based on its ID
    var goalToUpdate = goalsData.find(goal => goal.id === goalId);

    if (goalToUpdate && !goalToUpdate.goal_req_met && goalToUpdate.active_goal === true) {
        // Update the goal_req_met property
        goalToUpdate.goal_req_met = true;
        
        let fetched_goal_id = document.getElementById(goalId + '_container');
        fetched_goal_id.style.fontWeight = 'bold';
        fetched_goal_id.classList.add('ltgreentxt');
        
        let fetched_desc_id = document.getElementById(goalToUpdate.desc_id);

        // Add a new paragraph with the word "COMPLETE" and a class
        let complete_lbl = document.getElementById(goalToUpdate.complete_id);
        if (complete_lbl) {
            complete_lbl.style.display = 'inline';
        } else {
            complete_lbl = document.createElement('span');
            complete_lbl.id = goalToUpdate.complete_id;
            complete_lbl.className = 'ltgreentxt_b';
            complete_lbl.innerHTML = '&nbsp;(&#10003;&nbsp;COMPLETE)';
            fetched_desc_id.appendChild(complete_lbl);
        }

        let sub_goal = document.getElementById(goalId + '_sub');
        sub_goal.style.fontWeight = 'normal';
        sub_goal.classList.add('ltgreentxt');
        sub_goal.innerHTML = '&#10003;&nbsp;' + goalToUpdate.sub;

        let next_goal = document.getElementById(goalId + '_next');
        next_goal.innerHTML = '<button class="button_orange" style="background-color:#000000;">NEXT GOAL</button>';
        
        //wait(3, function() {
            
        //});

        next_goal.addEventListener('click', function() {
            
            goalToUpdate.active_goal = false;
            
            let current_index = goalToUpdate.id;
            //console.log('current_index: ' + current_index);

            let current_number = parseInt(current_index.split('_')[1]);
            let next_number = current_number + 1;
            let next_index = 'goal_' + next_number;
            //console.log('next_index: ' + next_index);

            let next_GoalToUpdate = goalsData.find(goal => goal.id === next_index);

            next_GoalToUpdate.active_goal = true;
            
            // hide previous goal data, show new goal
            hideElementID(goalToUpdate.desc_id);
            hideElementID(goalToUpdate.complete_id);
            hideElementID(goalToUpdate.sub_id);
            hideElementID(goalToUpdate.sub_id2);
            hideElementID(goalToUpdate.sub_id3);
            hideElementID(goalToUpdate.next_goal_id);
            showElementID(next_GoalToUpdate.id + '_desc');
            showElementID(next_GoalToUpdate.id + '_sub');
            
            if (next_GoalToUpdate.id + '_sub2') {
                showElementID(next_GoalToUpdate.id + '_sub2');
            }
            if (next_GoalToUpdate.id + '_sub3') {
                showElementID(next_GoalToUpdate.id + '_sub3');
            }
            
            // extra actions after goal completion
            switch (current_index) {
                case 'goal_0':
                    showElementID('gather_sect_title');
                    showElementID('gather_sect_id');
                    showElementID('resources_sect_title');
                    showElementID('resources_sect_id');
                    break;
                case 'goal_1':
                    showElementID('upgrade_sect_title');
                    showElementID('upgrade_sect_id');
                    showElementID('gather_div_PEBBLES');
                    // hide this upgrade for now
                    hideElementID('GATHER_PINE_NEEDLES_container');
                    break;
                case 'goal_3':
                    ////
                    let res_twigs = resourcesData.find(r => r.id === 'TWIGS');
                    res_twigs.auto_lvl1_rate += 2;
            }
        });
    }
}

// marking sub goals complete
// EXAMPLE: sub_goalCompleted('goal_2', 'sub');
export function sub_goalCompleted(goalID, sub_goal) {

    let fetched_goalsData = goalsData.find(goal => goal.id === goalID);

    let fetched_element = document.getElementById(goalID + '_' + sub_goal); // 
    let contents = fetched_element.innerHTML;
    let status_id = sub_goal + '_status';

    if (fetched_element && fetched_goalsData[status_id] === 'pending') {
        fetched_element.style.fontWeight = 'normal';
        fetched_element.classList.add('ltgreentxt');
        fetched_element.innerHTML = '&#10003;&nbsp;' + contents;
        // mark sub goal as done in array
        // using [] to specify string for array.sub_status
        fetched_goalsData[status_id] = 'done';
    }
    
    if (fetched_goalsData.sub2_status) {
        //TEST max sub 3
        if (fetched_goalsData.sub3_status) {
            // sub count = 3;
            if (!fetched_goalsData.goal_req_met && fetched_goalsData.sub_status === 'done' && fetched_goalsData.sub2_status === 'done' && fetched_goalsData.sub3_status === 'done') {
                // mark entire goal complete
                goalCompleted(fetched_goalsData.id);
            }
        } else {
            // sub count = 2
            if (!fetched_goalsData.goal_req_met && fetched_goalsData.sub_status === 'done' && fetched_goalsData.sub2_status === 'done') {
                // mark entire goal complete
                goalCompleted(fetched_goalsData.id);
            }

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

    let TRIBE_LEADER_lbl = document.createElement('div');
    TRIBE_LEADER_lbl.id = 'TRIBE_LEADER_lbl';
    tooltipContainer.appendChild(TRIBE_LEADER_lbl);
    TRIBE_LEADER_lbl.innerHTML = '...tribe leader:&nbsp'; // WIP
    
    let TRIBE_LEADER_eid = document.createElement('span');
    TRIBE_LEADER_eid.id = 'TRIBE_LEADER_prod_cnt';
    TRIBE_LEADER_eid.className = 'ltgreentxt';
    TRIBE_LEADER_lbl.appendChild(TRIBE_LEADER_eid);

    // gatherer
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

    // hunters
    let basic_hunter_prod_div = document.createElement('div');
    basic_hunter_prod_div.id = 'basic_hunter_prod_div';
    tooltipContainer.appendChild(basic_hunter_prod_div);

    let basic_hunter_prod_lbl = document.createElement('span');
    basic_hunter_prod_div.appendChild(basic_hunter_prod_lbl);
    basic_hunter_prod_lbl.id = 'basic_hunter_prod_lbl';
    basic_hunter_prod_lbl.innerHTML = '...basic hunter:&nbsp;';

    let basic_hunter_prod = document.createElement('span');
    basic_hunter_prod_div.appendChild(basic_hunter_prod);
    basic_hunter_prod.id = 'basic_hunter_prod';
    basic_hunter_prod.className = 'ltgreentxt';

    // production totals
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
    population_cnt.id = 'population_cnt';
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

    return border_container;
}

// create dynamic objects from an array
export function create_object(obj_data) {

    const arrayData = obj_data;

    // create dynamic elements
    arrayData.forEach(array => {
            
        // sections (remove _sect_id & make uppercase)
        let object_name = array.section;
        let suffix = "_sect_id";
        let index = object_name.lastIndexOf(suffix);
        if (index !== -1 && index + suffix.length === object_name.length) {
            object_name = object_name.slice(0, index).toUpperCase();
        }

        // create sections
        // upgrade, building, job, craft
        createNewSection('div', array.section_title, 'section_title', '<p class="divsections_no_ul">&nbsp;[&nbsp;--&nbsp;]<span class="divsections">' + object_name + '</span></p>', 'body');
        //showElementID(array.section_title);
        createNewSection('div', array.section, 'section_text', null, 'body');
        
        section_collapse(array.obj_type);
        //showElementID(array.section);
        
        let fetch_section = document.getElementById(array.section);
        
        // container
        if (fetch_section) {
            newEl('container_id', 'div', fetch_section, array.container_id, null, null);
            container_id.style.backgroundColor = "black";
            // only show level 1 upgrades initially
            if (array.obj_type === 'upgrade' && array.level !== 1) {
                hideElementID(array.container_id);
            }
        }

        // define object first line
        newEl('first_line_div', 'div', container_id, array.first_line_div, null, null);
        first_line_div.id = array.first_line_div;
        first_line_div.style.textAlign = 'left';
        first_line_div.style.padding = '8px';

        // define object details
        newEl('details_div', 'div', container_id, array.details_div, null, null);
        details_div.style.backgroundColor = "#252525";
        details_div.style.padding = '8px';

        // hide details initially
        details_div.style.display = 'none';

        // (insertBefore: button_toggle)
        // 'curr_status' + 'job_status' children go here

        // [ + ] details initial -- here only
        newEl('button_toggle', 'span', first_line_div, null, null, null);
        button_toggle.innerHTML = '<span id="' + array.toggle_button + '"> <span style="color:white">[ + ]</span> <span class="button_orange"> ' + array.title + '</span></span>';

        // use button element created in above span
        let toggleButton = document.getElementById(array.toggle_button);
        toggleButton.className = 'button_orange';

        // object count span
        newEl('object_count', 'span', first_line_div, array.object_count, 'button_orange', null);
        object_count.innerHTML = `&nbsp;(${array.cnt})&nbsp;`;

        if (array.cnt === 0) {
            object_count.innerHTML = '';
        }

        // spacer
        newEl('object_count_spacer', 'span', first_line_div, null, null, null);
        object_count_spacer.innerHTML = '&nbsp;&nbsp;';

        // [ BUY_BUTTON ]
        newEl('add_button_lbl', 'button', first_line_div, array.add_button, 'ltred', null);
        add_button_lbl.style.backgroundColor = "#000000";
        add_button_lbl.classList.add('button_container');
        add_button_lbl.innerHTML = `${array.add_button_lbl}`;

        newEl('add_button_spacer', 'span', first_line_div, null, null, null);
        add_button_spacer.innerHTML = '&nbsp;';

        // *** JOB specific
        
        if (array.obj_type === 'job') {
            
            // remove button
            newEl('remove_button_lbl', 'button', first_line_div, array.remove_button, null, null);
            remove_button_lbl.style.backgroundColor = "#000000";
            remove_button_lbl.classList.add('button_container');
            remove_button_lbl.innerHTML = `${array.remove_button_lbl}`;
            
            // job status
            let job_status = document.createElement('div');
            job_status.id = array.curr_status;
            job_status.className = 'ltgreentxt';
            first_line_div.insertBefore(job_status, button_toggle);
        }

        // craft progress
        newEl('progress_lbl', 'span', first_line_div, array.progress_lbl, 'ltred', null);

        // add '***' if costs > max
        newEl('maxedDisplayElement', 'span', first_line_div, array.add_button_max, null, null);

        // spacer
        newEl('object_count_spacer', 'span', first_line_div, null, null, null);
        object_count_spacer.innerHTML = '&nbsp;';

        // *** TIMERS

        // timer for certain 'job' decaying resources
        if (array.obj_type === 'job') {
            // POP_BASIC_HUNTER
            if (array.id === 'POP_BASIC_HUNTER') {
                let timer = document.createElement('div');
                timer.id = array.timer;
                timer.className = 'ltgreentxt';
                first_line_div.insertBefore(timer, button_toggle);
            }
        }

        // *** details start
        // gain label
        newEl('gain_lbl', 'div', details_div, array.gain_lbl, 'ltgreentxt', null);
        gain_lbl.innerHTML = array.gain_lbl;

        // calc gain_lbl
        if (array.id === 'BUILDING_PRIMITIVE_STORAGE') {
            let old_max = resourcesData[0].max; // use TWIGS as reference
            let new_max = old_max + (old_max * 0.5);
            new_max = Math.round(new_max * 10) / 10;
            gain_lbl.innerHTML = '+50&percnt; maximum resource capacity (next cap: ' + new_max + ')';

        }

        // gain_detail
        newEl('gain_detail', 'div', details_div, array.gain_detail_id, 'light_small', null);

        // initial gain details for 'upgrade' objects
        if (array.obj_type === 'upgrade') {
            let fetch_res = resourcesData.find(r => 'GATHER_' + r.id === array.id);
            fetch_res.next_gather_rate += Math.round((1 + array.gather_increase) * 10) / 10;
            gain_detail.className = 'light_small';
            gain_detail.innerHTML = ' Next: +' + fetch_res.next_gather_rate + '&nbsp;' + array.lbl.toLowerCase();
        } else {
            gain_detail.innerHTML = array.gain_detail_lbl;
        }

        // description
        newEl('description', 'div', details_div, null, null, null);
        description.innerHTML = array.desc;

        // extras: bonus
        if (array.id === 'BUILDING_PRIMITIVE_ALTAR') {
            newEl('bonus_lbl', 'div', details_div, null, null, null);
            bonus_lbl.innerHTML = '<p class="yellowtxt">BONUS:</p>';
            newEl('bonus_txt', 'p', details_div, array.bonus_txt_id, 'ltred', null);
            bonus_txt.innerHTML = '(LEVEL 5): Grants the ability to collect level 2 resources (sticks, stones, and leaves) diectly.';
        }

        // WIP hiding
        newEl('job_lbl', 'div', details_div, null, null, null);
        job_lbl.innerHTML = '<p class="yellowtxt">CIVILIAN JOB:</p>';
        job_lbl.style.display = 'none';

        // consume -- hide initially
        newEl('consume_lbl', 'div', details_div, array.consume_lbl, null, null);
        consume_lbl.innerHTML = '<p class="yellowtxt">CONSUMES:</p>';
        consume_lbl.style.display = 'none';

        // CRAFT_SPEAR CONSUME
        if (array.consumes && array.consumes['CRAFT_SPEAR']) {
            consume_lbl.style.display = 'block';
            newEl('consume_div', 'div', consume_lbl, array.consume_div, null, null);
        }
        
        // DECAY
        if (array.id === 'CRAFT_SPEAR') {
            newEl('decay_container', 'div', details_div, array.decay_container, null, null);
            // append
            newEl('decay_lbl', 'div', decay_container, array.decay_lbl, null, null);
            decay_lbl.innerHTML = '<p class="yellowtxt">DURABILITY:</p>';
            // append
            newEl('decay_value_lbl', 'span', decay_container, array.decay_value_lbl, null, null);
            decay_value_lbl.className = 'ltgreentxt';
            decay_value_lbl.innerHTML = array.decay_value + ` (${array.decay_timer} remaining) `;
            // hide initially
            hideElementID(array.decay_container);
        }

        // costs display (label)
        newEl('costs_lbl', 'div', details_div, null, null, null);
        costs_lbl.innerHTML = '<p class="yellowtxt">COSTS:</p>';

        // costs display (all data)
        newEl('costs_div_all', 'div', details_div, array.costs_div, null, null);

    }); // END: arrayData
} // END: function

// Function to create event listener for each toggle button
export function createEventListener(details_div, toggleButton, container_id) {
    let initialTitle = toggleButton.dataset.title; // Store the initial title

    toggleButton.addEventListener('click', function() {
        // Check if the button is already active
        if (toggleButton.classList.contains('active')) {
            // If active, hide the details_div and reset button state
            details_div.style.display = 'none';
            toggleButton.classList.remove('active');
            toggleButton.innerHTML = '<span style="color:white">[ + ]</span> ' + initialTitle;
            container_id.style.backgroundColor = '';
        } else {
            // Reset state of previously clicked button and its associated container
            let prevButton = document.querySelector('.toggle-button.active');
            if (prevButton) {
                let prevContainer = document.getElementById(prevButton.dataset.container);
                let prevDetailsDiv = document.getElementById(prevButton.dataset.details);
                prevButton.classList.remove('active');
                prevButton.innerHTML = '<span style="color:white">[ + ]</span> ' + prevButton.dataset.title;
                prevDetailsDiv.style.display = 'none'; // Hide previously active details_div
                prevContainer.style.backgroundColor = '';
            }

            // Toggle current button and show/hide details
            details_div.style.display = 'block';
            container_id.style.backgroundColor = "#252525"; // Set background color
            toggleButton.classList.add('active');
            toggleButton.innerHTML = '<span style="color:white">[ - ]</span> ' + initialTitle; // Reset to initial title
        }
    });
}

// Function to attach event listeners to toggle buttons
export function attachEventListeners() {
    // Iterate through each array item and attach event listeners
    objectElements.forEach(array => {
        let details_div = document.getElementById(array.details_div);
        let toggleButton = document.getElementById(array.toggle_button);
        let container_id = document.getElementById(array.container_id);
        toggleButton.classList.add('toggle-button'); // Add a class to identify toggle buttons
        toggleButton.dataset.title = array.title;
        toggleButton.dataset.container = array.container_id; // Store the container id
        toggleButton.dataset.details = array.details_div; // Store the details_div id
        details_div.classList.add('details');
        createEventListener(details_div, toggleButton, container_id);
    });
}
// Run the event listener setup initially
// attachEventListeners();

// Whenever you modify arrayData, call attachEventListeners() again
// For example:
// arrayData.push({ /* new building data */ });
// attachEventListeners(); // Call this after modifying arrayData

// RESOURCE DISPLAY / GATHER / CONVERT
export function start_gather(obj_data) {
    
    const arrayData = obj_data;
    
    arrayData.forEach(array => {

        let resources_section = document.getElementById('resources_sect_id');
        let gather_section = document.getElementById('gather_sect_id');
        let convert_section = document.getElementById('convert_sect_id');

// RESOURCE DISPLAY SECTION

        newEl('res_container', 'div', resources_section, array.res_container, null, null);
        if (array.id === 'KNOWLEDGE')
        {
            res_container.className = 'pinktxt';
        }
     
        // attach to res_container
        newEl('cur_resource_lbl_1', 'span', res_container, array.res_cnt_lbl, null, null);
        cur_resource_lbl_1.innerHTML = array.lbl;
        // append
        newEl('cur_resource_lbl_2', 'span', res_container, null, null, null);
        cur_resource_lbl_2.innerHTML = ':&nbsp;';
        // append -- resource.cnt
        newEl('cur_resource_lbl_3', 'span', res_container, array.res_cnt, null, null);
        cur_resource_lbl_3.innerHTML = number_format(array.cnt);
        newEl('cur_resource_lbl_4', 'span', res_container, null, null, null);
        // append
        cur_resource_lbl_4.innerHTML = '&nbsp;/&nbsp;';
        // append -- max
        newEl('cur_resource_lbl_5', 'span', res_container, array.res_cnt_max, null, null);
        cur_resource_lbl_5.innerHTML = array.max;
        // WIP auto gatherers
        newEl('cur_resource_lbl_6', 'span', res_container, array.auto_lvl1_res, 'ltgreentxt', null);
        cur_resource_lbl_6.innerHTML = '&nbsp;(+0&nbsp;/s)';
    
        // hide all
        hideElementID(array.res_container);
        
        // show starting resources
        showElementID('res_container_TWIGS');
        //showElementID('res_container_PEBBLES');
        //showElementID('res_container_PINE_NEEDLES');

        // show/hide elements individually
        // showElementID('resource_000');
    
// GATHER SECTION

        newEl('gath_container', 'div', gather_section, array.gatherDiv, null, null);
        // append
        newEl('gatherSpan1', 'span', gath_container, array.gather_btn, null, null);
        gatherSpan1.innerHTML = array.print_gather;
        // append
        newEl('gatherSpan2', 'span', gath_container, array.gather_lbl, null, null);
        gatherSpan2.innerHTML = array.print_gather2;
        // append
        newEl('gatherSpan3', 'span', gath_container, null, null, null);
        if (array.id !== 'KNOWLEDGE') {
            gatherSpan3.innerHTML = "&nbsp;(level " + array.level + ")";
        }

        // hide all
        hideElementID(array.gatherDiv);
    
        // show starting resources
        showElementID('gather_div_TWIGS');
        //showElementID('gather_div_PEBBLES');
        //showElementID('gather_div_PINE_NEEDLES');
    
        // show/hide elements individually
        // showElementID('gather_div_twigs');

// CONVERT SECTION
    
        newEl('conv_container', 'div', convert_section, array.con_id, null, null);
        // append
        newEl('convertSpan1', 'span', conv_container, array.con_lbl, null, null);
        convertSpan1.innerHTML = array.print_convert;
        // append
        newEl('convertSpan2', 'span', conv_container, array.con_btn, null, null);
        convertSpan2.innerHTML = array.print_convert2;

        // always hide all convertibles initially
        hideElementID('convert_sect_title');
        hideElementID(array.con_id);

        // show again
        //let fetched_convert_sect_title = document.getElementById('convert_sect_title');
        //showElementID(fetched_convert_sect_title);

        // CLICKS

        // Adding click event listener to both buttons
        document.getElementById(array.gather_btn).addEventListener('click', function () {
            handleResourceClick('gather');
        });
        
        document.getElementById(array.con_id).addEventListener('click', function () {
            handleResourceClick('convert');
        });
        
        // Single click event handler function
        function handleResourceClick(actionType) {
            switch (actionType) {
                case 'gather':
                    let update_cnt = document.getElementById(array.res_cnt);
        
                    // set maximum
                    if (array.cnt >= array.max) {
                        array.cnt = array.max;
                        update_cnt.innerHTML = number_format(array.max);
                    } 
                    if (array.cnt < array.max) {
                        array.cnt += array.gather_rate;
                        update_cnt.innerHTML = number_format((Math.round(array.cnt * 10) / 10).toFixed(1));
                        // goal_1
                        let goal_desc = document.getElementById(goalsData[1].desc_id);
                        let goal_cnt = resourcesData.find(res => res.id === 'TWIGS');
                        let fetched_goal_1 = goalsData.find(goal => goal.id === 'goal_1');
                        if (!fetched_goal_1.goal_req_met) {
                            goal_desc.innerHTML = '[*] Gather 200 Twigs. (' + Math.round((goal_cnt.cnt * 10)/ 10) + '&nbsp;/&nbsp;200&nbsp;twigs gathered)';
                        }
                        if (fetched_goal_1.active_goal === true && goal_cnt.cnt >= 200 && !fetched_goal_1.goal_req_met) {
                            goal_desc.innerHTML = '[*] Gather 200 Twigs. (200&nbsp;/&nbsp;200&nbsp;twigs gathered)';
                            goalCompleted('goal_1');
                        }
                        // goal_2
                        let goal2_cnt = resourcesData.find(res => res.id === 'PEBBLES');
                        let fetched_goal_2 = goalsData.find(goal => goal.id === 'goal_2');
                        if (fetched_goal_2.active_goal === true && goal2_cnt.cnt >= 20 && !fetched_goal_2.goal_req_met) { //temp cnt shelter cost
                            sub_goalCompleted('goal_2', 'sub3');
                        }
                        // goal_3
                        let goal3_cnt = resourcesData.find(res => res.id === 'TWIGS');
                        if (goal3_cnt.cnt >= 250 ) { //temp cnt 2000
                            let fetched_goal_3 = goalsData.find(goal => goal.id === 'goal_3');
                            if (fetched_goal_3.active_goal === true && !fetched_goal_3.goal_req_met) {
                                sub_goalCompleted('goal_3', 'sub');
                                sub_goalCompleted('goal_3', 'sub2');
                            }
                        }
                    }
                    break;
                case 'convert':
                    // available conversions
                    let made_res = resourcesData.find(r => r.id === array.makes);
                    
                    if (array.cnt >= array.convert && (made_res.cnt + array.convert) <= made_res.max) {
                        array.cnt -= array.convert;
                        
                        // altar modifications
                        // WIP: level 2 only
                        let obj_element = objectElements.find(o => o.id === 'BUILDING_PRIMITIVE_ALTAR');
                        let convert_gain = obj_element.cnt * array.convert_mult;
                        if (obj_element.cnt === 0 || made_res.level !== 2) {
                            convert_gain = 1;
                        }
                        made_res.cnt += convert_gain;
                    }
                    break;
                // Add more cases as needed
            }
        }
    }); // END: arrayData.forEach

} // end function

// used in costsList array
export function add_lbl(array) {
    array.forEach(item => {
        // Check if the item has a 'costs' property
        if (item.costs) {
            // Iterate over each property in 'costs'
            Object.keys(item.costs).forEach(key => {
                // Replace underscores with spaces and capitalize each word
                const formattedCostLabel = key.replace(/_/g, ' ')
                    .split(' ')
                    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
                    .join(' '); // Join the words with a space
                
                // Add a .lbl property for the current cost key
                item.costs[key + '_lbl'] = formattedCostLabel.trim(); // Remove leading/trailing spaces
            });
        }
        if (item.id) {
            // Split the id by underscores and capitalize the first letter of each word
            const formattedLabel = item.id.split('_')
                .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
                .slice(1) // Remove the first word
                .join(' '); // Join the words with a space
            
            // Assign the formatted label to the .lbl property
            item.lbl = formattedLabel;
        }
    });
    
    return array;
}
// Example usage:
//const formattedCostList = add_lbl(costList);
//console.log(formattedCostList);

export function update_costList() {
    
    costList.forEach(cost => {
        cost.available_for_purchase = true;
        cost.cost_object_maxed = false;
        let object_costs = cost.costs;
        let object_array = objectElements.find(o => o.id === cost.id);
                    
        let printCosts = '';
        let label = '';

        // costList array .costs
        for (let [item, value] of Object.entries(object_costs)) {

            // process all cost data
            function handleCosts(costType, array, item, value, cost, object_array) { // global_matched_costs
            
                let matchedData = array.find(a => a.id === item);
            
                if (matchedData) {
                    // round matchedData values
                    matchedData.cnt = Math.round(matchedData.cnt * 10) / 10;
        
                    const colorClass = (matchedData.cnt >= value) ? 'ltgreentxt' : 'ltred';
                    const maxed = (value > matchedData.max) ? '***' : '';
                    let costs_label = `<div class="${colorClass}">${matchedData.cnt}&nbsp;/&nbsp;${value}&nbsp;${matchedData.lbl}${maxed}<br>`;
            
                    cost.available_for_purchase = cost.available_for_purchase && (matchedData.cnt >= value);

                    cost.cost_object_maxed = cost.cost_object_maxed || (value > matchedData.max);
                    
                    let add_button_max_DOM = document.getElementById(object_array.add_button_max);
                    if (cost.cost_object_maxed) {
                        add_button_max_DOM.className = 'ltred';
                        add_button_max_DOM.innerHTML = '***';
                    } else {
                        add_button_max_DOM.innerHTML = '';
                    }
                    
                    printCosts += costs_label;

                    // exceptions
                    if (object_array.id === 'POP_BASIC_HUNTER') {
                        // consume values
                        for (let item in object_array.consumes) {
                            let consumes = objectElements.find(o => o.id === item);
                            if (consumes) {
                                let value = object_array.consumes[item];
                                let POP_BASIC_HUNTER_lbl = `<div id=${colorClass}">${value}&nbsp;${consumes.lbl}<br>`;
                                let consume_div = document.getElementById(object_array.consume_div);
                                
                                if (consume_div) {
                                    const colorClass = (consumes.cnt >= value) ? 'ltgreentxt' : 'ltred';
                                    consume_div.className = colorClass;
                                    consume_div.innerHTML = POP_BASIC_HUNTER_lbl;
                                }
                            }
                        }
                    } 
                }
            }
            
            if (cost.cost_type === 'res') {
                handleCosts(cost.cost_type, resourcesData, item, value, cost, object_array);
            }
            if (cost.cost_type !== 'res') {
                handleCosts(cost.cost_type, objectElements, item, value, cost, object_array);
            }
            if (cost.cost_type.includes('job')) {
                handleCosts(cost.cost_type, tribeData, item, value, cost, object_array);
            }
            if (cost.cost_type.includes('crafting')) {
                handleCosts(cost.cost_type, resourcesData, item, value, cost, object_array);
            }
        } // end object_costs for loop

        // place in containers
        let object_costs_container = document.getElementById(object_array.costs_div);
        let add_button = document.getElementById(object_array.add_button);
        let add_button_max = document.getElementById(object_array.add_button_max);

        if (object_costs_container && add_button) {
            object_costs_container.innerHTML = label + printCosts;
            if (cost.available_for_purchase) {
                add_button.className = 'ltgreentxt';
                // Add a 'purchase-button' class
                add_button.classList.add('purchase-button');
                // click function handlePurchaseButtonClicks()
                add_button.addEventListener('click', handlePurchaseButtonClicks);
            }
            if (!cost.available_for_purchase) {
                add_button.className = 'ltred';
            }
            if (cost.cost_object_maxed) {
                add_button_max.className = 'ltred';
                add_button_max.innerHTML = '***';
            } else {
                add_button_max.innerHTML = '';
            }
        }
    }); // END: costList.forEach

    // interval -> for 'job' objects only
    const jobElements = objectElements.filter(object => object.obj_type === 'job');
    const popTribes = tribeData.filter(tribe => tribe.uses === 'POP');
    
    jobElements.forEach(job => {
        
        let remove_button = document.getElementById(job.remove_button);
        
        // hide initially
        remove_button.innerHTML = '';
        // to completely hide button
        remove_button.style.visibility = 'hidden';
        let job_timer = document.getElementById(job.timer);
        let curr_status = document.getElementById(job.curr_status);

        if (job.cnt > 0) {
            remove_button.className = 'ltgreentxt';
            remove_button.style.visibility = 'visible';
            remove_button.innerHTML = `${job.remove_button_lbl}`;
            
            // update decay timer
            if (job.id === 'POP_BASIC_HUNTER') {
                let object_used = objectElements.find(o => o.id === 'CRAFT_SPEAR');
                if (object_used.total_decay_value > 0) {
                    job_timer.className = 'ltgreentxt';
                    job_timer.innerHTML = '(Hunting&nbsp;' + object_used.decay_timer + ')';
                } 
                if (object_used.total_decay_value <= 0) {
                    job_timer.className = 'ltred';
                    job_timer.innerHTML = `(Requires "${job.requires}")`;
                }
    
            }
        } else if (job_timer) {
            job_timer.innerHTML = ``;
        } else if (curr_status) {
            curr_status.innerHTML = '';
        }
        
        remove_button.classList.add('job-remove-button');
        // click function handleJobRemoveButtonClicks()
        remove_button.addEventListener('click', handleJobRemoveButtonClicks);
    
    });

} // END:  function

// Define the click event handler for job remove button
export function handleJobRemoveButtonClicks(event) {
    if (event.target.classList.contains('job-remove-button')) {

        let clicked_button = event.target.id;
        let matchedObject = objectElements.find(o => o.id + '_rem_button' === clicked_button);
        let tribeMatch = tribeData.find(t => t.id === matchedObject.id);
        let object_count = document.getElementById(matchedObject.object_count);

        if (matchedObject.cnt > 0) {

            // for gatherers only
            if (matchedObject.auto_res) {
                resourcesData.forEach(resource => {
                    if (resource.level === 1 && resource.auto_lvl1_rate !== 0 && resource.id !== 'KNOWLEDGE') {
                        resource.auto_lvl1_rate -= 0.5;
                    }
                });
            }

            // remove object 
            matchedObject.cnt -= 1;
            // remove job assignment
            tribeMatch.cnt -= 1;
            // add back AVAILABLE_MEMBERS
            tribeData[0].cnt += 1;
            
            // update object_count
            object_count.innerHTML = `&nbsp;(${matchedObject.cnt})&nbsp`;
            if (matchedObject.cnt === 0) {
                object_count.innerHTML = '';
            }
        }
    }
}

// **** ASSIGN PURCHASE ACTIONS
export function handlePurchaseButtonClicks(event) {
    if (event.target.classList.contains('purchase-button')) {
        // Retrieve the associated data attribute (object_array)
        let clicked_button = event.target.id;
        let object_array = objectElements.find(o => o.id + '_add_button' === clicked_button);

        // *** update each object count and element from purchases
        const objectMod = objectElements.find(r => r.id === object_array.id);
        
        if (objectMod) {
            // 'craft' obj_type only
            if (objectMod.obj_type === 'craft') {
                objectMod.progress_value += objectMod.progress_gain;
                if (objectMod.progress_value >= 100) {
                    objectMod.cnt += 1;
                    objectMod.progress_value = 0;
                }
                let progress_value_DOM = document.getElementById(objectMod.progress_lbl);
                if (objectMod.progress_value === 0) {
                    progress_value_DOM.innerHTML = '';
                } else {
                    progress_value_DOM.innerHTML = '&nbsp;(' + objectMod.progress_value + '%)';
                }
            } else {
                objectMod.cnt += 1;
                // upgrades
                if (objectMod.obj_type === 'upgrade') {
                    // goal_2
                    if (objectMod.id === 'GATHER_TWIGS' && objectMod.cnt >= 1) { // 5
                        sub_goalCompleted('goal_2', 'sub');
                    }
                    if (objectMod.id === 'GATHER_PEBBLES' && objectMod.cnt >= 1) { // 5
                        sub_goalCompleted('goal_2', 'sub2');
                    }
                }
                // AVAILABLE_MEMBERS only
                if (objectMod.makes === 'AVAILABLE_MEMBERS') {
                    tribeData[0].cnt += 1;
                }
                // POP_BASIC_HUNTER only
                if (objectMod.id === 'POP_BASIC_HUNTER') {
                    let hunter = tribeData.find(t => t.id === 'POP_BASIC_HUNTER');
                    hunter.cnt += 1;
                }
                // gatherers
                if (objectMod.id === 'POP_GATHERER') {
                    let gatherer = tribeData.find(t => t.id === 'POP_GATHERER');
                    gatherer.cnt += 1;
                    let curr_status = document.getElementById(objectMod.curr_status);
                    curr_status.innerHTML = '&nbsp;(Gathering &nbsp;&#8734;)';
                }
                // collectors
                if (objectMod.id === 'POP_BASIC_COLLECTOR') {
                    let collector = tribeData.find(t => t.id === 'POP_BASIC_COLLECTOR');
                    resourcesData.forEach(res => {
                        if (res.level === 1 && res.id !== 'KNOWLEDGE') {
                            res.auto_lvl1_rate += 0.5;
                            let auto_lvl1_res = document.getElementById(res.auto_lvl1_res);
                            auto_lvl1_res.innerHTML = `&nbsp;(+${res.auto_lvl1_rate}&nbsp;/s)`;
                        }
                    });
                    collector.cnt += 1;
                    let curr_status = document.getElementById(objectMod.curr_status);
                    curr_status.innerHTML = '&nbsp;(Collecting &nbsp;&#8734;)';
                    
                }
                // altars
                if (objectMod.id === 'BUILDING_PRIMITIVE_ALTAR') {
                    // unlock level 1 convert
                    resourcesData.forEach(res => {
                        if (res.id !== 'KNOWLEDGE' && res.level === 1) {
                            showElementID('convert_sect_title');
                            showElementID(res.con_id);
                        }
                    });
                    // unloxk knowledge
                    let knowledge_res = resourcesData.find(r => r.id === 'KNOWLEDGE');
                    showElementID('res_container_KNOWLEDGE');
                    knowledge_res.auto_lvl1_rate += 0.5;

                    if (objectMod.cnt === 5) { // default: 5
                        showElementID('res_container_STICKS');
                        showElementID('res_container_STONES');
                        showElementID('res_container_LEAVES');
                        showElementID('gather_div_STICKS');
                        showElementID('gather_div_STONES');
                        showElementID('gather_div_LEAVES');
                        //hideElementID('gather_div_TWIGS');
                        //hideElementID('gather_div_PEBBLES');
                        //hideElementID('gather_div_PINE_NEEDLES');

                    }
                }
                // storage
                if (objectMod.id === 'BUILDING_PRIMITIVE_STORAGE') {
                    resourcesData.forEach(res => {
                        if (res.id !== 'KNOWLEDGE') {
                            res.max += (res.max * 0.50);
                            let fetch_res_cnt_max = document.getElementById(res.res_cnt_max);
                            fetch_res_cnt_max.innerHTML = number_format(res.max);
                        }
                    });
                    
                    let fetch_gain_lbl = document.getElementById(objectMod.gain_lbl);
                    let old_max = resourcesData[0].max; // use TWIGS as reference
                    let new_max = old_max + (old_max * 0.5);
                    new_max = Math.round(new_max * 10) / 10;
                    fetch_gain_lbl.innerHTML = '+50&percnt; maximum resource capacity (next cap: ' + new_max + ')';

                }
                // research
                if (objectMod.id === 'RESEARCH_PRIMITIVE_CAMPFIRE') {
                    // upgrade food gathering
                    let fetched_foodResource = foodResource[0];
                    fetched_foodResource.selected_food_level = 2;
                    let DOM_gather_food_gain = document.getElementById('gather_food_gain');
                    DOM_gather_food_gain.innerHTML = '+1.8 / +2.0 / +2.1 FOOD';
                    let DOM_food_level = document.getElementById('food_level');
                    DOM_food_level.innerHTML = '&nbsp;(level 2)&nbsp';
                    // hide research
                    hideElementID('RESEARCH_PRIMITIVE_CAMPFIRE_container');
                }
            }
            // after any action
            let object_count_DOM = document.getElementById(objectMod.object_count);
            if (object_count_DOM && objectMod.cnt !== 0) {
                object_count_DOM.innerHTML = `&nbsp;(${objectMod.cnt})&nbsp`;
            } else {
                object_count_DOM.innerHTML = '';
            }
        }

        // *** deduct costs from purchases
        costList.forEach(obj => {

            // Iterating over the 'costs' object within each object
            Object.entries(obj.costs).forEach(([key, value]) => {
                if (!key.includes('_lbl')) { // filter out keys containing '_lbl'
    
                    const fetch_tribeData = tribeData.find(t => t.id === key); // AVAILABLE_MEMBERS
                    const fetch_objectElements = objectElements.find(o => o.id === obj.id);
                    const fetch_resourcesData = resourcesData.find(o => o.id === key);

                    if (fetch_resourcesData && object_array.id === obj.id) {
                        fetch_resourcesData.cnt -= value;
                    }
                    if (fetch_tribeData && object_array.id === obj.id) {
                        fetch_tribeData.cnt -= value;
                    }
                    
                    // for any items used, update cnt
                    if (fetch_objectElements && object_array.id === obj.id) {
                        let object_count_DOM = document.getElementById(fetch_objectElements.object_count);
                        if (object_count_DOM && objectMod.cnt === 0) {
                            object_count_DOM.innerHTML = ``;
                        } else {
                            object_count_DOM.innerHTML = `&nbsp;(${fetch_objectElements.cnt})&nbsp`;
                        }                    
                    }
                } // end filter
            });
        });
        
        // cost creep value updates for 'upgrade'
        if (objectMod && objectMod.obj_type === 'upgrade') {
            // costList array .costs
            costList.forEach(cost => {
                for (let [item, value] of Object.entries(cost.costs)) {
                    if (objectMod.id === cost.id && typeof value === 'number') {
                        cost.costs[item] = Math.round((objectMod.cost_creep * value) * 10) / 10;
                    }
                }
            });

            // gather_increase
            let objectMod_res = resourcesData.find(r => 'GATHER_' + r.id === objectMod.id);
            objectMod_res.gather_rate += Math.round(objectMod.gather_increase * 10) / 10;
            // update 'upgrade' details label
            let gain_detail_id_DOM = document.getElementById(objectMod.gain_detail_id);
            objectMod_res.next_gather_rate += objectMod.gather_increase;
            gain_detail_id_DOM.innerHTML = ' Next: +' + (Math.round(objectMod_res.next_gather_rate * 10) / 10) + '&nbsp;' + objectMod_res.lbl.toLowerCase();
        }

    } // end click target
} // end function

export function update_food() {

    let fetch_TRIBE_LEADER_prod = document.getElementById('TRIBE_LEADER_prod_cnt');
    let fetch_food_dep_live = document.getElementById('food_dep_live_eid');
    let fetch_consumption_totals_live = document.getElementById('consumption_totals_live_eid');
    let fetch_totals_live = document.getElementById('totals_live_eid');
    
    let fetch_gatherer_prod = document.getElementById('gatherer_prod');
    let gatherer_prod_lbl = document.getElementById('gatherer_prod_lbl');
    let fetch_production_totals = document.getElementById('production_totals_live');
    let spoiled_loss = document.getElementById('spoiled_loss');
    let gatherer_prod_div = document.getElementById('gatherer_prod_div');
    let basic_hunter_prod_div = document.getElementById('basic_hunter_prod_div');
    let spoiled_mult = document.getElementById('spoiled_mult');

    // calc
    let fetch_TOTAL_POPULATION = tribeData.find(t => t.id === 'TOTAL_POPULATION');
    var gatherer = tribeData.find(t => t.id === 'POP_GATHERER');
    var basic_hunter = tribeData.find(t => t.id === 'POP_BASIC_HUNTER');
    var TRIBE_LEADER = tribeData.find(t => t.id === 'TRIBE_LEADER');
    var TRIBE_LEADER_food = TRIBE_LEADER.cnt * TRIBE_LEADER.food_gain;
    var gatherer_food = gatherer.cnt * gatherer.food_gain;
    var basic_hunter_food = (basic_hunter.food_gain_flag) ? basic_hunter.cnt * basic_hunter.food_gain : 0;
    var population_cnt = document.getElementById('population_cnt');
    // gains
    foodResource[0].gain = gatherer_food + TRIBE_LEADER_food + basic_hunter_food;
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
        }
        if (basic_hunter.cnt === 0) {
            basic_hunter_prod_div.style.display = 'none';
        } else {
            basic_hunter_prod_div.style.display = 'block';
            basic_hunter_prod.classList.add('ltgreentxt');
            basic_hunter_prod.innerHTML = '+' + basic_hunter_food;
        }

        fetch_TRIBE_LEADER_prod.innerHTML = TRIBE_LEADER_food;
        
        spoiled_loss.innerHTML = foodResource[0].spoil;
        
        fetch_production_totals.innerHTML = '+' + foodResource[0].gain;

        fetch_food_dep_live.innerHTML = Math.round(foodResource[0].food_dep * 10) / 10;
        
        population_cnt.innerHTML = '(' + fetch_TOTAL_POPULATION.cnt + '):&nbsp;';
        
        fetch_consumption_totals_live.innerHTML = Math.round(foodResource[0].loss * 10) / 10;        

        let add_plus = '+';
        if (foodResource[0].net_difference >= 0) {
            fetch_totals_live.className = 'ltgreentxt';
        }
        if (foodResource[0].net_difference < 0) {
            fetch_totals_live.className = 'ltred';
            add_plus = '';
        }
        fetch_totals_live.innerHTML = '<hr>CURRENT RATE/S:&nbsp;' + add_plus + Math.round(foodResource[0].net_difference * 10) / 10;
    }
}

// show or hide sections on click
export function section_collapse(id) {
    let section = id + '_sect_id';
    let section_title = id + '_sect_title';
    let fetch_section = document.getElementById(section);
    let fetch_section_title = document.getElementById(section_title);

    if (fetch_section_title) {
        if (!fetch_section_title.dataset.listenerSet) {
            fetch_section_title.addEventListener('click', function toggleSection() {
                if (fetch_section.style.display === "none") {
                    fetch_section.style.display = "block";
                    fetch_section_title.innerHTML = '<p class="divsections_no_ul">&nbsp;[&nbsp;--&nbsp;]<span class="divsections">' + id.toUpperCase() + '</span></p>';
                } else {
                    fetch_section.style.display = "none";
                    fetch_section_title.innerHTML = '<p class="divsections_no_ul">&nbsp;[&nbsp;+&nbsp;]<span class="divsections">' + id.toUpperCase() + '</span></p>';
                }
            });
            fetch_section_title.dataset.listenerSet = true;
        }
    }
}

// convert to abbreviated numbers (resources only)
export function number_format(num) {
    // k for thousands
    if (num >= 10000 && num < 1000000) {
        return (num / 1000).toFixed(2) + 'k';
    }
    // m for millions
    if (num >= 1000000 && num < 100000000) {
        return (num / 1000).toFixed(2) + 'm';
    }
    return num.toString();
}
