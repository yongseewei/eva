// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or any plugin's vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery_ujs
//= require bootstrap-sprockets
//= require jquery-ui
//= require turbolinks
//= require_tree .

	var currentQues = 1;
var baseUrl = "https://api.api.ai/v1/",
    $speechInput,
    $recBtn,
    recognition,
    messageRecording = "Recording...",
    messageCouldntHear = "I couldn't hear you, could you say that again?",
    messageInternalError = "Oh no, there has been an internal server error",
    messageSorry = "I'm sorry, I don't have the answer to that yet.";
var accessToken = "b9d899a8ae0a4559adbc257dfe0403ec";
var subscriptionKey = "655502d27d9f4d32b091fdbf67fe0cba";
var text = ""
var audioElement = document.createElement('audio');
    audioElement.setAttribute('src', 'https://a.clyp.it/f5gkxsoh.mp3');
    // audioElement.setAttribute('autoplay', 'autoplay');



	

$(document).ready(function() {
    $("#input").keypress(function(event) {
        if (event.which == 13) {
            event.preventDefault();
            send();
        }
    });
  $("#main-text").click(function(event) {
    // if (window.speechSynthesis.speaking == false){
    	    audioElement.play();
        switchRecognition();

  });

    // });

});

        

var temp ="";
function startRecognition() {

  	$("body").addClass("listening");
    recognition = new webkitSpeechRecognition();
    // recognition.continuous = true;
    recognition.onstart = function(event) {
        updateRec();
    };
    recognition.onresult = function(event) {
        text = "";
        for (var i = event.resultIndex; i < event.results.length; ++i) {
            text += event.results[i][0].transcript;
        }

       // setInput(text);
       send(text);
       stopRecognition();
        // debugger
    };

    recognition.onend = function(event) {
                // debugger
        stopRecognition();
        // stopRecognition();
    };

    recognition.lang = "en-US";
    recognition.start();
}

    

function stopRecognition() {
        	$("body").removeClass("listening");
    if (recognition) {
        recognition.stop();
        recognition = null;
    }
    updateRec();
}

function switchRecognition() {
    if (recognition) {
        stopRecognition();
    } else {
        startRecognition();
    }
}

// function setInput(text_data) {

    

//  $("#input").val(text_data);

//  // send(text_data);

// }

function updateRec() {
    $("#rec").text(recognition ? "Stop" : "Speak");
}

function send(text_data) {
    // var text = $("#input").val();
    text = "";
    $.ajax({
        type: "POST",
        url: baseUrl + "query/",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        headers: {
            "Authorization": "Bearer " + accessToken,
            "ocp-apim-subscription-key": subscriptionKey
        },
        data: JSON.stringify({ q: text_data, lang: "en" }),
        success: function(data) {
            prepareResponse(data);

            // setResponse(data.result.speech);
        },
        error: function() {
            // setResponse("Internal Server Error");
        }
    });

    // setResponse("Loading...");
}

// function setResponse(val) {

//  $("#response").text(val);

// }

function prepareResponse(val) {
  var debugJSON = JSON.stringify(val, undefined, 2),
    spokenResponse = val.result.speech;
  respond(spokenResponse);
  // debugRespond(debugJSON);
}

function respond(val) {
  if (val == "") {
    val = messageSorry;
  }
  if (val !== messageRecording) {
    var msg = new SpeechSynthesisUtterance();
    var voices = speechSynthesis.getVoices();
    msg.voiceURI = "native";
    msg.text = val;
    msg.lang = "en-US";

    speechSynthesis.speak(msg);
		$("#main-text").html(msg.text);
		if (msg.text == "Hello there, what event you want to create?") {
			$(".event-choice").fadeIn();
			$(".interest-choice").hide();
		} else if (msg.text == "Fine. Which party theme would your daughter prefer?") {
			$(".event-choice").hide();
			$(".interest-choice").fadeIn();
		} else if (msg.text == "Here is the best proposal I've completed for you!") {

		}
		else {
			$(".event-choice").hide();
			$(".interest-choice").hide();
		}

     // $("#rec").text("stopping")
    msg.onend = function (event) { 
    //     // debugger
         speechSynthesis.cancel();
    //     $("#rec").text("restart")
    //     // stopRecognition();
 
    };
    //      switchRecognition();
      // while (window.speechSynthesis.speaking){
      // }
      // switchRecognition();
  }

  $("#spokenResponse").addClass("is-active").find(".spoken-response__text").html(val);

  	$(".question-context__choice").hide().slideDown();

	// $("#main-text").on("click", function() {
	// 	$("body").toggleClass("listening");
	// });
	var string = "What is your budget?";
	$(".events").hide();
	$("#main-text").hide();
	$("#main-text").fadeIn(1000, function() {
		
		// $(".events").slideDown();
	});


}



	
