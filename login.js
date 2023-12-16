window.onload = function () {
  function getFragmentParams() {
    let hash = window.location.hash.substr(1);
    return hash.split("&").reduce(function (result, item) {
      let parts = item.split("=");
      result[parts[0]] = parts[1];
      return result;
    }, {});
  }

  let fragmentParams = getFragmentParams();
  let accessToken = fragmentParams["access_token"];
  let idToken = fragmentParams["id_token"];

  if (accessToken) {
    sessionStorage.setItem("access_token", accessToken);
    sessionStorage.setItem("id_token", idToken);
    window.location.hash = "";
    let idMap = idToken.split(".");
    let payload = idMap[1];
    let idDetails = JSON.parse(
      atob(payload.padEnd(4 - (payload.length % 4), "="))
    );
    sessionStorage.setItem("user", idDetails["cognito:username"]);
  } else if (!sessionStorage.getItem("access_token")) {
    window.location.replace("https://classmate-ai.s3.amazonaws.com/index.html");
  }
  document.getElementById("userName").innerText =
    sessionStorage.getItem("user");
};
