//Add to Object method for rand element
//Вопрос где переобзночают методы объекта?
Object.defineProperty(
  Object.prototype,
  'randElement',
  {
      value: function() {
          var rand = Math.floor(Math.random() * this.length);
          return this[rand];
      }
  }
);

function advArrayGenerator(){

  var arrayFinal = [];
  var arrayAvatar = shuffle([1,2,3,4,5,6,7,8])
  var arrayTitle = shuffle (['Топовая хибара','Так себе халупа','Лакшери хотел','Общаги ПТУ','МИД','Лучше чем Хилтон','Замок с приведениями','Конура класса люкс']);
  var typeArray = ['palace', 'flat', 'house', 'bungalo'];
  var checkinTimes = ['12:00','13:00','14:00'];
  var checkoutTimes = ['12:00','13:00','14:00'];
  var featuresArray = ["wifi", "dishwasher", "parking", "washer", "elevator", "conditioner",];
  var fotoArray = ["http://o0.github.io/assets/images/tokyo/hotel1.jpg", "http://o0.github.io/assets/images/tokyo/hotel2.jpg", "http://o0.github.io/assets/images/tokyo/hotel3.jpg"];
  var locationPin = {
    'y_min':130,
    'y_max':630,
    'x_min':0,
    'x_max': innerWidth,
  }

  for (i = 0; i < 7; i++){
    arrayFinal[i]={
      "author": {
        "avatar":`img/avatars/user0${arrayAvatar[i]}.png`
      },

      "offer":{
        "title": arrayTitle[i],
        "address":[Math.random()*1000, Math.random()*1000],
        "price": Math.floor(Math.random()*10000),
        "type":typeArray.randElement,
        "rooms":Math.floor(Math.random()*10),
        "guests":5,
        "checkin":checkinTimes.randElement(),
        "checkout":checkoutTimes.randElement(),
        "features": randomArrayGenerator(featuresArray),
        "description":"Топове место. Красивый вид. Хороший персонал.",
        "photos":randomArrayGenerator(fotoArray),
      },

      "location":{
        "x": Math.floor (Math.random() * (locationPin.x_max)),
        "y": Math.floor (Math.random() *(locationPin.y_max - locationPin.y_min))
      }
    }
  }
  return arrayFinal;
}


// Function for reodering of array

function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;
  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
}

//
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





//Insert in DOM

var offerArray = advArrayGenerator();
var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin')
var pinsArray = document.querySelector('.map__pins')
var fragment = document.createDocumentFragment();

function renderPin(offerArrayItem){
  var pinElement = pinTemplate.cloneNode(true);
  pinElement.style.left = offerArrayItem.location.x +'px';
  pinElement.style.top = offerArrayItem.location.y+'px';
  // var pinImg = pinElement.querySelector('img');
  pinElement.querySelector('img').src = offerArrayItem.author.avatar;
  return pinElement;
}

for (var i = 0; i < offerArray.length; i++){
  fragment.appendChild(renderPin(offerArray[i]))
}

pinsArray.appendChild(fragment);



var offerCardTemplate = document.querySelector('#card');
var fragmentOffersCards = document.createDocumentFragment();

//Мне стыдно за эту функцию, как это можно сделать более красиво?//
function offerNameType(offerType){
  if (offerType === "flat" ){
    return ("Квартира")
  }
  if (offerType === "bungalo" ){
    return ("Бунгало")
  }
  if (offerType === "house" ){
    return ("Дом")
  }
  if (offerType === "palace" ){
    return ("Дворец")
  }
}




function renderPinCard(offer){

  var offerCardElement = offerCardTemplate.cloneNode(true);
  offerCardElement.querySelector(".popup__title").textContent = offer.title;
  offerCardElement.querySelector(".popup__text--address").textContent = offer.address;
  offerCardElement.querySelector(".popup__text--price").textContent = offer.price + "₽/ночь";
  offerCardElement.querySelector(".popup__type").textContent = offerNameType(offer.type);
  offerCardElement.querySelector(".popup__text--capacity").textContent = `${offer.rooms} комнаты для ${offer.guests}`;
  offerCardElement.querySelector(".popup__text--time").textContent = `Заезд после ${offer.checkin}, выезд до ${offer.checkout}`;

  var offerFeatures = offerCardElement.querySelector(".popup__features");
  offer.features.forEach(element => {
    var newItemFeatures = offerFeatures.createElement('li');
    newItemFeatures.className = `popup__feature popup__feature--${element}`
  });
  offerCardTemplate.querySelector(".popup__description") = offer.description;

  var offerFeaturesPhotos = offerCardElement.querySelector('.popup__photos')

  offer.photos.forEach(element=>{
    var newItemPhoto = offerFeaturesPhotos.createElement('img');
    newItemPhoto.src = element;
  })

}


for (var i = 0; i < offerArray.length; i++){
  var newOfferCard = renderPinCard(offerArray[i])
  fragmentOffersCards.appendChild(newOfferCard)
}


var map = document.querySelector('.map')

map.appendChild(fragmentOffersCards)


