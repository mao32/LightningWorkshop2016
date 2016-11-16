({
    selectAccount: function(component,idx){
        var accounts=component.get("v.accounts");
        var map = component.get('v.map');
        
        var account=accounts[idx];
        map.panTo([account.BillingLatitude, account.BillingLongitude]);    
    },
	addMarkers  : function(component) {
        //console.log("userLat "+JSON.stringify(userLatLng));       
        var map = component.get('v.map');
        
        
        
        var markers = component.get('v.markers');
        var accounts = component.get('v.accounts');
		
        // Remove existing markers
        if (markers) {
            //alert("remove existing markers");
            markers.clearLayers();
        }
		        
		// Get all Leads, plot as Markers
		// // Add Markers
        if (map && accounts && accounts.length> 0) {		
            var userLatLng = map.getCenter(); 
            var accountPopups = [];
            //var userLatLng = map.getCenter();
            
            for (var i = 0; i < accounts.length; i++) {
                //alert("account found");
                console.log(JSON.stringify(accounts[i]));
                if (accounts[i].BillingLatitude  && accounts[i].BillingLongitude ) {
                    //alert("put account marker name: "+accounts[i].Name+"lat: "+accounts[i].BillingLatitude+" long:"+accounts[i].BillingLongitude);
                    accountPopups[i] = L.marker([accounts[i].BillingLatitude, accounts[i].BillingLongitude])
                       // L.marker([45.59423,8.926295]).addTo(map);
                    
                    .bindPopup("<a href=\"/one/one.app#/sObject/" + 
                               accounts[i].Id + "/view\">" + accounts[i].Name + 
                               "</a><br /><br />Distance from your location: " + 
                               this.calculateHaversineDistance(accounts[i].BillingLatitude, accounts[i].BillingLongitude, userLatLng.lat, userLatLng.lng) + 
                               " km"
                              )    // .addTo(map);
                    markers.addLayer(accountPopups[i]);
                }
            }
            map.addLayer(markers);
            
        }
	},
    
    calculateHaversineDistance: function(lat1, lon1, lat2, lon2) {
    	var radius = 6371.00;
        var dLat = this.toRadians(lat2 - lat1);
        var dLon = this.toRadians(lon2 - lon1);
        var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.cos(this.toRadians(lat1)) * Math.cos(this.toRadians(lat2)) *
            Math.sin(dLon/2) * Math.sin(dLon/2);
        var c = 2 * Math.asin(Math.sqrt(a));
        //var kmToMiles = 0.621371;
		var kmToMiles = 1.0;
        return (radius * c * kmToMiles).toFixed(2);
    },

    toRadians: function(degree) {
    	return ((degree * 3.1415926) / 180);
    }
})