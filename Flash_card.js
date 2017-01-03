// dependency for inquirer npm package
var inquirer = require("inquirer");
var fs = require('fs');

var BasicFlashCard = function(front,back) {
	this.front = front;
	this.back = back;
	this.BasicQxn = function(){
		console.log(front);
	};
	this.BasicAsr = function(){
		console.log(back);
	};
	this.save = function(){
		var JSONstring = JSON.stringify(this, null, 2);
		fs.appendFile("flash_card.txt", JSONstring, function(err){
			// If an error was experienced we say it.
			if (err) {
				console.log(err);
			}
			// If no error is experienced, we'll log the phrase "Content Added" to our node console.
			else {
				console.log("Content Added!");
			}
		});
	};
}

var ClozeFlashcard = function(text,cloze) {
	this.text = text;
	this.cloze = cloze;
	this.ClozeQxn = function(){
		console.log("..." + cloze);
	};
	this.ClozeAsr = function(){
		console.log(text + cloze);
	};
	this.save = function(){
		var JSONstring = JSON.stringify(this, null, 2);
		fs.appendFile("flash_card.txt", JSONstring, function(err){
			// If an error was experienced we say it.
			if (err) {
				console.log(err);
			}
			// If no error is experienced, we'll log the phrase "Content Added" to our node console.
			else {
				console.log("Content Added!");
			}
		});
	};
}

var askQuestion = function() {
	// if statement to ensure that our questions are only asked five times
	console.log("NEW FLASHCARD");
	// runs inquirer and asks the user a series of questions whose replies are
	// stored within the variable answers inside of the .then statement
	inquirer.prompt([
		{
			type: "list",
			name: "flashCardType",
			message: "Will you create a Basic Flashcard or a Cloze Flashcard?",
			choices: ["Basic","Cloze"]
		}, {
			type: "input",
			name: "cTextorBFront",
			message: "If Basic, what is the front? If Cloze, what is the hidden text?",
		}, {
			type: "input",
			name: "cClozeorBBack",
			message: "If Basic, what is the back? If Cloze, what is the Cloze?",
		}
	]).then(function(answers) {
		if (answers.flashCardType === "Basic") {
			var flashCard = new BasicFlashCard(answers.cTextorBFront,answers.cClozeorBBack);
			flashCard.save();
		}
		if (answers.flashCardType === "Cloze") {
			var flashCard = new ClozeFlashcard(answers.cTextorBFront,answers.cClozeorBBack);
			flashCard.save();
		}
	});
}

// call askQuestion to run our code
askQuestion();