// data.js

import { add_lbl } from './functions.js';

export function init_resourcesData() {

    const resourcesData = [
        // resource for GATHER and CONVERT
        { id: 'TWIGS', lbl: 'Twigs', level: 1, makes: 'STICKS' },
        { id: 'PEBBLES', lbl: 'Pebbles', level: 1, makes: 'STONES' },
        { id: 'PINE_NEEDLES', lbl: 'Pine Needles', level: 1, makes: 'LEAVES' },
        { id: 'STICKS', lbl: 'Sticks', level: 2, makes: 'LOGS' },
        { id: 'STONES', lbl: 'Stones', level: 2, makes: 'ROCKS' },
        { id: 'LEAVES', lbl: 'Leaves', level: 2, makes: 'BRUSH' },
        { id: 'LOGS', lbl: 'Logs', level: 3, makes: 'none' },
        { id: 'ROCKS', lbl: 'Rocks', level: 3, makes: 'none' },
        { id: 'BRUSH', lbl: 'Brush', level: 3, makes: 'none' },
    ];

    // Iterate over the array and set other variables dynamically
    for (let i = 0; i < resourcesData.length; i++) {
        const resourcesIndex = resourcesData[i];
        // (div) stores live updated cnt
        resourcesIndex.resource_live_cnt = 'live_cnt_' + resourcesIndex.id;
        resourcesIndex.res_lbl = 'resource_' + resourcesIndex.id;
        resourcesIndex.gatherDiv = 'gather_div_' + resourcesIndex.id;
        resourcesIndex.gather_btn = 'gather_btn_' + resourcesIndex.id;
        resourcesIndex.gather_lbl = 'gather_' + resourcesIndex.id;
        resourcesIndex.gather_rate = 1;
        resourcesIndex.next_gather_rate = 0;
        // auto gathering
        resourcesIndex.auto_lvl1_res = resourcesIndex.id + '_auto_gather';
        resourcesIndex.auto_lvl1_rate = 0;
        // whole convert div = con_id
        resourcesIndex.con_id = 'conDiv_' + resourcesIndex.id;
        resourcesIndex.con_lbl = 'convert_' + resourcesIndex.id;
        resourcesIndex.con_btn = 'convert_btn_' + resourcesIndex.id;
        resourcesIndex.convert = 10;
        resourcesIndex.cnt = 2000;
        resourcesIndex.max = 2000;
        resourcesIndex.res_container = 'res_container_' + resourcesIndex.id;
        resourcesIndex.res_cnt = 'res_cnt_' + resourcesIndex.id;
        resourcesIndex.res_cnt_lbl = 'res_cnt_lbl_' + resourcesIndex.id;
        resourcesIndex.res_cnt_max = 'res_cnt_max_' + resourcesIndex.id;
        const updates = {};
        updates.print_gather = '<span class="button_orange">[ GATHER ' + resourcesIndex.lbl.toUpperCase() + ' ]';
        updates.print_gather2 = '<span class="ltgreentxt">&nbsp;+' + resourcesIndex.gather_rate + ' ' + resourcesIndex.lbl.toUpperCase();
        updates.print_convert = '<span class="ltred">' + resourcesIndex.cnt + ' / ' + resourcesIndex.convert + ' ' + resourcesIndex.lbl + '</span>';
        updates.print_convert2 = '<span class="button_orange">&nbsp;[ CONVERT TO +1 ' + resourcesIndex.makes.toUpperCase() + ' ] </span';
        // Assign updates to resourcesIndex properties
        Object.assign(resourcesIndex, updates);
    }
    
    return resourcesData;
}

export function init_tribeData() {

    const tribeData = [
        // resource 'AVAILABLE_MEMBERS' for jobsData
        { id: 'AVAILABLE_MEMBERS', lbl: 'Available Members', print: '-- Available Members:&nbsp;', cnt: 0, type: 'job', cost_lbl: 'Available Members' },
        { id: 'TRIBE_LEADER', lbl: 'Tribe Leaders', print: 'Tribe Leaders:&nbsp;', cnt: 1, type: 'job', food_gain: 0.2, food_gain_eid: 'food_gain_eid' },
        { id: 'POP_GATHERER', lbl: 'Gatherers', print: 'Gatherers:&nbsp;', cnt: 0, type: 'job', cost_lbl: 'Gatherer', food_gain: 1, food_consume: 0.2, uses: 'POP' }, // net gain: 0.8
        { id: 'POP_BASIC_HUNTER', lbl: 'Basic Hunters', print: 'Basic Hunters:&nbsp;', cnt: 0, type: 'job', cost_lbl: 'Basic Hunter', food_gain: 2, food_consume: 0.4, food_gain_flag: false, uses: 'POP' },
        { id: 'POP_BASIC_COLLECTOR', lbl: 'Basic Collectors', print: 'Basic Collectors:&nbsp;', cnt: 0, type: 'job', cost_lbl: 'Basic Collector', uses: 'POP' },
        { id: 'TOTAL_POPULATION', lbl: 'Total Population', print: 'Total Population:&nbsp;', cnt: 0, type: 'total' },
    ];
    
    // Iterate over the array and set other variables dynamically
    for (let i = 0; i < tribeData.length; i++) {
        const tribeDataIndex = tribeData[i];
        const tribeDataUpdates = {};
        tribeDataUpdates.eid = tribeDataIndex.id + '_eid';
        // new function setup_costList()
        tribeDataUpdates.container_id = tribeDataIndex.id + '_comtainer';
        tribeDataUpdates.add_button_id = tribeDataIndex.id + '_add_button';
        tribeDataUpdates.object_count = tribeDataIndex.id + '_obj_cnt_id';
        // Assign updates to tribeData properties
        Object.assign(tribeDataIndex, tribeDataUpdates);
    }
    
    return tribeData;
}

export function init_foodSources() {

    // multiplier: food cnt gained
    // food.gather_rate: from upgrades (default: 1)
    const foodSources = [
        { id: 'wild_lettuce', lbl: 'Wild Lettuce', lvl: 1, multiplier: 0.8, cnt: 0, rare: 3 },
        { id: 'berries', lbl: 'Berries', lvl: 1, multiplier: 1, cnt: 0, rare: 2 },
        { id: 'mushroom', lbl: 'Mushroom', lvl: 1, multiplier: 1.1, cnt: 0, rare: 1 },
        { id: 'squirrel', lbl: 'Squirrel', lvl: 2, multiplier: 1.3, cnt: 0 },
        { id: 'deer', lbl: 'Deer', lvl: 2, multiplier: 1.5, cnt: 0 },
        { id: 'sheep', lbl: 'Sheep', lvl: 3, multiplier: 1.8, cnt: 0 },
        { id: 'wild_boar', lbl: 'Wild Boar', lvl: 3, multiplier: 2.0, cnt: 0 },
    ];
    
    // Iterate over the array and set other variables dynamically
    // added: spoil
    for (let i = 0; i < foodSources.length; i++) {
        const foodSourcesIndex = foodSources[i];
        const foodSourcesUpdates = {};
        foodSourcesUpdates.spoil = 0
        if (foodSourcesIndex.lvl === 1) {
            foodSourcesUpdates.spoil = -0.4;
        }
        if (foodSourcesIndex.lvl === 2 || foodSourcesIndex.lvl === 3) {
            foodSourcesUpdates.spoil = -0.2;
        }
        //foodSourcesUpdates.000 = ???
        // Assign updates to resourceslIndex properties
        Object.assign(foodSourcesIndex, foodSourcesUpdates);
    }
    
    return foodSources;
}

export function init_foodResource() {
    const foodResource = [
        // added live: food_dep, tick
        { id: 'food', lbl: 'Food:&nbsp', cnt: 200, max: 500, gain: 0, food_dep: 0, loss: 0, net_difference: 0, gather_rate: 1 }, 
    ];
    
    return foodResource;
}

export function init_goalsData() {

    const goalsData = [
        { id: 0, desc: '[*] Become tribe leader.', goal_req_met: false },
        { id: 1, desc: '[*] Gather 2000 Twigs.', goal_req_met: false },
        { id: 2, desc: '[*] Build an altar to recruit a new tribe member.', goal_req_met: false },
        { id: 3, desc: '[*] Convert 10 of each resource to gather new resources.', goal_req_met: false },
    ];

    return goalsData;

}

export function init_objectiveData() {

    const objectiveData = [
    { name: 'TRIBE_LEADER', type: 'init', lbl: 'tribe leader', title: 'BECOME TRIBE LEADER', cnt: 0, desc: '', gain: '+1 Tribe Leader', costs: null, job: null, consume: null , parentID: '' },
    ];
    
    return objectiveData;

}

export function init_costList() {

    const costList = [

        { id: 'GATHER_TWIGS', costs: { 'TWIGS': 20, 'PEBBLES': 10 }, cost_type: 'res' }, 
        { id: 'GATHER_PEBBLES', costs: { 'TWIGS': 10, 'PEBBLES': 20 }, cost_type: 'res' }, 
        { id: 'GATHER_PINE_NEEDLES', costs: { 'TWIGS': 10, 'PEBBLES': 10, 'PINE_NEEDLES': 10 }, cost_type: 'res' }, 
        { id: 'GATHER_STICKS', costs: { 'STICKS': 20, 'STONES': 10 }, cost_type: 'res' }, 
        { id: 'GATHER_STONES', costs: { 'STICKS': 10, 'STONES': 20 }, cost_type: 'res' }, 
        { id: 'GATHER_LEAVES', costs: { 'STICKS': 10, 'STONES': 10, 'LEAVES': 10 }, cost_type: 'res' }, 
        { id: 'GATHER_LOGS', costs: { 'LOGS': 20, 'ROCKS': 10 }, cost_type: 'res' }, 
        { id: 'GATHER_ROCKS', costs: { 'ROCKS': 20, 'LOGS': 10 }, cost_type: 'res' }, 
        { id: 'GATHER_BRUSH', costs: { 'LOGS': 10, 'ROCKS': 10, 'BRUSH': 10 }, cost_type: 'res' }, 
        { id: 'BUILDING_PRIMITIVE_SHELTER', costs: { 'TWIGS': 500, 'PEBBLES': 100 }, cost_type: 'res' }, 
        { id: 'BUILDING_BASIC_CRAFTING_STATION', costs: { 'TWIGS': 100, 'PEBBLES': 500, 'PINE_NEEDLES': 50 }, cost_type: 'res' }, 
        { id: 'POP_GATHERER', costs: { 'AVAILABLE_MEMBERS': 1 }, cost_type: 'job' }, 
        { id: 'POP_BASIC_HUNTER', costs: { 'AVAILABLE_MEMBERS': 1, 'CRAFT_SPEAR': 1 }, cost_type: ['job', 'craft'] }, // +craft
        { id: 'POP_BASIC_COLLECTOR', costs: { 'AVAILABLE_MEMBERS': 1 }, cost_type: 'job' }, 
        { id: 'CRAFT_SPEAR', costs: { 'TWIGS': 10, 'PEBBLES': 10 }, cost_type: 'res' }, 
        { id: 'CRAFT_SLING', costs: { 'TWIGS': 10 }, cost_type: 'res' }, 
        { id: 'CRAFT_BOW', costs: { 'TWIGS': 10 }, cost_type: 'res' }, 
    
    ];

    // Iterate over the array and set other variables dynamically
    for (let i = 0; i < costList.length; i++) {
        const costListIndex = costList[i];
        const costListUpdates = {};
       // *** other data *** 
        costListUpdates.available_for_purchase = true;
        costListUpdates.cost_object_maxed = true;
        // Assign updates to costList properties
        Object.assign(costListIndex, costListUpdates);
    }

    // add a lbl property to array based on id
    add_lbl(costList);

    return costList;

}

export function init_objectElements() {

    const objectElements = [

        { id: 'GATHER_TWIGS', lbl: 'Twigs', obj_type: 'upgrade' }, 
        { id: 'GATHER_PEBBLES', lbl: 'Pebbles', obj_type: 'upgrade' }, 
        { id: 'GATHER_PINE_NEEDLES', lbl: 'Pine Needles', obj_type: 'upgrade' },  
        { id: 'GATHER_STICKS', lbl: 'Sticks', obj_type: 'upgrade' }, 
        { id: 'GATHER_STONES', lbl: 'Stones', obj_type: 'upgrade' }, 
        { id: 'GATHER_LEAVES', lbl: 'Leaves', obj_type: 'upgrade' },  
        { id: 'GATHER_LOGS', lbl: 'Logs', obj_type: 'upgrade' }, 
        { id: 'GATHER_ROCKS', lbl: 'Rocks', obj_type: 'upgrade' }, 
        { id: 'GATHER_BRUSH', lbl: 'Brush', obj_type: 'upgrade' }, 
        // static buildings
        { id: 'BUILDING_PRIMITIVE_SHELTER', lbl: 'Primitive Shelter', obj_type: 'building', makes: 'AVAILABLE_MEMBERS',
            title: 'Primitive Shelter',
            desc: '...A basic shelter, providing minimal protection from the elements.<br>...Provides a home for 1 tribe member.',
            gain_lbl: '+1 Tribe Member',
            gain_detail_lbl: 'Given a job, serves as a gatherer or a hunter.',
            }, 
        { id: 'BUILDING_BASIC_CRAFTING_STATION', lbl: 'Basic Crafting Station', obj_type: 'building',
            title: 'Basic Crafting Station', 
            desc: '...A basic crafting station, providing basic weapons for hunters.<br>...Allows materials to be used for crafting spears for hunters.',
            gain_lbl: 'CRAFT: Spears', 
            gain_detail_lbl: 'Crafted in parts.',
            },
        // static jobs
        { id: 'POP_GATHERER', lbl: 'Gatherer', obj_type: 'job',
            title: 'JOB: Basic Fruit Gatherer',
            desc: '...Automatically gathers basic fruit to help feed your people.',
            gain_lbl: '+1 Food/s', 
            gain_detail_lbl: 'Gathers berries, wild lettuce, and mushrooms.', 
            lvl: 1,
            }, 
        { id: 'POP_BASIC_HUNTER', lbl: 'Basic Hunter', obj_type: 'job',
            title: 'JOB: Basic Hunter',
            desc: '...Automatically hunts basic game to help feed your people.<br>...Requires basic weapons.',
            gain_lbl: '+2 Food/s', 
            gain_detail_lbl: 'Hunts squirrel and deer.', 
            lvl: 2,
            }, 
        { id: 'POP_BASIC_COLLECTOR', lbl: 'Basic Resource Collector', obj_type: 'job',
            title: 'JOB: Basic Collector',
            desc: '...Automatically gathers resources to help supply your people with (sort of) useful materials.',
            gain_lbl: '+0.5/s Twigs, Pebbles, and Pine Needles', 
            gain_detail_lbl: 'Automatically gathers these 3 basic materials: twigs, pebbles, and pine needles.', 
            lvl: 1,
            auto_res: true,
            }, 
        // static crafted items
        // WIP: needs to be destroyed over time or require resources/sec
        { id: 'CRAFT_SPEAR', lbl: 'Spear', obj_type: 'craft' }, 
        { id: 'CRAFT_SLING', lbl: 'Sling', obj_type: 'craft' }, 
        { id: 'CRAFT_BOW', lbl: 'Bow', obj_type: 'craft' },  

    ];

    // Iterate over the array and set other variables dynamically
    for (let i = 0; i < objectElements.length; i++) {
        const OE_Index = objectElements[i];
        const OE_Updates = {};
        // *** all static ids ***
        // .id .lbl .type
        // *** dynanic ids ***
        OE_Updates.section = OE_Index.obj_type + '_sect_id';
        OE_Updates.container_id = OE_Index.id + '_container';
        OE_Updates.first_line_div = OE_Index.id + '_first_line_div';
        OE_Updates.details_div = OE_Index.id + '_details_div';
        OE_Updates.toggle_button = OE_Index.id + '_toggle_button';
        OE_Updates.object_count = OE_Index.id + '_object_count';
        OE_Updates.add_button = OE_Index.id + '_add_button';
        OE_Updates.add_button_max = OE_Index.id + '_add_button_max';
        OE_Updates.gain_detail_id = OE_Index.id + '_gain_detail_id';
        OE_Updates.gain_id = OE_Index.id + '_gain';
        OE_Updates.costs_div = OE_Index.id + '_costs_div';
        // *** dynamic variables ***
        OE_Updates.cnt = 0;
        // *** specific assignments 
        if (OE_Index.obj_type === 'upgrade') {
            OE_Updates.add_button_lbl = 'UPGRADE';
            OE_Updates.gain_detail_lbl = 'gain_detail_lbl'; // Interval code
            OE_Updates.gain_lbl = '+20% Gather Rate';
            OE_Updates.title = 'Upgrade ' + OE_Index.lbl + ' Collection';
            OE_Updates.desc = '...Use your experiences from collecting ' + OE_Index.lbl.toLowerCase() + ' and other things to increase the rate of collecting ' + OE_Index.lbl.toLowerCase() + '.';
            OE_Updates.gather_increase = 0.2;
            OE_Updates.cost_creep = 1.4;
        }
        if (OE_Index.obj_type === 'building') {
            OE_Updates.add_button_lbl = 'BUILD';
            
        }
        if (OE_Index.obj_type === 'job') {
            OE_Updates.add_button_lbl = '+';
            OE_Updates.remove_button = OE_Index.id + '_rem_button';
            OE_Updates.remove_button_lbl = '-';
            // tribeData[0].id === 'AVAILABLE_MEMBERS'
            // tribeData[0].cnt
        }
        if (OE_Index.obj_type === 'craft') {
            OE_Updates.add_button_lbl = 'CRAFT';
            OE_Updates.gain_detail_lbl = 'Craft a part of a ' + OE_Index.lbl.toLowerCase() + '. Gain 1 ' + OE_Index.lbl.toLowerCase() + ' at 100%.';
            OE_Updates.gain_lbl = '+10% ' + OE_Index.lbl.toUpperCase();
            OE_Updates.title = 'Craft ' + OE_Index.lbl;
            OE_Updates.desc = '...Use your crafting station and required materials to craft a part of a ' + OE_Index.lbl.toLowerCase() + '.<br>...' + OE_Index.lbl + 's are needed by hunters to hunt basic game.';
            OE_Updates.progress_lbl = OE_Index.id + '_progress_lbl';
            OE_Updates.progress_value = 0;
            OE_Updates.progress_gain = 10;
        }
        // add decay values
        if (OE_Index.id === 'CRAFT_SPEAR') {
            OE_Updates.decay_container = OE_Index.id + '_decay_container';
            OE_Updates.decay_lbl = OE_Index.id + '_decay';
            OE_Updates.decay_value_lbl = OE_Index.id + 'decay_value_lbl';
            OE_Updates.decay_value = 10; // 100
            OE_Updates.decay_value_start = 10; // 100
            OE_Updates.decay_rate = 0.8;
            OE_Updates.decay_timer = 0;
        }
        // Assign all updates to objectElements properties
        Object.assign(OE_Index, OE_Updates);
    }

    return objectElements;

}

export const resourcesData = init_resourcesData();
export const tribeData = init_tribeData();
export const foodSources = init_foodSources();
export const foodResource = init_foodResource();
export const goalsData = init_goalsData();
export const objectiveData = init_objectiveData();
export const objectElements = init_objectElements();
export const costList = init_costList();
