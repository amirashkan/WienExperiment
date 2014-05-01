// Inter Trial Interval
var ITI = 500 
var number_of_trials = 9

// pages to send results to
var user_data_address = '../save_demographic.php' 
var data_address = '../save_data.php' 

// hidden box with forms which gets filled with data
var logging_box_ids = new Array('paradigmBox', 'timeBox', 'subjectBox', 'trialBox', 'stimuliBox', 'probeBox', 'codeBox', 'responseBox', 'rtBox');
var variables_to_log = new Array('paradigm', 'experiment_start_time', 'subject_nr', 'trial_number', 'stimuli_number', 'probe', 'code', 'response', 'rt');

// DEBUG stuff
var debug_mode = false // Set as true to show extra information, false to run experiment normally.
var error_feedback = false

// variables to log
var paradigm = 'press_key';
var experiment_start_time = Date();
var subject_nr 
var trial_number = 0;
var stimuli_number
var anagram
var solution
var response
var rt
var treatment

// Do not change
var random_order = generate_random_list(number_of_trials);
//var stim_number = random_order[trial_number];

// Experiment logic - Adjust this as needed
if(debug_mode){
    document.getElementById('hidden_div').style.display = 'Inline'
};

$(document).ready(function () {
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

    //set a two digit mask to the birthdaybox so that the user is required to write a two digit number 
    $("#birthdayBox").mask("99");
    $("#example1Box").mask("aaaa");
    $("#example2Box").mask("aaaa");
    $("#example3Box").mask("aaaa");
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
            treatment = $('input[name=rdTreatment]:checked', '#frmTreatment').val()
            if( treatment == undefined)
            {
                console.log('Please check one of the treatments');
            }
            else {
                console.log('everything fine, choose -> '.concat(treatment));
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
        },
        false);
document.getElementById("btnExamples").addEventListener("click", 
        function() {
            // TODO: show user if she makes a mistake
            if ($('#example1Box').val().toUpperCase() == 'LION' &&
                $('#example2Box').val().toUpperCase() == 'BEAR' &&
                $('#example3Box').val().toUpperCase() == 'PUMA') {
                console.log('All answers are correct');
                // and the party goes on...
                document.getElementById('divExamples').style.display = 'None';
                document.getElementById('divQuestionnaire').style.display = 'Inline';
            }
            else {
                console.log(document.getElementById('example1Box').value.concat(' is not the right answer'));
            }
        },
        false);
document.getElementById("btnQuestionnaire").addEventListener("click", 
        function() {
            // TODO: save all Answers of Radio Buttons 
            var q1 = $('input[name=q1]:checked', '#frmQuestionnaire').val();
            // ... for ...; sendData()...;
            // TODO: replace questions OR make some other questionaires
            // ...  frmQuestionaire.question1 = 'some new question' oder so...
            
            // show next stage
            document.getElementById('divQuestionnaire').style.display = 'None';
            document.getElementById('divQuestionnaire2').style.display = 'Inline';
        },
        false);
document.getElementById("btnQuestionnaire2").addEventListener("click", 
        function() {
            // TODO: save all Answers of Radio Buttons 
            var q1 = $('input[name=q1]:checked', '#frmQuestionnaire').val();
            // ... for ...; sendData()...;
            // TODO: replace questions OR make some other questionaires
            // ...  frmQuestionaire.question1 = 'some new question' oder so...
            
            // show next stage
            document.getElementById('divQuestionnaire2').style.display = 'None';
            document.getElementById('divQuestionnaire3').style.display = 'Inline';
        },
        false);
document.getElementById("btnQuestionnaire3").addEventListener("click", 
        function() {
            // TODO: save all Answers of Radio Buttons 
            var q1 = $('input[name=q1]:checked', '#frmQuestionnaire').val();
            // ... for ...; sendData()...;
            // TODO: replace questions OR make some other questionaires
            // ...  frmQuestionaire.question1 = 'some new question' oder so...
            
            // show next stage
            document.getElementById('divQuestionnaire3').style.display = 'None';
            document.getElementById('divInstructions2').style.display = 'Inline';
        },
        false);
document.getElementById("btnInstructions2").addEventListener("click", 
        function() {
            document.getElementById('divInstructions2').style.display = 'None';
            if (treatment == 1 || treatment == 3) {
                document.getElementById('divIntrinsic').style.display = 'Inline';
            }
            else if(treatment == 0 || treatment == 2) {
                document.getElementById('divExtrinsic').style.display = 'Inline';}
        },
        false);
document.getElementById("btnIntrinsic").addEventListener("click", 
        // TODO: here has to happen some magic, to select option 1,2 or 3 (keyboard/Radiobutton?)
        // nicer text + choice
        function() {
            document.getElementById('divIntrinsic').style.display = 'None';
            $('#divPresentationHolder').text('Intrinsic Choice: ');
            document.getElementById('divPresentation').style.display = 'Inline';
        },
        false);
document.getElementById("btnExtrinsic").addEventListener("click", 
        // TODO: magically (randomly) asign one of the 3 options
        // nicer text + choice
        function() {
            document.getElementById('divExtrinsic').style.display = 'None';
            $('#divPresentationHolder').text('Extrinsic Choice: ');
            document.getElementById('divPresentation').style.display = 'Inline';
        },
        false);
document.getElementById("btnPresentation").addEventListener("click", 
        // TODO: magically (randomly) asign one of the 3 options
        function() {
            document.getElementById('divPresentation').style.display = 'None';
            // TODO: use choosen decision from 0th screen
            if (true) {
                document.getElementById('divToDate').style.display = 'Inline';}
            else {
                document.getElementById('divToGo').style.display = 'Inline';}
        },
        false);
document.getElementById("btnToGo").addEventListener("click", 
        function() {
            document.getElementById('divToGo').style.display = 'None';
            document.getElementById('divInstructions3').style.display = 'Inline';
        },
        false);
document.getElementById("btnToDate").addEventListener("click", 
        function() {
            document.getElementById('divToDate').style.display = 'None';
            document.getElementById('divInstructions3').style.display = 'Inline';
        },
        false);
document.getElementById("btnInstructions3").addEventListener("click", 
        function() {
            document.getElementById('divInstructions3').style.display = 'None';
            start_experiment();
        },
        false);

function start_experiment() {
    trial_number++;
    $('#txtExperiment').text('Round '.concat(trial_number));
    document.getElementById('divExperiment').style.display = 'Inline';
}

document.getElementById("btnExperiment").addEventListener("click", 
        function() {
            trial_number++;
            if (trial_number == 4 || trial_number == 7) { 
                document.getElementById('divExperiment').style.display = 'None';
                document.getElementById('divManipulation').style.display = 'Inline'; 
            }
            else if (trial_number == 10) {
                document.getElementById('divExperiment').style.display = 'None';
                document.getElementById('divDemographic').style.display = 'Inline';
                // only in this case, we need to return
                return;
            }
            // TODO: Clear screen, and present new series of anagrams
            // update the screen anytime
            $('#txtExperiment').text('Round '.concat(trial_number));
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

    
function trial_stage0() {
    stimuli_number = random_order[trial_number];
    anagram = anagrams[stimuli_number];
    solution = solutions[stimuli_number];
    show_fixation(ITI);
    setTimeout("trial_stage1()", ITI);
};

function trial_stage1() {
    start_time = (Date.now());
    show_text(anagram);
    get_keyboard_response('YN');
};
