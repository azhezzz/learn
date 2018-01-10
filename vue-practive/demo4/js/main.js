(function(){
	const Home=Vue.extend({
		template:'<div><h1>首页</h1><p>{{msg}}</p></div>',
		data:function(){
			return{
				msg:"你好，Vue路由"
			}
		}
	});
	const About=Vue.extend({
		template:'<div><h1>有关</h1><p>有关Vue路由的介绍</p></div>'
	});
	
	const User={
		template:`<div>用户{{$route.params.id}}<br/>
					<router-link to="set" append>设置</router-link>
					<router-view></router-view>
				  </div>`
	}

	const Set={
		template:`<div>用户设置Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores saepe modi harum nulla porro quisquam excepturi ea soluta! Reprehenderit earum eius suscipit similique a nulla non quo dicta temporibus aspernatur.
	</div>`
	}

	var routes=[
	{path:"/home",component:Home},
	{path:"/about",component:About},
	{path:"/user/:id",name:"user",component:User,
	 children:[
	 {
		path:"set",
		component:Set
	 }
	]}	
	]

	var router=new VueRouter({
		routes:routes
	});

	var vm=new Vue({
		el:"#app",
		router:router,
		methods:{
			burf:function(){
				this.$router.push({name:"user",params:{id:"buffer"}});
			}
		}
	});
})()