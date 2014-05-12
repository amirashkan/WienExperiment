// Inter Trial Interval
var ITI = 500 
var number_of_trials = 9

// pages to send results to
var save_data = '../save_data.php' 

// DEBUG stuff
var debug_mode = false // Set as true to show extra information, false to run experiment normally.

// variables to log
var vpnumber 
var trial_number = 0;
var choosenTreatment
var choosenCategory 
var current_stimuli = []
var current_solutions = []
var random_array = []
var manipulation
var missedanagrams
var q1 
var q2 
var q3 
var q4 
var q5 
var q6 
var q7 
var q8 
// time vars
var rt
var stage_time 
var stage_name
var avg_time = 180*1000;
var exptimer = $.timer(function() {
    console.log("the time is over");
	document.getElementById("txtBelowExperiment2").style.display = 'inline';
    exptimer.stop();
});
exptimer.set({ time : avg_time, autostart : false });
// probabilities of the extrinsic decisions
var p1 = 1/3;
var p2 = 1/3;

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
        example11: "checkExamples"
        }
    });


    // add a custom method to check anagrams
    jQuery.validator.addMethod("checkAnagrams", 
            function(value, element) {
                // retrieve element number and decrement, to get the position of the current element (in array notation)
                var number = parseInt(element.name.replace(/[^0-9]/g, ''));
                // find position of randomized element in current_solutions
                return value.toUpperCase() == current_solutions[number];
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
        },
        invalidHandler: function(event, validator) {
            // 'this' refers to the form
            missedanagrams = validator.numberOfInvalids();
            if (missedanagrams) {
                console.log("Anagramme, die noch nicht gelöst wurden: "+missedanagrams);
            } else {
                console.log("Alle Anagramme gelöst");
            }
        }
    });

    $('#frmToDate').validate({
        rules: {
            toDateInput:{ required:true}
        },

        highlight: function(element, errorClass){
            document.getElementById('txtBelowToDate').innerHTML = 'Bitte tragen Sie die richtige Antwort ein';
        }
    });
    $('#frmToGo').validate({
        rules: {
            toGoInput:{ required:true}
        },

        highlight: function(element, errorClass){
            document.getElementById('txtBelowToGo').innerHTML = 'Bitte tragen Sie die richtige Antwort ein';
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
    $("#txVPN").mask("999");
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
            vpnumber = document.getElementById('txVPN').value;
            if( choosenTreatment == undefined || vpnumber == '')
{
    document.getElementById('txtBelowTreatment').style.color = 'red';
    document.getElementById('txtBelowTreatment').innerHTML ='Bitte wählen Sie ein Treatment aus UND geben Sie eine VP Nummer ein';
    console.log('Please check one of the treatments');
}
else {
    console.log('everything fine, choose -> '.concat(choosenTreatment));
    document.getElementById('divTreatment').style.display = 'None';
    document.getElementById('divInstructions').style.display = 'Inline';
    // create data for new vp
    stage_name = 'choosenTreatment';
    logging_box_ids = ['vpnumberBox','choosentreatmentBox'];
    variables_to_log= ['vpnumber','choosenTreatment'];
    log_response('../save_user_data.php', frmUserData);
}
},
false)
document.getElementById("btnEnde").addEventListener("click", 
        function() {
            if($('#frmDemographic').valid())
{
    document.getElementById('divDemographic').style.display = 'None';
    document.getElementById('divDebrief').style.display = 'Inline';
    stage_name = 'choosenTreatment';
    logging_box_ids = ['vpnumberBox','choosentreatmentBox'];
    variables_to_log= ['vpnumber','choosenTreatment'];
    log_response('../save_demographic.php', frmDemo);
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
    // presentation of examples begins now
    stage_time = Date.now();
}
// now it checks user input
else if ($('#frmExamples').valid())
{
    // and the party goes on...
    document.getElementById('divExamples').style.display = 'None';
    document.getElementById('divInstructions2').style.display = 'Inline';
    console.log('All answers are correct');
    // log data for example stage
    stage_name='examples';
    logging_box_ids = ['vpnumberBox3','trialBox3','rtBox'];
    variables_to_log= ['vpnumber','stage_name','rt'];
    log_response('../save_response.php',frmResponses);
}
// input wasn't right
else {
    document.getElementById('txtBelowExamples').style.display = 'inline';
    document.getElementById('txtBelowExamples').innerHTML = 'Bitte vervollständigen Sie alle Beispielaufgaben richtig.';
    console.log('these are not the right answers');
}
},
    false);

function getRadioValue(i,j){
   return $('input[name=q'+i+']:checked', '#frmQuestionnaire'+j).val(); 
}
document.getElementById("btnQuestionnaire").addEventListener("click", 
        function() {
            // save all Answers of Radio Buttons 
            //for (var i=1; i<9; i++)
                //quest1[i] = quest1 + ',' + getRadioValue(i,1);
            q1 = getRadioValue(1,1);
            q2 = getRadioValue(2,1);
            q3 = getRadioValue(3,1);
            q4 = getRadioValue(4,1);
            q5 = getRadioValue(5,1);
            q6 = getRadioValue(6,1);
            q7 = getRadioValue(7,1);
            q8 = getRadioValue(8,1);
            // show next stage
            if($('#frmQuestionnaire1').valid()) {
                // save Answers to questionnaire
                stage_name='quest1';
                logging_box_ids = ['vpnumberBox4','questBox','q1Box','q2Box','q3Box','q4Box','q5Box','q6Box','q7Box','q8Box'];
                variables_to_log= ['vpnumber','stage_name','q1','q2','q3','q4','q5','q6','q7','q8'];
                log_response('../save_quest.php',frmQuest);
                document.getElementById('divQuestionnaire').style.display = 'None';
                document.getElementById('divQuestionnaire2').style.display = 'Inline';
            }
        },
        false);
document.getElementById("btnQuestionnaire2").addEventListener("click", 
        function() {
            // save all Answers of Radio Buttons 
            q1 = getRadioValue(1,2);
            q2 = getRadioValue(2,2);
            q3 = getRadioValue(3,2);
            q4 = getRadioValue(4,2);
            q5 = getRadioValue(5,2);
            q6 = getRadioValue(6,2);
            q7 = getRadioValue(7,2);
            q8 = getRadioValue(8,2);
            
            
            // show next stage
            if($('#frmQuestionnaire2').valid()) {
                // save Answers to questionnaire
                stage_name='quest2';
                logging_box_ids = ['vpnumberBox4','questBox','q1Box','q2Box','q3Box','q4Box','q5Box','q6Box','q7Box','q8Box'];
                variables_to_log= ['vpnumber','stage_name','q1','q2','q3','q4','q5','q6','q7','q8'];
                log_response('../save_quest.php',frmQuest);
                document.getElementById('divQuestionnaire2').style.display = 'None';
                document.getElementById('divQuestionnaire3').style.display = 'Inline';
            }
        },
        false);
document.getElementById("btnQuestionnaire3").addEventListener("click", 
        function() {
            // save all Answers of Radio Buttons 
            q1 = getRadioValue(1,1);
            q2 = getRadioValue(2,1);
            q3 = getRadioValue(3,1);
            q4 = getRadioValue(4,1);
            q5 = getRadioValue(5,1);
            q6 = getRadioValue(6,1);
            q7 = getRadioValue(7,1);
            q8 = getRadioValue(8,1);
 
            // show next stage
            if($('#frmQuestionnaire3').valid()) {
                // save Answers to questionnaire
                stage_name='quest3';
                logging_box_ids = ['vpnumberBox4','questBox','q1Box','q2Box','q3Box','q4Box','q5Box','q6Box','q7Box','q8Box'];
                variables_to_log= ['vpnumber','stage_name','q1','q2','q3','q4','q5','q6','q7','q8'];
                log_response('../save_quest.php',frmQuest);
                document.getElementById('divQuestionnaire3').style.display = 'None';
                document.getElementById('divDemographic').style.display = 'Inline';
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
    
            if($('#frmToGo').valid() && document.getElementById('toGoInput').value == 5 ) {
                document.getElementById('divToGo').style.display = 'None';
                if (choosenTreatment == 1 || choosenTreatment == 3) 
                    document.getElementById('divIntrinsic').style.display = 'Inline';
                else if(choosenTreatment == 0 || choosenTreatment == 2)
                    document.getElementById('divExtrinsic').style.display = 'Inline';
                // log user understandig of toGo
                //log_response(save_data);
            }
        },
        false);
document.getElementById("btnToDate").addEventListener("click", 
        function() {
            if($('#frmToDate').valid() && document.getElementById('toDateInput').value == 6 ) {
                document.getElementById('divToDate').style.display = 'None';
                if (choosenTreatment == 1 || choosenTreatment == 3) 
                    document.getElementById('divIntrinsic').style.display = 'Inline';
                else if(choosenTreatment == 0 || choosenTreatment == 2)
                    document.getElementById('divExtrinsic').style.display = 'Inline';
                // log user understandig of toDate
                //log_response(save_data);
            }
        },
        false);
document.getElementById("btnIntrinsic").addEventListener("click", 
        function() {
            if($('#frmIntrinsic').valid()) {
                document.getElementById('divIntrinsic').style.display = 'None';
                choosenCategory = $('input[name=rdIntrinsic]:checked', '#frmIntrinsic').val();
                //$('#divPresentationHolderIntrinsic').text('Intrinsic choosenCategory: '.concat(choosenCategory));
                console.log('Intrinsic choosenCategory: '.concat(choosenCategory));
                document.getElementById('divPresentationIntrinsic'+choosenCategory).style.display = 'Inline';
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
document.getElementById("btnPresentationIntrinsic1").addEventListener("click", 
        function() {
            document.getElementById('divPresentationIntrinsic1').style.display = 'None';
            start_experiment();
        },
        false);
document.getElementById("btnPresentationIntrinsic2").addEventListener("click", 
        function() {
            document.getElementById('divPresentationIntrinsic2').style.display = 'None';
            start_experiment();
        },
        false);
document.getElementById("btnPresentationIntrinsic3").addEventListener("click", 
        function() {
            document.getElementById('divPresentationIntrinsic3').style.display = 'None';
            start_experiment();
        },
        false);
document.getElementById("btnExperiment").addEventListener("click", 
        function() {
            // if all anagrams are solved correctly or it took them longer 
            // as the meanTime of all participants of the prestudy 
            if ($('#frmExperiment').valid() || Date.now() - stage_time > avg_time){
                // save random_array and user inputs
                log_response(save_data);
                // update trial number 
                trial_number++;
                stage_name = 'trial'+trial_number;
                // at first handle manipulation block or finish the experiment
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
                // remove all user input
                for (var i=0; i<8; i++) {
                    $('input[name=exp'+ i +']', '#frmExperiment').val('');
                }
                document.getElementById('txtBelowExperiment').style.display='none';
                document.getElementById('txtBelowExperiment2').style.display='none';

                // fill in stimuli
                load_stimuli();
                if (trial_number != 4 && trial_number != 7)
                    // start timer in rounds without manipulation check (otherwise it's started there)
                    exptimer.play(true);
            }
            // the input isn't correct and there is still some time left
            else {
                // indicate how many anagrams are wrong
                document.getElementById('txtBelowExperiment').style.display = 'inline';
                console.log("input incorrect or still time left");
            }
        },
        false);

document.getElementById("btnManipulation").addEventListener("click", 
        function() {
            // manipulation bit code encodes user input
            manipulation = 0;
            if ($('#cbManipulation1').prop('checked')) manipulation +=1;
            if ($('#cbManipulation2').prop('checked')) manipulation +=2;
            if ($('#cbManipulation3').prop('checked')) manipulation +=4;
            if ($('#cbManipulation4').prop('checked')) manipulation +=8;
            if ($('#cbManipulation5').prop('checked')) manipulation +=16;
            if ($('#cbManipulation6').prop('checked')) manipulation +=32;
            if ($('#cbManipulation7').prop('checked')) manipulation +=64;
            if ($('#cbManipulation8').prop('checked')) manipulation +=128;
            if ($('#cbManipulation9').prop('checked')) manipulation +=256;
            // save decision
            log_response(save_data);
            // remove user input
            $('#cbManipulation1').prop('checked',false);
            $('#cbManipulation2').prop('checked',false);
            $('#cbManipulation3').prop('checked',false);
            $('#cbManipulation4').prop('checked',false);
            $('#cbManipulation5').prop('checked',false);
            $('#cbManipulation6').prop('checked',false);
            $('#cbManipulation7').prop('checked',false);
            $('#cbManipulation8').prop('checked',false);
            $('#cbManipulation9').prop('checked',false);
            // and go on with the experiment
            document.getElementById('divManipulation').style.display = 'None';
            document.getElementById('divExperiment').style.display = 'Inline';
            // restart timer to not get confused with manipulation check time 
            exptimer.play(true);
        },
        false);
