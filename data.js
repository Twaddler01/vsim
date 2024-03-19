export function init_resourcesData() {

    const resourcesData = [
        // resource for GATHER and CONVERT
        { id: 'twigs', lbl: 'Twigs', level: 1, makes: 'sticks' },
        { id: 'pebbles', lbl: 'Pebbles', level: 1, makes: 'stones' },
        { id: 'pine_needles', lbl: 'Pine Needles', level: 1, makes: 'leaves' },
        { id: 'sticks', lbl: 'Sticks', level: 2, makes: 'logs' },
        { id: 'stones', lbl: 'Stones', level: 2, makes: 'rocks' },
        { id: 'leaves', lbl: 'Leaves', level: 2, makes: 'brush' },
        { id: 'logs', lbl: 'Logs', level: 3, makes: 'none' },
        { id: 'rocks', lbl: 'Rocks', level: 3, makes: 'none' },
        { id: 'brush', lbl: 'Brush', level: 3, makes: 'none' },
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
        // auto gathering
        resourcesIndex.auto_lvl1_res = resourcesIndex.id + '_auto_gather';
        resourcesIndex.auto_lvl1_rate = 0;
        // whole convert div = con_id
        resourcesIndex.con_id = 'conDiv_' + resourcesIndex.id;
        resourcesIndex.con_lbl = 'convert_' + resourcesIndex.id;
        resourcesIndex.con_btn = 'convert_btn_' + resourcesIndex.id;
        resourcesIndex.convert = 10;
        resourcesIndex.cnt = 0;
        resourcesIndex.max = 1000;
        //updates.print_resources = '<span class="ltbluetxt">' + resourcesIndex.lbl + ': ' + resourcesIndex.cnt + ' / ' + resourcesIndex.max + '</span>';
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

export function init_upgradeData() {

    const upgradeData = [
        { id: 'TWIGS_UPGRADE', lbl: 'Twigs' }, 
        { id: 'PEBBLES_UPGRADE', lbl: 'Pebbles' }, 
        { id: 'PINE_NEEDLES_UPGRADE', lbl: 'Pine Needles' },  
        { id: 'STICKS_UPGRADE', lbl: 'Sticks' }, 
        { id: 'STONES_UPGRADE', lbl: 'Stones' }, 
        { id: 'LEAVES_UPGRADE', lbl: 'Leaves' },  
        { id: 'LOGS_UPGRADE', lbl: 'Logs' }, 
        { id: 'ROCKS_UPGRADE', lbl: 'Rocks' }, 
        { id: 'BRUSH_UPGRADE', lbl: 'Brush' }, 
    ];
    
    const resourcesData = init_resourcesData();

    // Iterate over the array and set other variables dynamically
    for (let i = 0; i < upgradeData.length; i++) {
        const upgradeIndex = upgradeData[i];
        const upgradeUpdates = {};
        // *** dynanic ids ***
        // static: upgradeUpdates.id
        // static: upgradeUpdates.lbl
        upgradeUpdates.container_id = upgradeIndex.id + '_container';
        upgradeUpdates.first_line_div = upgradeIndex.id + '_first_line_div';
        upgradeUpdates.details_div = upgradeIndex.id + '_details_div';
        upgradeUpdates.toggle_button = upgradeIndex.id + '_toggle_button';
        upgradeUpdates.object_count = upgradeIndex.id + '_object_count';
        upgradeUpdates.add_button = upgradeIndex.id + '_add_button';
        upgradeUpdates.add_button_max = upgradeIndex.id + '_add_button_max';
        upgradeUpdates.gain_detail_id = upgradeIndex.id + '_gain_detail_id';
        upgradeUpdates.gain_id = upgradeIndex.id + '_gain';
        upgradeUpdates.costs_div = upgradeIndex.id + '_costs_div';
        // *** other data *** 
        upgradeUpdates.gain_detail_lbl = 'gain_detail_lbl'; // Interval code
        upgradeUpdates.gain_lbl = '+20% Gather Rate';
        upgradeUpdates.title = 'Upgrade ' + upgradeIndex.lbl + ' Collection';
        upgradeUpdates.desc = '...Use your experiences from collecting ' + upgradeIndex.lbl.toLowerCase() + ' and other things to increase the rate of collecting ' + upgradeIndex.lbl.toLowerCase() + '.';
        upgradeUpdates.add_button_lbl = 'UPGRADE';
        upgradeUpdates.cnt = 0;
        upgradeUpdates.gather_increase = 1.2;
        upgradeUpdates.cost_creep = 1.4;
        upgradeUpdates.job = null;
        upgradeUpdates.consume = null;
        upgradeUpdates.parentID = null;
        upgradeUpdates.maxed = false;
        upgradeUpdates.type = 'upgrade';
        // Assign updates to upgradeData properties
        Object.assign(upgradeIndex, upgradeUpdates);
    }
    
    return upgradeData;
}

export function init_buildingData() {

    const buildingData = [
        { id: 'primitive_shelter_building', 
        title: 'Primitive Shelter',
        desc: '...A basic shelter, providing minimal protection from the elements.<br>...Provides a home for 1 tribe member.',
        gain_lbl: '+1 Tribe Member', 
        gain_detail_lbl: 'Given a job, serves as a gatherer or a hunter.'
        }, 
        { id: 'primitive_shelter_building2', 
        title: 'Primitive Shelter2', 
        desc: '...A basic shelter, providing minimal protection from the elements.<br>...Provides a home for 1 tribe member.',
        gain_lbl: '+1 Tribe Member', 
        gain_detail_lbl: 'Given a job, serves as a gatherer or a hunter.'
        }, 
    ];

    for (let i = 0; i < buildingData.length; i++) {
        const buildingIndex = buildingData[i];
        const buildingUpdates = {};
        // *** dynanic ids ***
        // static: buildingUpdates.id
        buildingUpdates.lbl = buildingIndex.title;
        buildingUpdates.container_id = buildingIndex.id + '_container';
        buildingUpdates.first_line_div = buildingIndex.id + '_first_line_div';
        buildingUpdates.details_div = buildingIndex.id + '_details_div';
        buildingUpdates.toggle_button = buildingIndex.id + '_toggle_button';
        buildingUpdates.object_count = buildingIndex.id + '_object_count';
        buildingUpdates.add_button = buildingIndex.id + '_add_button';
        buildingUpdates.add_button_max = buildingIndex.id + '_add_button_max';
        buildingUpdates.gain_detail_id = buildingIndex.id + '_gain_detail_id';
        buildingUpdates.gain_id = buildingIndex.id + '_gain';
        buildingUpdates.costs_div = buildingIndex.id + '_costs_div';
        // *** other data *** 
        // static: buildingUpdates.gain_lbl
        // static: buildingUpdates.gain_detail_lbl
        // static: buildingUpdates.title
        // static: buildingUpdates.desc 
        buildingUpdates.add_button_lbl = 'BUILD';
        buildingUpdates.cnt = 0;
        buildingUpdates.gather_increase = 1.2;
        buildingUpdates.cost_creep = 1.4;
        buildingUpdates.job = null;
        buildingUpdates.consume = null;
        buildingUpdates.parentID = null;
        buildingUpdates.maxed = false;
        buildingUpdates.type = 'building';
        // Assign updates to buildingData properties
        Object.assign(buildingIndex, buildingUpdates);
    }
    
    return buildingData;
}

export function init_jobsData() {
    const jobsData = [
        { id: 'gatherer', 
        lbl: 'Gatherer', 
        title: 'JOB: Basic Fruit Gatherer',
        desc: '...Automatically gathers basic fruit to help feed your people.',
        gain_lbl: '+1 Food/s', 
        gain_detail_lbl: 'Gathers berries, wild lettuce, and mushrooms.', 
        lvl: 1 }, 
        { id: 'basic_hunter', 
        lbl: 'Basic Hunter', 
        title: '(WIP)JOB: Basic Hunter',
        desc: '...Automatically hunts basic game to help feed your people.<br>...Requires basic weapons.',
        gain_lbl: '+2 Food/s', 
        gain_detail_lbl: 'Hunts squirrel and deer.', 
        lvl: 2 }, 
        { id: 'basic_collector', 
        lbl: 'Basic Collector', 
        title: '( WIP)JOB: Basic Collector',
        desc: '...Automatically gathers resources to help supply your people with (sort of) useful materials.',
        gain_lbl: '+0.5/s Twigs, Pebbles, and Pine Needles', 
        gain_detail_lbl: 'Automatically gathers these 3 basic materials: twigs, pebbles, and pine needles.', 
        lvl: 1 }, 
    ];
    
    for (let i = 0; i < jobsData.length; i++) {
        const jobsDataIndex = jobsData[i];
        const jobsDataUpdates = {};
        // *** dynanic ids ***
        // static: jobsDataUpdates.id
        // static: jobsDataUpdates.lbl
        jobsDataUpdates.container_id = jobsDataIndex.id + '_container';
        jobsDataUpdates.first_line_div_id = jobsDataIndex.id + '_first_line_div';
        jobsDataUpdates.details_div = jobsDataIndex.id + '_details_div';
        jobsDataUpdates.toggle_button = jobsDataIndex.id + '_toggle_button';
        jobsDataUpdates.object_count = jobsDataIndex.id + '_object_count';
        jobsDataUpdates.add_button = jobsDataIndex.id + '_add_button';
        jobsDataUpdates.add_button_max = jobsDataIndex.id + '_add_button_max';
        jobsDataUpdates.gain_detail_id = jobsDataIndex.id + '_gain_detail_id';
        jobsDataUpdates.gain_id = jobsDataIndex.id + '_gain';
        jobsDataUpdates.costs_div = jobsDataIndex.id + '_costs_div';
        // *** other data *** 
        // static: jobsDataUpdates.gain_lbl
        // static: jobsDataUpdates.gain_detail_lbl
        // static: jobsDataUpdates.title
        // static: jobsDataUpdates.desc
        // static: jobsDataUpdates.lvl
        jobsDataUpdates.food_gain = jobsDataIndex.id + '_food_gain';
        jobsDataUpdates.type = 'job';
        jobsDataUpdates.cnt = 0;
        jobsDataUpdates.add_button_lbl = 'ASSIGN';
        jobsDataUpdates.job = null;
        jobsDataUpdates.consume = null;
        jobsDataUpdates.maxed = false;
        // Assign updates to jobsData properties
        Object.assign(jobsDataIndex, jobsDataUpdates);
    }
    
    return jobsData;
}

export function init_tribeData() {

    const tribeData = [
        // resource 'available_members' for jobsData
        { id: 'available_members', lbl: 'Available Members', print: '-- Available Members:&nbsp;', cnt: 0, type: 'job', cost_lbl: 'Available Members' },
        
        { id: 'tribe_leader', lbl: 'Tribe Leaders', print: 'Tribe Leaders:&nbsp;', cnt: 1, type: 'job', food_gain: 0.2, food_gain_eid: 'food_gain_eid' },
        { id: 'gatherer', lbl: 'Gatherers', print: 'Gatherers:&nbsp;', cnt: 0, type: 'job', cost_lbl: 'Gatherer', food_gain: 1, food_consume: 0.2 }, // net gain: 0.8
        { id: 'basic_hunter', lbl: 'Basic Hunters', print: 'Basic Hunters:&nbsp;', cnt: 0, type: 'job', cost_lbl: 'Basic Hunter', },
        { id: 'basic_collector', lbl: 'Basic Collectors', print: 'Basic Collectors:&nbsp;', cnt: 0, type: 'job', cost_lbl: 'Basic Collector', },
        { id: 'total_population', lbl: 'Total Population', print: 'Total Population:&nbsp;', cnt: 0, type: 'total' },
    ];
    
    // added: eid
    for (let i = 0; i < tribeData.length; i++) {
        const tribeDataIndex = tribeData[i];
        const tribeDataUpdates = {};
        tribeDataUpdates.eid = tribeDataIndex.id + '_eid';
        tribeDataUpdates.add_button_id = tribeDataIndex.id + '_add_button';
        tribeDataUpdates.object_count = tribeDataIndex.id + '_obj_cnt_id';
        // Assign updates to tribeData properties
        Object.assign(tribeDataIndex, tribeDataUpdates);
    }
    
    return tribeData;
}

export function init_foodSources() {

    const foodSources = [
        { id: 'berries', lbl: 'Berries', lvl: 1, multiplier: 1.0, cnt: 0 },
        { id: 'mushroom', lbl: 'mushroom', lvl: 1, multiplier: 1.1, cnt: 0 },
        { id: 'wild_lettuce', lbl: 'Wild Lettuce', lvl: 1, multiplier: 0.8, cnt: 0 },
        { id: 'squirrel', lbl: 'Squirrel', lvl: 2, multiplier: 1.3, cnt: 0 },
        { id: 'deer', lbl: 'Deer', lvl: 2, multiplier: 1.5, cnt: 0 },
        { id: 'sheep', lbl: 'Sheep', lvl: 3, multiplier: 1.8, cnt: 0 },
        { id: 'wild_boar', lbl: 'Wild Boar', lvl: 3, multiplier: 2.0, cnt: 0 },
    ];
    
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
        { id: 'food', lbl: 'Food:&nbsp', cnt: 0, max: 500, gain: 0, food_dep: 0, loss: 0, net_difference: 0, gather_rate: 1 }, 
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
    { name: 'tribe_leader', type: 'init', lbl: 'tribe leader', title: 'BECOME TRIBE LEADER', cnt: 0, desc: '', gain: '+1 Tribe Leader', costs: null, job: null, consume: null , parentID: '' },
    ];
    
    return objectiveData;

}

// migrate ALL costs
// ids only
export function init_costsData() {

    // matches ids only
    const costsData = [
        // upgradeData
        { id: 'TWIGS_UPGRADE', costs: { 'twigs': 20, 'pebbles': 10 }, type: 'upgrade' }, 
        { id: 'PEBBLES_UPGRADE', costs: { 'twigs': 10, 'pebbles': 20 }, type: 'upgrade' }, 
        { id: 'PINE_NEEDLES_UPGRADE', costs: { 'twigs': 10, 'pebbles': 10, 'pine_needles': 10 }, type: 'upgrade' },  
        { id: 'STICKS_UPGRADE', costs: { 'sticks': 20, 'stones': 10 }, type: 'upgrade' }, 
        { id: 'STONES_UPGRADE', costs: { 'sticks': 10, 'stones': 20 }, type: 'upgrade' }, 
        { id: 'LEAVES_UPGRADE', costs: { 'sticks': 10, 'stones': 10, 'leaves': 10 }, type: 'upgrade' },  
        { id: 'LOGS_UPGRADE', costs: { 'logs': 20, 'rocks': 10 }, type: 'upgrade' }, 
        { id: 'ROCKS_UPGRADE', costs: { 'rocks': 20, 'logs': 10 }, type: 'upgrade' }, 
        { id: 'BRUSH_UPGRADE', costs: { 'logs': 10, 'rocks': 10, 'brush': 10 }, type: 'upgrade' }, 
        // buildingData
        { id: 'primitive_shelter_building', costs: { 'twigs': 500, 'pebbles': 100 }, type: 'building' }, 
        { id: 'primitive_shelter_building2', costs: { 'pebbles': 500, 'sticks': 100 }, type: 'building' }, 
        // jobsData
        { id: 'gatherer', costs: { 'available_members': 1 }, type: 'job', }, 
        { id: 'basic_hunter', costs: { 'available_members': 1 }, type: 'job' }, 
        { id: 'basic_collector', costs: { 'available_members': 1 }, type: 'job' }, 
    ];

    return costsData;
}

export const resourcesData = init_resourcesData();
export const upgradeData = init_upgradeData();
export const buildingData = init_buildingData();
export const jobsData = init_jobsData();
export const tribeData = init_tribeData();
export const foodSources = init_foodSources();
export const foodResource = init_foodResource();
export const goalsData = init_goalsData();
export const objectiveData = init_objectiveData();
export const costsData = init_costsData();
