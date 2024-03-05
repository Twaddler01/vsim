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
        resourcesIndex.cnt = 36;
        resourcesIndex.max = 500;
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
        { id: 'twigs', costs: { 'Twigs': 20, 'Pebbles': 10 }, type: 'resource' }, 
        { id: 'pebbles', costs: { 'Twigs': 10, 'Pebbles': 20 }, type: 'resource' }, 
        { id: 'pine_needles', costs: { 'Twigs': 10, 'Pebbles': 10, 'Pine Needles': 10 }, type: 'resource' }, 
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
            upgradeIndex.id = linkedResource.id + '_upgrade';
            upgradeIndex.lbl = linkedResource.lbl;
        }
        upgradeUpdates.first_line_div_id = upgradeIndex.id + '_first_line_div';
        upgradeUpdates.toggled_details_div = upgradeIndex.id + '_details';
        upgradeUpdates.costs_div = upgradeIndex.id + '_costs_div';
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
        upgradeUpdates.print_costs = '';
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
        costs: { 'Twigs': 500, 'Pebbles': 100 }, 
        title: 'Primitive Shelter',
        desc: '...A basic shelter, providing minimal protection from the elements.<br>...Provides a home for 1 tribe member.',
        gain_lbl: '+1 Tribe Member', 
        gain_detail_lbl: 'Given a job, serves as a gatherer or a hunter.'
        }, 
        { id: 'primitive_shelter_building2', 
        costs: { 'Pebbles': 500, 'Sticks': 100 }, 
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
        buildingUpdates.costs_div = buildingIndex.id + '_costs_div';
        buildingUpdates.object_count_id = buildingIndex.id + '_object_count_id';
        buildingUpdates.gain_id = buildingIndex.id + '_gain';
        buildingUpdates.gain_detail_id = buildingIndex.id + '_gain_detail';
        buildingUpdates.button = buildingIndex.id + '_button';
        buildingUpdates.add_button = buildingIndex.id + '_add_button';
        // static
        //buildingUpdates.title = '_title_';
        buildingUpdates.cnt = 0;
        buildingUpdates.gather_increase = 1.2;
        buildingUpdates.cost_creep = 1.4;
        // static
        //buildingUpdates.desc = '_desc_';
        buildingUpdates.job = null;
        buildingUpdates.consume = null;
        buildingUpdates.parentID = null;
        buildingUpdates.maxed = false;
        buildingUpdates.ResCnt = buildingIndex.id + '_ResCnt';
        buildingUpdates.type = 'building';
        // Assign updates to resourceslIndex properties
        Object.assign(buildingIndex, buildingUpdates);
    }
    
    return buildingData;
}

export function init_tribeData() {

    const tribeData = [
        { id: 'available_members', lbl: '-- Available Members:&nbsp;', cnt: 0, type: 'special' },
        { id: 'tribe_leader', lbl: 'Tribe Leaders:&nbsp;', cnt: 1, type: 'special', food_gain: 0.2, food_gain_eid: 'food_gain_eid' },
        { id: 'gatherer', lbl: 'Gatherers:&nbsp;', cnt: 0, type: 'job' },
        { id: 'hunter', lbl: 'Hunters:&nbsp;', cnt: 0, type: 'job' },
        { id: 'total_population', lbl: 'Total Population:&nbsp;', cnt: 0, type: 'total' },
    ];
    
    // added: eid
    for (let i = 0; i < tribeData.length; i++) {
        const tribeDataIndex = tribeData[i];
        const tribeDataUpdates = {};
        tribeDataUpdates.eid = tribeDataIndex.id + '_eid';
        // Assign updates to tribeData properties
        Object.assign(tribeDataIndex, tribeDataUpdates);
    }
    
    return tribeData;
}

export function init_foodSources() {

    const foodSources = [
        { id: 'berries', lbl: 'Berries', type: 'plant', multiplier: 1.0, cnt: 0 },
        { id: 'mushroom', lbl: 'mushroom', type: 'plant', multiplier: 1.1, cnt: 0 },
        { id: 'wild_lettuce', lbl: 'Wild Lettuce', type: 'plant', multiplier: 0.8, cnt: 0 },
        { id: 'squirrel', lbl: 'Squirrel', type: 'meat', multiplier: 1.3, cnt: 0 },
        { id: 'deer', lbl: 'Deer', type: 'meat', multiplier: 1.5, cnt: 0 },
        { id: 'sheep', lbl: 'Sheep', type: 'meat', multiplier: 1.5, cnt: 0 },
        { id: 'wild_boar', lbl: 'Wild Boar', type: 'meat', multiplier: 2.0, cnt: 0 },
    ];
    
    // added: spoil
    for (let i = 0; i < foodSources.length; i++) {
        const foodSourcesIndex = foodSources[i];
        const foodSourcesUpdates = {};
        if (foodSourcesIndex.type === 'plant') {
            foodSourcesUpdates.spoil = -0.2;
        }
        if (foodSourcesIndex.type === 'meat') {
            foodSourcesUpdates.spoil = -0.4;
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

export const resourcesData = init_resourcesData();
export const upgradeData = init_upgradeData();
export const buildingData = init_buildingData();
export const tribeData = init_tribeData();
export const foodSources = init_foodSources();
export const foodResource = init_foodResource();
export const goalsData = init_goalsData();
export const objectiveData = init_objectiveData();
