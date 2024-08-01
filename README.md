# vsim
# Description
This is going to be an incremental / simulated gather-type "village" game with an evolution eventually to space. Keeping it in JS for ease of distribution and eventual, yet simplified, mobile app development and deployment.
# Link
https://twaddler01.github.io/vsim/vsim.html
# Updates
(08-01-2024)

* Added more visual enhancements.
* Added a few working goals for progression.
* Cleaned up old code.

(07-29-2024)

* Added collapsible sections.
* Minor modifications to clear up confusion in code.
* Added KNOWLEDGE stat.
* Will make adjustments to show new resources only as they're gained.

(04-18-2014)

* Moved 'toggle buttons' to individual function(s) -- fixed an issue where when creating new object array elements, it would cause the buttons to malfunction. Added a few new objects. Layout needs some adjusting to account for deleting and creating elements of to take up less memory than simply hiding them -- which is planned for future updates. Worked on CONVERT, which hopefully makes more sense now. Level 5 altars will be a trigger for new resources, eventually to be continually updated as the civilization advances. May end up renaming project to CivSim or something similar. Eventually, ages will advance into the future, beyond tribes into more urban environments.
* Job assignments now have a status, to track those assignments and timing of 'decay' resources, such as crafted items, which use durability values over time.

(04-10-2024)

* Some visual updates added to make things look a little cleaner. Ready to start adding more elements now that most of the initial coding is done.

(04-02-2024)

* Updated quite a bit. Integrated more into functions, such as resourcesData, Organizing arrays isn't my strong suit, but it's working well enough so far. Added the ability to remove/add job assignments in jobs section. The goals section will eventually guide the player and there will be an order to objects added (not all will be available at game start). Saving the gamestate (or rather, array values, using localstorage), will be coming soon. 

(03-18-2024)

* Created a working dynamic function for all objects (upgrade, building, and jobs). Working on getting resourcesData its own function and integrating everything that requires updating to a single interval (potentially using a few if needed, but all in one place). Need individual static assignments to be integrated for each action on buildings and jobs since the bonuses given will vary.

(03-14-2024)

* Various updates. Created new object function but decided to keep it the way it is. Worked on tooltip updates and working on a function to setup object elements more effectively. Only an array so far, but temporarily commented out upgradeData to test new array to create all objects in a loop.

(03-04-2024)

* Completed data.js (array variables) imports and added functions.js for function data. Worked on tooltip, design complete, but will add functionality to all resources soon, making it more dynanic.

(03-03-2024)

* Added tooltip and food. Working on consumption but got distracted on tooltip creation to show details of gain/loss of resources. Food will decrease with time from spoiling/consumption. Lots more work to do on it still.

(03-01-2024)

* Quite a bit of progress.  Objects will be completely dynamic at first, until branching off individually. Most core code for objects done and ready to add population and other types of objects that will be coded more statically. 

(03-01-2024)

* Got data.js working, using functions for data arrays since there are many dynamic ids. This seems to be most efficient. May eventually add a functions.js to clean things up more. Working on more dynamic loops as functions to use for any type of object to reduce code redundancy. Still need to add button functionality, which is the next step. Will be working on population soon, which is going to function a bit different than upgrade or building objects.

(02-28-2024)

* Mainly working on structure and setup of primary functions. The challenge is keeping objects dynamic, which involves a lot of looping and a bit more complicated coding. Thanks be to "Chat GDP" AI for its fantastic coding assistance. Without it, I'd probably have much slower progress (and much less patience) with this type of coding.
