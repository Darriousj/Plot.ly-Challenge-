function buildPlot(id) {
    d3.json("samples.json").then((data)=> {
        var samples = data.samples
        var result= samples[0]
        
    // top 10 sample_values
 var TtenSamples = result.sample_values.slice(0,10).reverse()
 console.log(TtenSamples)

 // top 10 ids
 var TtenId = result.otu_ids.slice(0,10).map(otuId=>`OTU ${otuId}`).reverse()
 console.log(TtenId)
 
         
 // top 10 labels 
 var TtenLabels = result.otu_labels.slice(0,10).reverse() 
 console.log(TtenLabels)

 // create trace
 var trace = {
     x: TtenSamples,
     y: TtenId,
     text: TtenLabels,
     type:"bar",
     orientation: "h",
 };

 // create data variable
 var data = [trace];

 // create layout variable to set plots layout
 var layout = {

     title: "Top 10 OTU",
     yaxis:{
         tickmode:"TtenId",
     },
     margin: {
         l: 100,
         r: 100,
         t: 30,
         b: 30
     }
 };

 // create the bar plot
 Plotly.newPlot("bar", data, layout);

 // create the trace for the bubble chart
 var trace1 = {
     x: result.otu_ids,
     y: result.sample_values,
     mode: "markers",
     marker: {
         size: result.sample_values,
         color: result.otu_ids
     },
     text: result.otu_labels

 };

 // set the layout for the bubble plot
 var layout = {
     xaxis:{title: "OTU ID"},
     height: 600,
     width: 1300
 };

 // create the data variable 
 var data1 = [trace1];

 // create the bubble plot
   
 Plotly.newPlot("bubble", data1, layout)

    })    
}


// create the function to get the necessary data
function panelInfo(id) {
    // read the json file to get data
    d3.json("samples.json").then((data)=> {
        
        // get the metadata info for the demographic panel
        var metadata = data.metadata;

        // filter meta data info by id
        var metaId = metadata.filter(meta => meta.id.toString() === id)[0];
        
        // select demographic panel to put data
        var demoGraphic = d3.select("#sample-metadata");
        
        // empty the demographic info panel each time before getting new id info
        demoGraphic.html("");

        // grab the necessary demographic data for the id and append the info to the panel
        Object.entries(metaId).forEach((key) => {   
                demoGraphic.append("h5").text(key[0].toUpperCase() + ": " + key[1] + "\n");    
        });
    });
}

// create the function for the change event 
function optionChanged(id) {
    buildPlot(id);
    panelInfo(id);
}

// create the function for the initial data rendering
function init() {
    // select dropdown menu 
    var dropdown = d3.select("#selDataset");

    // read the data 
    d3.json("samples.json").then((data)=> {
        console.log(data)

        // get the id data to the dropdwown menu
        data.names.forEach(function(name) {
            dropdown.append("option").text(name).property("value");
        });

        // call the functions to display the data and the plots to the page
        buildPlot(data.names[0]);
        panelInfo(data.names[0]);
    });
}

init();