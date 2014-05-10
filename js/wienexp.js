// Inter Trial Interval
var ITI = 500 
var number_of_trials = 9

// pages to send results to
var saveData = '../save_data.php' 

// hidden box with forms which gets filled with data
var logging_box_ids = new Array();
var variables_to_log = new Array();

// DEBUG stuff
var debug_mode = false // Set as true to show extra information, false to run experiment normally.
var error_feedback = false

// variables to log
var choosenTreatment
var choosenCategory 
var current_stimuli
var current_solutions 
var random_array 
var stage_time 
var mean_time = 180;
var experiment_start_time = Date();
var p1 = 1/3;
var p2 = 1/3;
var subject_nr 
var trial_number = 0;
var stimuli_number
var anagram
var solution
var response
var rt

// Do not change
var random_order = generate_random_list(number_of_trials);
//var stim_number = random_order[trial_number];

// Experiment logic - Adjust this as needed
if(debug_mode){
    document.getElementById('hidden_div').style.display = 'Inline'
};

$(document).ready(function () {
    jQuery.validator.messages.required = "";

    // here happens some validation magic
    $('#frmDemographic').validate({
        rules: {
            birthday: { required: true },
        country: { required: true },
        mothertongue: { required: true },
        studyfield: { required: true }
        },
        // fade in and out elements that are not filled out
        highlight: function(element, errorClass) {
            $(element).fadeOut(function() {
                $(element).fadeIn();
            })},
        // give us some messages
        messages: {
            birthday: "Bitte ausfüllen",
        country: "Bitte ausfüllen",
        mothertongue: "Bitte ausfüllen",
        studyfield: "Bitte ausfüllen"
        }
    }); 

    $('#frmQuestionnaire1').validate({
        rules: {
            q1:{ required:true},
        q2:{ required:true},
        q3:{ required:true},
        q4:{ required:true},
        q5:{ required:true},
        q6:{ required:true},
        q7:{ required:true}
        },

        highlight: function(element, errorClass){
            document.getElementById('txtBelowQuestionnaire1').innerHTML = 'Bitte markieren Sie eine Antwort zu jeder Frage';
        }
    });
    $('#frmQuestionnaire2').validate({
        rules: {
            q1:{ required:true},
        q2:{ required:true},
        q3:{ required:true},
        q4:{ required:true},
        q5:{ required:true},
        q6:{ required:true},
        q7:{ required:true}
        },

        highlight: function(element, errorClass){
            document.getElementById('txtBelowQuestionnaire2').innerHTML = 'Bitte markieren Sie eine Antwort zu jeder Frage';
        }
    });

    $('#frmQuestionnaire3').validate({
        rules: {
            q1:{ required:true},
        q2:{ required:true},
        q3:{ required:true},
        q4:{ required:true},
        q5:{ required:true},
        q6:{ required:true},
        q7:{ required:true}
        },

        highlight: function(element, errorClass){
            document.getElementById('txtBelowQuestionnaire3').innerHTML = 'Bitte markieren Sie eine Antwort zu jeder Frage';
        }
    });

    // add a custom method to check examples
    jQuery.validator.addMethod("checkExamples", 
            function(value, element) {
                // retrieve element number and decrement, to get the array position
                var number = element.name.replace(/[^0-9]/g, '') - 1;
                // and return if it's the right solution
                return value.toUpperCase() == examples[number];
            },
            // display error message
            jQuery.validator.format("Bitte geben Sie die korrekte Lösung an"));


    // select all example input fields and write hans into them
    //$("[name*='example']").each( function(){ console.log($(this).val("hans"));} );
    //$( "#myinput" ).rules( "add", { minlength: 2 });
    //console.log("hier is wat los");

    $('#frmExamples').validate({
        rules: {
            example1: "checkExamples",
        example2: "checkExamples",
        example3: "checkExamples",
        example3: "checkExamples",
        example4: "checkExamples",
        example5: "checkExamples",
        example6: "checkExamples",
        example7: "checkExamples",
        example8: "checkExamples",
        example9: "checkExamples",
        example10: "checkExamples",
        example11: "checkExamples",
        example12: "checkExamples"
        }
    });


    // add a custom method to check anagrams
    jQuery.validator.addMethod("checkAnagrams", 
            function(value, element) {
                // retrieve element number and decrement, to get the position of the current element (in array notation)
                var number = parseInt(element.name.replace(/[^0-9]/g, ''));
                // find position of randomized element in current_solutions
                return value.toUpperCase() == current_solutions[random_array[number]];
            },
            // display error messages
            jQuery.validator.format("Bitte geben Sie die korrekte Lösung an"));

    $('#frmExperiment').validate({
        rules: {
            exp0: "checkAnagrams",
        exp1: "checkAnagrams",
        exp2: "checkAnagrams",
        exp3: "checkAnagrams",
        exp3: "checkAnagrams",
        exp4: "checkAnagrams",
        exp5: "checkAnagrams",
        exp6: "checkAnagrams",
        exp7: "checkAnagrams"
        }
    });

    $('#frmIntrinsic').validate({
        rules: {
            rdIntrinsic:{ required:true}
        },

        highlight: function(element, errorClass){
            document.getElementById('txtBelowIntrinsic').innerHTML = 'Bitte markieren Sie eine Antwort';
        }
    });

    //set a two digit mask to the birthdaybox so that the user is required to write a two digit number 
    $("#birthdayBox").mask("99");
    $("#toGoInput").mask("9");
    $("#toDateInput").mask("9");
    //    $("#exampleBox1").mask("aaaa");
    //    $("#exampleBox2").mask("aaaa");
    //    $("#exampleBox3").mask("aaaa");
    //    $("#exampleBox4").mask("aaaa");
    //    $("#exampleBox5").mask("aaaa");
    //    $("#exampleBox6").mask("aaaa");
    //    $("#exampleBox7").mask("aaaa");
    //    $("#exampleBox8").mask("aaaa");
    //    $("#exampleBox9").mask("aaaa");
    //    $("#exampleBox10").mask("aaaa");
    //    $("#exampleBox11").mask("aaaa");
    //    $("#exampleBox12").mask("aaaa");
});

// add event listener to buttons
document.getElementById("btnHide").addEventListener("click", 
        // clicking the button executes the following anonymus function
        function() {
            document.getElementById('hidden_div').style.display = 'None';
        },
        false)
document.getElementById("btnTreatment").addEventListener("click", 
        function() {
            choosenTreatment = $('input[name=rdTreatment]:checked', '#frmTreatment').val();
            if( choosenTreatment == undefined)
{
    console.log('Please check one of the treatments');
}
else {
    console.log('everything fine, choose -> '.concat(choosenTreatment));
    document.getElementById('divTreatment').style.display = 'None';
    document.getElementById('divInstructions').style.display = 'Inline';
}
},
false)
document.getElementById("btnEnde").addEventListener("click", 
        function() {
            if($('#frmDemographic').valid())
{
    document.getElementById('divDemographic').style.display = 'None';
    document.getElementById('divDebrief').style.display = 'Inline';
    sendData(user_data_address, "#frmDemographic")
}
},
false)
document.getElementById("btnInstructions").addEventListener("click", 
        function() {
            document.getElementById('divInstructions').style.display = 'None';
            document.getElementById('divExamples').style.display = 'Inline';
            document.getElementById('txtAboveExamples2').style.display = 'None';
        },
        false);

var isExamples = true;
document.getElementById("btnExamples").addEventListener("click", 
        function() {
            // first click reveals examples
            if (isExamples)
{
    isExamples = false;
    document.getElementById('txtInExamples').style.display = 'none';
    document.getElementById('txtAboveExamples2').style.display = 'inline';
    document.getElementById('txtAboveExamples').style.display = 'none';
    document.getElementById('frmExamples').style.display = 'inline';
}
// now it checks user input
else if ($('#frmExamples').valid())
{
    // and the party goes on...
    document.getElementById('divExamples').style.display = 'None';
    document.getElementById('divInstructions2').style.display = 'Inline';
    console.log('All answers are correct');
}
// input wasn't right
else {
    document.getElementById('txtBelowExamples').style.display = 'inline';
    document.getElementById('txtBelowExamples').innerHTML = 'Bitte vervollständigen Sie alle Beispielaufgaben richtig.';
    console.log('these are not the right answers');
}
},
    false);
document.getElementById("btnQuestionnaire").addEventListener("click", 
        function() {
            // TODO: save all Answers of Radio Buttons 
            var q1 = $('input[name=q1]:checked', '#frmQuestionnaire').val();
            // ... for ...; sendData()...;

            // show next stage
            if($('#frmQuestionnaire1').valid()) {
                document.getElementById('divQuestionnaire').style.display = 'None';
                document.getElementById('divQuestionnaire2').style.display = 'Inline';
            }
        },
        false);
document.getElementById("btnQuestionnaire2").addEventListener("click", 
        function() {
            // show next stage
            if($('#frmQuestionnaire2').valid()) {
                document.getElementById('divQuestionnaire2').style.display = 'None';
                document.getElementById('divQuestionnaire3').style.display = 'Inline';
            }
        },
        false);
document.getElementById("btnQuestionnaire3").addEventListener("click", 
        function() {
            // show next stage
            if($('#frmQuestionnaire3').valid()) {
                document.getElementById('divQuestionnaire3').style.display = 'None';
                document.getElementById('divDebrief').style.display = 'Inline';
            }
        },
        false);
document.getElementById("btnInstructions2").addEventListener("click", 
        function() {
            document.getElementById('divInstructions2').style.display = 'None';
            // first two treatments are 2go
            if (choosenTreatment > 1) 
    document.getElementById('divToDate').style.display = 'Inline';
            else 
    document.getElementById('divToGo').style.display = 'Inline';
        },
        false);
document.getElementById("btnToGo").addEventListener("click", 
        function() {
            document.getElementById('divToGo').style.display = 'None';
            if (choosenTreatment == 1 || choosenTreatment == 3) 
    document.getElementById('divIntrinsic').style.display = 'Inline';
            else if(choosenTreatment == 0 || choosenTreatment == 2)
    document.getElementById('divExtrinsic').style.display = 'Inline';
        },
        false);
document.getElementById("btnToDate").addEventListener("click", 
        function() {
            document.getElementById('divToDate').style.display = 'None';
            if (choosenTreatment == 1 || choosenTreatment == 3) 
    document.getElementById('divIntrinsic').style.display = 'Inline';
            else if(choosenTreatment == 0 || choosenTreatment == 2)
    document.getElementById('divExtrinsic').style.display = 'Inline';
        },
        false);
document.getElementById("btnIntrinsic").addEventListener("click", 
        function() {
            if($('#frmIntrinsic').valid()) {
                document.getElementById('divIntrinsic').style.display = 'None';
                choosenCategory = $('input[name=rdIntrinsic]:checked', '#frmIntrinsic').val();
                //$('#divPresentationHolderIntrinsic').text('Intrinsic choosenCategory: '.concat(choosenCategory));
                console.log('Intrinsic choosenCategory: '.concat(choosenCategory));
                document.getElementById('divPresentationIntrinsic').style.display = 'Inline';
            }
            else {
                console.log('something does not work with intrinsic');
            }
        },
        false);
document.getElementById("btnExtrinsic").addEventListener("click", 
        function() {
            document.getElementById('divExtrinsic').style.display = 'None';
            var random_extrinsic = Math.random();

            // present randomly choosen treatment
            if (random_extrinsic < p1) {
                document.getElementById('divPresentation').style.display = 'Inline';
                choosenCategory = 1;
            }
            else if (random_extrinsic >= p1 && random_extrinsic < p2) {
                document.getElementById('divPresentation2').style.display = 'Inline';
                choosenCategory = 2;
            }
            else  {
                document.getElementById('divPresentation3').style.display = 'Inline';
                choosenCategory = 3;
            }

console.log('Extrinsic choosenCategory: '.concat(choosenCategory));

        },
        false);
document.getElementById("btnPresentation").addEventListener("click", 
        function() {
            document.getElementById('divPresentation').style.display = 'None';
            start_experiment();
        },
        false);
document.getElementById("btnPresentation2").addEventListener("click", 
        function() {
            document.getElementById('divPresentation2').style.display = 'None';
            start_experiment();
        },
        false);
document.getElementById("btnPresentation3").addEventListener("click", 
        function() {
            document.getElementById('divPresentation3').style.display = 'None';
            start_experiment();
        },
        false);
document.getElementById("btnPresentationIntrinsic").addEventListener("click", 
        function() {
            document.getElementById('divPresentationIntrinsic').style.display = 'None';
            start_experiment();
        },
        false);
function start_experiment() {
    trial_number++;
    stage_time = Date.now();
    console.log('start exp with trial: ' + trial_number);
    document.getElementById('divExperiment').style.display = 'Inline';
    // generate stimuli order
    random_array = generate_random_list(8);
    // fill in stimuli
    load_stimuli();
}

function load_stimuli()
{
    // load 
    for (var i=0; i<8; i++) {
        // save stimuli for this round
        current_stimuli[i] = anagrams[choosenCategory - 1][8 * (trial_number-1) + i];
        current_solutions[i] = solutions[choosenCategory - 1][8 * (trial_number-1) + i];
    }

    // write into table
    for (var i=0; i<8; i++) {
        var selector = '#tdexp' + i;
        var selector2 = 'exp' + i;
        // write stimuli at random place 
        $(selector).text(current_stimuli[random_array[i]]);
    }

    // present progress bar
    if (choosenTreatment < 2) 
        $("#progress").attr("src","../images/2go"+trial_number+"Blocks.jpg");
    else if(choosenTreatment == 0 || choosenTreatment == 2)
        $("#progress").attr("src","../images/2date"+trial_number+"Blocks.jpg");

    // TODO: save random_array for each trial
    // ...
}

document.getElementById("btnExperiment").addEventListener("click", 
        function() {
            // if all anagrams are solved correctly or it took them longer 
            // as the meanTime of all participants of the prestudy 
            if ($('#frmExperiment').valid()/* || stage_time > mean_time*/){
                // update trial number 
                trial_number++;
                // remove all user input
                for (var i=0; i<8; i++) {
                    $('input[name=exp'+ i +']', '#frmExperiment').val('');
                }
                // TODO: save random_array for each trial
                // ...
                random_array = generate_random_list(8);
                // fill in stimuli
                load_stimuli();

                if (trial_number == 4 || trial_number == 7) { 
                    document.getElementById('divExperiment').style.display = 'None';
                    document.getElementById('divManipulation').style.display = 'Inline'; 
                }
                else if (trial_number == 10) {
                    document.getElementById('divExperiment').style.display = 'None';
                    document.getElementById('divQuestionnaire').style.display = 'Inline';
                    // only in this case, we need to return
                    return;
                }
            }
            // the input isn't correct and there is still some time left
            else {
                // indicate how many anagrams are wrong
                document.getElementById('txtBelowExperiment').style.display = 'inline';
                document.getElementById('txtBelowExperiment').innerHTML = 'Bitte vervollständigen Sie alle Aufgaben richtig.';
                console.log("input incorrect or still time left");
            }
        },
        false);

document.getElementById("btnManipulation").addEventListener("click", 
        function() {
            if ($('#cbManipulation1').prop('checked') && $('#cbManipulation2').prop('checked') &&
                $('#cbManipulation3').prop('checked') && !$('#cbManipulation4').prop('checked') &&
                !$('#cbManipulation5').prop('checked') && !$('#cbManipulation6').prop('checked') &&
                !$('#cbManipulation7').prop('checked') && !$('#cbManipulation8').prop('checked') &&
                !$('#cbManipulation9').prop('checked') )
            {
                // TODO: save manipulation test
            }
            document.getElementById('divManipulation').style.display = 'None';
            document.getElementById('divExperiment').style.display = 'Inline';
        },
        false);
