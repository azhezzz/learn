$(function(){
"use strict";
	//验证器
	window.Validator=function(val,rule){
		this.allrule=function(){
			//如果不是必填项，则跳过
			if(!this.validata_required())
				return true;
			//如果有空格项，则显示错误
			if(val.indexOf(" ")>-1)
				return false;
			//遍历元素验证规则中的规则
			for(let i in rule){
				if(i==="required")
					continue;
				if(!this["validata_"+i]()){
					return false;
				}
			}
			return true;
		}
		//验证长度
		this.validata_maxlength=function(){
			val=val.toString();
			if(val.length<=rule.maxlength)
				return true;
			return false;
		}

		this.validata_minlength=function(){
			val=val.toString();
			if(val.length>=rule.minlength)
				return true;
			return false;
		}

		this.validata_max=function(){
			val=parseFloat(val);
			if(val<=rule.max)
				return true;
			return false;
		}

		this.validata_min=function(){
			val=parseFloat(val);
			if(val>=rule.min)
				return true;
			return false;
		}

		this.validata_required=function(){
			if(rule.required==="false")
				return false;
			return true;
		}

		this.validata_pattern=function(){
			let reg=new RegExp(rule.pattern);
			if (reg.test(val))
				return true;
			return false;

		}
	}
});