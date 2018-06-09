$(function() {
	var words = {};
	$.getJSON("words.json", function(json) {
		words = json;
		$("div#loading").addClass("hidden");
    $("div#loaded").removeClass("hidden");
		var output = $("div#output");
		var input = $("input#input");
		var random = $("button#random");
		var random_output = $("div#random_output");
		var random_input = $("input#random_input");
		input.blur(function() {
			if($(this).val() == "")
				return;
			var sorted = $(this).val().split("").sort().join("");
			output.empty().html(words[sorted] != undefined ? words[sorted].join("<br />") : "Word not found");
		});
		var random_word = null;
		var keys = Object.keys(words);
		var length = keys.length;
		random.click(function() {
			random_word = keys[Math.floor(Math.random() * length)];
			// shuffle algorithm adapted from https://bost.ocks.org/mike/shuffle/ (Fisher-Yates algorithm)
			var random_word_array = random_word.split(""), m = random_word_array.length, t, i;
			while(m) {
				i = Math.floor(Math.random() * m--);
				t = random_word_array[m];
				random_word_array[m] = random_word_array[i];
				random_word_array[i] = t;
			}
			random_output.text("Random word: " + random_word_array.join("") + "; " + words[random_word].length + " possibilit" + (words[random_word].length == 1 ? "y" : "ies"));
		});
		random.click();
		random_input.blur(function() {
			if($(this).val() == "")
				return;
			var correct = false;
			for(word in words[random_word])
				if($(this).val() == words[random_word][word])
					correct = true;
			random_output.append("<br />" + $(this).val() + " is " + (correct ? "" : "in") + "correct!");
		});
		var enter = function(event) {
			if(event.which == 13)
				$(this).blur().focus();
		}
		random_input.keydown(enter);
		input.keydown(enter);
	});
});
