( {
	gm_accessors_ : {
		latLngs : null,
		map : null,
		title : null,
		strokeColor : null,
		strokeWeight : null,
		strokeOpacity : null,
		fillColor : null,
		fillOpacity : null,
		visible : null
	},
	latLngs : {
		b : [{
			b : [{
				Ya : 27.635483,
				Za : 86.23512299999993
			}, {
				Ya : 27.616014,
				Za : 86.492615
			}, {
				Ya : 27.643391,
				Za : 86.79885100000001
			}, {
				Ya : 27.629999,
				Za : 87.02545199999997
			}, {
				Ya : 27.51314,
				Za : 87.13394199999993
			}, {
				Ya : 27.39859,
				Za : 87.11917100000005
			}, {
				Ya : 27.22776,
				Za : 87.184753
			}, {
				Ya : 27.09214,
				Za : 87.25067100000001
			}, {
				Ya : 27.051781,
				Za : 87.27951000000007
			}, {
				Ya : 27.040779,
				Za : 87.30835000000002
			}, {
				Ya : 27.171579,
				Za : 87.32756799999993
			}, {
				Ya : 27.298571,
				Za : 87.25891100000001
			}, {
				Ya : 27.50948,
				Za : 87.192993
			}, {
				Ya : 27.690821,
				Za : 87.08312999999998
			}, {
				Ya : 27.73945,
				Za : 87.15178700000001
			}, {
				Ya : 27.86578,
				Za : 87.15728000000001
			}, {
				Ya : 27.99925,
				Za : 86.91832699999998
			}, {
				Ya : 28.09621,
				Za : 86.64824699999997
			}, {
				Ya : 28.0744,
				Za : 86.56401800000003
			}, {
				Ya : 27.953159,
				Za : 86.511841
			}, {
				Ya : 27.93618,
				Za : 86.56677200000001
			}, {
				Ya : 27.821461,
				Za : 86.55783799999995
			}, {
				Ya : 27.778339,
				Za : 86.68486800000005
			}, {
				Ya : 27.734591,
				Za : 86.70684099999994
			}, {
				Ya : 27.693859,
				Za : 86.70307200000002
			}, {
				Ya : 27.69021,
				Za : 86.72985100000005
			}, {
				Ya : 27.682312,
				Za : 86.47476200000006
			}, {
				Ya : 27.635483,
				Za : 86.23512299999993
			}],
			gm_accessors_ : {
				length : null
			},
			length : 28,
			gm_bindings_ : {
				length : {}
			}
		}],
		gm_accessors_ : {
			length : null
		},
		length : 1,
		gm_bindings_ : {
			length : {}
		}
	},
	gm_bindings_ : {
		latLngs : {},
		map : {},
		title : {},
		strokeColor : {},
		strokeWeight : {},
		strokeOpacity : {},
		fillColor : {},
		fillOpacity : {},
		visible : {}
	},
	map : null,
	title : "Trek",
	strokeColor : "#CC6600",
	strokeWeight : "3",
	strokeOpacity : 0.25,
	fillColor : "#CC33CC",
	fillOpacity : 0.74609375,
	visible : true,
	bounds : {
		Z : {
			b : 27.040779,
			d : 28.09621
		},
		ca : {
			b : 86.23512299999993,
			d : 87.32756799999993
		}
	},
	infoWindow : {
		gm_accessors_ : {
			content : null,
			pixelOffset : null
		},
		content : "<div class=\"geoxml3_infowindow geoxml3_style_style27\"><h3>Trek</h3>\n<div><br></div>\n<div></div></div>",
		gm_bindings_ : {
			content : {},
			pixelOffset : {}
		},
		pixelOffset : {
			width : 0,
			height : 2,
			j : "px",
			L : "px"
		}
	},
	infoWindowOptions : {
		content : "<div class=\"geoxml3_infowindow geoxml3_style_style27\"><h3>Trek</h3>\n<div><br></div>\n<div></div></div>",
		pixelOffset : {
			width : 0,
			height : 2,
			j : "px",
			L : "px"
		}
	},
	__e3_ : {
		click : {
			42 : {
				b : {},
				d : "click",
				e : (function(e) {

					var iW = this.infoWindow;

					iW.close();

					iW.setOptions(this.infoWindowOptions);

					if (e && e.latLng)
						iW.setPosition(e.latLng);
					
else if (this.bounds)
						iW.setPosition(this.bounds.getCenter());

					iW.setContent("<div id='geoxml3_infowindow'>" + iW.getContent() + "</div>");

					google.maps.event.addListenerOnce(iW, "domready", function() {

						var node = document.getElementById('geoxml3_infowindow');

						var imgArray = node.getElementsByTagName('img');

						for (var i = 0; i < imgArray.length; i++) {

							var imgUrlIE = imgArray[i].getAttribute("src");

							var imgUrl = cleanURL(doc.baseDir, imgUrlIE);

							if (kmzMetaData[imgUrl]) {

								imgArray[i].src = kmzMetaData[imgUrl].dataUrl;

							} else if (kmzMetaData[imgUrlIE]) {

								imgArray[i].src = kmzMetaData[imgUrlIE].dataUrl;

							}

						}

					});

					iW.open(this.map, this.bounds ? null : this);

				}),
				f : null,
				n : 0,
				id : 42
			}
		}
	},
	active : true
})({
	name : "01 Nasik: 16-18 Jan",
	description : "<div dir=\"ltr\">Not quite prepared to face Mumbai at the start of our journey, we have decided to head directly from the airport to the holy city of Nasik. Nasik is one of the four cities in India hosting the <a href=\"http://trvl2.com/Nindia13/background/Kumbh_Mela\" target=\"_blank\">Kumbh Mela </a>and as such is full of temples, shrines and pilgrims. We will stay there for a few nights to get over jet lag and get re-accustomed to bustling India.<br><br>Nous n'avons pas envie d'affronter Mumbai d\xE8s le d\xE9but et avons donc d\xE9cid\xE9 de rallier la ville sainte de <a href=\"http://ganapati.free.fr/voyage/maharashtra/frnasik.html\" target=\"_blank\">Nasik </a>pour y passer notre premi\xE8re nuit, r\xE9cup\xE9rer du Jet Lag et nous r\xE9-accoutumer \xE0 l'Inde. Nasik est une des quatre villes indiennes accueillant le festival hindou de la <a href=\"http://fr.wikipedia.org/wiki/Kumbhamela\" target=\"_blank\">Kumbh Mela </a>et en tant que telle attire beaucoup de p\xE9lerins dans ses innombrables temples et sanctuaires.</div>",
	styleUrl : "#style21",
	styleBaseUrl : "/C:/GitHub/googlemapeditor/NINDIA-2013.kml",
	styleID : "style21",
	visibility : true,
	balloonVisibility : true,
	style : {
		balloon : {
			bgColor : "ffffffff",
			textColor : "ff000000",
			text : "<h3>$[name]</h3>\n<div>$[description]</div>\n<div>$[geDirections]</div>",
			displayMode : "default"
		},
		icon : {
			scale : 1,
			dim : {
				x : 0,
				y : 0,
				w : 32,
				h : 32
			},
			hotSpot : {
				x : 0.5,
				y : 0.5,
				xunits : "fraction",
				yunits : "fraction"
			},
			href : "http://maps.gstatic.com/mapfiles/ms2/micons/red.png",
			url : "http://maps.gstatic.com/mapfiles/ms2/micons/red.png",
			img : ( {}),
			marker : {
				url : "http://maps.gstatic.com/mapfiles/ms2/micons/red.png",
				size : {
					width : 32,
					height : 32,
					j : "px",
					L : "px"
				},
				origin : {
					x : 0,
					y : 0
				},
				anchor : {
					x : 16,
					y : 16
				},
				scaledSize : null
			},
			shadow : {
				url : "http://maps.google.com/mapfiles/ms/micons/msmarker.shadow.png",
				size : {
					width : 59,
					height : 32,
					j : "px",
					L : "px"
				},
				origin : null,
				anchor : {
					x : 16,
					y : 32
				},
				scaledSize : {
					width : 59,
					height : 32,
					j : "px",
					L : "px"
				}
			}
		},
		line : {
			color : "ffffffff",
			colorMode : "normal",
			width : 1
		},
		poly : {
			color : "ffffffff",
			colorMode : "normal",
			fill : true,
			outline : true
		}
	},
	vars : {
		display : {
			name : "Name",
			description : "Description",
			address : "Street Address",
			id : "ID",
			Snippet : "Snippet",
			geDirections : "Directions"
		},
		val : {
			name : "01 Nasik: 16-18 Jan",
			description : "<div dir=\"ltr\">Not quite prepared to face Mumbai at the start of our journey, we have decided to head directly from the airport to the holy city of Nasik. Nasik is one of the four cities in India hosting the <a href=\"http://trvl2.com/Nindia13/background/Kumbh_Mela\" target=\"_blank\">Kumbh Mela </a>and as such is full of temples, shrines and pilgrims. We will stay there for a few nights to get over jet lag and get re-accustomed to bustling India.<br><br>Nous n'avons pas envie d'affronter Mumbai d\xE8s le d\xE9but et avons donc d\xE9cid\xE9 de rallier la ville sainte de <a href=\"http://ganapati.free.fr/voyage/maharashtra/frnasik.html\" target=\"_blank\">Nasik </a>pour y passer notre premi\xE8re nuit, r\xE9cup\xE9rer du Jet Lag et nous r\xE9-accoutumer \xE0 l'Inde. Nasik est une des quatre villes indiennes accueillant le festival hindou de la <a href=\"http://fr.wikipedia.org/wiki/Kumbhamela\" target=\"_blank\">Kumbh Mela </a>et en tant que telle attire beaucoup de p\xE9lerins dans ses innombrables temples et sanctuaires.</div>",
			address : "",
			id : "",
			Snippet : "",
			geDirections : "<a href=\"http://maps.google.com/maps?f=d&source=GeoXML3&sll=19.983673,73.78418&daddr=19.983673%2C73.78418\" target=_blank>To Here</a> - <a href=\"http://maps.google.com/maps?f=d&source=GeoXML3&sll=19.983673,73.78418&saddr=19.983673%2C73.78418\" target=_blank>From Here</a>"
		},
		directions : ["f=d", "source=GeoXML3", "sll=19.983673,73.78418"]
	},
	Point : {
		coordinates : [{
			lat : 19.983673,
			lng : 73.78418,
			alt : 0
		}]
	},
	latlng : {
		Ya : 19.983673,
		Za : 73.78417999999999
	},
	marker : {
		gm_accessors_ : {
			map : null,
			position : null,
			title : null,
			zIndex : null,
			icon : null,
			shadow : null,
			flat : null,
			visible : null,
			clickable : null
		},
		map : null,
		O : null,
		gm_bindings_ : {
			map : {},
			position : {},
			title : {},
			zIndex : {},
			icon : {},
			shadow : {},
			flat : {},
			visible : {},
			clickable : {}
		},
		position : {
			Ya : 19.983673,
			Za : 73.78417999999999
		},
		title : "01 Nasik: 16-18 Jan",
		zIndex : -63947744,
		icon : {
			url : "http://maps.gstatic.com/mapfiles/ms2/micons/red.png",
			size : {
				width : 32,
				height : 32,
				j : "px",
				L : "px"
			},
			origin : {
				x : 0,
				y : 0
			},
			anchor : {
				x : 16,
				y : 16
			},
			scaledSize : null
		},
		shadow : {
			url : "http://maps.google.com/mapfiles/ms/micons/msmarker.shadow.png",
			size : {
				width : 59,
				height : 32,
				j : "px",
				L : "px"
			},
			origin : null,
			anchor : {
				x : 16,
				y : 32
			},
			scaledSize : {
				width : 59,
				height : 32,
				j : "px",
				L : "px"
			}
		},
		flat : false,
		visible : true,
		clickable : true,
		infoWindow : {
			gm_accessors_ : {
				content : null,
				pixelOffset : null
			},
			content : "<div class=\"geoxml3_infowindow geoxml3_style_style21\"><h3>01 Nasik: 16-18 Jan</h3>\n<div><div dir=\"ltr\">Not quite prepared to face Mumbai at the start of our journey, we have decided to head directly from the airport to the holy city of Nasik. Nasik is one of the four cities in India hosting the <a href=\"http://trvl2.com/Nindia13/background/Kumbh_Mela\" target=\"_blank\">Kumbh Mela </a>and as such is full of temples, shrines and pilgrims. We will stay there for a few nights to get over jet lag and get re-accustomed to bustling India.<br><br>Nous n'avons pas envie d'affronter Mumbai d\xE8s le d\xE9but et avons donc d\xE9cid\xE9 de rallier la ville sainte de <a href=\"http://ganapati.free.fr/voyage/maharashtra/frnasik.html\" target=\"_blank\">Nasik </a>pour y passer notre premi\xE8re nuit, r\xE9cup\xE9rer du Jet Lag et nous r\xE9-accoutumer \xE0 l'Inde. Nasik est une des quatre villes indiennes accueillant le festival hindou de la <a href=\"http://fr.wikipedia.org/wiki/Kumbhamela\" target=\"_blank\">Kumbh Mela </a>et en tant que telle attire beaucoup de p\xE9lerins dans ses innombrables temples et sanctuaires.</div></div>\n<div><a href=\"http://maps.google.com/maps?f=d&source=GeoXML3&sll=19.983673,73.78418&daddr=19.983673%2C73.78418\" target=_blank>To Here</a> - <a href=\"http://maps.google.com/maps?f=d&source=GeoXML3&sll=19.983673,73.78418&saddr=19.983673%2C73.78418\" target=_blank>From Here</a></div></div>",
			gm_bindings_ : {
				content : {},
				pixelOffset : {}
			},
			pixelOffset : {
				width : 0,
				height : 2,
				j : "px",
				L : "px"
			}
		},
		infoWindowOptions : {
			content : "<div class=\"geoxml3_infowindow geoxml3_style_style21\"><h3>01 Nasik: 16-18 Jan</h3>\n<div><div dir=\"ltr\">Not quite prepared to face Mumbai at the start of our journey, we have decided to head directly from the airport to the holy city of Nasik. Nasik is one of the four cities in India hosting the <a href=\"http://trvl2.com/Nindia13/background/Kumbh_Mela\" target=\"_blank\">Kumbh Mela </a>and as such is full of temples, shrines and pilgrims. We will stay there for a few nights to get over jet lag and get re-accustomed to bustling India.<br><br>Nous n'avons pas envie d'affronter Mumbai d\xE8s le d\xE9but et avons donc d\xE9cid\xE9 de rallier la ville sainte de <a href=\"http://ganapati.free.fr/voyage/maharashtra/frnasik.html\" target=\"_blank\">Nasik </a>pour y passer notre premi\xE8re nuit, r\xE9cup\xE9rer du Jet Lag et nous r\xE9-accoutumer \xE0 l'Inde. Nasik est une des quatre villes indiennes accueillant le festival hindou de la <a href=\"http://fr.wikipedia.org/wiki/Kumbhamela\" target=\"_blank\">Kumbh Mela </a>et en tant que telle attire beaucoup de p\xE9lerins dans ses innombrables temples et sanctuaires.</div></div>\n<div><a href=\"http://maps.google.com/maps?f=d&source=GeoXML3&sll=19.983673,73.78418&daddr=19.983673%2C73.78418\" target=_blank>To Here</a> - <a href=\"http://maps.google.com/maps?f=d&source=GeoXML3&sll=19.983673,73.78418&saddr=19.983673%2C73.78418\" target=_blank>From Here</a></div></div>",
			pixelOffset : {
				width : 0,
				height : 2,
				j : "px",
				L : "px"
			}
		},
		__e3_ : {
			click : {
				3 : {
					b : {},
					d : "click",
					e : (function(e) {

						var iW = this.infoWindow;

						iW.close();

						iW.setOptions(this.infoWindowOptions);

						if (e && e.latLng)
							iW.setPosition(e.latLng);
						
else if (this.bounds)
							iW.setPosition(this.bounds.getCenter());

						iW.setContent("<div id='geoxml3_infowindow'>" + iW.getContent() + "</div>");

						google.maps.event.addListenerOnce(iW, "domready", function() {

							var node = document.getElementById('geoxml3_infowindow');

							var imgArray = node.getElementsByTagName('img');

							for (var i = 0; i < imgArray.length; i++) {

								var imgUrlIE = imgArray[i].getAttribute("src");

								var imgUrl = cleanURL(doc.baseDir, imgUrlIE);

								if (kmzMetaData[imgUrl]) {

									imgArray[i].src = kmzMetaData[imgUrl].dataUrl;

								} else if (kmzMetaData[imgUrlIE]) {

									imgArray[i].src = kmzMetaData[imgUrlIE].dataUrl;

								}

							}

						});

						iW.open(this.map, this.bounds ? null : this);

					}),
					f : null,
					n : 0,
					id : 3
				}
			}
		},
		active : true
	}
})