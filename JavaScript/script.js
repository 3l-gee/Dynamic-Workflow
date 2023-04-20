// VAR INIT

const view = new ol.View({
  center : [0,0],
  zoom : 20,
  minZoom : 15,
  maxZoom : 22,
  constrainResolution: true,
})
const map = new ol.Map({
  view : view,
  controls: [],
  layers : [
 ], 
  target: 'map',
}) 

// COSNT

const TextStyleActive = {
  'Polygone_A' : new ol.style.Style({
    text: new ol.style.Text({
      text: 'Steve',
      font : `12px Arial`,
      textBaseline : 'middle',
      textAlign : 'center',
      stroke: new ol.style.Stroke({
        color: 'white',
      }),
      fill: new ol.style.Fill({
        color: 'white'
      }),
    })
  }),
  'Polygone_B' : new ol.style.Style({
    text: new ol.style.Text({
      text: 'Steve',
      font : `12px Arial`,
      textBaseline : 'middle',
      textAlign : 'center',
      stroke: new ol.style.Stroke({
        color: 'white',
      }),
      fill: new ol.style.Fill({
        color: 'white'
      }),
    })
  }),
  'Polygone_C' : new ol.style.Style({
    text: new ol.style.Text({
      text: 'Steve',
      font : `12px Arial`,
      textBaseline : 'middle',
      textAlign : 'center',
      stroke: new ol.style.Stroke({
        color: 'white',
      }),
      fill: new ol.style.Fill({
        color: 'white'
      }),
    })
  })
}

const TextStyleHidden= {
  'Polygone_A' : new ol.style.Style({
    text: new ol.style.Text({
      text: 'Steve',
      font : `12px Arial`,
      textBaseline : 'middle',
      textAlign : 'center',
      stroke: new ol.style.Stroke({
        color: 'white',
      }),
      fill: new ol.style.Fill({
        color: 'white'
      }),
    })
  }),
  'Polygone_B' : new ol.style.Style({
    text: new ol.style.Text({
      text: 'Steve',
      font : `12px Arial`,
      textBaseline : 'middle',
      textAlign : 'center',
      stroke: new ol.style.Stroke({
        color: 'white',
      }),
      fill: new ol.style.Fill({
        color: 'white'
      }),
    })
  }),
  'Polygone_C' : new ol.style.Style({
    text: new ol.style.Text({
      text: 'Steve',
      font : `12px Arial`,
      textBaseline : 'middle',
      textAlign : 'center',
      stroke: new ol.style.Stroke({
        color: 'white',
      }),
      fill: new ol.style.Fill({
        color: 'white'
      }),
    })
  })
}

const FeatureStylesActive = {
  'Polygon_A': function (feature) {
    return new ol.style.Style({
      stroke: new ol.style.Stroke({
        color: `${map.getView().getZoom() < 19 ? 'blue' : 'white' }`,
        lineDash: null,
        width: 2,
      }),
      fill: new ol.style.Fill({
        color: 'rgba(0, 255, 0, 0.05)',
      }),
      text: new ol.style.Text({
        text: feature.get("name"),
        font : `${Math.floor(12/ 6.6/map.getView().getResolution())}px Arial`,
        textBaseline : 'middle',
        textAlign : 'center',
        stroke: new ol.style.Stroke({
          color: 'white',
        }),
        fill: new ol.style.Fill({
          color: 'white'
        }),
      })
    })
  },
  'Polygon_B': function (feature) {
    return new ol.style.Style({
      stroke: new ol.style.Stroke({
        color: 'white',
        lineDash: null,
        width: 2,
        fill: null,
      }),
      fill: new ol.style.Fill({
        color: 'rgba(255, 255, 255, 0.05)',
      }),
      text: new ol.style.Text({
        text: feature.get("name"),
        font : `${Math.floor(48/ 6.6/map.getView().getResolution())}px Arial`,
        textBaseline : 'middle',
        textAlign : 'center',
        stroke: new ol.style.Stroke({
          color: 'white',
        }),
        fill: new ol.style.Fill({
          color: 'white'
        })
      })
    })
  },
  'Polygon_C': function (feature) {
    return new ol.style.Style({
      stroke: new ol.style.Stroke({
        color: 'white',
        lineDash: null,
        width: 2,
        fill: null,
      }),
      fill: new ol.style.Fill({
        color: 'rgba(0, 0, 0, 0.05)',
      }),
      text: new ol.style.Text({
        text: feature.get("name"),
        font : `${Math.floor(96/ 6.6/map.getView().getResolution())}px Arial`,
        textBaseline : 'middle',
        textAlign : 'center',
        stroke: new ol.style.Stroke({
          color: 'white',
        }),
        fill: new ol.style.Fill({
          color: 'white'
        })
      })
    })
  }
};

const FeatureStylesHidden = {
  'Polygon_A': function (feature) {
    return new ol.style.Style({
      stroke: new ol.style.Stroke({
        color: 'gray',
        lineDash: [4,2],
        width: 1,
        fill: null,
      }),
      fill: new ol.style.Fill({
        color: 'rgba(0, 255, 0, 0.05)',
      }),
      text: new ol.style.Text({
        text: feature.get("name"),
        font : `${Math.floor(12/ 6.6/map.getView().getResolution())}px Arial`,
        textBaseline : 'middle',
        textAlign : 'center',
        stroke: new ol.style.Stroke({
          color: 'white',
        }),
        fill: new ol.style.Fill({
          color: 'white'
        }),
      })
    })
  },
  'Polygon_B': function (feature) {
    return new ol.style.Style({
      stroke: new ol.style.Stroke({
        color: 'gray',
        lineDash: [4,2],
        width: 1,
        fill: null,
      }),
      fill: new ol.style.Fill({
        color: 'rgba(255, 255, 255, 0.05)',
      }),
      text: new ol.style.Text({
        text: feature.get("name"),
        font : `${Math.floor(48/ 6.6/map.getView().getResolution())}px Arial`,
        textBaseline : 'middle',
        textAlign : 'center',
        stroke: new ol.style.Stroke({
          color: 'white',
        }),
        fill: new ol.style.Fill({
          color: 'white'
        })
      })
    })
  },
  'Polygon_C': function (feature) {
    return new ol.style.Style({
      stroke: new ol.style.Stroke({
        color: 'gray',
        lineDash: [4,2],
        width: 1,
        fill: null,
      }),
      fill: new ol.style.Fill({
        color: 'rgba(0, 0, 0, 0.05)',
      }),
      text: new ol.style.Text({
        text: feature.get("name"),
        font : `${Math.floor(96/ 6.6/map.getView().getResolution())}px Arial`,
        textBaseline : 'middle',
        textAlign : 'center',
        stroke: new ol.style.Stroke({
          color: 'white',
        }),
        fill: new ol.style.Fill({
          color: 'white'
        })
      })
    })
  }
};

const ScaleParameters = {
  1 : {
    hidden : 9999,
    maxZoom : 9999, 
    minZoom : 18,
  },
  2 : {
    hidden : 20,
    maxZoom : 9999, 
    minZoom : 15,
  }, 
  3 : {
    hidden : 17,
    maxZoom : 9999, 
    minZoom : 1,
  }
}

const WorkFlowLinkListe = [
]

const WorkFlowItemListe = [
{
  "type": "Feature",
  "properties": {
    "name": 'TEST',
    "info": 1,
    "scale": 1,
    "type": 'Polygon_A',
    "uuid": 1
  },
  "geometry": {
    "coordinates": [
      [
        [10, 10],
        [10, 20],
        [30, 20],
        [30, 10],
      ]
    ],
    "type": "Polygon"
  },
  "id": 0
},
{
  "type": "Feature",
  "properties": {
    "name": 'TEST 69',
    "info": 1,
    "scale": 1,
    "type": 'Polygon_A',
    "uuid": 1
  },
  "geometry": {
    "coordinates": [
      [
        [10, 10],
        [10, 20],
        [30, 20],
        [30, 10],
      ]
    ],
    "type": "Polygon"
  },
  "id": 0
},
{
  "type": "Feature",
  "properties": {
    "name": 'STEVE',
    "info": 1,
    "scale": 2,
    "type": 'Polygon_C',
    "uuid": 1
  },
  "geometry": {
    "coordinates": [
      [
        [10, 10],
        [10, 200],
        [300, 200],
        [300, 10],
      ]
    ],
    "type": "Polygon"
  },
  "id": 1
}
]

const graticule = new ol.layer.Graticule({
  strokeStyle: new ol.style.Stroke({
    color: 'rgba(255,255,255,0.9)',
    width: 1,
    lineDash: [0.5, 10],
  }),
  showLabels: false,
  wrapX: false,
})

// FUNCTIONS

const styleFunction = function (name, curentZoom, hidden) {
  if (curentZoom < hidden){
    return FeatureStylesActive[name];
  }
  return FeatureStylesActive[name];
};


function list2dic (list) {
  var dic = {}
  list.forEach(item => {

    if (item.properties.hasOwnProperty("scale") && item.properties.hasOwnProperty("type")) {
      if (!dic.hasOwnProperty(item.properties.scale)) {
        dic[item.properties.scale] = {};
      }
      if (!dic[item.properties.scale].hasOwnProperty(item.properties.type)) {
        dic[item.properties.scale][item.properties.type] = []
      }
      dic[item.properties.scale][item.properties.type].push(item)
    }

  })
return dic
};

function dic2Layer(Scale, dic){
  let layers = []
  let textLayer = []
  for (scale in dic) {
    for (type in dic[scale]){
      if (dic[scale][type].length !==0){
        let tempFeatures = {
          'style' : null,
          'type': 'FeatureCollection',
          'crs': {
            'type': 'name',
            'properties': {
              'name': 'EPSG:4326',
            },
          },
          'features': [],
        }
        for (item of dic[scale][type]){
          tempFeatures.features.push(item);
        }
        let Source = new ol.source.Vector({
          features: new ol.format.GeoJSON().readFeatures({...tempFeatures})    
        });
        const layer = new ol.layer.Vector({
          source: Source,
          style: styleFunction(type, map.getView().getZoom(),Scale[scale].hidden),
          maxZoom : Scale[scale].maxZoom, 
          minZoom : Scale[scale].minZoom, 
          declutter: true
        });
        layers.push([layer,{
          typeFeature : type,
          hidden : Scale[scale].hidden,
          maxZoom : Scale[scale].maxZoom,
          minZoom : Scale[scale].minZoom
        }
      ])
      }
    }
  }
return layers
}

// FUNCTIONS OPENLAYERS 




// CODE
map.addLayer(graticule);

var WorkFlowItemDic = list2dic(WorkFlowItemListe)

var WorkFlowItemLayer = dic2Layer(ScaleParameters, WorkFlowItemDic)

for (layer of WorkFlowItemLayer) {
  map.addLayer(layer[0]);
}

map.getView().on('change:resolution', (event) => {
  console.log(map.getView().getZoom())
});


// EVENT Listener
/*
map.getView().on('change:resolution', (event) => {
 
  for(layer of WorkFlowItemLayer){
    let hiddenLayer = layer[1].hidden
    let typeFeatureLayer = layer[1].typeFeature
    console.log(typeFeatureLayer,hiddenLayer)
    
    layer[0].setStyle(function(feature, resolution) {
      return styleFunction({...typeFeatureLayer}, map.getView().getZoom(),{...hiddenLayer});
      return new ol.style.Style({})
    })
  }
});
*/



// FUNCTIONS HTML
function openPopup() {
  document.getElementById("overlay").style.display = "block";
  document.getElementById("popup").style.display = "block";
}

function closePopup() {
  document.getElementById("overlay").style.display = "none";
  document.getElementById("popup").style.display = "none";
}

//Draw Workflow
function DrawStart() {
  document.getElementById("control").style.display = "none";
  document.getElementById("overlay").style.display = "block";
  document.getElementById("popupDraw").style.display = "block";
}

function DrawEnd() {
  document.getElementById("control").style.display = "block";
  document.getElementById("overlay").style.display = "none";
  document.getElementById("popupDraw").style.display = "none";
}

//Edit Workflow
function EditStart() {
  document.getElementById("control").style.display = "none";
  document.getElementById("overlay").style.display = "block";
  document.getElementById("popupEdit").style.display = "block";
}

function EditEnd() {
  document.getElementById("control").style.display = "block";
  document.getElementById("overlay").style.display = "none";
  document.getElementById("popupEdit").style.display = "none";
}

