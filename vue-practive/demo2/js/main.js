

	// 员工信息表
	// tableMsg为表格各列信息
	// staffMsg为表格的员工信息，由search过滤后的员工信息传入
	var stafftable={
		template:"#stafftable",
		props:["tableMsg","staffMsg"],
		filters:{
	// capitalize将各列的属性转换为大写
			capitalize:function(msg){
				return msg.toUpperCase();
			}
		},
		methods:{
	//将要删除元素的索引号发出，并触发deleteitem事件
			deleteitem:function(index){
				eventHub.$emit("deleteitem",index);
			},
	//打开创建员工模态框
			createdialog:function(){
				eventHub.$emit("createdialog");
			},
	//打开修改员工模态框，并将要修改的员工索引号传递
			revisedialog:function(index){
				eventHub.$emit("revisedialog",index)
			}
		}

	}


	//模态对话框
	var staffdialog={
		template:"#staffdialog",
		props:["dialogtitle","staffmsg","revisemode"],
		// data:function(){
		// 	return {
		// 		name:3,
		// 		age:null,
		// 		sex:"1"
		// 	}
		// },
		methods:{
			closedialog:function(){
				eventHub.$emit("closedialog");
			},
		//将新员工信息保存在对象发送给父组件
			savestaff:function(){
					let staff={};
					staff.name=this.staffmsg.name;
					staff.age=this.staffmsg.age;
					staff.sex=this.staffmsg.sex;
					eventHub.$emit("savestaff",staff);				
			},
		}

	}
	
	//用于组件间的通信
	var eventHub=new Vue();

	//实例，相当于stafftable的父组件
	var vm=new Vue({
		el:"#demo",
		data:{
			searchmsg:null,
			tablemsg:["name","age","sex"],
			staffmsg:[{name:"a哲",age:18,sex:"潮男"},
					  {name:"Man哲",age:19,sex:"超男"},
					  {name:"沉稳哲",age:20,sex:"super男"}
					  ],
			dialogstate:false,
			dialogtitle:null,
			staffrevising:{},
			indexrevising:null,
			revise:null,
		},

		computed:{
	//根据searchmsg将员工信息过滤，然后传给stafftable
			filtermsg:function(){
				let filterstr=this.searchmsg;
				let arr=this.staffmsg;			
				if(filterstr===null||filterstr==="")
					return this.staffmsg;
				arr=arr.filter(function(staff){
					for(let key in staff){
						if(staff[key].toString().toLowerCase().indexOf(filterstr.toLowerCase())>-1)
							return true;
					}
					return false;
				});
				return arr;
			}
		},
		components:{
			"stafftable":stafftable,
			"staffdialog":staffdialog,
		},
	//实例被创建之后调用
		created:function(){
		//监听deleteitem事件，触法时调用deleteitem方法
			eventHub.$on("deleteitem",this.deleteitem);
			eventHub.$on("createdialog",this.createdialog);
			eventHub.$on("revisedialog",this.revisedialog);
			eventHub.$on("closedialog",this.closedialog);
			eventHub.$on("savestaff",this.savestaff);
		},
		methods:{
			deleteitem:function(index){
				this.staffmsg.splice(index,1);
			},
			createdialog:function(){
				this.dialogtitle="创建";
				this.revise=false;
				this.staffrevising={};
				this.indexrevising=this.staffmsg.length;
				this.dialogstate=true;
			},
			revisedialog:function(index){
				this.dialogtitle="修改";
				this.revise=true;
				this.staffrevising=this.staffmsg[index];
				this.indexrevising=index;
				this.dialogstate=true;
			},
			closedialog:function(){
				this.dialogstate=false;
			},
		//保存员工信息，若员工名字重复，则为修改信息
			savestaff:function(staff){
				this.staffmsg.splice(this.indexrevising,1,staff)
				this.closedialog();
			}

		}
	});


