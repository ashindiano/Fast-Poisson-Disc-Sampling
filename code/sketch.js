var r = 10;  // required minimum distance between the points
var k = 30; // No of new samples aroud one sample
var cellSize = r / Math.sqrt(2);
var noOfCols = 0
var noOfRows = 0;
var noOfCells = 0;
var grid = [];
var activeList = [];
var isFirstClickDone = false;
var found;

function drawGrid(){
	grid.forEach(sample=>{
		if(sample){
			stroke(255);
			point(sample.x,sample.y)
		}
	});
}
function drawActive(){
	activeList.forEach(sample=>{
		if(sample){
			stroke(255,0,255);
			point(sample.x,sample.y)
		}
	});
}

function mousePressed(){
 
  var x = mouseX;
  var y = mouseY;
  for (var i=0; i< noOfCells ; i++){
   grid[i] = undefined;
  }
  reset();
  var sample = createVector(x,y);
  var col = floor(x/cellSize);
  var row = floor(y/cellSize);

  if(x >= 0 && x < 400 && y >= 0 && y < 400 ){
   grid[row * noOfCols + col] = sample;
   activeList.push(sample);
  }
 
}
function reset(){
 background(0);
 for (var i=0; i< noOfCells ; i++){
  grid[i] = undefined;
 }
 activeList = [];

 //Drawing the Grid
 // strokeWeight(0.1);
 // stroke(0,255,255);
 // for(var i=1;i< noOfCols; i++)
 //  line(i*cellSize,0, i*cellSize,height);
 // for(var i=1;i< noOfRows; i++)
 //  line(0, i*cellSize,width, i*cellSize);
}

function setup() {

		//STEP 0
		createCanvas(400,400);
  width = height = 400;
		noOfCols = floor(width /cellSize);
		noOfRows = floor(height /cellSize);
		noOfCells = noOfCols * noOfRows;
	reset();
}

function draw() {

  strokeWeight(3);
  if(activeList.length > 0){
    var activeSampleCellIndex = floor(random(activeList.length));
    var activeSample = activeList[activeSampleCellIndex];
    found = false;
    
    for(var n = 0; n< k; n++){
      var newSample = p5.Vector.random2D();
      var magnitude = random(r, 2 * r);
      newSample.setMag(magnitude);
      newSample.add(activeSample);
      
      if(newSample.x >= 0 && newSample.x < 400 && newSample.y >= 0 && newSample.y < 400 ){       
       var newSampleCellColumn = floor(newSample.x/cellSize);
       var newSampleCellRow = floor(newSample.y/cellSize);
       
        var isSafe = true;
        for (var i = -1; i <= 1; i++){
          for (var j = -1; j <= 1; j++) {
           var neighbour = grid[(newSampleCellRow + j) * noOfCols + (newSampleCellColumn + i)];
           if(neighbour){
            var d = p5.Vector.dist(newSample, neighbour);
            if(d < r){
             isSafe = false;
             break;
            }
           }
          }
        }
        if(isSafe){
         found = true;
         grid[newSampleCellColumn + newSampleCellRow * noOfCols] = newSample;
         activeList.push(newSample);
         break;
       }
      }
    }
    if(!found)
      activeList.splice(activeSampleCellIndex, 1);
  }
  drawGrid();
  drawActive();				
}
