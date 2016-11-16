({
	doInit : function(component, event, helper) {
		var action = component.get("c.findAll");
        action.setCallback(this,function(response){
//            alert("response come");
			  var accounts=response.getReturnValue();
            component.set("v.accounts",accounts);
            var event=$A.get("e.c:AccountsLoaded");
            event.setParams({"accounts":accounts});
            event.fire();
        });
        $A.enqueueAction(action);
	},
    selectAccount:function(component,event,helper){
       // alert("account selected");
       var source=event.currentTarget;
       // alert(source.getAttribute("id"));
      var idx= source.getAttribute("id");
      var event=$A.get("e.c:SelectAccount");
      //var event=component.getEvent("selectAccount");
        event.setParam("index",idx);
        event.fire();
       
    }
})