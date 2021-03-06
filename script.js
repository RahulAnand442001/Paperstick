const colors = ["#0ef074", "#adabdf", "#d1df0bbb", "#f12234", "#3cdf0bbb"];

const body = document.getElementById("body");
const editor = document.getElementById("editor");

// change background of page randomly
let randomColor = colors[Math.floor(Math.random() * colors.length)];
body.style.background = randomColor;

// set to local storage
document.addEventListener("click", (e) => {
  localStorage.setItem("text-in-editor", editor.innerText);
});

// remove from local storage on exit
document.onclose(() => localStorage.removeItem("text-in-editor"));


// download the editor text;
document.getElementById("download").onclick = () => {
  saveTextAsFile(editor.innerText, "note");
};

// creating the text file
const saveTextAsFile = (textToWrite, fileNameToSaveAs) => {
  const textFileAsBlob = new Blob([textToWrite], { type: "text/plain" });
  const downloadLink = document.createElement("a");
  downloadLink.download = fileNameToSaveAs;
  downloadLink.innerHTML = "Download File";
  if (window.webkitURL != null) {
    downloadLink.href = window.webkitURL.createObjectURL(textFileAsBlob);
  } else {
    downloadLink.href = window.URL.createObjectURL(textFileAsBlob);
    downloadLink.onclick = destroyClickedElement;
    downloadLink.style.display = "none";
    document.body.appendChild(downloadLink);
  }

  downloadLink.click();
};
