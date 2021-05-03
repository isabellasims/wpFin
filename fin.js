// final js final to be added in head after everything else has loaded
let covid;
let geo;
let bounds = L.geoJson(statesData);
bounds.addTo(map);
let testsLayer;


geo = L.geoJson(statesData, {
    style: style,
    onEachFeature: onEachFeature,

});

testsLayer = L.geoJson(statesData, {
    style: style2,
    onEachFeature: onEachFeature2,

});


var overlayMaps = {
    "tests":testsLayer,
    "covid": geo,
    "bounds":bounds,



};

var controlLayers = L.control.layers(overlayMaps,null); // null means you can only have one layer selected at once, is essential to layer control
controlLayers.addTo(map);
milLegend.addTo(map);

milInfo.addTo(map);



// ** LEGEND & INFO CONTROL ** //
// to fix order should change innerHTML instead of adding / removing from map so that info can always be added to map
map.on("baselayerchange", function (eventLayer) {
    if (eventLayer.name === 'tests') {
        document.querySelector("#map > div.leaflet-control-container > div.leaflet-top.leaflet-right > div.info.leaflet-control > h4").innerText = "US Tests Per Million since June 1, 2019";
        milInfo.innerHTML = "US Tests Cases Per Million since June 1, 2019";
        console.log("TESTS LAYER TRIGGERED");
    }

    else if (eventLayer.name === 'covid') {
        document.querySelector("#map > div.leaflet-control-container > div.leaflet-top.leaflet-right > div.info.leaflet-control > h4").innerText = "US Cases Per Million since June 1, 2019";
        console.log("COVID LAYER TRIGGERED");

    }


    else {
        document.querySelector("#map > div.leaflet-control-container > div.leaflet-top.leaflet-right > div.info.leaflet-control > h4").innerText = "Select a Layer";
        console.log(eventLayer.name);
        milInfo.innerHTML = "Select a layer";

    }
});
