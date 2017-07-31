"use strict";

app.controller('SoundCtrl', function($scope, SelectedNoteData, $route, deviceDetector) {

    var audioContext;
    var getDeviceData = function(){
      $scope.data = deviceDetector;
      $scope.allData = JSON.stringify($scope.data, null, 2);
      console.log('device data', $scope.data.isMobile());

      if ($scope.data.isMobile() === true) {
        alert("I'm sorry - Audio is not supported for this device at this time!");
      } else {
        console.log("Audio is supported for this device");
      }
    };
    getDeviceData();

    //make sure window is supported
    var isAudioContextSupported = function() {
        window.AudioContext = window.AudioContext || window.webkitAudioContext;
        if (window.AudioContext) {
            console.log("this window is supported");
            return true;
        } else {
            alert("We're sorry - You're window is not supported to use the audio feature");
            return false;
        }
    };

    //audio error on mobile browser
    if (window.matchMedia("(min-width: 415px)").matches) {
      //window is larger
    } else {
      //window is smaller than web browser
    }

    //create the audioContext

    var createAudioContext = function() {
        if (isAudioContextSupported()) {
            audioContext = new window.AudioContext();
        }
    };
    createAudioContext();
      //create the oscillator
      var oscillator = audioContext.createOscillator();
      //give the oscialltor note a destination(device speaker)
      oscillator.type = 'triangle';

    //get the frequencies
    let getNotes = function() {
        $scope.notesArray = [];
        $.getJSON('data/notes.json', function(data) {
            $scope.notesArray = data.notes;
        });
    };
    getNotes();

    $scope.selected = SelectedNoteData;
    $scope.frequency = {};

    let setFrequency = function() {
        var newNote = $scope.selected.note;
        $scope.frequency = newNote.frequency;
        //give the oscillator a frequency value
        oscillator.frequency.value = $scope.frequency; // value in hertz
    };

    //play the tone

    oscillator.start();
    $scope.playTone = function(event) {
        setFrequency();
        oscillator.connect(audioContext.destination);
        $scope.tonePlaying = true;
    };

    //stop the tone
    $scope.stopTone = function(event) {
        if ($scope.tonePlaying) {
            oscillator.frequency.value = null;
            oscillator.disconnect(audioContext.destination);
            $scope.tonePlaying = false;
        }
    };

		//closes the audioContext when the route changes
    $scope.$on('$routeChangeStart', function(next, current) {
        audioContext.close();
    });

});
