// Universal Variables
const progBar = [];
const timer = [];

// Define displayed data on page load
function init() {
  d3.json("/static/resources/EQIData.json").then((data) => {
    // Select first set of quest data (Faydwer)
    let quests = data.Quests.Faydwer;

    // create div for each quest and populate information
    for (let i = 0; i < quests.length; i++) {
      $('#data').append($("<div class='btn-icon' id='btn-icon"+(i+1)+"'><input type='image' alt='icon' id='btn-img"+(i+1)+"' src='../static/images/btn-icon"+(i+1)+".png' /></div>"));

      $('#data').append($("<div class='quest' id='quest"+(i+1)+"'></div>"));
      let qid = "#quest"+(i+1);
      $(qid).append(quests[i].Quest_Name);

      // Create timer variables for each option
      timer[i] = parseInt(quests[i].Base_Timer);
        //console.log("timer: " + i + ", " +timer[i]);

      $('#data').append($("<div width='400' class='ldBar label-center progress-bar'" +  
        "id='progress-bar"+(i+1)+"'></div>"));
      // set attributes for each progress bar
      document.getElementById("progress-bar"+(i+1)).setAttribute('data-min', 0);
      document.getElementById("progress-bar"+(i+1)).setAttribute('data-max', timer[i]);
      document.getElementById("progress-bar"+(i+1)).setAttribute('data-preset', 'energy');
      document.getElementById("progress-bar"+(i+1)).setAttribute('data-fill-background', 'lightgrey');
      document.getElementById("progress-bar"+(i+1)).setAttribute('data-aspect-ratio', 'none');
      document.getElementById("progress-bar"+(i+1)).setAttribute('data-precision', 0.1);
      document.getElementById("progress-bar"+(i+1)).setAttribute('data-transition-in', timer[i]);
      document.getElementById("progress-bar"+(i+1)).setAttribute('data-duration', timer[i]);

      // Create progBar variables for each option
      progBar[i] = new ldBar("#progress-bar"+(i+1));
        //console.log("progBar: " + i + ", " +timer[i]);

      $('#data').append($("<div class='flavor' id='flavor"+(i+1)+"'></div>"));
      let did = "#flavor"+(i+1);
      $(did).append(quests[i].Description);

      $('#data').append($("<div class='empty-div' id='empty-div'><br/></div>"));
  };

  //Object.entries(progBar).forEach(keyValuePair => {console.log("progBar: ",...keyValuePair)});

  });
};

// Initialize page
init();


// Listen for click, to display progress bar
$(document).on('click', 'input[type="image"]', function() {
  let L = d3.select(this).attr('id');
    //console.log("L: " + L);
  let val = parseInt(L.charAt(L.length-1))-1;
  let index = parseInt(L.charAt(L.length-1));
    //console.log("val: " + val);

  document.getElementById("progress-bar"+index).setAttribute('data-max', timer[val]);
  progBar[val].set(0, true);
  progBar[val].set(timer[val], true);

  // Reset the timer
  document.getElementById("progress-bar"+index).setAttribute('data-max', 0);
});
