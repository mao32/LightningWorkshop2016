({
	// Your renderer method overrides go here
    rerender:function(component,helper){
        var nodes=component.superRerender();
        // If Leaflet library is not yet loaded, we can't draw the map: return
        if (!window.L) return nodes;
        
        //map is ready
        var map = component.get("v.map");
        
        // Draw the map if it hasn't been drawn yet
        if (!map) {
//            alert("define map");
            var mapElement = component.find("map").getElement();
            map = window.L.map(mapElement, {zoomControl: true,center: [51.505, -0.00], zoom: 16});
//            map = window.L.map(mapElement, {zoomControl: true}).setView([37.784173, -122.401557], 14);;
            //window.L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}', {attribution: 'Tiles © Esri'}).addTo(map);
            //L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 20, attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://cloudmade.com">CloudMade</a>' }).addTo(map);
            //L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', { attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',maxZoom: 18,id: 'your.mapbox.project.id',  accessToken: 'your.mapbox.public.access.token'}).addTo(mymap);
            L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v10/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFvMzIiLCJhIjoiY2l1MzAyOWg3MDAwODJ0bDB0bTVwZ3d2biJ9.WwGK3CNiPDzuHEJBRbkPCA',{ attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',maxZoom: 18}).addTo(map);
           // alert("centring map");

            var markers = new window.L.FeatureGroup();
			component.set("v.markers", markers);
        // Center the map
       		map.locate({watch: true, setView: true});
            //alert("drawing marker");

            // Draw the user
         // https://github.com/pointhi/leaflet-color-markers  
           
        var redIcon = new L.Icon({
            iconUrl: "https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png",
            shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34],
            shadowSize: [41, 41]
        });
        
        var userLatLng = map.getCenter();
        var userPosition = L.marker([userLatLng.lat, userLatLng.lng], {icon: redIcon}).addTo(map);
       
        //map.panTo([userLatLng.lat, userLatLng.lng]);    
          				
            // Update the user position whenever the map center updates
                map.on("locationfound", function(e) {
//                    alert("locationfound");				
                    userPosition.setLatLng(e.latlng);
                    userLatLng = map.getCenter();                    
                    helper.addMarkers(component,userLatLng)                    
                });
            component.set("v.map", map);
            //alert("creating map");
			
        }
        
        return nodes;
    }
})