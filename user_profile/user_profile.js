let currentStep = 1;
let currentQuestion = 1;

const userProfile = {
	name: "",
	age: "",
	gender: "",
	marital: "",
	email: "",
	phone: "",
	address: "",
	contact: "",
	height: "",
	weight: "",
	allergies: "",
	chronic: "",
	diet: "",
	smoking: "",
	alcohol: "",
	exercise: "",
};

const questions = [
	{ label: "Your name", key: "name", type: "text" },
	{ label: "Age", key: "age", type: "number" },
	{ label: "Gender(M/F)", key: "gender", type: "gender" },
	{ label: "Marital Status", key: "marital", type: "text" },
	{ label: "Email Address", key: "email", type: "email" },
	{ label: "Phone Number", key: "phone", type: "phone" },
	{ label: "Home Address", key: "address", type: "text" },
	{ label: "Preffered Contact Method", key: "contact", type: "text" },
	{ label: "Height(In cm)", key: "height", type: "number" },
	{ label: "Weight(In kgs)", key: "weight", type: "number" },
	{ label: "Known Allergies", key: "allergies", type: "text" },
	{
		label: "Chronic Conditions (e.g., diabetes, hypertension)",
		key: "chronic",
		type: "text",
	},
	{
		label: "Diet Preferences (e.g., vegetarian, vegan, low-carb)",
		key: "diet",
		type: "text",
	},
	{ label: "Smoking Status", key: "smoking", type: "text" },
	{ label: "Alcohol Consumption Frequency", key: "alcohol", type: "text" },
	{ label: "Exercise Frequency and Type", key: "exercise", type: "text" },
];

const steps = [
	"Personal Information",
	"Contact Information",
	"Health Information",
	"Lifestyle Information",
];

var promptoverlay = document.querySelector(".overlay");
var promptbox = document.querySelector(".prompt-container");
var progessbar = document.querySelector(".progress");
var addPromptBtn = document.getElementById("add-prompt-btn");

function updatePrompt() {
	document.getElementById("prompt-heading").innerText = steps[currentStep - 1];
	document.getElementById("prompt-title").innerText = `Step ${currentStep}`;
	document.getElementById(
		"question-counter"
	).innerText = `Question ${currentQuestion}/4`;
	document.getElementById("prompt-label").innerText =
		questions[(currentStep - 1) * 4 + currentQuestion - 1].label;
	document.getElementById("prompt-input").value =
		userProfile[questions[(currentStep - 1) * 4 + currentQuestion - 1].key] ||
		"";
	document.getElementById("prompt-input").type =
		questions[(currentStep - 1) * 4 + currentQuestion - 1].type;
	document.getElementById("prev-ques-btn").style.display =
		currentQuestion === 1 ? "none" : "inline-block";

	hideBtn();
}

function hideBtn() {
	// last question
	if (currentStep === 4 && currentQuestion === 4) {
		document.getElementById("next-btn").style.display = "none";
		document.getElementById("submit-btn").style.display = "block";
	} else {
		document.getElementById("submit-btn").style.display = "none";
	}

	if (currentStep === 1) {
		document.getElementById("prev-step-btn").style.display = "none";
	} else {
		document.getElementById("prev-step-btn").style.display = "block";
	}
}

updatePrompt();

function startBtn() {
	promptbox.style.display = "block";
	promptoverlay.style.display = "block";
	progessbar.style.display = "block";
}

function prevStep() {
	if (currentStep > 1) {
		currentStep--;
		currentQuestion = 1;
	}
	updatePrompt();
}

function prevQues() {
	if (currentQuestion > 1) {
		currentQuestion--;
	}
	updatePrompt();
}

function nextQues() {
	if (!validateInput()) {
		return;
	}
	saveCurrentInput();
	updateProgressBar();

	if (currentQuestion < 4) {
		currentQuestion++;
	} else {
		saveToContainer(currentStep);
		if (currentStep < 4) {
			currentStep++;
			currentQuestion = 1;
		} else {
			currentStep = 1;
			currentQuestion = 1;
			document.getElementById("prompt-box").classList.add("hidden");
			showOutput();
			return;
		}
	}
	updatePrompt();
}

function skipQues() {
	if (currentQuestion < 4) {
		currentQuestion++;
	} else {
		saveToContainer(currentStep);
		if (currentStep < 4) {
			currentStep++;
			currentQuestion = 1;
		} else {
			currentStep = 1;
			currentQuestion = 1;
			document.getElementById("prompt-box").classList.add("hidden");
			showOutput();
			return;
		}
	}
	// last question
	if (currentStep === 4 && currentQuestion === 4) {
		submitDetails();
	}

	updatePrompt();
}

function saveCurrentInput() {
	const key = questions[(currentStep - 1) * 4 + currentQuestion - 1].key;
	const value = document.getElementById("prompt-input").value;
	userProfile[key] = value;
}

function updateProgressBar() {
	const percentage =
		(((currentStep - 1) * 4 + currentQuestion) / questions.length) * 100;
	console.log(
		">> percentage ",
		percentage,
		currentStep,
		currentQuestion,
		questions.length
	);
	document.getElementById("progress-bar").style.width = percentage + "%";
	document.getElementById("progress-text").innerText =
		Math.round(percentage) + "%";
}

function saveToContainer(step) {
	const container = document.getElementById(`output-${step}`);
	let content = "";
	for (let i = (step - 1) * 4; i < step * 4; i++) {
		const key = questions[i].key;
		content += `<p>${questions[i].label}: ${userProfile[key]}</p>`;
	}
	container.innerHTML = content;
	container.classList.remove("hidden");
}


function submitDetails() {
	saveToContainer(currentStep);
	promptbox.style.display = "none";
	promptoverlay.style.display = "none";
	progessbar.style.display = "none";
	addPromptBtn.style.display = "none";
}

function closePrompt() {
	promptbox.style.display = "none";
	promptoverlay.style.display = "none";
	addPromptBtn.innerText = "Continue";
}

function validateInput() {
	const input = document.getElementById("prompt-input").value;
	const type = questions[(currentStep - 1) * 4 + currentQuestion - 1].type;

	if (!input) {
		alert("There are no input entered, please enter the details");
		return false;
	}

	if (type === "text" && !isNaN(input)) {
		alert("Please enter the valid input");
		return false;
	}

	if (type === "number" && isNaN(input)) {
		alert("Please enter the valid numeric input");
		return false;
	}

	if (type === "number" && !(input >= 0)) {
		alert("Negative number entered, enter the valid input");
		return false;
	}

	if (type === "phone" && !/^\d{10}$/.test(input)) {
		alert("Please enter a valid phone number with 10 digits");
		return false;
	}

	if (type === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input)) {
		alert("Please enter a valid email address");
		return false;
	}

	let upperCaseInput = input.toUpperCase();
	if (type === "gender" && upperCaseInput !== "M" && upperCaseInput !== "F") {
		alert("Please enter M/F");
		return false;
	}

	return true;
}
