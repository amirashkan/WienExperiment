/*
    This page is part of PsychScript
    Copyright (C) 2013 Eoin Travers etravers01@qub.ac.uk.

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/


// Functions
// ---------------------------------------------------------------------
// Visuals
function show_text(text) {
	document.getElementById('txtExperiment').innerHTML = text;
};
function show_above(text) {
	document.getElementById('txtAboveExperiment').innerHTML = text;
};
function show_below(text) {
	document.getElementById('txtBelowExperiment').innerHTML = text;
};
function show_image(locationID, src) {
	var this_image = document.getElementById(locationID)
	this_image.src = '../images/' + src;
	this_image.style.display = 'Block';
};
function hide_images(){
	document.getElementById('img1').style.display = 'None';
	document.getElementById('img2').style.display = 'None';
	document.getElementById('img3').style.display = 'None';
};
function show_fixation(duration, flash) {
    flash = flash || false
    if (flash) {
        var pause = duration / 3
        show_text('')
        setTimeout("show_text('+');", pause)
        setTimeout("show_text('');", pause*2)
    }
    else {
        show_text('+');
    };
};

// Response handling
function get_keyboard_response(keys_to_accept) {
    accepted_keys = keys_to_accept
    document.onkeydown = function(event) {
        var key = String.fromCharCode(event.keyCode)
        if(accepted_keys == undefined) {
            response = key
            log_response()
        }
        else {
            var key //= String.fromCharCode(event.keyCode)
            if (accepted_keys.indexOf(key) != -1) {
                response = key
                log_response()
                //return response
            }
            else if (accepted_keys.indexOf(key.toLowerCase()) != -1) {
                // In case acccepted_keys were given in lowercase.
                response = key
                log_response()
                //return response
            };
        };
    };
};

function activate_response_buttons(list_of_button_ids) {
    for (var i=0; i < list_of_button_ids.length; i++)  {
        var button = document.getElementById(list_of_button_ids[i]);
        console.log(i+button)
        button.onclick = function(){
            response = this.innerHTML
            log_response();
        };
    };
};

function deactivate_response_buttons(list_of_button_ids) {
    for (var i=0; i < list_of_button_ids.length; i++)  {
        var button_id = list_of_button_ids[i]
        document.getElementById(button_id).onclick = function(){};
    };
};


// Experiment logic
function begin_experiment() {
	trial_stage0(trial_number)
};

function end_experiment() {
	document.getElementById('divExperiment').style.display = "None";
	document.getElementById('divDebrief').style.display = "Inline";
};

// Logging
function check_accuracy() {
    var codes_index = list_of_codes.indexOf(code);
    var correct_response = correct_responses[codes_index]
    console.log('Correct')
    console.log(correct_response)
    console.log('Given')
    console.log(response)
    if (response == correct_response) {
        return true
    }
    else {
        return false
    };
};

function start_experiment() {
    trial_number++;
    stage_name = 'trial'+trial_number;
    document.getElementById('divExperiment').style.display = 'Inline';
    // generate stimuli order
    random_array = generate_random_list(anagrams[0].length);
    serializedRandArr = JSON.stringify(random_array);
    logging_box_ids = ['vpnumberBox1','arrayBox'];
    variables_to_log= ['vpnumber','serializedRandArr'];
    log_response('../save_randomarrays.php','#frmRandomArr');
    // fill in stimuli
    load_stimuli();
    // save begin time
    stage_time = Date.now();
    // set timer to 0 and start it
    exptimer.reset();
}

function load_stimuli()
{
    // load 
    for (var i=0; i<8; i++) {
        // save stimuli for this round
        current_stimuli[i] = anagrams[choosenCategory - 1][random_array[8 * (trial_number-1) + i]];
        current_solutions[i] = solutions[choosenCategory - 1][random_array[8 * (trial_number-1) + i]];
    }

    // write into table
    for (var i=0; i<8; i++) {
        var selector = '#tdexp' + i;
        var selector2 = 'exp' + i;
        // write stimuli at random place 
        $(selector).text(current_stimuli[i]);
    }

    // present progress bar
    if (choosenTreatment < 2) 
        $("#progress").attr("src","../images/2go"+trial_number+"Blocks.jpg");
    else if(choosenTreatment >= 2)
        $("#progress").attr("src","../images/2date"+trial_number+"Blocks.jpg");
}


function log_response(data_address, whichform) {
    // reaction time is time since presentation of current stage 
    rt = Date.now() - stage_time;
    // If they exit, clear intervals and timeouts.
    try {clearInterval(tracking_interval);} catch(err){};
    try {clearTimeout(response_timeout);} catch(err){};

    for (var i=0; i < variables_to_log.length; i++) {
        var logging_box_id = logging_box_ids[i];
        var variable_to_log = variables_to_log[i];
        document.getElementById(logging_box_id).value = window[variable_to_log]
    };
    send_data(data_address, whichform);
    // display next trial after a delay
    // setTimeout(function(){next_trial();}, feedback_delay)
};

function give_feedback() {
    console.log('Error: Blank feedback used')
    // This is the default function, which does nothing.
    // Override this to give feedback
};

function next_trial(){
    if (trial_number < anagrams.length-1) {
        trial_number++
        trial_stage0(trial_number)
    }
    else {
        end_experiment();
    };
};

// POSTs data from 'wichform' to the given 'address'
function send_data(address, whichform){ 
    $.ajax({
	    type: "POST",
	    url: address,
        // serializes the form's elements.
	    data: $(whichform).serialize(), 
	    success: function(data)
	    {
            subject_nr = data
            console.log('data sent')
	    }
    });
};
		
// Other functions
function shuffle(array){ //Shuffle an array
    //+ Jonas Raoni Soares Silva
    //@ http://jsfromhell.com/array/shuffle [v1.0]
    for(var j, x, i = array.length; i; j = Math.floor(Math.random() * i), x = array[--i], array[i] = array[j], array[j] = x);
    return array;
};

function range(start, end) { // Creates range of numbers from start to end (similar to Python)
    var ar = [];
    for (var i = start; i < end; i++) {
        ar.push(i);
    };
    return ar;
};

function generate_random_list(length){
    return shuffle(range(0, length));
};

if (!Array.prototype.indexOf) { // Compatibility fix for IE. See http://stackoverflow.com/questions/143847/best-way-to-find-an-item-in-a-javascript-array#144172
    Array.prototype.indexOf = function (obj, fromIndex) {
        if (fromIndex == null) {
            fromIndex = 0;
        } else if (fromIndex < 0) {
            fromIndex = Math.max(0, this.length + fromIndex);
        }
        for (var i = fromIndex, j = this.length; i < j; i++) {
            if (this[i] === obj)
                return i;
        }
        return -1;
    };
}

function preload_images(image_names, directory) {
	var image_array = new Array();
	for (var i = 0; i < image_names.length; i++) {
		var img = new Image()
		img.src = directory + image_names[i]
		image_array.push(img)
	};
	return image_array;
};

function create_logging_form(formID, variables_list) {
    var form = document.getElementById(formID);
    for(var i=0; i < variables_list.length; i++){
        var variable = variables_list[i]
        var label = document.createTextNode(variable);
        var inp = document.createElement("input");
        inp.setAttribute('id', variable+'Box');
        inp.setAttribute('name', variable+'Out');
        var line = document.createElement('br');
        form.appendChild(label);
        form.appendChild(inp);
        form.appendChild(line);
    };
};
