(function () {
  "use strict";
  var Staffmsg=Vue.extend({
    template:"#stafftable",
    props:{
        staffMsg:Array,
        tableMsg:Array
      },
    filters:{
      capitalize:function (value) {
        return value.toUpperCase();
      }
    }
  })

  var vm=new Vue({
    el:".container",
    data:{
      searchmsg:null,
      tablemsg:["name","age","sex"],
      staffmsg:[{
        name:"a哲",
        age:18,
        sex:"男"
      },
      {
        name:"Man哲",
        age:19,
        sex:"女"
      },
      {
        name:"cw哲",
        age:18,
        sex:" 仙"
      }]
    },
    components:{
      "staffmsg":Staffmsg
    },
     computed:{
        filtersearch:function () {
        let arr=this.staffmsg;
        let show=this.searchmsg;
        if(show===null||show==="")
          return arr; 
        arr=arr.filter(function(el){
          for(let key in el){
            if(el[key].toString().toLowerCase().indexOf(show.toLowerCase())>-1)
              return true;
          }
          return false;
        });
        return arr;
        }
      },
  });
})();
