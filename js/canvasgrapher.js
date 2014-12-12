CanvasGrapher = function(canvasElement){
	this.width = canvasElement.width;
	this.height = canvasElement.height;
	this.canvasElement = canvasElement;
	this.ctx = canvasElement.getContext("2d");
};

CanvasGrapher.prototype.graph = function(barArray){
	var numBars = barArray.length;
	var barWidth = (this.width/numBars);
	var barSpace = barWidth * 0.1;
	var adjustedBarWidth = barWidth - barSpace;

	this.ctx.clearRect(0, 0, this.width, this.height);
	for (var i = 0; i < numBars; i++){
		var barHeight = (barArray[i]/256) * this.height;
		this.ctx.fillRect(i * barWidth, this.height, barWidth - 2, -barHeight);
	}
};


CanvasGrapher.prototype.graphColoredBoxes = function(data, xBoxes, yBoxes, randomizeBoxArrangement){
	var totalBoxes = xBoxes * yBoxes;
	var boxHeight = this.height / yBoxes;
	var boxWidth = this.width / xBoxes;

	function rainbow(n) {
			return 'hsl(' + n + ',100%,50%)';
	}

	this.ctx.clearRect(0, 0, this.width, this.height);

	// console.log('num boxes: ', xBoxes, yBoxes);
	for (var r = 0; r < xBoxes; r++){
		for ( var c = 0; c < yBoxes; c++){
			var dataVal = data[r * yBoxes + c];
			this.ctx.fillStyle = rainbow(dataVal); // fillStyleString;
			this.ctx.lineWidth = 2;
			this.ctx.strokeStyle = 'black';

			this.ctx.strokeRect(
				r * boxWidth,
				c * boxHeight,
				boxWidth,
				boxHeight
			);
			this.ctx.fillRect(
				r * boxWidth,
				c * boxHeight,
				boxWidth,
				boxHeight
			);
		}
	}
};
