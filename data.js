function add_resourcesData() {

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
        resourcesIndex.max = 500;
        const updates = {};
        updates.print_resources = '<span class="ltbluetxt">' + resourcesIndex.lbl + ': ' + resourcesIndex.cnt + ' / ' + resourcesIndex.max + '</span>';
        updates.print_gather = '<span class="button_orange">[ GATHER ' + resourcesIndex.lbl.toUpperCase() + ' ]';
        updates.print_gather2 = '<span class="ltgreentxt">&nbsp;+' + resourcesIndex.gather_rate + ' ' + resourcesIndex.lbl.toUpperCase();
        updates.print_convert = '<span class="ltred">' + resourcesIndex.cnt + ' / ' + resourcesIndex.convert + ' ' + resourcesIndex.lbl + '</span>';
        updates.print_convert2 = '<span class="button_orange">&nbsp;[ CONVERT TO +1 ' + resourcesIndex.makes.toUpperCase() + ' ] </span';
        // Assign updates to resourcesIndex properties
        Object.assign(resourcesIndex, updates);
    }
    
    return resourcesData;
}

function add_upgradeData() {

    const upgradeData = [
        { id: 'twigs', costs: { 'Twigs': 20, 'Pebbles': 10 }, type: 'resource' }, 
        { id: 'pebbles', costs: { 'Twigs': 10, 'Pebbles': 20 }, type: 'resource' }, 
        { id: 'pine_needles', costs: { 'Twigs': 10, 'Pebbles': 10, 'Pine Needles': 10 }, type: 'resource' }, 
    ];
    
    const resourcesData = add_resourcesData();

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

function add_buildingData() {

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

export { add_resourcesData, add_upgradeData, add_buildingData };
