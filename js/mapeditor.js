$(function() {
	$('#map_canvas').gmap({
		'disableDefaultUI' : true,
		'callback' : function(map) {
			var mapView = new MapViewModel(map, this);
			ko.applyBindings(mapView);
		}
	});

	ko.bindingHandlers['modal'] = {
		init : function(element, valueAccessor, allBindingsAccessor) {
			var allBindings = allBindingsAccessor();
			var $element = $(element);
			$element.addClass('hide modal');

			if (allBindings.modalOptions) {
				if (allBindings.modalOptions.beforeClose) {
					$element.on('hide', function() {
						return allBindings.modalOptions.beforeClose();
					});
				}
			}

			return ko.bindingHandlers['with'].init.apply(this, arguments);
		},
		update : function(element, valueAccessor) {
			var value = ko.utils.unwrapObservable(valueAccessor());

			var returnValue = ko.bindingHandlers['with'].update.apply(this, arguments);

			if (value) {
				$(element).modal('show');
			} else {
				$(element).modal('hide');
			}

			return returnValue;
		}
	};

	/**********
	 *		SHAPE Object
	 */
	function Polyline(data) {
		var self = this;
		self.type = "polyline";
		self.name = ko.observable();
		self.color = ko.observable();
		self.color.subscribe(function(newValue) {
			if (self.hidden.polyline)
				self.hidden.polyline.set('strokeColor', newValue);
		});
		self.lines = ko.observableArray();
		self.hidden = function() {
		}//this way we hide elements we don't want in JSON
		self.parent
		self.polyline
		//lets open modal
		self.init(data);
		self.polylineEditEvents();

	}


	jQuery.extend(Polyline.prototype, {
		init : function(data) {
			this.name(data.name || "new line");

			this.lines(data.lines);

			this.hidden.parent = data.parent;

			this.initPolyline();
			this.color(data.color || this.polylineColor() || "#000000");
			//this should be after marker init
		},
		update : function(data) {
			this.name(data.name);
			this.color(data.color);
		},
		initPolyline : function() {

			var path = [];
			//  Parse the array of LatLngs into Gmap points
			for (var i = 0; i < this.lines().length; i++) {
				var l = this.lines()[i];
				path.push(new google.maps.LatLng(l[0], l[1]));
			}
			this.hidden.polyline = new google.maps.Polyline({
				path : path,
				strokeColor : this.color(),
				strokeOpacity : 1.0,
				strokeWeight : 3
			});
			this.hidden.polyline.setMap(this.hidden.parent.map);

		},
		polylineEditEvents : function() {
			var s = this;
			$(s.hidden.polyline).click(function() {
				s.hidden.parent.editPolyline(s);
			});
		},

		polylineColor : function() {
			return this.hidden.polyline.get('strokeColor');
		},

		remove : function() {
			if (this.hidden.polyline)
				this.hidden.polyline.setMap(null);
		}
	});

	/**********
	 *  Point object
	 */

	function Point(data) {
		var self = this;
		self.icon = ko.observable();
		self.icon.subscribe(function(newValue) {
			if (self.hidden.marker)
				self.hidden.marker.setIcon($.Constants.ICONS_SRC_FOLDER + newValue);
		});

		self.name = ko.observable(name);
		self.name.subscribe(function(newValue) {
			if (self.hidden.marker)
				self.hidden.marker.setTitle(newValue);
		});

		self.color = ko.observable();

		self.desc = ko.observable();

		self.location = ko.observable();

		self.type = "point";

		self.hidden = function() {
		}//this way we hide elements we don't want in JSON

		self.lat = ko.observable();
		self.lng = ko.observable();

		//functions
		self.init(data);
		self.markerEditEvents();

	}


	jQuery.extend(Point.prototype, {
		init : function(data) {
			this.name(data.name || "new item");

			this.color(data.color || "#000000");
			this.lat(data.lat);
			this.lng(data.lng);

			this.hidden.gmap = data.parent.gmap;
			this.hidden.parent = data.parent;
			this.initMarker();
			this.icon(data.icon || $.Constants.NEW_MARKER_DEFAULT_ICON);
			//this should be after marker init
		},
		update : function(data) {
			this.name(data.name);
			this.icon(data.icon);
			this.color(data.color);
			this.lat(data.lat);
			this.lng(data.lng);
		},
		initMarker : function() {
			this.hidden.marker = this.hidden.gmap.addMarker({
				'draggable' : true,
				'position' : new google.maps.LatLng(this.lat(), this.lng()),
				'bounds' : false
			}).get(0);
		},
		markerEditEvents : function() {
			var s = this
			$(s.hidden.marker).dragend(function(event) {
				s.findLocation(event.latLng);
				//var pos = event.latLng;
				//self.lat(pos.lat());
				//self.lng(pos.lng());
			}).click(function(event) {
				s.hidden.parent.editPoint(s);
			})
		},
		remove : function() {
			if (this.hidden.marker)
				this.hidden.marker.setMap(null);
		},
		findLocation : function(location) {
			if (!location)
				location = this.hidden.marker.getPosition();
			var $this = this;
			this.hidden.gmap.search({
				'location' : location
			}, function(results, status) {
				if (status === 'OK') {
					$this.location(results[0].formatted_address);
				}
			});
		}
	});

	// Overall viewmodel for this screen, along with initial state
	function MapViewModel(map, gmap) {
		var self = this;
		self.map = map;
		self.gmap = gmap;

		// Editable data

		/**
		 * Icons
		 */
		self.showIconSelector = ko.observable().extend({
			throttle : 100
		});

		self.findedIcons = ko.observableArray(["accesdenied.png", "aircraftsmall.png", "airport.png", "airport_apron.png", "airport_runway.png"]);
		self.findIconsValue = ko.observable("");

		self.findIconsValue.subscribe(function(newValue) {
			self.queryForIcons(newValue);
		});

		self.queryForIcons = function(q) {

			var jqxhr = $.getJSON("icons/icons.js", function(json) {
				var arr = jQuery.grep(json, function(str, i) {
					var re = new RegExp("\\b" + q, "gi");
					var matches = re.exec(str.replace("_", " "));
					return (matches);
				});
				self.findedIcons(arr);
			}).error(function(jqXHR, textStatus, errorThrown) {
				console.log("error " + textStatus);
				console.log("incoming Text " + jqXHR.responseText);
			});

		}
		/*
		 * MAP SAVING
		 *
		 */

		self.isChanged = ko.observable(true);

		self.saveMap = function() {

			var data = {
				points : self.points(),
				polylines : self.polylines()
			}

			var plainJs = ko.toJSON(data);
			//alert(plainJs);

			/*
			 *
			 *<Style id="style27">
			 *    <LineStyle>
			 *     <color>400066CC</color>
			 *      <width>3</width>
			 *    </LineStyle>
			 *    <PolyStyle>
			 *      <color>BFCC33CC</color>
			 *      <fill>1</fill>
			 *      <outline>1</outline>
			 *    </PolyStyle>
			 * </Style>
			 * <Placemark>
			 *  <name>Nepal - 1st Leg</name>
			 *  <description><![CDATA[]]></description>
			 *  <styleUrl>#style50</styleUrl>
			 *  <LineString>
			 *    <tessellate>1</tessellate>
			 *    <coordinates>
			 *      84.869156,27.000408,0.000000
			 *      84.981766,27.192350,0.000000
			 *      84.986115,27.199678,0.000000
			 *      84.984512,27.191128,0.000000
			 *   </coordinates>
			 *  </LineString>
			 *</Placemark>
			 *
			 *
			 * <Style id="style17">
			 *   <IconStyle>
			 *     <Icon>
			 *       <href>http://maps.gstatic.com/mapfiles/ms2/micons/rail.png</href>
			 *     </Icon>
			 *   </IconStyle>
			 * </Style>
			 *
			 *<Placemark>
			 *  <name>02 Aurangabad: 19-23 Jan</name>
			 *  <description><![CDATA[]]></description>
			 *  <styleUrl>#style6</styleUrl>
			 *  <Point>
			 *    <coordinates>75.333252,19.859728,0.000000</coordinates>
			 *  </Point>
			 * </Placemark>
			 */

			var points = self.points();
			var polylines = self.polylines();

			var XML = '<?xml version="1.0" encoding="UTF-8"?>\n<kml xmlns="http://earth.google.com/kml/2.2">\n';
			var kmlXML = "<name>KML doc</name>\n<description>KML desc</description>\n"

			//Lets generate polylines related xml
			var stylesPolyXML = "";
			var placemarksPolyXML = "";
			var polyStyleStr = "Line_";
			$.each(polylines, function(i, poly) {
				var style = "<Style id='" + polyStyleStr + i + "'>\n";
				style += "<LineStyle>\n"
				style += "<color>400066CC</color>\n"
				style += "<width>3</width>\n"
				style += "</LineStyle>\n"
				style += "</Style>\n";
				stylesPolyXML += style;

				var placemark = "<Placemark>\n";
				placemark += "<name>" + poly.name() + "</name>\n";
				placemark += "<description><![CDATA[" + poly.name() + "]]></description>\n";
				placemark += "<styleUrl>" + '#' + polyStyleStr + i + "</styleUrl>\n";
				placemark += "<LineString>\n"
				placemark += "<tessellate>1</tessellate>\n"
				placemark += "<coordinates>\n";
				$.each(poly.lines(), function(i, line) {
					placemark += line[1] + "," + line[0] + ",0.000000\n"
				})
				placemark += "</coordinates>\n";
				placemark += "</LineString>\n";

				placemark += "</Placemark>\n";
				placemarksPolyXML += placemark;
			});

			//Lets generate points related xml
			var stylesXML = "";
			var placemarksXML = "";
			var pointStyleStr = "Point_";
			$.each(points, function(i, point) {
				var style = "<Style id='" + pointStyleStr + i + "'>\n";
				style += "<IconStyle>\n"
				style += "<Icon>\n"
				style += "<href>" + $.Constants.ICONS_SRC_FOLDER +  point.icon() + "</href>\n";
				style += "</Icon>\n";
				style += "</IconStyle>\n";
				style += "</Style>\n";
				stylesXML += style;

				var placemark = "<Placemark>\n";
				placemark += "<name>" + point.name() + "</name>\n";
				placemark += "<description><![CDATA[" + point.name() + "]]></description>";
				placemark += "<styleUrl>" + '#' + pointStyleStr + i + "</styleUrl>\n";
				placemark += "<Point>\n";
				placemark += "<coordinates>" + point.lng() + ',' + point.lat() + ',0.000000' + "</coordinates>\n";
				placemark += "</Point>\n";
				placemark += "</Placemark>\n";
				placemarksXML += placemark;
			});
			XML += "<Document>\n" + kmlXML + stylesXML + placemarksXML + stylesPolyXML + placemarksPolyXML + "</Document>\n</kml>"

			if ($.parseXML(XML))
				alert(XML);
			else
				alert("XML parsing error")

		}
		/*
		 *
		 *
		 */

		self.points = ko.observableArray();
		self.polylines = ko.observableArray();
		self.mapitems = ko.computed(function() {
			return this.points().concat(this.polylines());
		}, this);

		self.addGrupp = function() {

		}
		//For selecting point or polyline modal
		self.editMapitem = function(mapitem) {
			if (mapitem.type === "point") {
				self.editPoint(mapitem);
			} else if (mapitem.type === "polyline") {
				self.editPolyline(mapitem);
			} else {
				alert("Type undefined")
			}

		};

		//For point modal
		self.editingPoint = ko.observable();
		self.editPoint = function(point) {
			self.editingPoint(point);
			//lets open modal

			point.findLocation();

		};
		self.savePoint = function() {
			self.editingPoint(undefined);
		}
		self.removePoint = function(point) {
			point.remove();
			self.points.remove(point);
			self.editingPoint(undefined);
		}
		//for polylines modal
		self.editingPolyline = ko.observable();
		self.editPolyline = function(polyline) {
			self.editingPolyline(polyline);
			//modal content is dom is polyline is defined, so we init datepicker here

			$('#polylineColorPicker').colorpicker({
				format : 'hex'
			}).on('changeColor', function(ev) {
				//alert(ev.color.toHex() +"!="+ polyline.color());
				polyline.color(ev.color.toHex());
			});
		};
		self.savePolyline = function() {
			self.editingPolyline(undefined);
		}
		self.removePolyline = function(polyline) {
			polyline.remove();
			self.polylines.remove(polyline);
			self.editingPolyline(undefined);
		}
		/**
		 * Drawing manager
		 */

		var drawingManager;
		var polyOptions = {
			strokeWeight : 0,
			fillOpacity : 0.45,
			editable : true
		};
		// Creates a drawing manager attached to the map that allows the user to draw
		// markers, lines, and polylines.
		drawingManager = new google.maps.drawing.DrawingManager({
			drawingMode : google.maps.drawing.OverlayType.MARKER,
			drawingControl : true,
			drawingControlOptions : {
				position : google.maps.ControlPosition.TOP_LEFT,
				drawingModes : [google.maps.drawing.OverlayType.MARKER, google.maps.drawing.OverlayType.POLYLINE]
			},
			markerOptions : {
				draggable : true
			},
			polylineOptions : {
				editable : true
			},
			rectangleOptions : polyOptions,
			circleOptions : polyOptions,
			polygonOptions : polyOptions,
			map : self.map
		});
		/**
		 * Map events
		 */

		clearSelection = function() {
			drawingManager.setDrawingMode(null);
		}

		google.maps.event.addListener(drawingManager, 'overlaycomplete', function(e) {
			if (e.type != google.maps.drawing.OverlayType.MARKER) {
				// Switch back to non-drawing mode after drawing a polyline.
				drawingManager.setDrawingMode(null);
				// Add an event listener that selects the newly-drawn polyline when the user
				// mouses down on it.
				var newPolyline = e.overlay;
				newPolyline.type = e.type;

				//alert(path);

				if (newPolyline.type == google.maps.drawing.OverlayType.POLYLINE) {
					var path = newPolyline.getPath();
					var lines = []
					for (var i = 0; i < path.length; i++) {
						var p = path.getAt(i);
						lines.push([p.lat(), p.lng()]);
					}
					var polyline = new Polyline({
						lines : lines,
						parent : self
					})
					self.polylines.push(polyline);
					self.editPolyline(polyline);
				}
				newPolyline.setMap(null);
			}
		});
		google.maps.event.addDomListener(drawingManager, 'markercomplete', function(marker) {
			var pos = marker.getPosition();
			var point = new Point({
				lat : pos.lat(),
				lng : pos.lng(),
				parent : self
			});
			self.points.push(point);
			self.editPoint(point);
			marker.setMap(null);
			// Switch back to non-drawing mode after drawing a polyline.
			drawingManager.setDrawingMode(null);
		});
		google.maps.event.addListener(self.map, "rightclick", clearSelection);

		// Clear the current selection when the drawing mode is changed, or when the
		// map is clicked.
		//google.maps.event.addListener(drawingManager, 'drawingmode_changed', clearSelection);
		//google.maps.event.addListener(self.map, 'click', clearSelection);
		self.loadJSON = function() {
			var jqxhr = $.getJSON("testJSON.js", function(json) {

				ko.utils.arrayMap(json.points, function(data) {
					data.parent = self;
					self.points.push(new Point(data));
				});

				ko.utils.arrayMap(json.polylines, function(data) {
					data.parent = self;
					self.polylines.push(new Polyline(data));
				});
				//lets fit items on page

				var pointsLatLng = ko.utils.arrayMap(json.points, function(data) {
					return new google.maps.LatLng(data.lat, data.lng)
				});
				var polylinesLatLng = [];
				$.each(json.polylines, function(i, data) {
					$.each(data.lines, function(i, line) {
						polylinesLatLng.push(new google.maps.LatLng(line[0], line[1]));
					});
				});

				var LatLngList = jQuery.merge(polylinesLatLng, pointsLatLng);
				//  Create a new viewpoint bound
				var bounds = new google.maps.LatLngBounds();
				//  Go through each...
				for (var i = 0, LtLgLen = LatLngList.length; i < LtLgLen; i++) {
					//  And increase the bounds to take this point
					bounds.extend(LatLngList[i]);
				}
				//  Fit these bounds to the map
				map.fitBounds(bounds);
			}).error(function(jqXHR, textStatus, errorThrown) {
				console.log("error " + textStatus);
				console.log("incoming Text " + jqXHR.responseText);
			});
		}
		self.loadJSON();
	}


	jQuery.extend(MapViewModel.prototype, {

	});

});

