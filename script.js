
function getMaxOfArray(numArray) {
  return Math.max.apply(null, numArray);
}

function generate(hits, misses) {

    var n = 50;
    var y = [];
    var x = [];
	for (var i = 0; i <= n; ++i) {
		x[i] = i / n;
		y[i] = jStat.beta.pdf( x[i], hits, misses );
	}
	return {"x":x,"y":y, line: {simplify: false}};
}
 
var hits = 1;
var misses = 1;
var ymax = 6
Plotly.newPlot('graph', [generate(hits, misses)]);

  Plotly.animate('graph', {
    traces: [0],
    layout: {yaxis : {range: [0, 6]}}
  }, {
    transition: {
      duration: 150,
      easing: 'cubic-in-out'
    }
  })

function redraw(hit) {
  if (hit < 0)
  	misses=misses-hit;
  else
  	hits=hits+hit;

  var plotData = generate(hits, misses);
  var maxValue = getMaxOfArray(plotData.y);


  if (maxValue > ymax)
  {
    while (maxValue > ymax)
    {
        ymax=ymax*1.2;
    }
    Plotly.animate('graph', {
    traces: [0],
    layout: {yaxis : {range: [0, ymax]}}
  }, {
    transition: {
      duration: 150,
      easing: 'cubic-in-out'
    }
  })
  }

  Plotly.animate('graph', {
    data: [plotData],
    traces: [0]
  }, {
    transition: {
      duration: 150,
      easing: 'cubic-in-out'
    }
  })


}
