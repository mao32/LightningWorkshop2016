({
	scriptsLoaded : function(component, event, helper) {
        console.log("script loaded");
		//alert("script loaded");
//		component.rerender(component,helper);
	},
    accountsLoaded:function(component,event,helper){
        var accounts=event.getParam("accounts");
		//alert("event coming");
        component.set("v.accounts",accounts);
        helper.addMarkers(component);
    },
    selectAccount:function(component,event,helper){
        var idx=event.getParam("index");
        helper.selectAccount(component,idx);
    }
})