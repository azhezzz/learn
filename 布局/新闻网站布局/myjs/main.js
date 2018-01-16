$(function(){
	"use strict";
	var oinput=$("input[data-rule]");
	var inputs=[];
	oinput.each(function(){
		let tmp;
		tmp=new Input($(this));
		inputs.push(tmp);
	});
	$("form button").on("click",function(e){
		e.preventDefault();
	});
	$("#phoneNumber").on("blur",function(){
		let r=inputs[2].validator().allrule();
		if(r){
			$(this).parent().find("button").removeClass("disabled");
		}
		else{
			$(this).parent().find("button").addClass("disabled");
		}

	});

	$("#signup").on("click",function(e){
		e.preventDefault();
		oinput.trigger("blur");
		for (var i = inputs.length - 1; i >= 0; i--) {
			let r=inputs[i].validator().allrule();
			if(!r){
				alert("注册失败");
				return false;
			}
		}
		alert("注册成功");
	})
});