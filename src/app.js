const fs = require('fs')
const fileName = './baza.bin'
const chart = require('chart.js')
const Context = require('./context');
const Data = require('./dataProcessing');

const context = new Context(120,3,38);
const data = new Data(context,fileName);

let xAxis = new Float32Array(context.row)
let yAxis = new Float32Array(context.row)
let position = 0

const chartGenerate = () => {
	let tmp = 1
	let config = {
		type: 'line',
		data: {
			labels: Array(context.row).fill(''),
			datasets: []
		},
		options: {
			responsive: true,
			animation: {
				duration: 0, // general animation time
			},
			legend:{
				position: 'right',
			},
			title: {
				display: true,
				text: 'Wykresy Logarytmiczne'
			},
			scales: {
				xAxes: [{
					display: true,
				}],
				yAxes: [{
					display: true,
					position: "left",
					id: "y-axis-0",
					fontColor: '#333',
					ticks: {
						max: 5,
						min: -1,
					}
				}]
			}
		}
	}
	window.onload = function() {
		var ctx = document.getElementById('canvas').getContext('2d')
		window.myLine = new Chart(ctx, config)
	}
}

chartGenerate()

data.readGeneration().then((resolve) => {

	let buff = new Float32Array(context.row)
	let padd = new Float32Array(context.padding)
	let k = 0

	for(let i = 0; i < context.generation; i++){
		buff = resolve.buffer.slice(k, k+123).slice(3,123)
		padd = resolve.buffer.slice(k, k+123).slice(0,3)
		let dataSet = {
			label: Number((padd[2]).toFixed(1)).toString(),
			data:buff.map(elem => elem),
			backgroundColor: window.chartColors = `#${(Math.random()*0xFFFFFF<<0).toString(16).padStart(6, 0)}`,
			fill: false
		}
		window.myLine.config.data.datasets[i] = dataSet
		k+=123
	}
	window.myLine.update()

})
