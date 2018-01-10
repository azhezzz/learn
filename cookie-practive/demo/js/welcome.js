(function(){
	function checkCookie(key){
		let cookie=document.cookie;
		let start=cookie.indexOf(key)+key.length+1;
		console.log(start);
		if(start===key.length){
			document.getElementById("show").innerHTML="<a href='login.html'>请登录</a>";
			return;
		}
		let end=cookie.indexOf(";",start);
		let username=cookie.slice(start,end);
		document.getElementById("show").innerHTML="欢迎回来,"+username;
	}
 	window.onload=function(){
 		checkCookie("username");
 		console.log(1);
 	}

})();