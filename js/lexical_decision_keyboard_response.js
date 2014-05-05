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
var choosenTreatment
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

        messages: {
            q1: "",
            q2: "",
            q3: "",
            q4: "",
            q5: "",
            q6: "",
            q7: ""
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

        messages: {
            q1: "",
            q2: "",
            q3: "",
            q4: "",
            q5: "",
            q6: "",
            q7: ""
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

        messages: {
            q1: "",
            q2: "",
            q3: "",
            q4: "",
            q5: "",
            q6: "",
            q7: ""
        }, 

        highlight: function(element, errorClass){
            document.getElementById('txtBelowQuestionnaire3').innerHTML = 'Bitte markieren Sie eine Antwort zu jeder Frage';
        }
        });

    $('#frmIntrinsic').validate({
        rules: {
            rdIntrinsic:{ required:true}
        },

        messages: {
            rdIntrinsic: ""
        }, 

        highlight: function(element, errorClass){
            document.getElementById('txtBelowIntrinsic').innerHTML = 'Bitte markieren Sie eine Antwort';
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
            choosenTreatment = $('input[name=rdTreatment]:checked', '#frmTreatment').val()
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
        },
        false);
var isExamples = true;
document.getElementById("btnExamples").addEventListener("click", 
        function() {
            if (isExamples)
            {
                isExamples = false;
                document.getElementById('txtInExamples').style.display = 'none';
                document.getElementById('txtAboveExamples').style.display = 'none';
                document.getElementById('frmExamples').style.display = 'inline';
            }
            else if ($('#example1Box').val().toUpperCase() == 'LION' &&
                $('#example2Box').val().toUpperCase() == 'BEAR' &&
                $('#example3Box').val().toUpperCase() == 'PUMA') {
                console.log('All answers are correct');
                // and the party goes on...
                document.getElementById('divExamples').style.display = 'None';
                document.getElementById('divQuestionnaire').style.display = 'Inline';
            }
            else 
                console.log('these are not the right answers');
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
                document.getElementById('divInstructions2').style.display = 'Inline';
            }
        },
        false);
document.getElementById("btnInstructions2").addEventListener("click", 
        function() {
            document.getElementById('divInstructions2').style.display = 'None';
            // first two treatments are 2go
            if (choosenTreatment > 2) 
                document.getElementById('divToDate').style.display = 'Inline';
            else 
                document.getElementById('divToGo').style.display = 'Inline';
        },
        false);
document.getElementById("btnIntrinsic").addEventListener("click", 
        function() {
            if($('#frmIntrinsic').valid()) {
                document.getElementById('divIntrinsic').style.display = 'None';
                $('#divPresentationHolderIntrinsic').text('Intrinsic Choice: '.concat(choice));
                document.getElementById('divPresentationIntrinsic').style.display = 'Inline';
            }
        },
        false);
document.getElementById("btnExtrinsic").addEventListener("click", 
        function() {
            document.getElementById('divExtrinsic').style.display = 'None';
            var randomExtrinsic = Math.ceil(Math.random()*3);
            console.log("choosen number for extrinsic: ".concat(randomExtrinsic));
            // present randomly choosen treatment
            if (randomExtrinsic < 1/3) 
                document.getElementById('divPresentation').style.display = 'Inline';
            else if (randomExtrinsic >= 1/3 && randomExtrinsic < 2/3)
                document.getElementById('divPresentation2').style.display = 'Inline';
            else
                document.getElementById('divPresentation3').style.display = 'Inline';
        },
        false);
document.getElementById("btnPresentation").addEventListener("click", 
        function() {
            document.getElementById('divPresentation').style.display = 'None';
            document.getElementById('divExperiment').style.display = 'inline';
        },
        false);
document.getElementById("btnPresentation2").addEventListener("click", 
        function() {
            document.getElementById('divPresentation2').style.display = 'None';
            document.getElementById('divExperiment').style.display = 'inline';
        },
        false);
document.getElementById("btnPresentation3").addEventListener("click", 
        function() {
            document.getElementById('divPresentation3').style.display = 'None';
            document.getElementById('divExperiment').style.display = 'inline';
        },
        false);
document.getElementById("btnPresentationIntrinsic").addEventListener("click", 
        function() {
            document.getElementById('divPresentationIntrinsic').style.display = 'None';
            document.getElementById('divExperiment').style.display = 'inline';
        },
        false);
document.getElementById("btnToGo").addEventListener("click", 
        function() {
            document.getElementById('divToGo').style.display = 'None';
            if (treatment == 1 || treatment == 3) 
                document.getElementById('divIntrinsic').style.display = 'Inline';
            else if(treatment == 0 || treatment == 2)
                document.getElementById('divExtrinsic').style.display = 'Inline';
        },
        false);
document.getElementById("btnToDate").addEventListener("click", 
        function() {
            document.getElementById('divToDate').style.display = 'None';
            if (treatment == 1 || treatment == 3) 
                document.getElementById('divIntrinsic').style.display = 'Inline';
            else if(treatment == 0 || treatment == 2)
                document.getElementById('divExtrinsic').style.display = 'Inline';
        },
        false);
function start_experiment() {
    start_experiment();
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
            $('#tdexp1').replaceWith(anagrams[0][trial_number]);
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
