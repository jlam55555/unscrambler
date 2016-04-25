$(function() {
	var words = {};
	$.getJSON("words.json", function(json) {
		words = json;
		$("div#loading").remove();
		$("body").append(`
			<h3>Enter a scrambled word to get it descrambled or enter a word to find anagrams:</h3>
			<input type="text" id="input" placeholder="Scrambled word" />
			<div id="output">Enter a scrambled word</div>
			<hr />
			<h3>Try to unscramble a word</h3>
			<button id="random">Random Scrambled Word</button>
			<input id="random_input" type="text" />
			<div id="random_output"></div>
			<hr />
			<h3>Source</h3>
			<div id="citation">Source of words is from <a href="https://github.com/dwyl/english-words">english-words on GitHub</a>. See the citation <a href="https://github.com/dwyl/english-words/blob/master/word_list_moby_credits.txt">here</a>.</div>
		`);
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
			random_output.text("Random word: " + random_word + "; " + words[random_word].length + " possibilities");
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
