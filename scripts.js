//Actual JS Linting
var linter = function(code, name) {
  var options = {
    "curly": true,
    "eqeqeq": true,
    "eqnull": true,
    "expr": true,
    "immed": true,
    "indent": 2,
    "latedef": true,
    "newcap": true,
    "noarg": true,
    "undef": true,
    "unused": true,
    "trailing": true,
    "loopfunc": true
  };
  JSHINT(code, options);
  var errors = JSHINT.data().errors;
  if (errors) {
    for (var i = 0; i < errors.length; i++) {
      var error = errors[i];
      listError(error, name);
    }
  }
};

// Error list rendering
var listError = function(error, name) {
  var results = document.getElementById('results');
  var result = document.createElement('li');
  var stringText = "Error: " + error.reason + '<span class="line">' + name + ':' + error.line + '.' + error.character + '</span>';
  result.innerHTML = stringText;
  results.appendChild(result);
};

// File handling
var handleFileSelect = function(evt) {
  var results = document.getElementById('results');
  evt.stopPropagation();
  evt.preventDefault();
  results.innerHTML = '';

  var files = evt.dataTransfer.files; // FileList object.

  // files is a FileList of File objects. List some properties.
  var output = [];
  for (var i = 0; i < files.length; i++) {
    var f = files[i];
    var reader = new FileReader();
    reader.readAsText(f);
    reader.onload = (function(theFile) {
      if (theFile.name.slice(theFile.name.length - 3) !== '.js') {
        alert('Please upload only JavaScript files!');
        return;
      }
      return function(e) {
        linter(e.target.result, theFile.name);
      };
    })(f);
  }
};

var handleDragOver = function(evt) {
  evt.stopPropagation();
  evt.preventDefault();
  evt.dataTransfer.dropEffect = 'copy'; // Explicitly show this is a copy.
};

// Setup the dnd listeners.
window.addEventListener("dragover",function(e){
  e = e || event;
  e.preventDefault();
},false);
window.addEventListener('drop', function(e) {
  e = e || event;
  e.preventDefault();
}, false);
var dropZone = document.getElementById('drop_zone');
dropZone.addEventListener('dragover', handleDragOver, false);
dropZone.addEventListener('drop', handleFileSelect, false);
