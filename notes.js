let accessToken
let user
window.onload = function() {
    accessToken = sessionStorage.getItem('access_token');
    user = sessionStorage.getItem('user');
    document.getElementById('userName').innerText = sessionStorage.getItem('user');
    if (!accessToken) {
        window.location.replace("https://classmate-ai.s3.amazonaws.com/index.html")
    }
    

}
const apiEndpoint =
  "https://qfhdl3ixb1.execute-api.us-east-1.amazonaws.com/test";

function createNote() {
  const noteId = document.getElementById("noteId").value;
  const content = document.getElementById("content").value;

  fetch(apiEndpoint + "/content", {
    method: "POST",
    body: JSON.stringify({ noteId, content, user }),
    headers: {
      "Content-Type": "application/json",
      "Authorization": accessToken
    },
  })
    .then((response) => response.json())
    .then((data) => (document.getElementById("result").innerHTML = data.body));
}

function deleteNote() {
  const noteId = document.getElementById("noteId").value;

  fetch(apiEndpoint + "/deleteNote", {
    method: "DELETE",
    body: JSON.stringify({ noteId }),
    headers: { 
        "Content-Type": "application/json",
        "Authorization": accessToken
    },
  })
    .then((response) => response.json())
    .then((data) => (document.getElementById("result").innerHTML = data.body));
}

function updateNote() {
  const noteId = document.getElementById("noteId").value;
  const content = document.getElementById("content").value;

  fetch(apiEndpoint + "/updateNote", {
    method: "PUT",
    body: JSON.stringify({ noteId, content }),
    headers: { 
        "Content-Type": "application/json",
        "Authorization": accessToken
    },
  })
    .then((response) => response.json())
    .then((data) => (document.getElementById("result").innerHTML = data.body));
}

function viewAllNotes() {
  fetch(apiEndpoint + "/viewAll",{
    headers:{
        "Authorization": accessToken
    }
  })
    .then((response) => response.json())
    .then((data) => displayNotes(data));
}

// Function to display notes
function displayNotes(notes) {
  const resultDiv = document.getElementById("result");
  resultDiv.innerHTML = "";

  notes.forEach((note) => {
    console.log(note);
    const noteDiv = document.createElement("div");
    noteDiv.classList.add("note");

    const noteIdParagraph = document.createElement("p");
    noteIdParagraph.innerText = `Note ID: ${note.NoteId || "N/A"}`;

    const contentParagraph = document.createElement("p");
    contentParagraph.innerText = `Content: ${note.Content || "N/A"}`;
    contentParagraph.style.display = "none"; // Initially hide content

    const arrowSpan = document.createElement("span");
    arrowSpan.innerHTML = "&#9654;"; // Right arrow (▶)
    arrowSpan.classList.add("expand-arrow");
    arrowSpan.onclick = function () {
      // Toggle visibility of content on arrow click
      contentParagraph.style.display =
        contentParagraph.style.display === "none" ? "block" : "none";
    };

    noteDiv.appendChild(noteIdParagraph);
    noteDiv.appendChild(arrowSpan);
    noteDiv.appendChild(contentParagraph);
    resultDiv.appendChild(noteDiv);
  });
}

// Function to display result (common function)
function displayResult(message) {
  document.getElementById("result").innerHTML = message;
}


