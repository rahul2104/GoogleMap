/**
 * Created by Rahul Singh
 */
$(document).ready(function(){
    $('#location-map').on('hide.bs.modal', function() {
        latlng = new google.maps.LatLng(25.245693, 55.353973);
        initialize();
    });	
});
var state={};
state.long_name='';
var city={};
city.long_name='';
var type;

var geocoder = new google.maps.Geocoder();
function geocodePosition(pos){
    geocoder.geocode({latLng: pos},function(responses){
        if (responses && responses.length > 0)
        {   
            //console.log(responses[0]);
            count=0;
            for (var i=0; i<responses[0].address_components.length; i++)
            {
                if (responses[0].address_components[i].types[0] == "route")
                {
                    route = responses[0].address_components[i];
                }
                if (responses[0].address_components[i].types[0] == "administrative_area_level_2")
                {
                    city = responses[0].address_components[i];
                }
                if (responses[0].address_components[i].types[0] == "sublocality_level_1"||responses[0].address_components[i].types[0] == "political"||responses[0].address_components[i].types[0]=="sublocality")
                {
                    sublocality_level_1 = responses[0].address_components[i];
                }
                if (responses[0].address_components[i].types[0] == "locality")
                {
                    locality = responses[0].address_components[i];
                }
                
                if (responses[0].address_components[i].types[0] == "postal_code")
                {
                    postalcode= responses[0].address_components[i];
                }else{
                    postalcode= "";
                }
                if (responses[0].address_components[i].types[0] == "country")
                {
                    country= responses[0].address_components[i];
                   
                }
                if (responses[0].address_components[i].types[0] == "administrative_area_level_1")
                {
                    count=i;
                    state= responses[0].address_components[i];
                    
                }
                
            }   
            var add1='';
            for (var i=0; i<responses[0].address_components.length; i++)
            {
				
				if (responses[0].address_components[i].types[0] == "administrative_area_level_1")
                {
                    //state= responses[0].address_components[i];
                    break;
                }
                add1=add1+' '+responses[0].address_components[i].long_name;
			}
			if(city.long_name=='')city=locality;
               
            updateMarkerAddress(responses[0].formatted_address);
            console.log(responses[0].formatted_address);
            rs=responses[0].formatted_address.split(country.long_name);
            //console.log(add1);
            //document.getElementById('route').value = rs[0];
            document.getElementById('route').value = add1;
            document.getElementById('country1').value = country.short_name;
			document.getElementById('state').value = state.long_name;
          
            document.getElementById('sublocality_level_1').value = sublocality_level_1.long_name;
            document.getElementById('locality').value = locality.long_name;
            document.getElementById('city').value = city.long_name;
            
            
            document.getElementById('postalcode').value = postalcode.long_name;
            
        } else {
            updateMarkerAddress('Cannot determine address at this location.');
        }
    });
}


function updateMarkerStatus(str) {
    document.getElementById('markerStatus').innerHTML = str;
}
function updateMarkerPosition(latlng) {
    document.getElementById('info').innerHTML = [
        latlng.lat(),
        latlng.lng()
    ].join(', ');
    document.getElementById('latitude').value = latlng.lat();
    document.getElementById('longitude').value = latlng.lng();
}
function updateMarkerAddress(str) {
    document.getElementById('address1').innerHTML = str;
    document.getElementById('eventLocation').value = str;
    // document.getElementById('zoneLocation').value = str;
     if(type=='circle')
    {
    if(cityCircle!='')
    cityCircle.setMap(null);
    cityCircle="";
    drwaingManager();
	}
	 else if(type=='custom' && complete==0)
    {
	drwaingManagerCustom();
	}

}

var latlng = new google.maps.LatLng(25.245693, 55.353973);
var map;
var marker;
var zoom=13;
var complete=0;
function initialize() {
	
    var myOptions = {
        zoom: zoom,
        center: latlng,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    map = new google.maps.Map(document.getElementById("map"), myOptions);
   // myzoom=map.getZoom();
    //console.log(myzoom);
    marker = new google.maps.Marker({
        position: latlng,
        title: 'Location Point',
        map: map,
        draggable: true
    });
    // Update current position info.
    updateMarkerPosition(latlng);
    geocodePosition(latlng);
    // Add dragging event listeners.
    google.maps.event.addListener(marker, 'dragstart', function() {
        updateMarkerAddress('Dragging...');
    });
    google.maps.event.addListener(marker, 'drag', function() {
        updateMarkerStatus('Dragging...');
        updateMarkerPosition(marker.getPosition());
    });
    google.maps.event.addListener(marker, 'dragend', function() {
        updateMarkerStatus('Drag ended');
        geocodePosition(marker.getPosition());
    });
    var input=document.getElementById('eventLocation');
    //alert(input.value);
    var autocomplete = new google.maps.places.Autocomplete(input);

    google.maps.event.addListener(autocomplete, 'place_changed', function() {

        var place = autocomplete.getPlace();
        
        latlng = new google.maps.LatLng(place.geometry.location.lat(),place.geometry.location.lng());

        map.setCenter(latlng);

        map.setZoom(17);

        marker.setPosition(latlng);

        updateMarkerPosition(latlng);
        geocodePosition(latlng);
        updateMarkerAddress(input.value);
        
        
        
        
    });

}
