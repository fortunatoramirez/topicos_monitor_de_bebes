var socket = io.connect('http://201.174.122.203:5001', {'forceNew': true});


function render(data){

	var html = "Muestra: "+data;
	

	document.getElementById('messages').innerHTML = html;
}

// Config
var port = 5001;
var host = "ws://127.0.0.1:"+port; // No need to change this if using localhost

var explodedValues = [0]; //initial value for the plot = 0; 
var temp = [];
var carb = [];

function init() {
	try {
         //socket.on('messages', function(data){
           
          //   render(data);
            // for(var i=0; i<explodedValues.length; i++) { explodedValues[i] = parseInt(data); } 
           
          //   drawVisualization();
       //  });

         //socket.on('vector', function(data){
            // grafica_continua(data);
         //});

        socket.on('temperatura', function(data){
            console.log(data);
            temp.push(parseFloat(data));
            if (temp.length==5)
            {
                console.log("entra al if");
                grafica_temperatura(temp);
                temp=[];

            }
                
        });

        socket.on('carbono', function(data){
            console.log(data);
            carb.push(parseFloat(data));
            if (carb.length==5)
            {
                console.log("entra al if");
                grafica_carbono(carb);
                carb=[];

            }
                
        });

	}
	catch(ex){ 
		console.log(ex); 
	}
	
}

/*function drawVisualization() {
    // Create and populate the data table from the values received via websocket
    var data = google.visualization.arrayToDataTable([
        ['Tracker', '1'],
        ['Amplitud', explodedValues[0]]
    ]);
    
    // use a DataView to 0-out all the values in the data set for the initial draw
    var view = new google.visualization.DataView(data);
    view.setColumns([0, {
        type: 'number',
        label: data.getColumnLabel(1),
        calc: function () {return 0;}
    }]);
    
    // Create and draw the plot
    var chart = new google.visualization.BarChart(document.getElementById('visualization'));
    
    var options = {
        title:"Valor de amplitud",
        width: 600,
        height: 400,
        bar: { groupWidth: "95%" },
        legend: { position: "none" },
        animation: {
            duration: 0
        },
        hAxis: {
            // set these values to make the initial animation smoother
            minValue: 10,
            maxValue: 100
        }
    };
    
    var runOnce = google.visualization.events.addListener(chart, 'ready', function () {
        google.visualization.events.removeListener(runOnce);
        chart.draw(data, options);
    });
    
    chart.draw(view, options);
    
    // you can handle the resizing here - no need to recreate your data and charts from scratch
    /*
    $(window).resize(function() {
        chart.draw(data, options);
    });
    */
//} descomentar
/*
google.load('visualization', '1', {packages: ['corechart'], callback: drawVisualization});

var chart1;
var contador1;
contador1=0;
var j;
j=0;
var dat1 = [];



function grafica_continua(data){

    for(var i=0; i<data.length; i++)
    {
        dat1.push(data[i])
        j++;
    }
    //console.log("data");
    //console.log(data);
    //console.log("dat1");
    //console.log(dat1);

    if (j>=600){
        for(var i=0; i<20; i++)
            dat1.shift();
    }

    $(document).ready(function(){
        chart1= new Highcharts.Chart({
            chart : {
                zoomType: 'x', 
                scrollablePlotArea: {
                    minWidth: 100,
                    scrollPositionX: 1
                },
                renderTo: 'container1'},
            xAxis: {
                scrollbar: {
                        enabled: true
                           }
                },
            yAxis: {
                min: 150,
                max:750,
                tickAmount: 10
                
                },
            plotOptions: {
                series: {
                    animation: false,
                    marker: {
                                enabled: false
                                    }
                    }
                },
            title: {
                 text: 'Graficando muestras de forma continua'
            },
            series: [{
                name: 'señal',
                data: dat1
            }]
        })
    });

}
*/


var chart2;
var contador2;
contador2=0;
var k;
k=0;
var dat2 = [];
function grafica_temperatura(data){
    console.log(data);

    for(var i=0; i<data.length; i++)
    {
        //dat2.push(data[i])
        var time = (new Date()).getTime();
        dat2.push({
                    x: time,
                    y: data[i]
                });
        k++;
    }
    //console.log("data");
    //console.log("dat1");
    //console.log(dat1);

    if (k==10){
        for(var i=0; i<5; i++)
            dat2.shift();
        k=0;
    }

    $(document).ready(function(){
        chart2= new Highcharts.Chart({
            chart : {
                zoomType: 'x', 
                scrollablePlotArea: {
                    minWidth: 100,
                    scrollPositionX: 1
                },
                renderTo: 'container2'},
            time: {
                    useUTC: false
                },

            tooltip: {
                headerFormat: '<b>{series.name}</b><br/>',
                pointFormat: '{point.x:%Y-%m-%d %H:%M:%S}<br/>{point.y:.2f}'
                },
            xAxis: {
                type: 'datetime',
                tickPixelInterval: 150,
                scrollbar: {
                        enabled: true
                           }
                },
            yAxis: {
                min: 0,
                max:1023,
                tickAmount: 25
                
                },
            plotOptions: {
                series: {
                    animation: false,
                    marker: {
                                enabled: false
                                    }
                    }
                },
            title: {
                 text: 'Graficando muestras de forma continua Temperatura'
            },
            series: [{
                name: 'señal',
                data: dat2
            }]
        })
    });

}


var chart3;
var contador3;
contador3=0;
var l;
l=0;
var dat3 = [];
function grafica_carbono(data){
    console.log(data);

    for(var i=0; i<data.length; i++)
    {   
        var time = (new Date()).getTime();
        dat3.push({
                    x: time,
                    y: data[i]
                });
        //dat3.push(data[i])
        l++;
    }
    //console.log("data");
    //console.log("dat1");
    //console.log(dat1);

    if (l==10){
        for(var i=0; i<5; i++)
            dat3.shift();
        l=0;
    }

    $(document).ready(function(){
        chart3= new Highcharts.Chart({
            chart : {
                zoomType: 'x', 
                scrollablePlotArea: {
                    minWidth: 100,
                    scrollPositionX: 1
                },
                renderTo: 'container3'},
            time: {
                    useUTC: false
                },

            tooltip: {
                headerFormat: '<b>{series.name}</b><br/>',
                pointFormat: '{point.x:%Y-%m-%d %H:%M:%S}<br/>{point.y:.2f}'
                },
            xAxis: {
                type: 'datetime',
                tickPixelInterval: 150,
                scrollbar: {
                        enabled: true
                           }
                },
            yAxis: {
                min: 0,
                max:10000,
                tickAmount: 25
                
                },
            plotOptions: {
                series: {
                    animation: false,
                    marker: {
                                enabled: false
                                    }
                    }
                },
            title: {
                 text: 'Graficando muestras de forma continua Dioxido de carbono'
            },
            series: [{
                name: 'señal',
                data: dat3
            }]
        })
    });

}
