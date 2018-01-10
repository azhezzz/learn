$(function(){
	window.CarouselFiguer=function (option) {
		var timer=null,
		imgnum=0,
		$el=$(option.seletor),
		imgtotal=$el.find("#imglist li").length,
		me=this;
	function init(){
		if(option.autoplay){
			autoplay();
			mouse();
		}	
		if(option.btn){
		  createbtn();
		  carouselbtn();
		}	
	}
	init();
	function mouse(){
		$el.find("#imglist li").on("mouseover",function(){
			clearInterval(timer);
		})
		$el.find("#imglist li").on("mouseout",function(){
			timer=setInterval(move,1500);
		})
	}
	function createbtn(){
		console.log($el);
		$el.append("<ol id='imgbutton'></ol>")
		console.log(2);
		console.log(imgtotal);
		for(let i=0;i<=imgtotal-2;i++){
			$el.children("#imgbutton").append("<li>"+(i+1)+"</li>");
			console.log(i);
		}

		$el.find("#imgbutton li:eq(0)").addClass("active");
	}

	function carouselbtn(){
		//鼠标移动到对应轮播图的按钮时，暂停自动播放，显示对应图片
		$el.find("#imgbutton li").on("mouseover",function () {
			clearInterval(timer);
			$(this).addClass("active");
			$(this).siblings().removeClass("active");		
			let index=$(this).index();
			$("#imglist").animate({
				left:"-"+(800*index).toString()+"px"
			});
		});
		//鼠标移出轮播图按钮时，开始自动播放
		$el.find("#imgbutton li").on("mouseout",function () {
			imgnum=$(this).index();
			timer=setInterval(move,1500);
		});
	}
	
	//页面加载后，等待1s，然后自动播放
	function autoplay(){
		timer=setTimeout(function(){
		clearTimeout(timer);
		timer=setInterval(move, 1500);
	}, 1000);
	}

	//轮播图轮播
	function move(){
		//轮播图对应按钮激活
		let r=$("#imgbutton li:eq("+(imgnum+1)+")");
		if(imgnum===4){
			r=r=$("#imgbutton li:eq(0)");
		}		
		r.addClass("active");
		r.siblings().removeClass("active");
		//轮播图轮播
		$("#imglist").animate({
			left:"-=800px"
		} ,"slow",function(){					//当播到最后一张图片（与第一张一样）时，轮播图位置复位。
			imgnum+=1;
			if(imgnum===imgtotal-1){
				$("#imglist").css("left","0");
				imgnum=0;
			}
		}
		);
	
	}

}	
});