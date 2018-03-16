const fs = require('fs')
const fileName = './baza.bin'
const chart = require('chart.js')
const dataChart = require('./dataChart')
const Context = require('./context')
const Data = require('./dataProcessing')

/* Save image libs */

const fileServer = require('file-saver')
const toBlob = require('./vendor/canvas-toBlob')

const context = new Context(120,3,38);
const data = new Data(context,fileName);

const next = document.getElementById('next')
const previous = document.getElementById('previous')
const close = document.getElementById('close')
const save = document.getElementById('save')

dataChart.chartGenerate(context)
data.initData().then((resolve) => {
	context.data = resolve.buffer
	dataChart.chartDraw(context)
})
 

/* Listeners */
save.addEventListener('click', () =>{
	document.getElementById("canvas").toBlob(function(blob) {
		fileServer.saveAs(blob, "chart_1.png");
	});
});

next.addEventListener('click', () =>{
	if(context.disable === 'next'){
		next.classList.add('disable')
	} else {
		dataChart.chartDraw(context, 'next')
		previous.classList.remove('disable')
	}
});

previous.addEventListener('click', () =>{
	if(context.disable === 'previous'){
		previous.classList.add('disable')
	} else {
		dataChart.chartDraw(context, 'previous')
		next.classList.remove('disable')
	}
});

close.addEventListener('click', () =>{
	window.close();
});
