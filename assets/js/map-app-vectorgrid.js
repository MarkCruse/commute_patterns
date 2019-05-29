
// D3 abbreviations
var $ = d3.select, $$ = d3.selectAll;

// If you change the default loads below. 
// Be sure to change check-status in index.html!!!
var map_showing = true,
    ern1_showing = true,
    ern2_showing = false,
    ern3_showing = false,
    age1_showing = true,
    age2_showing = false,
    age3_showing = false,
    ind1_showing = true,
    ind2_showing = false,
    ind3_showing = false;

var map = L.map('map', {
    renderer: L.canvas()
}).setView([37, -100], 5).setMaxZoom(12).setMinZoom(3);


// add labels & tiles to the map
map.createPane('labels');
map.getPane('labels').style.zIndex = 650;
map.getPane('labels').style.pointerEvents = 'none';

tile_layer = L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_only_labels/{z}/{x}/{y}.png', {
    attribution: '©OpenStreetMap, ©Carto',
    pane: 'labels'
}).addTo(map);

initControls();

var age1LayerGroup = L.layerGroup().addTo(map);
var age2LayerGroup = L.layerGroup();
var age3LayerGroup = L.layerGroup();
var earn1LayerGroup = L.layerGroup();
var earn2LayerGroup = L.layerGroup();
var earn3LayerGroup = L.layerGroup();





function initControls() {

	$$("#options .option > .option-name").on("touchstart", function() {
		var option_element = this.parentNode,
		    option_id = option_element.id,
		    $option = $(option_element),
		    is_visible = $option.classed("visible");

		if ($option.classed("disabled")) return;

		$("#options").classed("hoverable", false);
		$$("#options .option").classed("visible",
			is_visible ? false : function() { return this.id == option_id; }
		);
		d3.event.preventDefault();
    });
    
    $("#map-toggler").on("click", toggleMap);

    $("#earn1-toggler").on("click", toggleEarn1);
    $("#earn2-toggler").on("click", toggleEarn2);
    $("#earn3-toggler").on("click", toggleEarn3);

    $("#age1-toggler").on("click", toggleAge1);
    $("#age2-toggler").on("click", toggleAge2);
    $("#age3-toggler").on("click", toggleAge3);
/*
    $("#goods-toggler").on("click", toggleInd1);
    $("#trade-toggler").on("click", toggleInd2);
    $("#other-toggler").on("click", toggleInd3);
*/

function toggleMap() {
	if (map_showing) hideMap();
	else showMap();
}

function showMap() {
	if (map_showing) return;
	tile_layer.addTo(map).bringToBack();
  
	$("#map-toggler").classed("checked", true);
	map_showing = true;
}

function hideMap() {
	if (!map_showing) return;
	map.removeLayer(tile_layer);
	$("#map-toggler").classed("checked", false);
	map_showing = false;
}

//************ Show / Hide earnings layers  *********

function toggleEarn1() {
    if (ern1_showing) {
        hideEarn1();
    } else {
        showEarn1();
    }
    mapLayerGroup.clearLayers();
    process_arrays(initialArray, ern, age, ind)
}

function showEarn1() {
    if (ern1_showing) return;
    map.addLayer(earn1LayerGroup);
    $("#earn1-toggler").classed("checked", true);
    ern1_showing = true;
}

function hideEarn1() {
    if (!ern1_showing) return;
    map.removeLayer(earn1LayerGroup);
    $("#earn1-toggler").classed("checked", false);
    ern1_showing = false;
}
//******  Medium Earners ******
function toggleEarn2() {
    if (ern2_showing) {
        hideEarn2();
    } else {
        showEarn2();
    }
}

function showEarn2() {
    if (ern2_showing) return;
    map.addLayer(earn2LayerGroup);
    $("#earn2-toggler").classed("checked", true);
    ern2_showing = true;
}

function hideEarn2() {
    if (!ern2_showing) return;
    map.removeLayer(earn2LayerGroup);
    $("#earn2-toggler").classed("checked", false);
    ern2_showing = false;
}
//******  High Earners ******
function toggleEarn3() {
    if (ern3_showing) {
        hideEarn3();
    } else {
        showEarn3();
    }
}

function showEarn3() {
    if (ern3_showing) return;
    $("#earn3-toggler").classed("checked", true);
    map.addLayer(earn3LayerGroup);
    ern3_showing = true;
}

function hideEarn3() {
    if (!ern3_showing) return;
    map.removeLayer(earn3LayerGroup);
    $("#earn3-toggler").classed("checked", false);
    ern3_showing = false;
}


// ***************** Show Hide Age Groups   *******************

function toggleAge1() {
    if (age1_showing) {
        hideAge1();
    } else {
        showAge1();
    }
}
function showAge1() {
    if (age1_showing) return;
    $("#age1-toggler").classed("checked", true);
    map.addLayer(age1LayerGroup);
    age1_showing = true;
}
function hideAge1() {
    if (!age1_showing) return;
    map.removeLayer(age1LayerGroup);
    $("#age1-toggler").classed("checked", false);
    age1_showing = false;
}
//******  Mid Age Group ******
function toggleAge2() {
    if (age2_showing) {
        hideAge2();
    } else {
        showAge2();
    }
}
function showAge2() {
    if (age2_showing) return;
    $("#age2-toggler").classed("checked", true);
    map.addLayer(age2LayerGroup);
    age2_showing = true;
}
function hideAge2() {
    if (!age2_showing) return;
    map.removeLayer(age2LayerGroup);
    $("#age2-toggler").classed("checked", false);
    age2_showing = false;
}
//******  Oldest Age Group ******
function toggleAge3() {
    if (age3_showing) {
        hideAge3();
    } else {
        showAge3();
    }
}
function showAge3() {
    if (age3_showing) return;
    $("#age3-toggler").classed("checked", true);
    map.addLayer(age3LayerGroup);
    age3_showing = true;
}
function hideAge3() {
    if (!age3_showing) return;
    map.removeLayer(age3LayerGroup);
    $("#age3-toggler").classed("checked", false);
    age3_showing = false;
}


// ************************ Show Hide Industry Groups   **********************
/*
function toggleInd1() {
    if (ind1_showing) {
        hideInd1();
        ind = ind - 1 ;
    } else {
        showInd1();
        ind = ind + 1;
    }
    console.log(ind);
    mapLayerGroup.clearLayers();
    process_arrays(initialArray, ern, age, ind)
}

function showInd1() {
    if (ind1_showing) return;
    $("#goods-toggler").classed("checked", true);
    ind1_showing = true;
}

function hideInd1() {
    if (!ind1_showing) return;
    $("#goods-toggler").classed("checked", false);
    ind1_showing = false;
}
//******  Industry Trade Group ******
function toggleInd2() {
    if (ind2_showing) {
        hideInd2();
        ind = ind - 4;
    } else {
        showInd2();
        ind = ind + 4;
    }
    console.log(ind);
    mapLayerGroup.clearLayers();
    process_arrays(initialArray, ern, age, ind);
}

function showInd2() {
    if (ind2_showing) return;
    $("#trade-toggler").classed("checked", true);
    ind2_showing = true;
}

function hideInd2() {
    if (!ind2_showing) return;
    $("#trade-toggler").classed("checked", false);
    ind2_showing = false;
}
//******  Industry Other Group ******
function toggleInd3() {
    if (ind3_showing) {
        ind = ind - 7;
        hideInd3();
    } else {
        showInd3();
        ind = ind + 7;
    }
    console.log(ind);
    mapLayerGroup.clearLayers();
    process_arrays(initialArray, ern, age, ind);
}

function showInd3() {
    if (ind3_showing) return;
    $("#other-toggler").classed("checked", true);
    ind3_showing = true;
}

function hideInd3() {
    if (!ind3_showing) return;
    $("#other-toggler").classed("checked", false);
    ind3_showing = false;
}
*/


}  // end  initControls

//******************************************************
//
//                  Age 1                               
//
//******************************************************
var tiles_age1_long=
"https://b.tiles.mapbox.com/v4/mdcruse.22esnd76/{z}/{x}/{y}.vector.pbf?access_token={token}"; 
var options_age1_long = {
vectorTileLayerStyles: {
    'age1_long': {
        fill: false,
        color: 'red', 
        weight: .3,
        opacity: 2
    }
},   
rendererFactory: L.canvas.tile,
token: "pk.eyJ1IjoibWRjcnVzZSIsImEiOiJjanZvN25kaHQxdzAxNDhwZjM4NDNvMXV4In0.s4GSawMNB7Jo4Vf7LXKEew"
}
var age1_long = L.vectorGrid.protobuf(tiles_age1_long, options_age1_long).addTo(age1LayerGroup);

var tiles_age1_medium =
"https://b.tiles.mapbox.com/v4/mdcruse.9ywjkj1l/{z}/{x}/{y}.vector.pbf?access_token={token}"; 
var options_age1_medium = {
vectorTileLayerStyles: {
    'age1_medium': {
        fill: false,
        color: 'yellow', 
        weight: .6,
        opacity: .4
    }
},   
rendererFactory: L.canvas.tile,
token: "pk.eyJ1IjoibWRjcnVzZSIsImEiOiJjanZvN25kaHQxdzAxNDhwZjM4NDNvMXV4In0.s4GSawMNB7Jo4Vf7LXKEew"
}
var age1_medium = L.vectorGrid.protobuf(tiles_age1_medium, options_age1_medium).addTo(age1LayerGroup);

var tiles_age1_short =
"https://b.tiles.mapbox.com/v4/mdcruse.armcbp4c/{z}/{x}/{y}.vector.pbf?access_token={token}"; 
var options_age1_short = {
vectorTileLayerStyles: {
    'age1_short': {
        fill: false,
        color: 'white', 
        weight: .3,
        opacity: .3
    }
},   
rendererFactory: L.canvas.tile,
token: "pk.eyJ1IjoibWRjcnVzZSIsImEiOiJjanZvN25kaHQxdzAxNDhwZjM4NDNvMXV4In0.s4GSawMNB7Jo4Vf7LXKEew"
}
var age1_short = L.vectorGrid.protobuf(tiles_age1_short, options_age1_short).addTo(age1LayerGroup);
//******************************************************
//
//                  Age 2                               
//
//******************************************************
var tiles_age2_long = "https://b.tiles.mapbox.com/v4/mdcruse.9ymk040x/{z}/{x}/{y}.vector.pbf?access_token={token}"; 
var options_age2_long = {
vectorTileLayerStyles: {
'age2_long': {
    fill: false,
    color: 'red', 
    weight: .3,
    opacity: 2
}
},   
rendererFactory: L.canvas.tile,
token: "pk.eyJ1IjoibWRjcnVzZSIsImEiOiJjanZvN25kaHQxdzAxNDhwZjM4NDNvMXV4In0.s4GSawMNB7Jo4Vf7LXKEew"
}

var age2_long = L.vectorGrid.protobuf(tiles_age2_long, options_age2_long).addTo(age2LayerGroup);

var tiles_age2_medium =
"https://b.tiles.mapbox.com/v4/mdcruse.2jwlb9vi/{z}/{x}/{y}.vector.pbf?access_token={token}"; 
var options_age2_medium = {
vectorTileLayerStyles: {
'age2_medium': {
    fill: false,
    color: 'yellow', 
    weight: .6,
    opacity: .4
}
},   
rendererFactory: L.canvas.tile,
token: "pk.eyJ1IjoibWRjcnVzZSIsImEiOiJjanZvN25kaHQxdzAxNDhwZjM4NDNvMXV4In0.s4GSawMNB7Jo4Vf7LXKEew"
}
var age2_medium = L.vectorGrid.protobuf(tiles_age2_medium, options_age2_medium).addTo(age2LayerGroup);

var tiles_age2_short =
"https://b.tiles.mapbox.com/v4/mdcruse.a3h1s2q4/{z}/{x}/{y}.vector.pbf?access_token={token}"; 
var options_age2_short = {
vectorTileLayerStyles: {
'age2_short': {
    fill: false,
    color: 'white', 
    weight: .3,
    opacity: .3
}
},   
rendererFactory: L.canvas.tile,
token: "pk.eyJ1IjoibWRjcnVzZSIsImEiOiJjanZvN25kaHQxdzAxNDhwZjM4NDNvMXV4In0.s4GSawMNB7Jo4Vf7LXKEew"
}
var age2_short = L.vectorGrid.protobuf(tiles_age2_short, options_age2_short).addTo(age2LayerGroup);


//******************************************************
//
//                  Age 3                               
//
//******************************************************
var tiles_age3_long=
"https://b.tiles.mapbox.com/v4/mdcruse.2zq2nl6e/{z}/{x}/{y}.vector.pbf?access_token={token}"; 
var options_age3_long = {
vectorTileLayerStyles: {
    'age3_long': {
        fill: false,
        color: 'red', 
        weight: .3,
        opacity: 2
    }
},   
rendererFactory: L.canvas.tile,
token: "pk.eyJ1IjoibWRjcnVzZSIsImEiOiJjanZvN25kaHQxdzAxNDhwZjM4NDNvMXV4In0.s4GSawMNB7Jo4Vf7LXKEew",
interactive: true
}

var age3_long = L.vectorGrid.protobuf(tiles_age3_long, options_age3_long).addTo(age3LayerGroup);

var tiles_age3_medium =
"https://b.tiles.mapbox.com/v4/mdcruse.ab0xc43r/{z}/{x}/{y}.vector.pbf?access_token={token}"; 
var options_age3_medium = {
vectorTileLayerStyles: {
    'age3_medium': {
        fill: false,
        color: 'yellow', 
        weight: .6,
        opacity: .4
    }
},   
rendererFactory: L.canvas.tile,
token: "pk.eyJ1IjoibWRjcnVzZSIsImEiOiJjanZvN25kaHQxdzAxNDhwZjM4NDNvMXV4In0.s4GSawMNB7Jo4Vf7LXKEew"
}
var age3_medium = L.vectorGrid.protobuf(tiles_age3_medium, options_age3_medium).addTo(age3LayerGroup);

var tiles_age3_short =
"https://b.tiles.mapbox.com/v4/mdcruse.5ny6159y/{z}/{x}/{y}.vector.pbf?access_token={token}"; 
var options_age3_short = {
vectorTileLayerStyles: {
    'age3_short': {
        fill: false,
        color: 'white', 
        weight: .3,
        opacity: .3
    }
},   
rendererFactory: L.canvas.tile,
token: "pk.eyJ1IjoibWRjcnVzZSIsImEiOiJjanZvN25kaHQxdzAxNDhwZjM4NDNvMXV4In0.s4GSawMNB7Jo4Vf7LXKEew"
}
var age3_short = L.vectorGrid.protobuf(tiles_age3_short, options_age3_short).addTo(age3LayerGroup);

//******************************************************
//
//                  Earn 1                               
//
//******************************************************

var tiles_earn1_long=
"https://b.tiles.mapbox.com/v4/mdcruse.32mpe10s/{z}/{x}/{y}.vector.pbf?access_token={token}"; 
var options_earn1_long = {
vectorTileLayerStyles: {
    'earn1_long': {
        fill: false,
        color: 'red', 
        weight: .3,
        opacity: 2
    }
},   
rendererFactory: L.canvas.tile,
token: "pk.eyJ1IjoibWRjcnVzZSIsImEiOiJjanZvN25kaHQxdzAxNDhwZjM4NDNvMXV4In0.s4GSawMNB7Jo4Vf7LXKEew"
}
var earn1_long = L.vectorGrid.protobuf(tiles_earn1_long, options_earn1_long).addTo(earn1LayerGroup);

var tiles_earn1_medium =
"https://b.tiles.mapbox.com/v4/mdcruse.b2iwrf66/{z}/{x}/{y}.vector.pbf?access_token={token}"; 
var options_earn1_medium = {
vectorTileLayerStyles: {
    'earn1_medium': {
        fill: false,
        color: 'yellow', 
        weight: .6,
        opacity: .4
    }
},   
rendererFactory: L.canvas.tile,
token: "pk.eyJ1IjoibWRjcnVzZSIsImEiOiJjanZvN25kaHQxdzAxNDhwZjM4NDNvMXV4In0.s4GSawMNB7Jo4Vf7LXKEew"
}
var earn1_medium = L.vectorGrid.protobuf(tiles_earn1_medium, options_earn1_medium).addTo(earn1LayerGroup);

var tiles_earn1_short =
"https://b.tiles.mapbox.com/v4/mdcruse.3mkv2spp/{z}/{x}/{y}.vector.pbf?access_token={token}"; 
var options_earn1_short = {
vectorTileLayerStyles: {
    'earn1_short': {
        fill: false,
        color: 'white', 
        weight: .3,
        opacity: .3
    }
},   
rendererFactory: L.canvas.tile,
token: "pk.eyJ1IjoibWRjcnVzZSIsImEiOiJjanZvN25kaHQxdzAxNDhwZjM4NDNvMXV4In0.s4GSawMNB7Jo4Vf7LXKEew"
}
var earn1_short = L.vectorGrid.protobuf(tiles_earn1_short, options_earn1_short).addTo(earn1LayerGroup);

//******************************************************
//
//                  Earn 2                              
//
//******************************************************
var tiles_earn2_long = "https://b.tiles.mapbox.com/v4/mdcruse.32wi6606/{z}/{x}/{y}.vector.pbf?access_token={token}"; 
var options_earn2_long = {
vectorTileLayerStyles: {
'earn2_long': {
    fill: false,
    color: 'red', 
    weight: .3,
    opacity: 2
}
},   
rendererFactory: L.canvas.tile,
token: "pk.eyJ1IjoibWRjcnVzZSIsImEiOiJjanZvN25kaHQxdzAxNDhwZjM4NDNvMXV4In0.s4GSawMNB7Jo4Vf7LXKEew",
interactive: true
}

var earn2_long = L.vectorGrid.protobuf(tiles_earn2_long, options_earn2_long).addTo(earn2LayerGroup);

var tiles_earn2_medium =
"https://b.tiles.mapbox.com/v4/mdcruse.4gndlcpr/{z}/{x}/{y}.vector.pbf?access_token={token}"; 
var options_earn2_medium = {
vectorTileLayerStyles: {
'earn2_medium': {
    fill: false,
    color: 'yellow', 
    weight: .6,
    opacity: .4
}
},   
rendererFactory: L.canvas.tile,
token: "pk.eyJ1IjoibWRjcnVzZSIsImEiOiJjanZvN25kaHQxdzAxNDhwZjM4NDNvMXV4In0.s4GSawMNB7Jo4Vf7LXKEew"
}
var earn2_medium = L.vectorGrid.protobuf(tiles_earn2_medium, options_earn2_medium).addTo(earn2LayerGroup);

var tiles_earn2_short =
"https://b.tiles.mapbox.com/v4/mdcruse.3a1chitj/{z}/{x}/{y}.vector.pbf?access_token={token}"; 
var options_earn2_short = {
vectorTileLayerStyles: {
'earn2_short': {
    fill: false,
    color: 'white', 
    weight: .3,
    opacity: .3
}
},   
rendererFactory: L.canvas.tile,
token: "pk.eyJ1IjoibWRjcnVzZSIsImEiOiJjanZvN25kaHQxdzAxNDhwZjM4NDNvMXV4In0.s4GSawMNB7Jo4Vf7LXKEew"
}
var earn2_short = L.vectorGrid.protobuf(tiles_earn2_short, options_earn2_short).addTo(earn2LayerGroup);


//******************************************************
//
//                  Earn 3                               
//
//******************************************************
var tiles_earn3_long=
"https://b.tiles.mapbox.com/v4/mdcruse.a6ox7rtr/{z}/{x}/{y}.vector.pbf?access_token={token}"; 
var options_earn3_long = {
vectorTileLayerStyles: {
    'earn3_long': {
        fill: false,
        color: 'red', 
        weight: .3,
        opacity: 2
    }
},   
rendererFactory: L.canvas.tile,
token: "pk.eyJ1IjoibWRjcnVzZSIsImEiOiJjanZvN25kaHQxdzAxNDhwZjM4NDNvMXV4In0.s4GSawMNB7Jo4Vf7LXKEew",
interactive: true
}

var earn3_long = L.vectorGrid.protobuf(tiles_earn3_long, options_earn3_long).addTo(earn3LayerGroup);

var tiles_earn3_medium =
"https://b.tiles.mapbox.com/v4/mdcruse.co1uff7q/{z}/{x}/{y}.vector.pbf?access_token={token}"; 
var options_earn3_medium = {
vectorTileLayerStyles: {
    'earn3_medium': {
        fill: false,
        color: 'yellow', 
        weight: .6,
        opacity: .4
    }
},   
rendererFactory: L.canvas.tile,
token: "pk.eyJ1IjoibWRjcnVzZSIsImEiOiJjanZvN25kaHQxdzAxNDhwZjM4NDNvMXV4In0.s4GSawMNB7Jo4Vf7LXKEew"
}
var earn3_medium = L.vectorGrid.protobuf(tiles_earn3_medium, options_earn3_medium).addTo(earn3LayerGroup);

var tiles_earn3_short =
"https://b.tiles.mapbox.com/v4/mdcruse.beh83a3k/{z}/{x}/{y}.vector.pbf?access_token={token}"; 
var options_earn3_short = {
vectorTileLayerStyles: {
    'earn3_short': {
        fill: false,
        color: 'white', 
        weight: .3,
        opacity: .3
    }
},   
rendererFactory: L.canvas.tile,
token: "pk.eyJ1IjoibWRjcnVzZSIsImEiOiJjanZvN25kaHQxdzAxNDhwZjM4NDNvMXV4In0.s4GSawMNB7Jo4Vf7LXKEew"
}
var earn3_short = L.vectorGrid.protobuf(tiles_earn3_short, options_earn3_short).addTo(earn3LayerGroup);