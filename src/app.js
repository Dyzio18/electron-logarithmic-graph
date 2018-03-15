const fs = require('fs')
const fileName = './baza.bin'
const chart = require('chart.js')
const dataChart = require('./dataChart')
const Context = require('./context')
const Data = require('./dataProcessing')

const context = new Context(120,3,38);
const data = new Data(context,fileName);

const next = document.getElementById('next')
const previous = document.getElementById('previous')
const close = document.getElementById('close')

dataChart.chartGenerate(context)

data.initData().then((resolve) => {
	context.data = resolve.buffer
	dataChart.chartDraw(context)
})
 

next.addEventListener('click', () =>{
	dataChart.chartDraw(context, 'next')
});

previous.addEventListener('click', () =>{
	dataChart.chartDraw(context, 'previous')
});