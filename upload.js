let accessToken
let user
window.onload = function() {
    accessToken = sessionStorage.getItem('access_token');
    user = sessionStorage.getItem('user');
    document.getElementById('userName').innerText = sessionStorage.getItem('user');

    if (!accessToken) {
        window.location.replace("index.html")
    }
    

}

function uploadAudio() {
    
    const fileInput = document.getElementById('fileUpload');
    
    const file = fileInput.files[0];
    const fileName = file.name;

    const formData = new FormData();
    formData.append('file', file);

    const apiEndpoint = 'https://qfhdl3ixb1.execute-api.us-east-1.amazonaws.com/test/uploadAudio/' + fileName;

    const headers = {
        'Content-type': file.type,
        'Authorization': accessToken,
        'user': user
    }

    fetch(apiEndpoint, {
        method: 'PUT',
        body: formData,
        headers: headers
    }).then(res => {
                if (res.status === 200) {
                    console.log('Success OK');
                    alert("Audio Uploaded Successfully");
                } else {
                    alert("Upload failed");
                }
            });
}