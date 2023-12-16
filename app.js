window.onload = function() {
    let accessToken = sessionStorage.getItem('access_token');

    if (accessToken) {
        window.location.replace("https://classmate-ai.s3.amazonaws.com/home.html")
    } 
}