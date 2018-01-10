$(function(){
	"use strict";
	//暴露构造函数
	window.Input=function(seletor){
		var data_rule
		, rule={}
		, $ele
		, rulestr
		, me=this
		, val;

		function init(){
			findme(); //确定自己元素
			parserule();//解析验证规则
			listen();//监听失去焦点事件
		}

		function findme(){
			if(seletor instanceof jQuery)
				$ele=seletor;
			$ele=$(seletor);
			rulestr=$ele.data("rule");
		}

		function parserule(){
			data_rule=rulestr.split("|");
			for(let i=0;i<data_rule.length;i++){
				let a=[];
				a=data_rule[i].split(":");
				rule[a[0]]=a[1];
			}
		}

		function listen(){
			$ele.on("blur",function(){
				val=$ele.val();
				console.log(this);
				let r=me.validator().allrule();
				if(r){
					$(this).parent().children(".err-tip").hide();
					$(this).parent().addClass("has-success");
					$(this).parent().removeClass("has-error");
				}
				else{
					$(this).parent().children(".err-tip").show();
					$(this).parent().addClass("has-error");
					$(this).parent().removeClass("has-success");
				}
			})
		}

		init();

		this.validator=function(){
			let r=new Validator(val,rule);
			return r;
		}
	};
});