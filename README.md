# Covid-Map

This is a repository for our final project, the Covid map.

This code creates a map with multiple layers and is meant to act as a reference to give people information on Covid cases in an easy to understand way.
The map will first be rendered with the state boundaries and the basemap, from here you can select the desired layer to be shown.
The "covid" layer shows each state's cumulative cases per million since June 1st 2019 on a colored scale from light yellow to red.
The "tests" layer shows the state's cumalitive covid tests per million since June 1st 2019 on a colored scale from light blue to dark blue.

To create this map we used multiple software tools and APIs including:
- HTML, CSS and JavaScript
- [Leaflet.js](https://leafletjs.com)
- P5.js
- Turf.js
- Data pulled from https://disease.sh
- To make the choropleth map we used [this](https://leafletjs.com/examples/choropleth) tutorial
- Reffered to the leaflet.js library when making other elements such as the legend
