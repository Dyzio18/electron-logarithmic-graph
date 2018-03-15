const chart = require('chart.js')

const chartGenerate = context => {
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
				duration: 0.3, // general animation time
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

const chartDraw = (context, event) => {
	let buff = new Float32Array(context.row)
	let padd = new Float32Array(context.padding)
	let k = context.position

	for(let i = 0; i < context.generation; i++){
		buff = context.data.slice(k, k+123).slice(3,123)
		padd = context.data.slice(k, k+123).slice(0,3)
		let dataSet = {
			label: Number((padd[2]).toFixed(1)).toString(),
			data:buff, /*.map(elem => Math.pow(10,elem) ),*/
			backgroundColor: window.chartColors = `#${(Math.random()*0xFFFFFF<<0).toString(16).padStart(6, 0)}`,
			fill: false
		}
		window.myLine.config.data.datasets[i] = dataSet
		if(event === 'previous') k-=123
		else k+=123
	}
	/* TODO: Skip first generations for D/d = 1 */
	context.position = k;
	window.myLine.config.options.title.text = `D/d=${padd[0]}   Ri/Rm=${Number((padd[1]).toFixed(2))}`
	window.myLine.update()
}

module.exports = {chartGenerate, chartDraw}