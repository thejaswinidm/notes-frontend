function logout(){
    sessionStorage.removeItem('access_token')
    sessionStorage.removeItem('user')
    window.location.href = "./index.html"
}

function login(){
    window.location.href = href="https://classmate-ai-auth.auth.us-east-1.amazoncognito.com/oauth2/authorize?client_id=7qrbq71umrdvbpcpcgoct107f6&response_type=token&scope=aws.cognito.signin.user.admin+email+openid+phone+profile&redirect_uri=https%3A%2F%2Fclassmate-ai.s3.amazonaws.com%2Fhome.html"
}