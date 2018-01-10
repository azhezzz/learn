(function(){
	let azheStorage={};
	function init(){
		azheStorage.todolist=localStorage.todolist;
		azheStorage.donelist=localStorage.donelist;
		localStorage.azhestatus="true";
	};
	// 头部
	var tdlheader=Vue.extend({
		template:"#tdlheader",
		props:["changeskin","showdialog"],
		data:function(){
			return{
				title:"azhezzz"
			}
		},
		methods:{
			changebar:function(){
				eventHub.$emit("changebar");
			},
			clearlist:function(){
				eventHub.$emit("dialog",!this.showdialog);
			},
			back:function(){
				eventHub.$emit("changeskin");
			}
		},
		mounted:function(){
			jQuery(".tdlheader").css("backgroundColor",localStorage.azhecolor);
		}
	});
	//侧边栏
	var sideBar=Vue.extend({
		template:"#side-bar",
		props:["showbar"],
		methods:{
			changeshow:function(msg){
			  localStorage.azhestatus=msg;
			  eventHub.$emit("initEdit");
			  eventHub.$emit("changeshow",msg);
			  eventHub.$emit("changebar");
			},
			skin:function(){
			  eventHub.$emit("changebar");
			  eventHub.$emit("changeskin");
			}
		}
	});
	//遮罩
	var coverlay=Vue.extend({
		template:"#coverlay",
		props:["showbar","changeskin","showdialog"],
		computed:{
			classObject:function(){
				return{
					showCoverlay:this.showbar||this.changeskin||this.showdialog
				}
			}
		},
		methods:{
			skin:function(color){
				localStorage.azhecolor=color;
				jQuery(".tdlheader").css("backgroundColor",color);
			},
			clearmsg:function(){
				if(localStorage.azhestatus==="true"){
					localStorage.todolist=undefined;
				}
				if(localStorage.azhestatus==="false"){
					localStorage.donelist=undefined;
				}
				init();
				eventHub.$emit("dialog",!this.showdialog);
			},
			esc:function(){
				eventHub.$emit("dialog",!this.showdialog);
			}
		}
	})
	//添加todoitem
	var addtdl=Vue.extend({
		template:"#addtdl",
		data:function(){
			return{
				showWriteTdl:false,
				storage:azheStorage
			}
		},
		methods:{
			changeWriteTdl:function(){
				this.showWriteTdl=!this.showWriteTdl;
				jQuery(".tdlinput .task").val("").focus();
				jQuery(".tdlinput .more").val("");
			},
			writeDown:function(){
				let item={};
				let task=jQuery(".tdlinput .task").val();
				let more=jQuery(".tdlinput .more").val();
				let todolist=[];
				if(this.storage.todolist!=="undefined"&&this.storage.todolist!==undefined){
					todolist=JSON.parse(this.storage.todolist);
				}
				item.task=task;
				item.more=more;
				item.status="todo";
				todolist.push(item);
				this.storage.todolist=JSON.stringify(todolist);
				this.showWriteTdl=!this.showWriteTdl;
				eventHub.$emit("save");
			}
		}
	})
	//显示todolist
	var todo=Vue.extend({
		template:"#todo",
		data:function(){
			return{
				storage:azheStorage,
				editItem:false,
				itemmore:null,
				index:null
			}
		},
		props:["showtodo"],
		computed:{
			list:function(){
				if(this.showtodo){
					if(this.storage.todolist!=="undefined"&&this.storage.todolist!==undefined){
						let todolist=JSON.parse(this.storage.todolist);
						return todolist;
					}	
					else return;
				}
				else{
					if(this.storage.donelist!=="undefined"&&this.storage.donelist!==undefined){
						let donelist=JSON.parse(this.storage.donelist);
						return donelist;
					}
					else return;
				}
			}
		},
		methods:{
			Done:function(item,index){
				let donelist=[];
				this.Delete(item,index);
				if(this.storage.donelist!=="undefined"&&this.storage.donelist!==undefined){
					donelist=JSON.parse(this.storage.donelist);
				}
				item.status="done"
				donelist.push(item);
				this.storage.donelist=JSON.stringify(donelist);
				this.esc();
				eventHub.$emit("save");
			},
			Edit:function(item,index){
				this.editItem=!this.editItem;
				this.itemmore=item.more;
				this.index=index;
				if(this.editItem){
					let pos={};
					jQuery(".todolist .item:eq("+index+") input").removeAttr("readonly").focus();
					pos.top=jQuery(".todolist .item:eq("+index+")").offset().top;
					pos.top+=70;
					jQuery(".todolist .more").css("top",pos.top+"px");
				}
				else{
					jQuery(".todolist .item input").attr("readonly","true");
				}
			},
			Delete:function(item,index){
				if(item.status==="todo"){
				    let todolist=JSON.parse(this.storage.todolist);
					todolist.splice(index,1);
					this.storage.todolist=JSON.stringify(todolist);
				}
				else{
					let donelist=JSON.parse(this.storage.donelist);
					donelist.splice(index,1);
					this.storage.donelist=JSON.stringify(donelist);
				}
				eventHub.$emit("save");
			},
			revise:function(){
				let index=this.index;
				let todolist=JSON.parse(this.storage.todolist);
				let item=todolist[index];
				item.task=jQuery(".todolist .item:eq("+index+") input").val();
				item.more=this.itemmore;
				console.log(item);
				todolist[index]=item;
				this.storage.todolist=JSON.stringify(todolist);
				eventHub.$emit("save");
				this.esc();
			},
			esc:function(){
				this.editItem=false;
				jQuery(".todolist .item input").attr("readonly","true");
			},
			showmore:function(item,index){
				if(!this.showtodo){
					this.editItem=!this.editItem;
					this.itemmore=item.more;
					this.index=index;
					let pos={};
					pos.top=jQuery(".todolist .item:eq("+index+")").offset().top;
					pos.top+=70;
					jQuery(".todolist .more").css("top",pos.top+"px");
				}
				return ;
			}
		},
		created:function(){
			eventHub.$on("initEdit",function(){
				this.editItem=false;
			}.bind(this))
		}
	})	
	//传递事件
	var eventHub=new Vue();
	//挂载
	var vm=new Vue({
		el:"#app",
		components:{
			tdlheader:tdlheader,
			sideBar:sideBar,
			coverlay:coverlay,
			addtdl:addtdl,
			todo:todo
		},
		data:{
			showbar:false,
			showtodo:true,
			changeskin:false,
			showdialog:false
		},
		created:function(){
			eventHub.$on("changebar",function(){
				this.showbar=!this.showbar;
			}.bind(this));
			eventHub.$on("changeskin",function(){
				this.changeskin=!this.changeskin;
			}.bind(this));
			eventHub.$on("changeshow",function(msg){
				this.showtodo=msg;
			}.bind(this));
			eventHub.$on("dialog",function(msg){
				this.showdialog=msg;
			}.bind(this));
			eventHub.$on("save",function(){
				localStorage.todolist=azheStorage.todolist;
				localStorage.donelist=azheStorage.donelist;				
			})
			init();
		},
		mounted:function(){
			localStorage.azhecolor=jQuery(".tdlheader").css("backgroundColor");
		}
	});
		
})();
