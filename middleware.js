exports.requireLogin = (request, response, next) => {

    if(request.session && request.session.user){
        return next();
    }
    else {
        return response.redirect("./login");
    }
}