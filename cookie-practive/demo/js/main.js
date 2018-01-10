(function(){
	function $(seletor){
		return document.getElementById(seletor);
	}
	function setCookie(key,value,minute){
		let time=new Date();
		if($("save").checked===true)
			minute=5;
		else
			minute=1;
		time.setTime(time.getTime()+(minute*60*1000));
		document.cookie=key+"="+value+";expires="+time.toGMTString();
		console.log(time.toGMTString());
	}
	window.onload=function(){
		$("login").addEventListener("click",function(event){
			event.preventDefault();
			let username=$("username").value;
			let password=$("password").value;
			if(username==="azhezzz"&&password==="123456"){
				setCookie("username",username);
				window.location.href="welcome.html";
			}
			else
				alert("请输入正确的用户名和密码");
		});
	}
})();