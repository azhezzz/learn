$(function(){
"use strict";

		var oinput=$("input[data-rule]");
		var inputs=[];


		oinput.each(function(){
			let tmp=new Input($(this));
			inputs.push(tmp);
		});


		$("#signup").on("click",function(){
			oinput.trigger("blur");
			console.log(inputs);
			for(let i=0; i < inputs.length ; i++ ){
				console.log(inputs[i]);
				let r=inputs[i].validator().allrule();
				console.log(r);
				if(!r){
					alert("注册失败");
					return false;
				}
			}
			alert("注册成功");
		});



	
});