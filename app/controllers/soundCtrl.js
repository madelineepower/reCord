"use strict";

app.controller('SoundCtrl', function($scope) {

//make sure window is supported
  var isAudioContextSupported = function () {
	window.AudioContext = window.AudioContext || window.webkitAudioContext;
	if(window.AudioContext){
    console.log("this window is supported");
		return true;
	}
	else {
    console.log("NOT SUPPORTED");
		return false;
	}
};

//create the audioContext
var audioContext;
if(isAudioContextSupported()) {
	audioContext = new window.AudioContext();
}

//create the oscillator
var oscillator = audioContext.createOscillator();
var gainNode = audioContext.createGain();
//give the oscialltor note a destination(device speaker)
gainNode.connect(audioContext.destination);
oscillator.type = 'sine';

//get the frequencies


let getNotes = function(){
  $scope.notesArray = [];
  $.getJSON('data/notes.json', function(data) {
    $scope.notesArray = data.notes;
    console.log($scope.notesArray);
  });
};
getNotes();
$scope.selected = {
  note: ""
};

let setFrequency = function(){
  var newNote = $scope.selected.note;
  $scope.frequency = {};
  $scope.frequency = newNote.frequency;
  console.log($scope.frequency);
  //give the oscillator a frequency value
  oscillator.frequency.value = $scope.frequency; // value in hertz
};

//play the tone
oscillator.start();
$scope.playTone = function(event) {
    setFrequency();
    oscillator.connect(gainNode);
    $scope.tonePlaying = true;
};

//stop the tone
$scope.stopTone = function(event) {
  oscillator.disconnect(gainNode);
  $scope.tonePlaying = false;
};



});
