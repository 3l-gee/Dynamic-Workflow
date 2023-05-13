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

const EmptyItem = {
  "type": "Feature",
  "properties": {
    "name": '',
    "info": '',
    "scale": 0,
    "type": '',
  },
  "geometry": {
    "coordinates": [
    ],
    "type": "Polygon"
  },
  "id": ''
}

var inputFeature = {}

const Emptylink =   {
  "type": "Feature",
  "properties": {
    "name": '',
    "info": '',
    "scale": 1,
    "type ": '',
    'start' : '',
    'end' : ''
  },
  "geometry": {
    "coordinates": [
    ],
    "type": "LineString"
  },
  "id": ''
}

const LinkStylesActive = {


}
const FeatureStylesActive = {
  'Link_A' : function (feature) {
    const styles = [
      new ol.style.Style({
        stroke: new ol.style.Stroke({
          color: `${map.getView().getZoom() > ScaleParameters[feature.get("scale")].hidden ? 'rgba(187,187,187,0.5)' : 'white' }`,
          width: 2,
        }),
      }),
    ]
      styles.push(
      new ol.style.Style({
        geometry : new ol.geom.Point(feature.getGeometry().getLastCoordinate()),
        image: new ol.style.RegularShape({
          fill: new ol.style.Fill({
            color : 'white',
          }),
          stroke: new ol.style.Stroke({
            color: `${map.getView().getZoom() > ScaleParameters[feature.get("scale")].hidden ? 'rgba(187,187,187,0.5)' : 'white' }`,
            width: 1
          }),
          points: 3,
          radius: 10,
          angle: Math.PI/2
        })
      })
    )
    return styles
  },
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
      "type": 'Link_A',
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
      "type": 'Link_A',
      'start' : '870d112a-453c-42c9-a879-c99e42daa7c6',
      'end' : 'c26fab39-fb86-4848-8418-5d885378bb5f'
    },
    "geometry": {
      "coordinates": [
      ],
      "type": "LineString"
    },
    "id": '9fa3ba5a-b94e-463c-a60c-37042ea657c5'
  },
  {
    "type": "Feature",
    "properties": {
      "name": 'LINE 3',
      "info": 1,
      "scale": 2,
      "type": 'Link_A',
      'start' : '45b440fd-828c-405a-972e-383519ff1ddc',
      'end' : '6b0d8cbe-95d9-4cca-9afb-f2a3787d695f'
    },
    "geometry": {
      "coordinates": [
      ],
      "type": "LineString"
    },
    "id": '9fa3ba5a-b94e-463c-a60c-37042ea657c1'
  },
  {
    "type": "Feature",
    "properties": {
      "name": 'LINE 4',
      "info": 1,
      "scale": 2,
      "type": 'Link_A',
      'start' : '6b0d8cbe-95d9-4cca-9afb-f2a3787d695f',
      'end' : '45b440fd-828c-405a-972e-383519ff1ddc'
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
function uuidv4() {
  return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
    (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
  );
}

function styleFunction (name, curentZoom, hidden) {
  if (curentZoom < hidden){
    return FeatureStylesActive[name];
  }
  return FeatureStylesActive[name];
};

function line2OrthoLine(start, end, scale) {
  let list = []

  start2 = start[0][2]
  start3 = start[0][3]
  startMid = [start2[0], (start2[1] + start3[1]) /2]

  end0 = end[0][0]
  end1 = end[0][1]
  endMid = [end0[0], (end1[1] + end0[1]) /2]

  dx = endMid[0] - startMid[0]
  dy = endMid[1] - startMid[1]
  
  //Cases : [DX+ DY+/-, DX- DY+/-, DX- DY+, DX- DY+
  list.push([startMid[0],     startMid[1]])
  list.push([startMid[0] + 4*scale.textMult, startMid[1]])

  if (dx > 0 && dy > 0){
    list.push([startMid[0] + dx/2,  startMid[1]])
    list.push([startMid[0] + dx/2,  startMid[1] + dy])
  } else if (dx > 0 && dy < 0 ) {
    list.push([startMid[0] + dx/2,  startMid[1]])
    list.push([startMid[0] + dx/2,  startMid[1] + dy])
  } else if (dx < 0 && dy < 0 ) {
    list.push([startMid[0] + 4*scale.textMult,  startMid[1] + dy/2])
    list.push([endMid[0] - 4 * scale.textMult,  startMid[1] + dy/2])
  } else if (dx < 0 && dy > 0) {
    list.push([startMid[0] + 4*scale.textMult,  startMid[1] + dy/2])
    list.push([endMid[0] - 4 * scale.textMult,  startMid[1] + dy/2])
  } else if (dx == 0) {
  } else if (dy == 0 && dx < 0) {
    list.push([startMid[0] + 4*scale.textMult,       startMid[1] + 8*scale.textMult])
    list.push([endMid[0] - 4*scale.textMult,       endMid[1] + 8*scale.textMult])
  }  else if (dy == 0 && dx > 0) {
  }

  list.push([endMid[0] - 4 * scale.textMult,     endMid[1]])
  list.push([endMid[0] - 0.5 * scale.textMult,       endMid[1]])

  return list
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
          let start = itemList[itemHash[item.properties.start]].geometry.coordinates
          let end = itemList[itemHash[item.properties.end]].geometry.coordinates

          pointList = line2OrthoLine(start, end, Scale[scale])
          
          item.geometry.coordinates = pointList

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

// interation Draw 
TESTSource = new ol.source.Vector({wrapX: false});

var TESTLayer = new ol.layer.Vector({
  source: TESTSource,
});

map.addLayer(TESTLayer)

let draw; // global so we can remove it later
function addInteraction() {
  draw = new ol.interaction.Draw({
    source: TESTSource,
    type: 'Point',
    geometryFunction: function(coordinates, geometry) {
      let xCoordinates = coordinates[0]
      let yCoordinates = coordinates[1]
      const squareSideLength = 1;
      const squareGeom = new ol.geom.Polygon([
        [
          [xCoordinates - 10, yCoordinates - 5],
          [xCoordinates - 10, yCoordinates + 5],
          [xCoordinates + 10, yCoordinates + 5],
          [xCoordinates + 10, yCoordinates - 5],
        ]
      ]);
      console.log([
        [
          [xCoordinates - 10, yCoordinates - 5],
          [xCoordinates - 10, yCoordinates + 5],
          [xCoordinates + 10, yCoordinates + 5],
          [xCoordinates + 10, yCoordinates - 5],
        ]
      ])
      return null;
    }, 
    style: function(feature) {
      return new ol.style.Style({
        image: new ol.style.RegularShape({
          fill: new ol.style.Fill({color: 'rgba(255, 255, 255, 0.05)'}),
          stroke: new ol.style.Stroke({color: 'white', width: 2}),
          points: 4,
          radius: 15 * 1/ map.getView().getResolution() / Math.SQRT2,
          radius2: 15 * 1/ map.getView().getResolution(),
          scale: [1, 0.5],
        }),
      });
    }
  });
  map.addInteraction(draw);
}



/*
var gridSource = new ol.source.Vector({});

// Create a vector layer and set its source to the empty vector source
var gridLayer = new ol.layer.Vector({
  source: gridSource,
  visible: false, // set layer as hidden
  interact: true, // set layer as interactable
});

// Add the vector layer to the map
map.addLayer(gridLayer);

// Define the grid spacing
var Xspacing = 40;
var Yspacing = 20;

// Create a function that generates point geometries for a given extent
function generatePoints(extent) {
  var points = [];
  var minX = extent[0];
  var minY = extent[1];
  var maxX = extent[2];
  var maxY = extent[3];
  for (var x = minX; x < maxX; x += Xspacing) {
    for (var y = minY; y < maxY; y += Yspacing) {
      var point = new ol.geom.Point([x, y]);
      points.push(new ol.Feature(point));
    }
  }
  return points;
}

// Create a listener for the "postrender" event of the map
map.on('postrender', function(event) {
  // Get the current view extent of the map
  var extent = event.frameState.extent;
  // Generate point geometries for the current extent
  var points = generatePoints(extent);
  // Clear the vector source and add the generated points
  gridSource.clear();
  gridSource.addFeatures(points);
});


TESTSource = new ol.source.Vector({wrapX: false});

var TESTLayer = new ol.layer.Vector({
  source: TESTSource,
  
});

map.addLayer(TESTLayer)






const snap = new ol.interaction.Snap({
  source: gridLayer.getSource(),
  pixelTolerance : 5000
});


const select = new ol.interaction.Select({

});


const modify = new ol.interaction.Modify({
  features: select.getFeatures(),
  insertVertexCondition: function () {
    // prevent new vertices to be added to the polygons
    return !select
      .getFeatures()
      .getArray()
      .every(function (feature) {
        return /Polygon/.test(feature.getGeometry().getType());
      });
  },
});


const translate = new ol.interaction.Translate({
  features: select.getFeatures(),
});


map.addInteraction(select);
map.addInteraction(snap);
map.addInteraction(modify);
map.addInteraction(translate);
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

function DrawFeature(inputType){
  if (inputType === "Actions") {
    document.getElementById("FormScaleOption").style.display = "block";
    document.getElementById("ScaleOption1").style.display = "block";
    document.getElementById("ScaleOption2").style.display = "block";
    document.getElementById("ScaleOption3").style.display = "block";
    document.getElementById("typeOption2").style.display = "none";
    inputFeature = {...EmptyItem}
  } if (inputType === "Connections") {
    document.getElementById("FormScaleOption").style.display = "block";
    document.getElementById("ScaleOption1").style.display = "block";
    document.getElementById("ScaleOption2").style.display = "block";
    document.getElementById("ScaleOption3").style.display = "block";
    document.getElementById("typeOption1").style.display = "none";
    inputFeature = {...Emptylink}
  }
  return inputFeature
}

function DrawScale(inputScale) {
  if (inputScale == 1) {
    document.getElementById("ScaleOption2").style.display = "none";
    document.getElementById("ScaleOption3").style.display = "none";
    inputFeature.properties.scale = inputScale
  } 
  if (inputScale == 2 ) {
    document.getElementById("ScaleOption1").style.display = "none";
    document.getElementById("ScaleOption3").style.display = "none";
    inputFeature.properties.scale = inputScale
  } 
  if (inputScale == 3 ) {
    document.getElementById("ScaleOption1").style.display = "none";
    document.getElementById("ScaleOption2").style.display = "none";
    inputFeature.properties.scale = inputScale
  } 
  if (inputFeature.geometry.type == "Polygon"){
    document.getElementById("FormStyleOptionItem").style.display = "block";
    document.getElementById("FormStyleOptionItem1").style.display = "block";
    document.getElementById("FormStyleOptionItem2").style.display = "block";
    document.getElementById("FormStyleOptionItem3").style.display = "block";
  } 
  if (inputFeature.geometry.type == "LineString"){
    document.getElementById("FormStyleOptionLink").style.display = "block";
    document.getElementById("FormStyleOptionLink1").style.display = "block";
    document.getElementById("FormStyleOptionLink2").style.display = "block";
    document.getElementById("FormStyleOptionLink3").style.display = "block";
  }
}

function DrawStyle(inputStyle) {
  if (inputFeature.geometry.type == "Polygon"){
    if (inputStyle === 'Polygon_A'){
      document.getElementById("FormStyleOptionItem2").style.display = "none";
      document.getElementById("FormStyleOptionItem3").style.display = "none";
    } 
    if (inputStyle === 'Polygon_B'){ 
      document.getElementById("FormStyleOptionItem1").style.display = "none";
      document.getElementById("FormStyleOptionItem3").style.display = "none";
    } 
    if (inputStyle === 'Polygon_C'){ 
      document.getElementById("FormStyleOptionItem1").style.display = "none";
      document.getElementById("FormStyleOptionItem2").style.display = "none";
    }
  }
  if (inputFeature.geometry.type == "LineString"){
    if (inputStyle === 'Link_A'){
      document.getElementById("FormStyleOptionLink2").style.display = "none";
      document.getElementById("FormStyleOptionLink3").style.display = "none";
    } 
    if (inputStyle === 'Link_B'){ 
      document.getElementById("FormStyleOptionLink1").style.display = "none";
      document.getElementById("FormStyleOptionLink3").style.display = "none";
    } 
    if (inputStyle === 'Link_C'){ 
      document.getElementById("FormStyleOptionLink1").style.display = "none";
      document.getElementById("FormStyleOptionLink2").style.display = "none";
    }
  }
  document.getElementById("FormTitleOption").style.display = "block";
  document.getElementById("formButtonSubmitName").style.display = "block";
  inputFeature.properties.type = inputStyle
}

function DrawName() {
  let inputName = document.getElementById("inputName").value;
  inputFeature.properties.name = inputName
  document.getElementById("formButtonSubmitName").style.display = "none";
  document.getElementById("FormInfoOption").style.display = "block";
  document.getElementById("formButtonSubmitInfo").style.display = "block";
}

function DrawInfo() {
  let inputInfo = document.getElementById("inputInfo").value;
  inputFeature.properties.info = inputInfo
  document.getElementById("formButtonSubmitInfo").style.display = "none";
  document.getElementById("windowButtonSave").style.display = "inline-block";

}

function DrawDraw() {

  addInteraction() 

  inputFeature.geometry.coordinates =  [[
    [110, 50],
    [110, 60],
    [130, 60],
    [130, 50],
  ]]

  inputFeature.id = uuidv4()

  map.getLayers().forEach(function(layer) {
    layer.getSource().clear();
  });

  WorkFlowItemList.push(inputFeature)

  console.log(inputFeature)

  var itemIdHash = list2hash(WorkFlowItemList)  

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



}

function DrawReset() {
  var myForm = document.querySelector('.popupDraw');  

  document.getElementById("DrawForm").reset();
  document.getElementById("typeOption1").style.display = "block";
  document.getElementById("typeOption2").style.display = "block";

  document.getElementById("FormScaleOption").style.display = "none";
  document.getElementById("ScaleOption1").style.display = "none";
  document.getElementById("ScaleOption2").style.display = "none";
  document.getElementById("ScaleOption3").style.display = "none";

  document.getElementById("FormStyleOptionLink").style.display = "none";
  document.getElementById("FormStyleOptionItem1").style.display = "none";
  document.getElementById("FormStyleOptionItem2").style.display = "none";
  document.getElementById("FormStyleOptionItem3").style.display = "none";

  document.getElementById("FormStyleOptionItem").style.display = "none";
  document.getElementById("FormStyleOptionLink1").style.display = "none";
  document.getElementById("FormStyleOptionLink2").style.display = "none";
  document.getElementById("FormStyleOptionLink3").style.display = "none";

  document.getElementById("FormTitleOption").style.display = "none";
  document.getElementById("formButtonSubmitName").style.display = "none";

  document.getElementById("FormInfoOption").style.display = "none";
  document.getElementById("formButtonSubmitInfo").style.display = "none";
  document.getElementById("windowButtonSave").style.display = "none";

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

