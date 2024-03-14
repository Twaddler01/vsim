export function init_resourcesData() {

    const resourcesData = [
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
        { id: 'twigs', type: 'upgrade' }, 
        { id: 'pebbles', type: 'upgrade' }, 
        { id: 'pine_needles', type: 'upgrade' },  
        { id: 'sticks', type: 'upgrade' }, 
        { id: 'stones', type: 'upgrade' }, 
        { id: 'leaves', type: 'upgrade' },  
        { id: 'logs', type: 'upgrade' }, 
        { id: 'rocks', type: 'upgrade' }, 
        { id: 'brush', type: 'upgrade' }, 
    ];
    
    const resourcesData = init_resourcesData();

    // Iterate over the array and set other variables dynamically
    for (let i = 0; i < upgradeData.length; i++) {
        const upgradeIndex = upgradeData[i];
        const upgradeUpdates = {};
        // Find the corresponding resource in resourcesData
        const linkedResource = resourcesData.find(resource => resource.id === upgradeIndex.id);    
        if (linkedResource) {
            // Dynamically assign id from upgradeData
            // upgrade_container div
            upgradeIndex.upgradeID = linkedResource.id + '_upgrade';
            upgradeIndex.lbl = linkedResource.lbl;
        }
        upgradeUpdates.first_line_div_id = upgradeIndex.id + '_first_line_div';
        upgradeUpdates.toggled_details_div = upgradeIndex.id + '_details';

        // costs
        upgradeUpdates.costs_div = 'UPGRADE_' + upgradeIndex.id.toUpperCase() + '_costs_div';
     
        upgradeUpdates.object_count_id = upgradeIndex.id + '_object_count_id';
        upgradeUpdates.gain_id = upgradeIndex.id + '_gain';
        // [ + ] [ - ] button
        upgradeUpdates.button = upgradeIndex.id + '_button';
        // buy button -- UPGRADE
        upgradeUpdates.add_button = upgradeIndex.id + '_add_button';
        // buy button -- ADD
        //upgradeUpdates.add_button_ADD = '<span class="ltred" id="' + upgradeIndex.id + '_add_button' + '">[ ADD ]</span>';
        upgradeUpdates.title = 'Upgrade ' + upgradeIndex.lbl + ' Collection';
        upgradeUpdates.cnt = 0;
        upgradeUpdates.gather_increase = 1.2;
        upgradeUpdates.cost_creep = 1.4;
        upgradeUpdates.desc = '...Use your experiences from collecting ' + upgradeIndex.lbl.toLowerCase() + ' and other things to increase the rate of collecting ' + upgradeIndex.lbl.toLowerCase() + '.';
        //upgradeUpdates.print_costs = '';
        upgradeUpdates.job = null;
        upgradeUpdates.consume = null;
        upgradeUpdates.parentID = null;
        upgradeUpdates.maxed = false;
        upgradeUpdates.type = 'upgrade';
        // Assign updates to resourceslIndex properties
        Object.assign(upgradeIndex, upgradeUpdates);
    }
    
    return upgradeData;
}

export function init_buildingData() {

    const buildingData = [
        { id: 'primitive_shelter_building', 
        // TEST
        //costs: { 'Twigs': 500, 'Pebbles': 100 }, 
        title: 'Primitive Shelter',
        desc: '...A basic shelter, providing minimal protection from the elements.<br>...Provides a home for 1 tribe member.',
        gain_lbl: '+1 Tribe Member', 
        gain_detail_lbl: 'Given a job, serves as a gatherer or a hunter.'
        }, 
        { id: 'primitive_shelter_building2', 
        // TEST
        //costs: { 'Pebbles': 500, 'Sticks': 100 }, 
        title: 'Primitive Shelter2',
        desc: '...A basic shelter, providing minimal protection from the elements.<br>...Provides a home for 1 tribe member.',
        gain_lbl: '+1 Tribe Member', 
        gain_detail_lbl: 'Given a job, serves as a gatherer or a hunter.'
        }, 
    ];
    
    for (let i = 0; i < buildingData.length; i++) {
        const buildingIndex = buildingData[i];
        const buildingUpdates = {};
        buildingUpdates.first_line_div_id = buildingIndex.id + '_first_line_div';
        buildingUpdates.toggled_details_div = buildingIndex.id + '_details';
        buildingUpdates.object_count_id = buildingIndex.id + '_obj_cnt_id';
        buildingUpdates.gain_id = buildingIndex.id + '_gain';
        buildingUpdates.gain_detail_id = buildingIndex.id + '_gain_detail';
        buildingUpdates.button = buildingIndex.id + '_button';
        buildingUpdates.add_button = buildingIndex.id + '_add_button';
        // static
        //buildingUpdates.title = '_title_';

        // costs
        buildingUpdates.costs_div = buildingIndex.id + '_costs_div';
        // costs parts
        buildingUpdates.costs_cnt_span = buildingIndex.id + '_cnt_span';
        buildingUpdates.costs_array_span = buildingIndex.id + '_costs_array';

        buildingUpdates.gather_increase = 1.2;
        buildingUpdates.cost_creep = 1.4;
        // static
        //buildingUpdates.desc = '_desc_';
        buildingUpdates.job = null;
        buildingUpdates.consume = null;
        buildingUpdates.parentID = null;
        buildingUpdates.maxed = false;
        buildingUpdates.ResCnt = buildingIndex.id + '_ResCnt';
        buildingUpdates.cnt = 0;
        buildingUpdates.type = 'building';
        // Assign updates to resourceslIndex properties
        Object.assign(buildingIndex, buildingUpdates);
    }
    
    return buildingData;
}

export function init_jobsData() {
    const jobsData = [
        { id: 'gatherer', 
        lbl: 'Gatherer', 
        title: 'JOB: Basic Gatherer',
        desc: '...Automatically gathers basic fruit to help feed your people.',
        gain_lbl: '+1 Food/s', 
        gain_detail_lbl: 'Gathers berries, wild lettuce, and mushrooms.', 
        lvl: 1 }, 
        { id: 'basic_hunter', 
        lbl: 'Basic Hunter', 
        title: 'JOB: Basic Hunter',
        desc: '...Automatically hunts basic game to help feed your people.<br>...Requires basic weapons.',
        gain_lbl: '+2 Food/s', 
        gain_detail_lbl: 'Hunts squirrel and deer.', 
        lvl: 2 }, 
        { id: 'basic_collector', 
        lbl: 'Basic Collector', 
        title: 'JOB: Basic Collector',
        desc: '...Automatically gathers resources to help supply your people with (sort of) useful materials.',
        gain_lbl: '+1 Gather/s', 
        gain_detail_lbl: 'Gathers these basic materials: twigs, pebbles, and pine needles.', 
        lvl: 1 }, 
    ];
    
    for (let i = 0; i < jobsData.length; i++) {
        const jobsDataIndex = jobsData[i];
        const jobsDataUpdates = {};
        jobsDataUpdates.first_line_div_id = jobsDataIndex.id + '_line1_div_id';
        jobsDataUpdates.toggled_details_div_id = jobsDataIndex.id + '_tog_div';
        jobsDataUpdates.button_id = jobsDataIndex.id + '_button';
        jobsDataUpdates.add_button_id = jobsDataIndex.id + '_add_button';
        jobsDataUpdates.object_count_id = jobsDataIndex.id + '_obj_cnt_id';
        jobsDataUpdates.maxed_display_id = jobsDataIndex.id + '_maxed_display';
        jobsDataUpdates.gain_id = jobsDataIndex.id + '_gain_id';
        jobsDataUpdates.gain_detail_id = jobsDataIndex.id + '_gain_detail_id';
        // costs
        jobsDataUpdates.costs_div = 'JOB_' + jobsDataIndex.id.toUpperCase() + '_costs_div';
        // costs parts
        jobsDataUpdates.costs_cnt_span = jobsDataIndex.id + '_cnt_span';
        jobsDataUpdates.costs_array_span = jobsDataIndex.id + '_costs_array';

        jobsDataUpdates.food_gain = jobsDataIndex.id + '_food_gain';
        jobsDataUpdates.type = 'job';
        jobsDataUpdates.cnt = 0;
        // Assign updates to tribeData properties
        Object.assign(jobsDataIndex, jobsDataUpdates);
    }
    
    return jobsData;
}

export function init_tribeData() {

    const tribeData = [
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
        tribeDataUpdates.object_count_id = tribeDataIndex.id + '_obj_cnt_id';
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
        { id: 'twigs', costs: { 'twigs': 20, 'pebbles': 10 }, type: 'upgrade' }, 
        { id: 'pebbles', costs: { 'twigs': 10, 'pebbles': 20 }, type: 'upgrade' }, 
        { id: 'pine_needles', costs: { 'twigs': 10, 'pebbles': 10, 'pine_needles': 10 }, type: 'upgrade' },  
        { id: 'sticks', costs: { 'sticks': 20, 'stones': 10 }, type: 'upgrade' }, 
        { id: 'stones', costs: { 'sticks': 10, 'stones': 20 }, type: 'upgrade' }, 
        { id: 'leaves', costs: { 'sticks': 10, 'stones': 10, 'leaves': 10 }, type: 'upgrade' },  
        { id: 'logs', costs: { 'logs': 20, 'rocks': 10 }, type: 'upgrade' }, 
        { id: 'rocks', costs: { 'rocks': 20, 'logs': 10 }, type: 'upgrade' }, 
        { id: 'brush', costs: { 'logs': 10, 'rocks': 10, 'brush': 10 }, type: 'upgrade' }, 
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

export function init_objectElements() {
    
    // NOTES
    // .eid = created element (.id)
    // (for first 3) .parent = objectType + ___ 

    // temporary to skip errors
    let object = [ { cnt: null, type: 'none' } ];
    
    const objectElements = [
        { id: '_section', element: 'div', parentID: '_sect_id', style: null, className: null, inner: null }, 
        { id: '_container', element: 'div', parentID: '_section', style: null, className: null, inner: null }, 
        { id: 'first_line_div', element: 'div', parentID: '_container', style: null, className: null, inner: null }, 
        { id: 'toggled_details_div', element: 'div', parentID: '_container', style: 'no_display', className: null, inner: null }, 
        { id: 'button', element: 'span', parentID: 'first_line_div', style: null, className: null, inner: `<hr class="divider" width=30% align="left"><span id="${object.button}">[ + ] <span class="button_orange">${object.title}</span></span> ` }, 
        // BUTTON ACTION HERE 'toggleButton'
        { id: 'object_count', element: 'span', parentID: 'first_line_div', style: null, className: 'button_orange', inner: `${object.cnt} ` }, 
        // HIDE IF = 1
        { id: 'add_button', element: 'span', parentID: 'first_line_div', style: null, className: 'ltred', inner: `${object.type}.toUpperCase()` }, // '[ TYPE ]'
        { id: 'add_button_maxed_display', element: 'span', parentID: 'first_line_div', style: null, className: null, inner: null }, 
        { id: 'gain_lbl', element: 'div', parentID: 'toggled_details_div', style: null, className: 'ltgreentxt', inner: '+20% Gather Rate' }, 
        { id: 'gain_detail', element: 'div', parentID: 'toggled_details_div', style: null, className: 'light_small', inner: `Next: +${object.gather_increase} ${object.lbl}.toLowerCase()` }, 
        { id: 'description', element: 'div', parentID: 'toggled_details_div', style: 'maxWidth60', className: null, inner: `${object.desc}` }, 
        { id: 'costs_lbl', element: 'div', parentID: 'toggled_details_div', style: null, className: null, inner: `<p class="yellowtxt">COSTS:</p>` }, 
        { id: 'costs_div', element: 'div', parentID: 'toggled_details_div', style: null, className: null, inner: null }, 
        // WIP extras
        //{ id: 'job_div', element: 'div', parent: 'toggled_details_div', style: 'no_display', className: null, inner: `<p class="yellowtxt">CIVILIAN JOB:</p>` }, 
        //{ id: 'consume_div', element: 'div', parent: 'toggled_details_div', style: 'no_display', className: null, inner: `<p class="yellowtxt">CONSUMES:</p>` }, 
    ];

/*
    // assign in main file
    let objects = 'objectName';

    objectElements.forEach(element => {
        if (element.id.startsWith('_')) {
            element.id = objects + element.id;
        }
        if (element.parentID.startsWith('_')) {
            element.parentID = objects + element.parentID;
        }
        console.log(element);
    });
*/

    return objectElements;
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
export const objectElements = init_objectElements();
