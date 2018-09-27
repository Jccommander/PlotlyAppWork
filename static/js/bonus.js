function buildGauge(WFEQ) {
    // Use if statement to detect if WFEQ is 0 to prevent needle from going below gauge
    if(WFEQ === 0) {
        var levelCalc = 10;
    }
    else {
        // Multiply the WFEQ by 20 to make it easy to plug into existing gauge chart
        var levelCalc = WFEQ * 20 - 10;
    };

    var level = levelCalc;

    // Trig to calc meter point
    var degrees = 180 - level,
        radius = .5;
    var radians = degrees * Math.PI / 180;
    var x = radius * Math.cos(radians);
    var y = radius * Math.sin(radians);

    // Path: may have to change to create a better triangle
    var mainPath = 'M -.0 -0.025 L .0 0.025 L ',
         pathX = String(x),
         space = ' ',
         pathY = String(y),
         pathEnd = ' Z';
    var path = mainPath.concat(pathX,space,pathY,pathEnd);

    var data = [{ type: 'scatter',
        x: [0], y:[0],
        marker: {size: 28, color:'850000'},
        showlegend: false,
        name: 'speed',
        text: WFEQ,
        hoverinfo: 'text+name'},
    { values: [50/9, 50/9, 50/9, 50/9, 50/9, 50/9, 50/9, 50/9, 50/9, 50],
    rotation: 90,
  text: ['8-9', '7-8', '6-7', '5-6', '4-5', '3-4', '2-3',
            '1-2', '0-1', ''],
  textinfo: 'text',
  textposition:'inside',
  marker: {colors:['#9a7d0a', '#b7950b', '#d4ac0d', '#f1c40f','#f4d03f', '#f7dc6f', '#f9e79f', '#fcf3cf', '#fef9e7',
                         'rgba(255, 255, 255, 0)']},
  labels: ['8-9', '7-8', '6-7', '5-6', '4-5', '3-4', '2-3', '1-2', '0-1', ''],
  hoverinfo: 'label',
  hole: .5,
  type: 'pie',
  showlegend: false
}];

var layout = {
  shapes:[{
      type: 'path',
      path: path,
      fillcolor: '850000',
      line: {
        color: '850000'
      }
    }],
  title: 'Gauge', 
 Speed: 0-100,
  height: 500,
  width: 500,
  xaxis: {zeroline:false, showticklabels:false,
             showgrid: false, range: [-1, 1]},
  yaxis: {zeroline:false, showticklabels:false,
             showgrid: false, range: [-1, 1]}
};

Plotly.newPlot('gauge', data, layout);
};