$(function() {
	$('#map_canvas').gmap({
		'disableDefaultUI' : true,
		'callback' : function(map) {
			var self = this;
			self.set('savePoint', function(marker) {
				var id = marker.__gm_id;
				var state = $('#state' + marker.__gm_id).val();
				var country = $('#country' + marker.__gm_id).val();
				var address = $('#address' + marker.__gm_id).val();
				var item = $('#item_' + id);
				if (item.length == 0)
					item = $('<li id="item_' + id + '" ></li>').appendTo('#items_list');

				item.html(address);

				item.draggable({
					axis : "y",
					containment : "parent"
				});

				//$('#item_' + id)
			});
			self.set('removePoint', function(marker) {
				var id = marker.__gm_id;

				var item = $('#item_' + id);
				if (item.length > 0)
					item.remove();

				//$('#item_' + id)
			});
			self.set('openDialog', function(marker) {
				$('#dialog').dialog({
					'modal' : true,
					'title' : 'Edit and save point',
					'buttons' : {
						'Remove' : function() {
							self.get('removePoint')(marker);
							$(this).dialog('close');
							marker.setMap(null);
							return false;
						},
						'Save' : function() {
							self.get('savePoint')(marker);
							$(this).dialog('close');
							return false;
						}
					}
				});
			});
			self.set('findLocation', function(location, marker) {
				self.search({
					'location' : location
				}, function(results, status) {
					if (status === 'OK') {
						$.each(results[0].address_components, function(i, v) {
							if (v.types[0] == "administrative_area_level_1" || v.types[0] == "administrative_area_level_2") {
								$('#state' + marker.__gm_id).val(v.long_name);
							} else if (v.types[0] == "country") {
								$('#country' + marker.__gm_id).val(v.long_name);
							}
						});
						marker.setTitle(results[0].formatted_address);
						$('#address' + marker.__gm_id).val(results[0].formatted_address);
						self.get('openDialog')(marker);
					}
				});
			});
			$(map).click(function(event) {
				self.addMarker({
					'position' : event.latLng,
					'draggable' : true,
					'bounds' : false
				}, function(map, marker) {
					var pos = marker.getPosition();
					var id = marker.__gm_id;
					var lat = pos.lat();
					var lng = pos.lng();
					mapView.addMapitem(id, "nimi", lat, lng)
					//ko.marker(marker);
					self.get('findLocation')(marker.getPosition(), marker);
				}).dragend(function(event) {
					self.get('findLocation')(event.latLng, this);
				}).click(function() {
					self.get('openDialog')(this);
				})
			});
		}
	});

	// Class to represent a row in the seat reservations grid
	function Mapitem(id, name, lat, lng) {
		var self = this;
		self.id = id;
		self.name = ko.observable(name);
		self.lat = ko.observable(lat);
		self.lng = ko.observable(lng);
		//alert(self.marker)
	}

	// Overall viewmodel for this screen, along with initial state
	function MapViewModel() {
		var self = this;

		this.nameToAdd = ko.observable("");

		// Editable data
		self.mapitems = ko.observableArray([]);

		// Operations
		self.addMapitem = function(id, name, marker) {
			var match = ko.utils.arrayFirst(self.mapitems(), function(item) {
				return item.id == id;
				//note the ()
			});
			//alert(marker);
			if (!match) {
				self.mapitems.push(new Mapitem(id, name, marker));
			}

		}
		self.addGrupp = function() {

		}
		self.nameToAddIsValid = ko.computed(function() {
			return (self.nameToAdd() == "") || (self.nameToAdd().match(/^\s*[a-zA-Z0-9_]{1,15}\s*$/) != null);
		}, self);
		this.canAddName = ko.computed(function() {
			return this.nameToAddIsValid() && this.nameToAdd() != "";
		}, this);

		self.removeMapitem = function(mapitem) {
			self.mapitems.remove(mapitem)
		}
	}

	mapView = new MapViewModel();
	ko.applyBindings(mapView);

});

