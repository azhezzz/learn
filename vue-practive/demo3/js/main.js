(function(){
	var UserData=[
		{
			index:"A",
			user:[{
				name:"a1",
				tel:"13714553522",
			},{
				name:"a2",
				tel:"13714553523",
			},{
				name:"a3",
				tel:"13714553524",
			}]
		},
		{
			index:"B",
			user:[{
				name:"b1",
				tel:"15602978360",
			},{
				name:"b2",
				tel:"15602978361",
			},{
				name:"b3",
				tel:"15602978362",
			}]
		},
		{
			index:"C",
			user:[{
				name:"c1",
				tel:"12332112345"
			},{
				name:"c2",
				tel:"12332112344",
			},{
				name:"c3",
				tel:"12332112345",
			}]
		},
		{
			index:"D",
			user:[{
				name:"d1",
				tel:"18802978360",
			},{
				name:"d2",
				tel:"18802978361",
			},{
				name:"d3",
				tel:"18802978362",
			}]
		},
		{
			index:"E",
			user:[{
				name:"e1",
				tel:"12332112345"
			},{
				name:"e2",
				tel:"12332112344",
			},{
				name:"e3",
				tel:"12332112345",
			}]
		},
		{
			index:"F",
			user:[{
				name:"f1",
				tel:"18802978360",
			},{
				name:"f2",
				tel:"18802978361",
			},{
				name:"f3",
				tel:"18802978362",
			}]
		},
	]

	var myheader={
		template:"#myheader",
		data:function(){
			return{
			}
		},
		props:{
			headerTitle:{
				type:String,
				default:"标题"
			}
		},
		methods:{
			back:function(){
				alert("back");
			},
			home:function(){
				alert("home");
			}
		}
	};

	var myUserlist={
		template:"#my-userlist",
		props:{
			UserData:{
				type:Array,
				default:function(){
					return [];
				}
			}
		},
		methods:{
			moveindex:function(ev){
				let str=ev.target.innerHTML;
				let arr=this.$refs.listuser.getElementsByTagName("p");
				for(let i=0;i<arr.length;i++){
					if(arr[i].innerHTML===str){
						// document.body.scrollTop=arr[i].offsetTop;
						document.documentElement.scrollTop=arr[i].offsetTop;
						return;
					}
				}
			},
			indexlistset:function(){
				console.log(this.$refs.listindex);
				let H=this.$refs.listindex.offsetHeight;
				this.$refs.listindex.style.marginTop=(-H/2)+"px";
			},
			callit:function(msg){
				eventHub.$emit("showalert",msg);
			}
		},
		mounted:function(){
			this.indexlistset();
		}
	}

	var myAlert={
		template:"#alert",
		props:{
			"alertTitle":{
				type:String,
				default:"弹出层标题"
			},
			"alertMsg":{
				type:null,
				dafault:"弹出层信息"
			}
		},
		methods:{
			cancel:function(){
				eventHub.$emit("closealert");
			}
		}
	}
	var eventHub=new Vue();

	var vm=new Vue({
		el:"#app",
		data:{
			UserData:UserData,
			alertshow:false,
			alertmsg:null
		},
		components:{
			"my-header":myheader,
			"my-userlist":myUserlist,
			"my-alert":myAlert
		},
		created:function(){
			eventHub.$on("showalert",function(msg){
				this.alertshow=true;
				this.alertmsg=msg;
			}.bind(this));
			eventHub.$on("closealert",function(){
				this.alertshow=false;
				this.alertmsg=null;
			}.bind(this));
		}
	})
})();