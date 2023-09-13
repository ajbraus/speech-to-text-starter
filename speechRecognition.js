
// Speech Recognition Stuff goes here
const sr = window.SpeechRecognition || window.webkitSpeechRecognition;


let speechRecognition = new sr();
speechRecognition.continuous = false;
speechRecognition.interimResults = true;
speechRecognition.lang = document.querySelector("#select_dialect").value;
speechRecognition.maxAlternatives = 10;

speechRecognition.onstart = () => {
  document.querySelector("#status").style.display = "block";
};

speechRecognition.onend = () => {
  document.querySelector("#status").style.display = "none";
};

speechRecognition.onError = () => {
  document.querySelector("#status").style.display = "none";
};

let final_transcript = "";

speechRecognition.onresult = (event) => {
  // Create the interim transcript string locally because we don't want it to persist like final transcript
  let interim_transcript = "";
  // Loop through the results from the speech recognition object.
  for (let i = event.resultIndex; i < event.results.length; ++i) {
    // If the result item is Final, add it to Final Transcript, Else add it to Interim transcript
    if (event.results[i].isFinal) {
      final_transcript += event.results[i][0].transcript;
    } else {
      interim_transcript += event.results[i][0].transcript;
    }
  }
  document.querySelector("#final").innerHTML = final_transcript;
  document.querySelector("#interim").innerHTML = interim_transcript;
};

document.querySelector("#start").onclick = () => {
  speechRecognition.start();
};
document.querySelector("#stop").onclick = () => {
  speechRecognition.stop();
};