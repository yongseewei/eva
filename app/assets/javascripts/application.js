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
//= require turbolinks
//= require_tree .
//= require bootstrap-sprockets

$(function() {
	$(document).on("click", ".question-context__choice", function() {
		$(".HolyGrail-body").children().hide();
		$(".HolyGrail-body").after('<ul class="list-group events"><li class="list-group-item">Hi</li><li class="list-group-item">Hello</li></ul>');
		$(".events").hide()
		$(".events").slideDown();
	});
	$(document).on("click", ".microphone i", function(event) {
		event.preventDefault();
		$(this).addClass("glow");
		setTimeout(function() {

			$(this).hide();
			$(this).after('<i class="fa fa-spinner w3-spin" style="font-size:80px"></i>');
		},1000);
	});
});
