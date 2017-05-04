var start = document.getElementById('start');
var next = document.getElementById("next");					
var questionContainer = document.getElementById("question");		
var answerContainer = document.getElementById("choices");		
var options = document.getElementsByClassName("option");
var validate = document.getElementById('validate');

var position = 0;
var numCorrect = 0;
var numPossible = 0;
var selectedChoices;
var src = null;

var questionBank = [
	{ 
		question: "What planets in our solar system do not have any moons?",
		type: "Mulitple choice",
		choices: ["Mercury", "Venus", "Earth", "Mars", "Jupiter", "Saturn", "Uranus", "Neptune"],
		usersAnswers: [],
		wrongAnswers: [],
		correctAnswer: ["Mercury", "Venus"]
	},
	{ 
		question: "What is the hottest planet in our solar system?",
		type: "Mulitple choice",
		choices: ["Mercury", "Venus", "Saturn", "Uranus"],
		usersAnswers: [],
		wrongAnswers: [],
		correctAnswer: ["Venus"]
	},
	{ 
		question: "Pluto is larger than the Earth's moon.",
		type: "True or false",
		choices: ["True", "False"],
		usersAnswers: [],
		wrongAnswers: [],
		correctAnswer: ["False"]
	},
	{ 
		question: "Which planet has more volcanoes?",
		type: "Mulitple choice",
		choices: ["Mercury", "Venus", "Earth", "Jupiter"],
		usersAnswers: [],
		wrongAnswers: [],
		correctAnswer: ["Venus"]
	},
	{ 
		question: "What is the smallest planet in our solar system?",
		type: "Mulitple choice",
		choices: ["Mercury", "Venus", "Mars", "Pluto"],
		usersAnswers: [],
		wrongAnswers: [],
		correctAnswer: ["Mercury"]
	},
	{ 
		question: "Which of the following planets have rings?",
		type: "Mulitple choice",
		choices: ["Mercury", "Venus", "Earth", "Mars", "Jupiter", "Saturn", "Uranus", "Neptune"],
		usersAnswers: [],
		wrongAnswers: [],
		correctAnswer: ["Jupiter", "Saturn", "Uranus", "Neptune"]
	},
	{ 
		question: "The rotation of the Earth is gradually slowing.",
		type: "True or false",
		choices: ["True", "False"],
		usersAnswers: [],
		wrongAnswers: [],
		correctAnswer: ["True"]
	},
	{ 
		question: "Why is Pluto no longer considered a planet?",
		type: "Mulitple choice",
		choices: ["It hasn't cleared its orbital path of other objects", 
					"It's too small",
					"It has more in common with comets rather than planets",
					"It has an irregular orbit"],
		usersAnswers: [],
		wrongAnswers: [],
		correctAnswer: ["It hasn't cleared its orbital path of other objects"]
	},
	{ 
		question: "Rearrange the planets in order according to their distance from the sun.",
		type: "Order",
		choices: ["Mercury", "Venus", "Earth", "Mars", "Jupiter", "Saturn", "Uranus", "Neptune"],
		usersAnswers: [],
		wrongAnswers: [],
		correctAnswer: ["Mercury", "Venus", "Earth", "Mars", "Jupiter", "Saturn", "Uranus", "Neptune"]
	},
	{ 
		question: "Nights on some parts of Uranus can last upwards of 40 years.",
		type: "True or false",
		choices: ["True", "False"],
		usersAnswers: [],
		wrongAnswers: [],
		correctAnswer: ["True"]
	}
];

//When start btn pressed, start the quiz.
start.addEventListener('click', function(){
	document.getElementById('splash').setAttribute('style', 'display: none;');
	document.getElementById('container').removeAttribute('style');
	initiateQuiz();
});

//Creat function to display the first question
function initiateQuiz (){
	shuffle(questionBank);
	position = 0;
	numCorrect = 0;
	numPossible = 0;
	for (var i = 0; i < questionBank.length; i++) {
		questionBank[i].usersAnswers = [];
		questionBank[i].wrongAnswers = [];
	}
	createQuestion();
}

function createQuestion (){
	validate.innerHTML = '';
	var listOfChoices = questionBank[position]["choices"];
	var numOfAnswers = questionBank[position]["correctAnswer"].length;
	selectedChoices = questionBank[position]["usersAnswers"];
	
	displayQuestion();
	displayChoices(listOfChoices);
	userSelection(selectedChoices, numOfAnswers);
}

function displayQuestion(){
	answerContainer.innerHTML = '';
	questionContainer.innerHTML = '<h3>' + questionBank[position]["question"] + '</h3>';
}


function displayChoices(array) {
	shuffle(array);
	for (var i = 0; i < array.length; i++){
		var li = document.createElement('li');
		li.className = 'option';
		li.innerHTML = array[i];
		answerContainer.appendChild(li);
	}
	if (questionBank[position].type == "Order") {
		answerContainer.setAttribute('style', 'display: initial;');
		for (var i = 0; i < options.length; i++) {
			options[i].setAttribute('style', 'margin: 10px auto;');
		}
	} 
} 

//When user selects an answer add to userAnswers array
function userSelection (selectedChoices, numOfAnswers){
	if (numOfAnswers == 1){
		singleAnswer(selectedChoices);
	}  else if (questionBank[position].type == "Order") {
		orderAnswer();
	} else {
		multiAnswer(selectedChoices);
	}
}

function singleAnswer(selectedChoices) {
	Array.prototype.forEach.call(options, function(b) {
	  		b.addEventListener('click', function() {
	    		Array.prototype.forEach.call(options, function(b) {
	      			var index = selectedChoices.indexOf(b.innerHTML);
	      			b.classList.remove('selected');
	      			if (index > -1) {
				    	selectedChoices.splice(index, 1);
					}
	    		});
	    		b.classList.add('selected');
		    	selectedChoices.push(b.innerHTML);
	  		});
		});
}

function orderAnswer() {
	Array.prototype.forEach.call(options, function(b){
		b.setAttribute('draggable', 'true');
		b.setAttribute('ondragstart', 'dragStart(event)');
		b.setAttribute('ondragend', 'dragEnd(event)');
		b.setAttribute('ondragenter', 'dragEnter(event)');
		b.setAttribute('ondragleave', 'dragLeave(event)');
		b.setAttribute('ondragover', 'dragOver(event)');
		b.setAttribute('ondrop', 'drop(event)');
	});
}

function pushOrderAnswers () {
	for(var i = 0; i < answerContainer.children.length; i++){
		selectedChoices.push(answerContainer.children[i].innerHTML);
	}
}

function multiAnswer(selectedChoices) {
	Array.prototype.forEach.call(options, function(b) {
  		b.addEventListener('click', function() {
    		b.classList.toggle('selected');
    		if (b.classList.contains('selected')) {
		    	selectedChoices.push(b.innerHTML);
		    } else {
		    	var index = selectedChoices.indexOf(b.innerHTML);
		    	if (index > -1) {
				    selectedChoices.splice(index, 1);
				}
		    }
  		});
	});
}

function grade() {
	initiateGrading();
	return Math.round((numCorrect/numPossible)*100)
}

function initiateGrading (){
	//Iterate through each question
	for(var i = 0; i < questionBank.length; i++) {
		//Find length of users and correctAnswer array
		var numOfCorrectAnswers = questionBank[i].correctAnswer.length;
		var numOfUserAnswers = questionBank[i].usersAnswers.length;
		var numOfAnswers = findAnswerLength(numOfUserAnswers, numOfCorrectAnswers);

		//Set numPossible to the total number of correct answers
		numPossible += numOfCorrectAnswers;

		//Determine if user answered question correctly. 
		findIfCorrect(i, numOfAnswers);
	}
}

//Determine if userAnswers array has more answers than correctAnswers array
function findAnswerLength (user, correct){
	if (user <= correct){
			return correct;
		} else {
			return user;
		}
}

function findIfCorrect (i, numOfAnswers) {
	//If user is correct than add 1 to numCorrect
	//If user is wrong place answer in WrongAnswers
	for(var b = 0; b < numOfAnswers; b++) {
		if (questionBank[i].type == "Order") {
			orderQuestion(i, b);
		} else {
			regQuestion(i, b);
		}
	}
}

//determine if user answered correctly on order type questions.
function orderQuestion (i, b) {
	var correct = questionBank[i].correctAnswer[b];
	var user = questionBank[i].usersAnswers[b];
	if (user == correct) {
		return numCorrect++
	} else {
		return questionBank[i].wrongAnswers.push(user)
	}
}

//determine if user answered correctly on regular type questions.
function regQuestion (i, b) {
	var user = questionBank[i].usersAnswers[b];
	if (questionBank[i].correctAnswer.indexOf(user) != -1) {
		return numCorrect++
	} else if (user != undefined){
		return questionBank[i].wrongAnswers.push(user)
	}
}

//Display grade result
function displayResult (grade) {
	var q = 1;
	var color = findColor(grade);
	answerContainer.innerHTML = '';

	resultHeader(grade, color);
	

	for (var i = 0; i < questionBank.length; i++) {
		var questionDiv = document.createElement('div');
		questionDiv.innerHTML = '<h3>Question ' + q + ': ' + questionBank[i].question + '</h3>';
		questionContainer.appendChild(questionDiv);
		resultCorrectAnswer(i);
		resultUserAnswer(i);
		q++
	}
}

function findColor (grade) {
	if (grade >= 90) {
		return color = '#16A085';
	} else if (grade >= 80) {
		return color = '#2ECC71';
	} else if (grade >= 70) {
		return color = '#F1C40F';
	} else if (grade >= 60) {
		return color = '#F39C12';
	} else {
		return color = '#E74C3C';
	}
}

function resultHeader (grade, color) {
	var result = '';
	result += '<div class="grade" style="color: ' + color + ';"><h1>' + grade + '%</h1></div>';
	result += '<div class="grade">You got <strong>' + numCorrect + '</strong> out of ';
	result += '<strong>' + numPossible + '</strong> possible answers right.</div>';
	questionContainer.innerHTML = result;
}

function resultCorrectAnswer (i) {
	questionContainer.innerHTML += '<p class="result"><strong>Correct Answer:</strong></p>';
		for (var b = 0; b < questionBank[i].correctAnswer.length; b++) {
			var correctDiv = document.createElement('div');
			correctDiv.setAttribute('class', 'result');
			correctDiv.innerHTML = questionBank[i].correctAnswer[b];
			questionContainer.appendChild(correctDiv);
		}
}

function resultUserAnswer (i) {
	questionContainer.innerHTML += '<p class="result"><strong>Your Answer:</strong></p>';
		for (var a = 0; a < questionBank[i].usersAnswers.length; a++){
			var userDiv = document.createElement('div');
			userDiv.setAttribute('class', 'result');
			var answer = questionBank[i].usersAnswers[a];
			userDiv.innerHTML = answer;
			questionContainer.appendChild(userDiv);

			if (questionBank[i].wrongAnswers.indexOf(answer) != -1) {
				userDiv.style.color = '#E74C3C';
			}
		}
}

//Function for scrambling questions and choices 
function shuffle(array) {
	var index = '';
    for (var i = array.length - 1; i > 0; i--) {
        var randomIndex = Math.floor(Math.random() * (i + 1));
        var tempValue = array[i];

        if (questionBank[i].type == "Order") {
        	questionBank.push(array[i]);
        	questionBank.splice(i, 1);
        } else {
        	array[i] = array[randomIndex];
        	array[randomIndex] = tempValue;
        }
    }
    return array;
}

//functions for the order question.
function dragStart(e){

	e.target.style.opacity = '0.5';
	e.target.classList.add('active');

	src = e.target;

	e.dataTransfer.effectAllowed = 'move';
	e.dataTransfer.setData('text/html', e.target.innerHTML);

}

function dragEnd(e) {
	e.target.style.opacity = '1';
	e.target.classList.remove('active');
	Array.prototype.forEach.call(options, function(e){
		e.classList.remove('over');
	});
}

function dragEnter(e){
	e.target.classList.add('over');
}

function dragLeave(e){
	e.target.classList.remove('over');
}

function dragOver(e) {
	if(e.preventDefault){
		e.preventDefault();
	}
	e.dataTransfer.dropEffect = 'move';

	return false
}

function drop(e) {
	if(e.stopPropagation){
		e.stopPropagation();
	}
	
	if(e.preventDefault){
		e.preventDefault();
	}
	if(src != e.target) {
		src.innerHTML = e.target.innerHTML;
		e.target.innerHTML = e.dataTransfer.getData('text/html');
	}


}

Array.prototype.forEach.call(options, function(b){
			b.addEventListener('dragstart', dragStart);
			b.addEventListener('dragend', dragEnd);
			b.addEventListener('dragenter', dragEnter);
			b.addEventListener('dragleave', dragLeave);
			b.addEventListener('dragover', dragOver);
			b.addEventListener('drop', drop);
});

next.addEventListener('click', function(){
	//If user selects next/reply btn on grade result page initiate new quiz.
	if (position == questionBank.length){
		next.innerHTML = "Next";
		next.classList.remove('submit');
		answerContainer.removeAttribute('style', 'display: initial;');
		return initiateQuiz()
	} else if (questionBank[position].type == "Order") {
		//If question was a order problem push it into usersAnswers.
		pushOrderAnswers();
	}

	var pickedAnswers = questionBank[position].usersAnswers.length;
	if (pickedAnswers == 0) {
		//Ensure user selects an answer
		validate.innerHTML = 'Please select an answer';
	} else if (position == questionBank.length - 2) {
		//If second to last question display submit when next btn is executed.
		next.innerHTML = "Submit";
		next.classList.add('submit');
		position++;
		return createQuestion();
	} else if (position == questionBank.length - 1){
		//If last question grade quiz.
		next.innerHTML = "Retry";
		position++;
		var gradeResult = grade();
		return displayResult(gradeResult);
	} else {
		//Add one to position and create new question.
		position++;
		return createQuestion();
	}
});
