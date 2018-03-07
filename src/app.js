const fs = require('fs');
const fileName = './baza.bin';
const chart = require('chart.js');

const row = 120; 
const number = 4; // float - 4 byte
const rowSize = row*number;

let xAxis = new Array(row);
let yAxis = new Array(row);
let position = 0;

// TODO: use promise [ ]

const readRow = (position, rowSize, number) => {
    fs.open(fileName, 'r', function(err, fd) {
        if(err) {
            // TODO: display error in app [ ]
            // ...
            return console.error(err.message);
        }

        let buffer = new Buffer(rowSize); 
        position = fs.read(fd, buffer, 0, rowSize, position, function(err, bytesRead) {
            if(err) {
                return console.error(err);
            }
        });

        for(let i = 0; i < rowSize; i=i+number){
            console.log(buffer.readFloatLE(i));
        }
    });
}

readRow(position,rowSize,number);
readRow(position+rowSize,rowSize,number); // TO CHANGE -> use promiese/await

const chartGenerate = () => {
   
    window.chartColors = {
        red: 'rgb(255, 99, 132)',
        orange: 'rgb(255, 159, 64)',
        yellow: 'rgb(255, 205, 86)',
        green: 'rgb(75, 192, 192)',
        blue: 'rgb(54, 162, 235)',
        purple: 'rgb(153, 102, 255)',
        grey: 'rgb(201, 203, 207)'
    };
  
	var randomScalingFactor = function() {
		return Math.ceil(Math.random() * 10.0) * Math.pow(10, Math.ceil(Math.random() * 5));
	};

	var config = {
		type: 'line',
		data: {
			labels: ['test', 'test', 'test', 'test', 'test', 'test', 'test'],
			datasets: [{
				label: 'Line_2',
				backgroundColor: window.chartColors.red,
				borderColor: window.chartColors.red,
				fill: false,
				data: [
					randomScalingFactor(),
					randomScalingFactor(),
					randomScalingFactor(),
					randomScalingFactor(),
					randomScalingFactor(),
					randomScalingFactor(),
					randomScalingFactor()
				],
			}, {
				label: 'Line_2',
				backgroundColor: window.chartColors.blue,
				borderColor: window.chartColors.blue,
				fill: false,
				data: [
					randomScalingFactor(),
					randomScalingFactor(),
					randomScalingFactor(),
					randomScalingFactor(),
					randomScalingFactor(),
					randomScalingFactor(),
					randomScalingFactor()
				],
			}]
		},
		options: {
			responsive: true,
			title: {
				display: true,
				text: 'Title - TEST'
			},
			scales: {
				xAxes: [{
					display: true,
				}],
				yAxes: [{
					display: true,
					type: 'logarithmic',
				}]
			}
		}
	};

	window.onload = function() {
		var ctx = document.getElementById('canvas').getContext('2d');
		window.myLine = new Chart(ctx, config);
	};

	document.getElementById('randomizeData').addEventListener('click', function() {
		config.data.datasets.forEach(function(dataset) {
			dataset.data = dataset.data.map(function() {
				return randomScalingFactor();
			});

		});

		window.myLine.update();
	});
	
    
}

chartGenerate();