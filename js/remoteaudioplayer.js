RemoteAudioPlayer = function(context, url, afterLoad) {
    this.url = url;
    this.source = context.createBufferSource();
    this.last_loaded_buffer = 0;
    this.context = context;
    this.afterLoad = afterLoad || this.ready;
}

RemoteAudioPlayer.prototype.ready = function(){
    this.source.buffer = this.last_loaded_buffer;
    this.prepSource()
    // this.source.connect(this.context.destination);
    // analyzer = this.context.createAnalyser();
    // analyzer.fftSize = 2048;
    // this.source.connect(analyzer);
    // analyzer.connect(this.context.destination);
    this.source.start(0);
};

RemoteAudioPlayer.prototype.getSource = function() {
    return this.source;
}

RemoteAudioPlayer.prototype.prepSource = function(source){

    debugger;
    var sourceToPrep = source || this.source;
    sourceToPrep.connect(this.context.destination);
}

RemoteAudioPlayer.prototype.load = function(callback) {
    var request = new XMLHttpRequest();
    var that = this;
    request.open("GET", this.url, true);
    request.responseType = "arraybuffer";
    request.onload = function() {
        that.context.decodeAudioData(this.response, function(buffer){
            console.log('got to load sound file');
            that.last_loaded_buffer = buffer;
            that.afterLoad(that);
        });
    };

    request.send();
}

RemoteAudioPlayer.prototype.reload = function(callback) {
    this.source = this.context.createBufferSource();
    this.source.buffer = this.last_loaded_buffer;
    this.prepSource(this.source);
    return this.source;
}

RemoteAudioPlayer.prototype.stop = function(){
    this.source.stop(0);
    return true;
}

RemoteAudioPlayer.prototype.replay = function(){
    var newSource = this.reload();
    newSource.start(0);
    return true;
}
