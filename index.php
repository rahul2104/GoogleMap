<html>
    <head>
        <base href="">
          <script type="text/javascript" src="https://maps.googleapis.com/maps/api/js?sensor=false&libraries=places,drawing"></script>
          <script src="js/jquery-2.1.1.min.js"></script>
          <script src="js/mymap.js"></script>
          <style>
              #eventLocation{
                      border: 1px solid;
                    font-size: 20px;
                    padding: 5px;
                    width: 50%;
              }
          </style>
    </head>
    <body onLoad="initialize()">  
        
            <div class="double clearfix" style="display: none">
                <div class="row" >
                <label>Latitude </label>
                <div class="input">
                    <input type="text" name="latitude" id="latitude" readonly/>
                </div>
                <label class="error_div"></label>
                </div>
                <div class="row">
                <label>Longitude</label>
                <div class="input">
                    <input type="text" name="longitude" id="longitude" readonly/>
                </div>
                <label class="error_div"></label>
                </div>
                <input type="text" name="locality" id="locality" readonly/>
                <input type="text" name="city" id="city" readonly/>
                <input type="text" name="state" id="state" readonly/>
                <input type="text" name="country" id="country" readonly/>
                <input type="text" name="postalcode" id="postalcode" readonly/>
                <input type="text" name="route" id="route" readonly/>
                <input type="text" name="country1" id="country1" readonly/>
                <input type="text" name="sublocality_level_1" id="sublocality_level_1" readonly/>
            </div>
            <div class="row">
                <label>Event Location</label>
                <div class="input">
                    <input type="text" name="eventLocation" id="eventLocation"/>
                </div>
                <label class="error_div"></label>
            </div>
            <div class="row">
                <label class="">Select Location</label>
                <div class="mapLA wel" id="mapLA" style="width: 940px; padding-top:10px;">
                    <div id="map" style="width: 800px; height: 400px"></div>
                    <div id="markerStatus" onload="initialize()"></div>
                    <div id="info"></div>
                    <div id="address1"></div>
                </div>
            </div>
            
        
    </body>
</html>