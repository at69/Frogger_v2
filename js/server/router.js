function route(handle, pathname, response, request, postData) {
	
	if (!request.cookies.froggerUser)
	{	
		if(pathname == "/login")
		{
			handle["/login"](response, request, postData);
		}
		else if(pathname == "/register")
		{
			handle["/register"](response, request, postData);
		}
		else {
			handle["/notfound"](response, request);
		}
	}
	else if (pathname == "/administration")
	{
		if(request.cookies.froggerUser.isAdmin == true)
		{
			handle[pathname](response, request, postData);
		}
		else
		{
			handle["/notfound"](response, request);
		}
	}
	else if (pathname == "/play")
	{
		handle[pathname](response, request);
	}
	else if (pathname == "/rest/users")
	{
		handle[pathname](response, request);
	}
	else if (typeof handle[pathname] === 'function') 			// check if there is a function for this path
	{					
		handle[pathname](response, request, postData);		// call the requests handler
	} 
	else 
	{
		handle["/notfound"](response, request);
	}
}

exports.route = route;
