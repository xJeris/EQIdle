// Universal Variables

    // Hold individual base timer values for quests
    const timer = [];

    // Base time for progress bar
    let base = 0;

    // Modifier applied to the base time
    // e.g. 2x as fast would be a modifier of 0.5
    let modifier = 1;

function getJSONData() {
    d3.json("/static/resources/EQIData.json").then((data) => {
      // Select first set of quest data (Faydwer)
      let quest_list = data.Quests.Faydwer;

      for (let i = 0; i < quest_list.length; i++) {
        // Get quest names
        let qid = "#quest_name"+(i+1);
        $(qid).append(quest_list[i].Quest_Name);
            //console.log(qid);

        // Get flavor text
        let did = "#flavor"+(i+1);
        $(did).append(quest_list[i].Description);

        // set base timer value as integer
        timer[i+1] = parseInt(quest_list[i].Base_Timer);

        // Display time on progress bar
        let displayDuration = (timer[i+1] * modifier);
        $("faydwer"+(i+1)) > $('#pb_inner'+(i+1)).append("&nbsp;"+displayDuration+"s");
        };
    });
};

// Create the progress bar
// If the page has loaded we can do this function
$(document).ready(function() {
    $outer = $("#pb_outer");

    $(document).on('click', 'input[type="image"]', function() {
        let L = d3.select(this).attr('id');

        //let val = parseInt(L.charAt(L.length-1))-1;
        let index = parseInt(L.charAt(L.length-1));
        
        // Creates unique instance of the progress bar
        $outer = $("#pb_outer"+index);

        // Get base time from JSON file
        base = timer[index];

        // Set duration of animation. Multiply by 1000 to get seconds
        let duration = (base * modifier) * 1000;

        $outer.click(function() {
            if ( $("#pb_inner"+index).width() > 0 ) {
                // do nothing until animation is finished
            }
            else {
                // Run animation
                $("faydwer"+index) > $("#pb_inner"+index)
                    .stop()
                    .css({ width: 0 })
                    .animate({ width: "100%" }, duration, "linear", function() { 
                        // reset progress bar to 0
                        $(this).css({ width: 0 });
                    });
            };
        });

        $outer.trigger("click");
    });

});

// Do this on page load
function init() {
    getJSONData();
};

// Initialize page
init();
