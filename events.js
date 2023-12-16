let calendarObj = {
  header: {
    left: "prev,next today",
    center: "title",
    right: "month,basicWeek,basicDay",
  },
  defaultDate: "2023-12-15",
  navLinks: true,
  editable: true,
  eventLimit: true,
};

const apiEndpoint =
  "https://qfhdl3ixb1.execute-api.us-east-1.amazonaws.com/test";

let accessToken;
let user;

$(document).ready(function () {
  accessToken = sessionStorage.getItem("access_token");
  user = sessionStorage.getItem("user");
  document.getElementById("userName").innerText = user;
  fetch(apiEndpoint + "/getAllEvents", {
    method: "POST",
    body: JSON.stringify({
      user: "test",
    }),
    headers: {
      "Content-Type": "application/json",
      Authorization: accessToken,
    },
  })
    .then((response) => response.json())
    .then((data) => {
      calendarObj.events = data;
      $("#calendar").fullCalendar(calendarObj);
    });
});

function addEvent() {
  const event = {
  };


  event.description = document.getElementById("description").value;
  document.getElementById("description").value = '';

  event.end = document.getElementById("end").value;
  document.getElementById("end").value = '';

  event.title = document.getElementById("eventTitle").value;
  document.getElementById("eventTitle").value = ''

  event.start = document.getElementById("start").value;
  document.getElementById("start").value = '';

  event.user = user

  fetch(
    "https://qfhdl3ixb1.execute-api.us-east-1.amazonaws.com/test/addEvent",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: accessToken,
      },
      body: JSON.stringify(event),
    }
  )
    .then((response) => {
      if (response.ok) {
        alert("Event created successfully.");
      } else {
        alert("Failed to create event.");
      }
    })
    .catch((error) => {
      console.error("Error:", error);
      alert("An error occurred while creating the event.");
    });
}
