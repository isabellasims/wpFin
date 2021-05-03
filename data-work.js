// *** GET THE COVID DATA *** //
function setup(){
    loadJSON("https://disease.sh/v3/covid-19/states",gotData);
}

// *** FORMAT THE DATA *** //
// adds casesPerMillion and testsPerMillion from queried data to states data
function gotData(data){
    covid = data;
    statesData.features[1].properties.casesPerOneMillion = covid[1].casesPerOneMillion;
    // add covid cases to states data
    for (let i = 0; i < statesData.features.length; i++) {
        for (let j = 0; j < statesData.features.length; j++) {
            if (statesData.features[i].properties.name === covid[j].state) {
                // add cases per million to statesData
                statesData.features[i].properties.casesPerOneMillion = covid[j].casesPerOneMillion;
                // add tests per million to statesData
                statesData.features[i].properties.testsPerOneMillion = covid[j].testsPerOneMillion;
                break;
            }
        }
    }
    geo.addData(statesData); // another part of the solution - addData function
    testsLayer.addData(statesData);
}



