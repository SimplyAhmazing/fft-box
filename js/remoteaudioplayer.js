RemoteAudioPlayer = function(context, url, afterLoad) {
    this.url = url;
    this.source = context.createBufferSource();
    this.buffer = 0;
    this.context = context;
    this.afterLoad = afterLoad || this.ready;
}

RemoteAudioPlayer.prototype.ready = function(){
    this.source.buffer = this.buffer;
    // this.source.connect(this.context.destination);
    analyzer = this.context.createAnalyser();
    analyzer.fftSize = 2048;
    this.source.connect(analyzer);
    analyzer.connect(this.context.destination);
    this.source.noteOn(0);
};

RemoteAudioPlayer.prototype.getSource = function() {
    return this.source;
}

RemoteAudioPlayer.prototype.load = function(callback) {
    var request = new XMLHttpRequest();
    var that = this;
    request.open("GET", this.url, true);
    request.responseType = "arraybuffer";
    request.onload = function() {
        that.context.decodeAudioData(this.response, function(buffer){
            console.log('got to load sound file');
            that.buffer = buffer;
            that.afterLoad(that);
        });
    };

    request.send();
}

RemoteAudioPlayer.prototype.reload = function(callback) {
    this.source.buffer = this.buffer;
}
