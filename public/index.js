'use strict';

//list of truckers
//useful for ALL 5 exercises
var truckers = [{
  'id': 'f944a3ff-591b-4d5b-9b67-c7e08cba9791',
  'name': 'les-routiers-bretons',
  'pricePerKm': 0.05,
  'pricePerVolume': 5
}, {
  'id': '165d65ec-5e3f-488e-b371-d56ee100aa58',
  'name': 'geodis',
  'pricePerKm': 0.1,
  'pricePerVolume': 8.5
}, {
  'id': '6e06c9c0-4ab0-4d66-8325-c5fa60187cf8',
  'name': 'xpo',
  'pricePerKm': 0.10,
  'pricePerVolume': 10
}];

//list of current shippings
//useful for ALL exercises
//The `price` is updated from exercice 1
//The `commission` is updated from exercice 3
//The `options` is useful from exercice 4
var deliveries = [{
  'id': 'bba9500c-fd9e-453f-abf1-4cd8f52af377',
  'shipper': 'bio-gourmet',
  'truckerId': 'f944a3ff-591b-4d5b-9b67-c7e08cba9791',
  'distance': 100,
  'volume': 4,
  'options': {
    'deductibleReduction': false
  },
  'price': 0,
  'commission': {
    'insurance': 0,
    'treasury': 0,
    'convargo': 0
  }
}, {
  'id': '65203b0a-a864-4dea-81e2-e389515752a8',
  'shipper': 'librairie-lu-cie',
  'truckerId': '165d65ec-5e3f-488e-b371-d56ee100aa58',
  'distance': 650,
  'volume': 12,
  'options': {
    'deductibleReduction': true
  },
  'price': 0,
  'commission': {
    'insurance': 0,
    'treasury': 0,
    'convargo': 0
  }
}, {
  'id': '94dab739-bd93-44c0-9be1-52dd07baa9f6',
  'shipper': 'otacos',
  'truckerId': '6e06c9c0-4ab0-4d66-8325-c5fa60187cf8',
  'distance': 1250,
  'volume': 30,
  'options': {
    'deductibleReduction': true
  },
  'price': 0,
  'commission': {
    'insurance': 0,
    'treasury': 0,
    'convargo': 0
  }
}];

function priceCompute(truckerIdSearch, distanceTravel, volumeTravel,truckerList, deleveriesOption) {
  var distance = 0
  var volume = 0
  for (var i = 0; i < truckerList.length; i++) {
    if (truckerList[i].id.localeCompare(truckerIdSearch) == 0) {
      distance = truckerList[i].pricePerKm * distanceTravel
      volume = (truckerList[i].pricePerVolume + addOption(deleveriesOption)) * volumeTravel * sizeReductionPourcentage(volumeTravel)
    }
  }
  return distance + volume;
}

function addOption(deleveriesOption){
  var res = 0
  if(deleveriesOption == true){
      res = 1
  }
  return res
}

function sizeReductionPourcentage(volumeTravel){
  var res = 1
  if(volumeTravel > 25){
    res = 0.5
  } else if (volumeTravel > 10) {
    res = 0.7
  } else if (volumeTravel > 5) {
    res = 0.9
  }
  return res
}

function updatePrice(deleveriesList,truckerList){
  for (var i = 0; i < deleveriesList.length; i++) {
    deleveriesList[i].price=priceCompute(deleveriesList[i].truckerId,deleveriesList[i].distance,deleveriesList[i].volume,truckerList,deleveriesList[i].options.deductibleReduction)
  }
}
updatePrice(deliveries,truckers)


function updateCommission(deliveriesList){
  for (var i = 0; i < deliveriesList.length; i++) {
    var commissionValue = deliveriesList[i].price * 0.3
    deliveriesList[i].commission.insurance = commissionValue / 2
    commissionValue = deliveriesList[i].commission.insurance
    deliveriesList[i].commission.treasury = 1 * Math.floor(deliveriesList[i].distance/500)+1;
    commissionValue = commissionValue - deliveriesList[i].commission.treasury
    deliveries[i].commission.convargo = commissionValue
  }
}
updateCommission(deliveries)



//list of actors for payment
//useful from exercise 5
const actors = [{
  'deliveryId': 'bba9500c-fd9e-453f-abf1-4cd8f52af377',
  'payment': [{
    'who': 'shipper',
    'type': 'debit',
    'amount': 0
  }, {
    'who': 'trucker',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'insurance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'treasury',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'convargo',
    'type': 'credit',
    'amount': 0
  }]
}, {
  'deliveryId': '65203b0a-a864-4dea-81e2-e389515752a8',
  'payment': [{
    'who': 'shipper',
    'type': 'debit',
    'amount': 0
  }, {
    'who': 'trucker',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'insurance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'treasury',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'convargo',
    'type': 'credit',
    'amount': 0
  }]
}, {
  'deliveryId': '94dab739-bd93-44c0-9be1-52dd07baa9f6',
  'payment': [{
    'who': 'shipper',
    'type': 'debit',
    'amount': 0
  }, {
    'who': 'trucker',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'treasury',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'insurance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'convargo',
    'type': 'credit',
    'amount': 0
  }]
}];

console.log(truckers);
console.log(deliveries);
console.log(actors);
