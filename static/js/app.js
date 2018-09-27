function buildMetadata(sample) {

  // @TODO: Complete the following function that builds the metadata panel

  // Use `d3.json` to fetch the metadata for a sample
  d3.json(`metadata/${sample}`).then(metasample => {
    // Use d3 to select the panel with id of `#sample-metadata`
    var metadata_panel = d3.select("#sample-metadata");

    // Use `.html("") to clear any existing metadata
    metadata_panel.html("");

    // Use `Object.entries` to add each key and value pair to the panel
    // Hint: Inside the loop, you will need to use d3 to append new
    // tags for each key-value in the metadata.
    Object.entries(metasample).forEach((array) => {
      metadata_panel.append("p")
        .text(`${array[0]}: ${array[1]}`)
    });

    // BONUS: Build the Gauge Chart
    // buildGauge(data.WFREQ);
    buildGauge(metasample.WFREQ);
  });
}

function buildCharts(sample) {
  // @TODO: Use `d3.json` to fetch the sample data for the plots
  d3.json(`samples/${sample}`).then(sampleData => {
    // @TODO: Build a Bubble Chart using the sample data

    var traceBubble = {
      x: sampleData.otu_ids,
      y: sampleData.sample_values,
      text: sampleData.otu_labels,
      mode: 'markers',
      marker: {
        color: sampleData.otu_ids,
        opacity: 0.7,
        size: sampleData.sample_values
      }
    };

    var data = [traceBubble];

    var layout = {
      showlegend: false,
      height: 600,
      width: 1200
    };

    Plotly.newPlot("bubble", data, layout);

    // @TODO: Build a Pie Chart
    // HINT: You will need to use slice() to grab the top 10 sample_values,
    // otu_ids, and labels (10 each).
    
    var tempList = [];
    for (var i = 0; i < sampleData.sample_values.length; i++) 
      tempList.push({'otu_id': sampleData.otu_ids[i], 'otu_label': sampleData.otu_labels[i], 'sample_value': sampleData.sample_values[i]});

    tempList.sort((first, second) => second.sample_value - first.sample_value);

    for (var j = 0; j < tempList.length; j++) {
      sampleData.otu_ids[j] = tempList[j].otu_id;
      sampleData.otu_labels[j] = tempList[j].otu_label;
      sampleData.sample_values[j] = tempList[j].sample_value;
  };

  var ten_vals = sampleData.sample_values.slice(0,10);
  var ten_ids = sampleData.otu_ids.slice(0,10);
  var ten_labels = sampleData.otu_labels.slice(0,10);

  var tracePie = {
    values: ten_vals,
    labels: ten_ids,
    type:'pie',
    text: ten_labels,
    textinfo: 'percent',
    hoverinfo: 'label+text+value+percent',
  };

  var data = [tracePie];

  var layout = {
    height: 500,
    width: 500
  }

  Plotly.newPlot("pie", data, layout);

  });
}

function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");

  // Use the list of sample names to populate the select options
  d3.json("/names").then((sampleNames) => {
    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });

    // Use the first sample from the list to build the initial plots
    const firstSample = sampleNames[0];
    buildCharts(firstSample);
    buildMetadata(firstSample);
  });
}

function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  buildCharts(newSample);
  buildMetadata(newSample);
}

// Initialize the dashboard
init();
