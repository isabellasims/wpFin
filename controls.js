// ***  CHLOR STYLE  *** //
function getColor(d) {
    return d > 130000 ? '#4f001a' :
        d > 100000 ? '#800026' :
            d > 90000  ? '#BD0026' :
                d > 80000  ? '#E31A1C' :
                    d > 70000  ? '#FC4E2A' :
                        d > 60000   ? '#FD8D3C' :
                            d > 50000   ? '#FEB24C' :
                                d > 40000   ? '#FED976' :
                                    d > 30000   ? '#FFEDA0' :
                                        d > 20000   ? '#faffc5' :
                                            '#fff5f0';
}

//GET CHLOR COLORS BASED ON CASES PER MIL NUM
function getColor(d) {
    return d > 1200000 ? '#08306b' :
    d > 1100000 ? '#08519c' :
    d > 1000000 ? '#2171b5' :
    d > 900000 ? '#4292c6' :
    d > 800000 ? '#6baed6' :
    d > 700000 ? '#9ecae1' :
    d > 600000 ? '#c6dbef' :
    d > 500000 ? '#deebf7' :
    d > 400000 ? '#f7fbff' :
    d > 130000 ? '#4f001a' :
        d > 100000 ? '#800026' :
        d > 90000  ? '#BD0026' :
            d > 80000  ? '#E31A1C' :
                d > 70000  ? '#FC4E2A' :
                    d > 60000   ? '#FD8D3C' :
                        d > 50000   ? '#FEB24C' :
                            d > 40000   ? '#FED976' :
                                d > 30000   ? '#FFEDA0' :
                                    d > 20000   ? '#faffc5' :
                                        '#fff5f0';
}



// CREATE FUNCTION TO STYLE AND APPLY GET COLOR
function style(feature) {
    return {
        // apply get color
        fillColor: getColor(feature.properties.casesPerOneMillion),
        weight: 2,
        opacity: 1,
        color: 'white',
        dashArray: '3',
        fillOpacity: 0.7
    }
}

// CREATE FUNCTION TO STYLE AND APPLY GET COLOR
function style2(feature) {
    return {
        // apply get color
        fillColor: getColor(feature.properties.testsPerOneMillion),
        weight: 2,
        opacity: 1,
        color: 'white',
        dashArray: '3',
        fillOpacity: 0.7
    }
}


// *** INFO PANNEL *** //
var milInfo = L.control();
milInfo.onAdd = function (map) {
    this._div = L.DomUtil.create('div', 'info');
    this.init();
    return this._div;
};
milInfo.init = function () {
    this._div.innerHTML = '<h4>Select a layer</h4>'
};
milInfo.update = function (props) {
    this._div.innerHTML = '<h4>US Covid Cases Per Million since June 1, 2019</h4>' +  (props ?
        '<b>' + props.name + '</b><br />' + props.casesPerOneMillion + ' cases per million since June 1 2019<sup></sup>'
        : 'Hover over a state');
};

milInfo.update2 = function (props) {
    this._div.innerHTML = '<h4>US Covid Tests Per Million since June 1, 2019</h4>' +  (props ?
        '<b>' + props.name + '</b><br />' + props.testsPerOneMillion + ' tests per million since June 1 2019<sup></sup>'
        : 'Hover over a state');
};



// *** LAYER EVENTS *** //
function highlightFeature(e) {
    var layer = e.target;

    layer.setStyle({
        weight: 5,
        color: '#666',
        dashArray: '',
        fillOpacity: 0.7
    });

    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
        layer.bringToFront();
    }

    milInfo.update(layer.feature.properties);

}


function resetHighlight(e) {

    geo.resetStyle(e.target);

    milInfo.update();

}
// *** LAYER EVENTS *** //
function highlightFeature2(e) {
    var layer = e.target;

    layer.setStyle({
        weight: 5,
        color: '#666',
        dashArray: '',
        fillOpacity: 0.7
    });

    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
        layer.bringToFront();
    }

    milInfo.update2(layer.feature.properties);

}


function resetHighlight2(e) {

    testsLayer.resetStyle(e.target);
    milInfo.update2();
}


function onEachFeature(feature, layer) {
    layer.on({
        mouseover: highlightFeature,
        mouseout: resetHighlight,
    });
}
function onEachFeature2(feature, layer) {
    layer.on({
        mouseover: highlightFeature2,
        mouseout: resetHighlight2,
    });
}
// ***  PER MIL CHLORO LEGEND  *** //
// add the legend to the map
var milLegend = L.control({position: 'bottomright'});

// legend shell derived from leaflet.js documentation. Altered to fit our own needs.
milLegend.onAdd = function (map) {

    var div = L.DomUtil.create('div', 'info legend'),

        grades = [30000, 40000, 50000, 60000, 70000, 80000, 90000, 100000,130000,400000,500000,600000, 700000,800000,900000,1000000,1100000],
        labels = [],
        from, to;

    for (var i = 0; i < grades.length; i++) {
        from = grades[i];
        to = grades[i + 1];

        labels.push(
            '<i style="background:' + getColor(from + 1) + '"></i> ' +
            from + (to ? '&ndash;' + to : '+'));
    }

    div.innerHTML = labels.join('<br>');
    return div;
};

