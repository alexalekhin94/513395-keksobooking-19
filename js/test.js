var featuresArray = ["wifi", "dishwasher", "parking", "washer", "elevator", "conditioner"];



var randomArrayGenerator = function(array){
  var randomArray=[]
  var arrayforMocap = array.map(item => item);
  var arrayCount = Math.floor(Math.random() * array.length);
  for ( var i = 0; i < arrayCount; i++ ) {
    var ind = Math.floor(Math.random() * array.length);
    randomArray.push(array[ind])
    arrayforMocap.splice(ind, 1);
  }
  return randomArray;

}


var t = randomArrayGenerator(featuresArray);


console.log(1);
console.log(2)
