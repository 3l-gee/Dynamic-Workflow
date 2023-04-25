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


const FeatureStylesActive = {
  'Polygon_A': function (feature) {
    return new ol.style.Style({
      stroke: new ol.style.Stroke({
        color: `${map.getView().getZoom() > ScaleParameters[feature.get("scale")].hidden ? 'rgba(187,187,187,0.5)' : 'white' }`,
        lineDash: null,
        width: 2,
      }),
      fill: new ol.style.Fill({
        color : `${map.getView().getZoom() > ScaleParameters[feature.get("scale")].hidden ? 'rgba(0,0,0,0)' : 'rgba(0,255,0,0.05' }`,
      }),
      text: new ol.style.Text({
        text: feature.get("name"),
        padding: [5, 5, 5, 5],
        font : `${Math.floor(12 * ScaleParameters[feature.get("scale")].textMult/ 6.6/map.getView().getResolution())}px Arial`,
        textBaseline : 'middle',
        textAlign : 'center',
        fill: new ol.style.Fill({
          color: `${map.getView().getZoom() > ScaleParameters[feature.get("scale")].hidden ? 'rgba(187,187,187,0.05)' : 'white' }`,
        }),
      })
    })
  },
  'Polygon_B': function (feature) {
    return new ol.style.Style({
      stroke: new ol.style.Stroke({
        color: `${map.getView().getZoom() > ScaleParameters[feature.get("scale")].hidden ? 'rgba(187,187,187,0.5)' : 'white' }`,
        lineDash: null,
        width: 2,
        fill: null,
      }),
      fill: new ol.style.Fill({
        color : `${map.getView().getZoom() > ScaleParameters[feature.get("scale")].hidden ? 'rgba(0,0,0,0)' : 'rgba(255,0,0,0.05' }`,
      }),
      text: new ol.style.Text({
        text: feature.get("name"),
        font : `${Math.floor(12 * ScaleParameters[feature.get("scale")].textMult/ 6.6/map.getView().getResolution())}px Arial`,
        textBaseline : 'middle',
        textAlign : 'center',
        fill: new ol.style.Fill({
          color: `${map.getView().getZoom() > ScaleParameters[feature.get("scale")].hidden ? 'rgba(187,187,187,0.05)' : 'white' }`,
        })
      })
    })
  },
  'Polygon_C': function (feature) {
    return new ol.style.Style({
      stroke: new ol.style.Stroke({
        color: `${map.getView().getZoom() > ScaleParameters[feature.get("scale")].hidden ? 'rgba(187,187,187,0.5)' : 'white' }`,
        lineDash: null,
        width: 2,
        fill: null,
      }),
      fill: new ol.style.Fill({
        color : `${map.getView().getZoom() > ScaleParameters[feature.get("scale")].hidden ? 'rgba(0,0,0,0)' : 'rgba(0,0,0,255.05' }`,
      }),
      text: new ol.style.Text({
        text: feature.get("name"),
        font : `${Math.floor(12 * ScaleParameters[feature.get("scale")].textMult/ 6.6/map.getView().getResolution())}px Arial`,
        textBaseline : 'middle',
        textAlign : 'center',
        fill: new ol.style.Fill({
          color: `${map.getView().getZoom() > ScaleParameters[feature.get("scale")].hidden ? 'rgba(187,187,187,0.05)' : 'white' }`,
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
        width: 0,
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
        width: 0,
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
    textMult : 1,
    hidden : 9999,
    maxZoom : 9999, 
    minZoom : 18,
  },
  2 : {
    textMult : 20,
    hidden : 18,
    maxZoom : 9999, 
    minZoom : 15,
  }, 
  3 : {
    textMult : 40,
    hidden : 17,
    maxZoom : 9999, 
    minZoom : 1,
  }
}

const WorkFlowLinkList = [
  {
    "type": "Feature",
    "properties": {
      "name": 'LINE 1',
      "info": 1,
      "scale": 1,
      "type": 'Polygon_A',
      'start' : 'f20eeb3b-4bb0-4146-bf9f-e9021ee67949',
      'end' : '870d112a-453c-42c9-a879-c99e42daa7c6'
    },
    "geometry": {
      "coordinates": [
      ],
      "type": "LineString"
    },
    "id": '67041a9b-6de7-447c-a32b-2fc2c0aec2c0'
  }, 
  {
    "type": "Feature",
    "properties": {
      "name": 'LINE 2',
      "info": 1,
      "scale": 1,
      "type": 'Polygon_A',
      'start' : '870d112a-453c-42c9-a879-c99e42daa7c6',
      'end' : 'c26fab39-fb86-4848-8418-5d885378bb5f'
    },
    "geometry": {
      "coordinates": [
      ],
      "type": "LineString"
    },
    "id": '9fa3ba5a-b94e-463c-a60c-37042ea657c5'
  }
]

const WorkFlowItemList = [
{
  "type": "Feature",
  "properties": {
    "name": 'TEST',
    "info": 1,
    "scale": 1,
    "type": 'Polygon_A',
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
  "id": 'f20eeb3b-4bb0-4146-bf9f-e9021ee67949'
},
{
  "type": "Feature",
  "properties": {
    "name": 'TEST3',
    "info": 1,
    "scale": 1,
    "type": 'Polygon_A',
  },
  "geometry": {
    "coordinates": [
      [
        [50, 30],
        [50, 40],
        [70, 40],
        [70, 30],
      ]
    ],
    "type": "Polygon"
  },
  "id": '870d112a-453c-42c9-a879-c99e42daa7c6'
},
{
  "type": "Feature",
  "properties": {
    "name": 'TEST2',
    "info": 1,
    "scale": 1,
    "type": 'Polygon_A',
  },
  "geometry": {
    "coordinates": [
      [
        [50, 10],
        [50, 20],
        [70, 20],
        [70, 10],
      ]
    ],
    "type": "Polygon"
  },
  "id": 'c26fab39-fb86-4848-8418-5d885378bb5f'
},
{
  "type": "Feature",
  "properties": {
    "name": 'TEST2',
    "info": 1,
    "scale": 1,
    "type": 'Polygon_B',
  },
  "geometry": {
    "coordinates": [
      [
        [90, 10],
        [90, 20],
        [110, 20],
        [110, 10],
      ]
    ],
    "type": "Polygon"
  },
  "id": 'asad'
},
{
  "type": "Feature",
  "properties": {
    "name": 'STEVE',
    "info": 1,
    "scale": 2,
    "type": 'Polygon_A',
  },
  "geometry": {
    "coordinates": [
      [
        [0, 0],
        [0, 200],
        [400, 200],
        [400, 0],
      ]
    ],
    "type": "Polygon"
  },
  "id": '45b440fd-828c-405a-972e-383519ff1ddc'
},
{
  "type": "Feature",
  "properties": {
    "name": 'STEVE',
    "info": 1,
    "scale": 2,
    "type": 'Polygon_B',
  },
  "geometry": {
    "coordinates": [
      [
        [500, 0],
        [500, 200],
        [900, 200],
        [900, 0],
      ]
    ],
    "type": "Polygon"
  },
  "id": '6b0d8cbe-95d9-4cca-9afb-f2a3787d695f'
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

function list2hash (list) {
  let dic = {}
  for (let i = 0; i < list.length; i++) {
    dic[list[i].id] = i
  }
  return dic
}

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

function linkDic2Layer(Scale, linkDic, itemList, itemHash){
  let layers = []
  let textLayer = []
  for (scale in linkDic) {
    for (type in linkDic[scale]){
      if (linkDic[scale][type].length !==0){
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
        for (item of linkDic[scale][type]){
          let start = itemList[itemHash[item.properties.start]].geometry.coordinates[0][3]
          let end = itemList[itemHash[item.properties.end]].geometry.coordinates[0][1]
          
          item.geometry.coordinates.push(start)
          item.geometry.coordinates.push(end)
          tempFeatures.features.push(item);
        }

        let features = new ol.format.GeoJSON().readFeatures({...tempFeatures});

        let Source = new ol.source.Vector({
          features: features
        });

        const layer = new ol.layer.Vector({
          source: Source,
          style: styleFunction(type, map.getView().getZoom(),Scale[scale].hidden),
          maxZoom : Scale[scale].maxZoom, 
          minZoom : Scale[scale].minZoom, 
          declutter: true
        });
        layers.push([layer,[tempFeatures]])
      }
    }
  }
  return layers
}

function itemDic2Layer(Scale, dic){
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

        let features = new ol.format.GeoJSON().readFeatures({...tempFeatures});

        let Source = new ol.source.Vector({
          features: features
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
          minZoom : Scale[scale].minZoom,
          test : tempFeatures.features
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

var itemIdHash = list2hash(WorkFlowItemList)
var linkIdHash = list2hash(WorkFlowLinkList)

var WorkFlowItemDic = list2dic(WorkFlowItemList)
var WorkFlowLinkDic = list2dic(WorkFlowLinkList)

var WorkFlowItemLayer = itemDic2Layer(ScaleParameters, WorkFlowItemDic)
var WorkFlowLinkLayer = linkDic2Layer(ScaleParameters, WorkFlowLinkDic, WorkFlowItemList, itemIdHash)

for (layer of WorkFlowItemLayer) {
  map.addLayer(layer[0]);
}

for (layer of WorkFlowLinkLayer) {
  map.addLayer(layer[0]);
}



map.getView().on('change:resolution', (event) => {
  console.log(map.getView().getResolution())
});

/*
var source =  new ol.source.Vector({
  features: [
    new ol.Feature({
      geometry: new ol.geom.LineString([[0,0],[-10,10]])
    })
  ]
});


const TEST = function (feature) {
  const start = new ol.geom.Point(feature.getGeometry().getFirstCoordinate())
  const end = new ol.geom.Point(feature.getGeometry().getLastCoordinate())
  const styles = [
    // linestring
    new ol.style.Style({
      stroke: new ol.style.Stroke({
        color: '#ffcc33',
        width: 2,
      }),
    }),
  ]

  const dx = end[0] - start[0];
  const dy = end[1] - start[1];
  const rotation = Math.atan2(dy, dx);
  styles.push(
    new ol.style.Style({

      image: new ol.style.RegularShape({
        fill: new ol.style.Fill({
          color: 'blue'
        }),
        stroke: new ol.style.Stroke({
          color: 'black',
          width: 2
        }),
        points: 3,
        radius: 10,
        angle: Math.PI / 4
      })
    })
  )
  return styles
}

const vector = new ol.layer.Vector({
  source: source,
  style : TEST
});

map.addLayer(vector)
*/

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

