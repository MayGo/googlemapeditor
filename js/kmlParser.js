! function($) {

	var Kml = function(element, options) {
		this.$element = $(element);
		this.placemarks = [];
		this.getAndParse(options.url, (options.onComplete!==undefined)?options.onComplete:this.onCompleteParsing);
	};

	Kml.prototype = {
		constructor : Kml,

		getAndParse : function(url, onComplete) {
			var obj = this;
			$.get(url, function(data) {
				onComplete(obj.parseKml(data));
				//alert(data);
			});
		},
		parseKml : function(xml) {
			var that=this;
			var xmlDoc = ( typeof xml === 'string') ? $.parseXML(xml) : xml;
			var $xml = $(xmlDoc);
			var $style = $xml.find("Placemark").each(function() {
				var placemark = {
					name : $(this).find("name").text(),
					desc : $(this).find("desciption").text(),
					type : "",
					style : {},
				}
				var point = $(this).find("Point")
				var polyline = $(this).find("LineString")
				var polygon=$(this).find("Polygon") 
				if (point.get(0) !== undefined) {
					placemark.type = "point"
					var coord = point.find("coordinates").text().split(",");
					placemark.lat = coord[1];
					placemark.lng = coord[0];
					//alert(placemark.lng + " " + placemark.name)
				} else if (polyline.get(0) !== undefined) {
					placemark.type = "polyline";
					var coord = polyline.find("coordinates").text().split("\n")
					var polylinesLatLng = [];
					$.each(coord, function(i, c) {
						var line = c.split(",");
						if (line.length ==3) {
							polylinesLatLng.push([line[0], line[1]]);
						}
					});
					placemark.lines = polylinesLatLng;
				} else if (polygon.get(0) !== undefined) {
					placemark.type = "polyline";
					var coord = polyline.find("coordinates").text().split("\n")
					var polylinesLatLng = [];
					$.each(coord, function(i, c) {
						var line = c.split(",");
						if (line.length ==3) {
							polylinesLatLng.push([line[0], line[1]]);
						}
					});
					placemark.lines = polylinesLatLng;
				}

				if ( styleUrl = $(this).find("styleUrl").text()) {
					$xml.find(styleUrl).each(function() {//just in case lets to a each
						if ( href = $(this).find("href").text()) {
							placemark.style.url = href;
						} else if ( lineStyle = $(this).find("LineStyle")) {
							placemark.style.color = lineStyle.find("color").text();
							placemark.style.width = lineStyle.find("width").text();
						} else {
							console.error("No href");
						}
					});

				} else {
					console.error("No styleUrl");
				}
				that.placemarks.push(placemark);
				//alert($(this).find("name").text());
				//$(this).attr("author");
				
			});
			return that.placemarks;
		},
		onCompleteParsing:function(placemarks){
			//alert(placemarks);
		}
	};

	$.fn.kmlParser = function(option) {
		return this.each(function() {
			var $this = $(this), data = $this.data('kmlparser'), options = typeof option === 'object' && option;
			if (!data) {
				$this.data('kmlparser', ( data = new Kml(this, $.extend({}, $.fn.kmlParser.defaults, options))));
			}
			if ( typeof option === 'string')
				data[option]();
		});
	};

	$.fn.kmlParser.defaults = {
	
	};

	$.fn.kmlParser.Constructor = Kml;

}(window.jQuery)