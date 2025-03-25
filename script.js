document.addEventListener("DOMContentLoaded", function () {
    let speakBtn = document.getElementById("speakBtn");
    let resultBox = document.getElementById("result");
    let errorMessage = document.getElementById("errorMessage");

    let speechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    let recognition = new speechRecognition();

    recognition.onstart = function () {
        errorMessage.innerText = "Listening...";
    };

    recognition.onspeechend = function () {
        recognition.stop();
        errorMessage.innerText = "";
    };

    recognition.onresult = function (event) {
        let spokenText = event.results[0][0].transcript;
        resultBox.value = spokenText;

        // Fix multiplication issues
        let expression = spokenText.toLowerCase()
            .replace(/×/g, "*")        // Fix for "×" symbol
            .replace(/multiplication/g, "*") // Fix for "multiplication"
            .replace(/multiplied by/g, "into") // Convert "multiplied by" to "into"
            .replace(/into/g, "*");    // Now replace "into" with "*"

        try {
            let answer = eval(expression);
            if (!isNaN(answer)) {
                resultBox.value = `${spokenText} = ${answer}`;
                errorMessage.innerText = "";
            } else {
                throw new Error();
            }
        } catch {
            errorMessage.innerText = "Invalid Calculation!";
        }
    };

    speakBtn.addEventListener("click", function () {
        recognition.start();
    });
});
