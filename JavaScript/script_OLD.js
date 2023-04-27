// Map initalisation

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

// Geojson ----------------------------------------------------------------
//REF : 
/*  
  1 : {
    Polygon_A : [
      {
        'UUDI' : 'XX',
        'Attributes' : {
          'title' : 'title 1',
          'info' : 'information'
        },
        'features' : {
          'type': 'Feature',
          'geometry': {
            'type': 'Polygon',
            'coordinates': [
              [
                [10, 10],
                [10, 20],
                [30, 20],
                [30, 10],
              ],
            ],
          }
        }
      }
    ],
*/

// Geojson - workflow data management--------------------------------------

function generateUUID() { // Public Domain/MIT
  var d = new Date().getTime();//Timestamp
  var d2 = ((typeof performance !== 'undefined') && performance.now && (performance.now()*1000)) || 0;//Time in microseconds since page-load or 0 if unsupported
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16;//random number between 0 and 16
      if(d > 0){//Use timestamp until depleted
          r = (d + r)%16 | 0;
          d = Math.floor(d/16);
      } else {//Use microseconds since page-load if supported
          r = (d2 + r)%16 | 0;
          d2 = Math.floor(d2/16);
      }
      return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
  });
}


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


// styles 
const FeatureStylesActive = {
  'Polygon_A': new ol.style.Style({
    stroke: new ol.style.Stroke({
      color: 'white',
      lineDash: null,
      width: 2,
    }),
    fill: new ol.style.Fill({
      color: 'rgba(0, 255, 0, 0.05)',
    }), 
  }),
  'Polygon_B': new ol.style.Style({
    stroke: new ol.style.Stroke({
      color: 'white',
      lineDash: null,
      width: 2,
      fill: null,
    }),
    fill: new ol.style.Fill({
      color: 'rgba(255, 255, 255, 0.05)',
    }),
  }),
  'Polygon_C': new ol.style.Style({
    stroke: new ol.style.Stroke({
      color: 'white',
      lineDash: null,
      width: 2,
      fill: null,
    }),
    fill: new ol.style.Fill({
      color: 'rgba(0, 0, 0, 0.05)',
    }),
  })
};

const FeatureStylesHidden = {
  'Polygon_A': new ol.style.Style({
    stroke: new ol.style.Stroke({
      color: 'gray',
      lineDash: [4,2],
      width: 1,
      fill: null,
    })
  }),
  'Polygon_B': new ol.style.Style({
    stroke: new ol.style.Stroke({
      color: 'gray',
      lineDash: null,
      width: 2,
      fill: null,
    })
  }),
  'Polygon_C': new ol.style.Style({
    stroke: new ol.style.Stroke({
      color: 'gray',
      lineDash: null,
      width: 2,
      fill: null,
    })
  })
};


const styleFunction = function (name, curentZoom, hidden) {
  if (curentZoom < hidden){
    return FeatureStylesActive[name];
  }
  return FeatureStylesHidden[name];
};

// Geojson - Extractors --------------------------------------------------


// the goal is to create a layer for each scale and each type automatically
function Data2Layer(Scale, dataListe){
let layers = []
let textLayer = []
for (ScaleFeature in dataListe) {
  for (typeFeature in dataListe[ScaleFeature]){
    if (dataListe[ScaleFeature][typeFeature].length !==0){
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
      }; 
      for (item of dataListe[ScaleFeature][typeFeature]){
        tempFeatures.features.push(item.features);
      }
      let Source = new ol.source.Vector({
        features: new ol.format.GeoJSON().readFeatures({...tempFeatures}),
      });
      const layer = new ol.layer.Vector({
        source: Source,
        style: styleFunction(typeFeature, map.getView().getZoom(),Scale[ScaleFeature].hidden),
        maxZoom : Scale[ScaleFeature].maxZoom, 
        minZoom : Scale[ScaleFeature].minZoom, 
        declutter: true
      });
      layers.push([layer,{
        typeFeature : typeFeature,
        hidden : Scale[ScaleFeature].hidden,
        maxZoom : Scale[ScaleFeature].maxZoom,
        minZoom : Scale[ScaleFeature].minZoom
      }
    ])
    }
  }
}
return layers
}



const Scale = {
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

var workflowLink = [
]

var workflowItem = {
  1 : {
    Polygon_A : [
      {
        'UUDI' : 'XX',
        'Attributes' : {
          'title' : 'title 1',
          'info' : 'information'
        },
        'features' : {
          'type': 'Feature',
          'geometry': {
            'type': 'Polygon',
            'coordinates': [
              [
                [10, 10],
                [10, 20],
                [30, 20],
                [30, 10],
              ],
            ],
          }
        }
      }
    ],
    Polygon_B : [
      {
        'UUDI' : 'XX',
        'Attributes' : {
          'title' : 'title 1',
          'info' : 'information'
        },
        'features' : {
          'type': 'Feature',
          'geometry': {
            'type': 'Polygon',
            'coordinates': [
              [
                [50, 10],
                [50, 20],
                [30, 20],
                [30, 10],
              ],
            ],
          }
        }
      }
    ], 
    Polygon_C : [

    ], 
  }, 
  2 : {
    Polygon_A : [{
      'UUDI' : 'XX',
      'Attributes' : {
        'title' : 'title 1',
        'info' : 'information'
      },
      'features' : {
        'type': 'Feature',
        'geometry': {
          'type': 'Polygon',
          'coordinates': [
            [
              [10, 10],
              [10, 200],
              [300, 200],
              [300, 10],
            ],
          ],
        }
      }
    },
    {
      'UUDI' : 'XX',
      'Attributes' : {
        'title' : 'title 1',
        'info' : 'information'
      },
      'features' : {
        'type': 'Feature',
        'geometry': {
          'type': 'Polygon',
          'coordinates': [
            [
              [350, 10],
              [350, 200],
              [650, 200],
              [650, 10],
            ],
          ],
        }
      }
    }
    ],
    Polygon_B : [

    ], 
    Polygon_C : [

    ], 
  }, 
  3 : {
    Polygon_A : [
      {
        'UUDI' : 'XX',
        'Attributes' : {
          'title' : 'title 1',
          'info' : 'information'
        },
        'features' : {
          'type': 'Feature',
          'geometry': {
            'type': 'Polygon',
            'coordinates': [
              [
                [10, 10],
                [10, 2000],
                [3000, 2000],
                [3000, 10],
              ],
            ],
          }
        }
      }, 
      {
        'UUDI' : 'XX',
        'Attributes' : {
          'title' : 'title 1',
          'info' : 'information'
        },
        'features' : {
          'type': 'Feature',
          'geometry': {
            'type': 'Polygon',
            'coordinates': [
              [
                [3510, 10],
                [3510, 2000],
                [6510, 2000],
                [6510, 10],
              ],
            ],
          }
        }
      }
    ],
    Polygon_B : [

  ], 
    Polygon_C : [

    ], 
  }
}

var layers = Data2Layer({...Scale}, workflowItem)

for (layer of layers) {
  map.addLayer(layer[0]);
}

const graticule = new ol.layer.Graticule({
  strokeStyle: new ol.style.Stroke({
    color: 'rgba(255,255,255,0.9)',
    width: 1,
    lineDash: [0.5, 10],
  }),
  showLabels: false,
  wrapX: false,
})

map.addLayer(graticule);

const vectorSource = new ol.source.Vector({
  features: [],
});

const textStyle = new ol.style.Style({
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
});

const vectorLayer = new ol.layer.Vector({
  source: vectorSource,
  style: textStyle
});

const labelFeature = new ol.Feature({
  geometry: new ol.geom.Point([20, 15])
});

vectorSource.addFeature(labelFeature);

map.addLayer(vectorLayer);

// FUTURE DRAW OPTION
/*
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
      let xCoordinates = Math.round(coordinates[0] / 30) * 30;
      let yCoordinates = Math.round(coordinates[1] / 30) * 30;
      const squareSideLength = 30;
      const squareGeom = new ol.geom.Polygon([
        [
          [xCoordinates - squareSideLength / 2, yCoordinates - squareSideLength / 2],
          [xCoordinates + squareSideLength / 2, yCoordinates - squareSideLength / 2],
          [xCoordinates + squareSideLength / 2, yCoordinates + squareSideLength / 2],
          [xCoordinates - squareSideLength / 2, yCoordinates + squareSideLength / 2],
          [xCoordinates - squareSideLength / 2, yCoordinates - squareSideLength / 2]
        ]
      ]);
      return squareGeom;
    }, 
    style: function(feature) {
      return new ol.style.Style({
        image: new ol.style.RegularShape({
          fill: new ol.style.Fill({color: 'rgba(255, 255, 255, 0.5)'}),
          stroke: new ol.style.Stroke({color: 'blue', width: 2}),
          points: 4,
          radius: 30,
          angle: Math.PI / 4,
        }),
      });
    }
  });
  map.addInteraction(draw);
}

addInteraction();

const snap = new ol.interaction.Snap({
  source: TESTLayer.getSource(),
  pixelTolerance : 50
});
map.addInteraction(snap);

  const font = `bold ${48 * 6.6 map.getView().getResolution()}px Trebuchet Ms`
    vectorLayer.getStyle().getText().setFont(font);
*/  


map.getView().on('change:resolution', (event) => {
  const font = `${12/ 6.6 * 1/map.getView().getResolution()}px Arial`
  vectorLayer.getStyle().getText().setFont(font);


  for(layer of layers){
    let hiddenLayer = layer[1].hidden
    let typeFeatureLayer = layer[1].typeFeature
    layer[0].setStyle(function(feature, resolution) {
      return styleFunction(typeFeatureLayer, map.getView().getZoom(),hiddenLayer);
    }, 
  )}
});

//HTML Content functions
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


