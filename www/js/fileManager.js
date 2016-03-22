angular.module('neo-fileManager', [])

.factory('fileManager', function() {
    return { 
        writeToFile:function (fileName, data) {
            window.resolveLocalFileSystemURL(cordova.file.dataDirectory, function (directoryEntry) {
            directoryEntry.getFile(fileName, { create: true }, function (fileEntry) {
            fileEntry.createWriter(function (fileWriter) {
                fileWriter.onwriteend = function (evt) {
                    console.log('Write of file "' + fileName + '"" completed.');
                };

                fileWriter.onerror = function (evt) {
                    // you could hook this up with our global error handler, or pass in an error callback
                    console.log('Write failed: ' + evt.toString());
                };  
                console.log('Write failed'); 
                var blob = new Blob([data], { type: 'text/plain' });
                fileWriter.write(blob);
            });
            }, function() {alert('Write Failed');});
            }, function() {alert('Write Failed');});
        },
        readFromFile: function (fileName) {
            var pathToFile = cordova.file.dataDirectory + fileName;
            window.resolveLocalFileSystemURL(pathToFile, function (fileEntry) {
                console.log('1'+homeState);
                homeState=true;
                console.log('2'+homeState);
                return true;
                fileEntry.file(function (file) {
                    console.log('File Read');
                    var reader = new FileReader();
                    reader.onloadend = function (e) {
                        console.log('return not working');
                        if(this.result == true)
                            return true;
                        else
                            return false;
                    };
                    reader.readAsText(file);
                    return true;
                }, function() {alert('Read Failed');return false;});
            }, function() {return false;});
        }   
    };
});
  
  