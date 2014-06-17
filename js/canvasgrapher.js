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
