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
        { id: 'KNOWLEDGE', lbl: 'Knowledge', level: 1, makes: 'none' },
    ];

    // Iterate over the array and set other variables dynamically
    for (let i = 0; i < resourcesData.length; i++) {
        const resourcesIndex = resourcesData[i];
        // gather buttons / stores live updated cnt
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
        if (resourcesIndex.makes !== 'none') {
            resourcesIndex.convert_mult = 2;
            resourcesIndex.convert_gain = 1;
        }
        if (resourcesIndex.id !== 'KNOWLEDGE' && resourcesIndex.level === 1) {
            resourcesIndex.cnt = 0;
            resourcesIndex.hidden = true;
        } else {
            resourcesIndex.cnt = 0; // higher levels start at 0
            resourcesIndex.hidden = true;
        }
        resourcesIndex.max = 2000;
        resourcesIndex.res_container = 'res_container_' + resourcesIndex.id;
        resourcesIndex.res_cnt = 'res_cnt_' + resourcesIndex.id;
        resourcesIndex.res_cnt_lbl = 'res_cnt_lbl_' + resourcesIndex.id;
        resourcesIndex.res_cnt_max = 'res_cnt_max_' + resourcesIndex.id;
        const updates = {};
        updates.print_gather = '<button class="button_orange" style="background-color:#000000;">GATHER ' + resourcesIndex.lbl.toUpperCase() + '</button>';
        updates.print_gather2 = '<span class="ltgreentxt">&nbsp;+' + resourcesIndex.gather_rate + ' ' + resourcesIndex.lbl.toUpperCase();
        updates.print_convert = '<button class="button_orange">CONVERT 10 ' + resourcesIndex.lbl + '</button>&nbsp;+1 ' + resourcesIndex.makes.toUpperCase();
        updates.print_convert2 = '<span class="ltred">' + resourcesIndex.cnt + ' / ' + resourcesIndex.convert + ' ' + resourcesIndex.lbl + '</span>';
        // Assign updates to resourcesIndex properties
        Object.assign(resourcesIndex, updates);
    }
    
    return resourcesData;
}

export function init_tribeData() {

    const tribeData = [
        // resource 'AVAILABLE_MEMBERS' for jobsData
        { id: 'AVAILABLE_MEMBERS', lbl: 'Available Members', print: 'Available Members:&nbsp;', cnt: 0, type: 'job', cost_lbl: 'Available Members' },
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
        { id: 'squirrel', lbl: 'Squirrel', lvl: 2, multiplier: 1.8, cnt: 0, rare: 3 },
        { id: 'raccoon', lbl: 'Raccoon', lvl: 2, multiplier: 2.0, cnt: 0, rare: 2 },
        { id: 'deer', lbl: 'Deer', lvl: 2, multiplier: 2.1, cnt: 0, rare: 1 },
        { id: 'sheep', lbl: 'Sheep', lvl: 3, multiplier: 2.8, cnt: 0 },
        { id: 'wild_boar', lbl: 'Wild Boar', lvl: 3, multiplier: 3.0, cnt: 0 },
        { id: 'buffalo', lbl: 'Buffalo', lvl: 3, multiplier: 3.1, cnt: 0 },
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
        { id: 'food', lbl: 'Food:&nbsp', cnt: 0, max: 500, gain: 0, food_dep: 0, loss: 0, net_difference: 0, gather_rate: 1, selected_food_level: 1 }, 
    ];
    
    return foodResource;
}

export function init_goalsData() {

    const goalsData = [
        { id: 'goal_0', desc: '[*] Become tribe leader.', 
        sub: 'Click the "BECOME TRIBE LEADER" button to become the tribe leader and start game!', goal_req_met: false, active_goal: true },
        { id: 'goal_1', desc: '[*] Gather 200 Twigs. (0 / 200 twigs gathered)', 
        sub: 'Click the "GATHER TWIGS" button  to gather 200 twigs.', goal_req_met: false, active_goal: false },
        { id: 'goal_2', desc: '[*] Build a shelter to recruit a new tribe member.', 
        sub: '1. Upgrade TWIGS collection to level 5.', 
        sub2: '2. Upgrade PEBBLES collection to level 5.', 
        sub3: '3. Collect enough TWIGS and PEBBLES to build a shelter.', goal_req_met: false, active_goal: false, 
        sub_status: 'pending', // for multiple sub goals only
        sub2_status: 'pending', // either 'pending' or 'done'
        sub3_status: 'pending' }, 
        { id: 'goal_3', desc: '[*] Keep upgrading TWIGS collection to more efficiently gather them.', 
        sub: '1. Gather 2000 TWIGS. ', goal_req_met: false, active_goal: false, 
        sub2: '+AWARD: Receive a gathering bonus from the Tribe Leader.',
        sub_status: 'pending',
        sub2_status: 'pending' }, 
        { id: 'goal_4', desc: 'No active goals...', 
        sub: '', goal_req_met: false, active_goal: false },
    ];

    for (let i = 0; i < goalsData.length; i++) {
        const GD_Index = goalsData[i];
        const GD_Updates = {};
        GD_Updates.container_id = GD_Index.id + '_container';
        GD_Updates.desc_id = GD_Index.id + '_desc';
        GD_Updates.complete_id = GD_Index.id + '_complete';
        GD_Updates.sub_id = GD_Index.id + '_sub';
        if (GD_Index.sub2) {
            GD_Updates.sub_id2 = GD_Index.id + '_sub2';
        }
        if (GD_Index.sub3) {
            GD_Updates.sub_id3 = GD_Index.id + '_sub3';
        }        
        GD_Updates.next_goal_id = GD_Index.id + '_next';
        // Assign all updates to objectElements properties
        Object.assign(GD_Index, GD_Updates);
    }

    return goalsData;

}

export function init_objectiveData() {

    const objectiveData = [
    { name: 'TRIBE_LEADER', type: 'init', lbl: 'tribe leader', title: 'BECOME TRIBE LEADER', cnt: 0, desc: '', gain: '+1 Tribe Leader', costs: null, job: null, consume: null , parentID: '' },
    ];
    
    return objectiveData;

}

export function init_objectElements() {

    const objectElements = [

// UPGRADE
        { id: 'GATHER_TWIGS', lbl: 'Twigs', obj_type: 'upgrade', level: 1 }, 
        { id: 'GATHER_PEBBLES', lbl: 'Pebbles', obj_type: 'upgrade', level: 1 }, 
        { id: 'GATHER_PINE_NEEDLES', lbl: 'Pine Needles', obj_type: 'upgrade', level: 1 },  
        { id: 'GATHER_STICKS', lbl: 'Sticks', obj_type: 'upgrade', level: 2 }, 
        { id: 'GATHER_STONES', lbl: 'Stones', obj_type: 'upgrade', level: 2 }, 
        { id: 'GATHER_LEAVES', lbl: 'Leaves', obj_type: 'upgrade', level: 2 },  
        { id: 'GATHER_LOGS', lbl: 'Logs', obj_type: 'upgrade', level: 3 }, 
        { id: 'GATHER_ROCKS', lbl: 'Rocks', obj_type: 'upgrade', level: 3 }, 
        { id: 'GATHER_BRUSH', lbl: 'Brush', obj_type: 'upgrade', level: 3 }, 
// BUILDING
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
        { id: 'BUILDING_PRIMITIVE_ALTAR', lbl: 'Primitive Altar', obj_type: 'building',
            title: 'Primitive Altar', 
            desc: '...A place for rest and meditation. Allows your tribe to advance, by converting level 1 resources into something more useful. Your tribe also gains 0.5 knowledge per second for research.<br>...Each additional altar will double your resource conversion efficiency.',
            gain_lbl: 'Doubles Resource Conversion Efficiency<br>+0.5 Knowledge/s', 
            gain_detail_lbl: 'Required for converting level 1 resources into level 2 resources (sticks, stones, and leaves).',
            // extras
            bonus_txt: '(LEVEL 5): Grants the ability to collect level 2 resources (sticks, stones, and leaves) diectly.',
            }, 
        { id: 'BUILDING_PRIMITIVE_STORAGE', lbl: 'Primitive Storage', obj_type: 'building',
            title: 'Primitive Storage', 
            desc: '...Basic storage for gathered resources.<br>...Increases storage capacity by 50%',
            gain_lbl: '+50&percnt; maximum resource capacity (next cap: 0)', 
            gain_detail_lbl: 'Needed to purchase more expensive upgrades for your tribe.',
            }, 
// RESEARCH
        { id: 'RESEARCH_PRIMITIVE_CAMPFIRE', lbl: 'Primitive Campfire', obj_type: 'research',
            title: 'Primitive Campfire', 
            desc: '...Using knowledge gained by the ancients, discover the wondrous mysteries of fire.<br>...Allows the gathering of level 2 foods.',
            gain_lbl: 'GATHER FOOD (level 2)', 
            gain_detail_lbl: 'Grants +1.8 / +2.0 / +1.2 food.',
            }, 
// JOB
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
            // static
            consumes: {'CRAFT_SPEAR': 1},
            requires: 'Spears',
            }, 
        { id: 'POP_BASIC_COLLECTOR', lbl: 'Basic Resource Collector', obj_type: 'job',
            title: 'JOB: Basic Collector',
            desc: '...Automatically gathers resources to help supply your people with (sort of) useful materials.',
            gain_lbl: '+0.5/s Twigs, Pebbles, and Pine Needles', 
            gain_detail_lbl: 'Automatically gathers these 3 basic materials: twigs, pebbles, and pine needles.', 
            lvl: 1,
            // static
            auto_res: true,
            }, 
// CRAFT
        { id: 'CRAFT_SPEAR', lbl: 'Spear', obj_type: 'craft' }, 
        { id: 'CRAFT_SLING', lbl: 'Sling', obj_type: 'craft' }, 
        { id: 'CRAFT_BOW', lbl: 'Bow', obj_type: 'craft' },  

    ];

    // Iterate over the array and set other variables dynamically
    for (let i = 0; i < objectElements.length; i++) {
        const OE_Index = objectElements[i];
        const OE_Updates = {};
        // *** all static ids ***
        // .id .lbl .obj_type
        // *** dynanic ids ***
        OE_Updates.section_title = OE_Index.obj_type + '_sect_title';
        OE_Updates.section = OE_Index.obj_type + '_sect_id';
        OE_Updates.container_id = OE_Index.id + '_container';
        OE_Updates.first_line_div = OE_Index.id + '_first_line_div';
        OE_Updates.details_div = OE_Index.id + '_details_div';
        OE_Updates.toggle_button = OE_Index.id + '_toggle_button';
        OE_Updates.toggle_button_toggled = false;
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
        if (OE_Index.obj_type === 'research') {
            OE_Updates.add_button_lbl = 'RESEARCH';
            
        }
        if (OE_Index.obj_type === 'job') {
            OE_Updates.add_button_lbl = 'ASSIGN';
            OE_Updates.remove_button = OE_Index.id + '_rem_button';
            OE_Updates.remove_button_lbl = 'REASSIGN';
            OE_Updates.consume_div = OE_Index.id + '_consume_div';
            OE_Updates.timer = OE_Index.id + '_timer';
            OE_Updates.curr_status = OE_Index.id + '_status';
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
            OE_Updates.total_decay_value = 0; // in code: .decay_value * .cnt
            OE_Updates.decay_started = false;
            OE_Updates.decay_timer = 0;
        }
        // extra description ids
        if (OE_Index.bonus_txt) {
            OE_Updates.bonus_txt_id = OE_Index.id + 'bonus_txt_id';
        }

        // Assign all updates to objectElements properties
        Object.assign(OE_Index, OE_Updates);
    }

    return objectElements;

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
        { id: 'BUILDING_PRIMITIVE_ALTAR', costs: { 'TWIGS': 200, 'PEBBLES': 200, 'PINE_NEEDLES': 400 }, cost_type: 'res' }, 
        { id: 'BUILDING_PRIMITIVE_STORAGE', costs: { 'TWIGS': 1000, 'PEBBLES': 2000, 'PINE_NEEDLES': 1000 }, cost_type: 'res' }, 
        { id: 'RESEARCH_PRIMITIVE_CAMPFIRE', costs: { 'STICKS': 2000, 'STONES': 2000, 'LEAVES': 2000, 'KNOWLEDGE': 1000 }, cost_type: 'res' }, 
        { id: 'POP_GATHERER', costs: { 'AVAILABLE_MEMBERS': 1 }, cost_type: 'job' }, 
        { id: 'POP_BASIC_HUNTER', costs: { 'AVAILABLE_MEMBERS': 1 }, cost_type: 'job' }, // OLD : cost_type: ['job', 'craft']
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

export const resourcesData = init_resourcesData();
export const tribeData = init_tribeData();
export const foodSources = init_foodSources();
export const foodResource = init_foodResource();
export const goalsData = init_goalsData();
export const objectiveData = init_objectiveData();
export const objectElements = init_objectElements();
export const costList = init_costList();
