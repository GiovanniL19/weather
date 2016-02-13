import Ember from 'ember';

export
default Ember.Controller.extend({
	geolocation: Ember.inject.service(),
	
	city: '',
	weatherFound: false,
	weather: null,
	loading: false,
	background: 'https://static.pexels.com/photos/9574/pexels-photo.jpeg',
	
	getWeather: function(url){
		let controller = this;
		
		Ember.$.ajax({
			url: url,
			type: 'GET',
			accepts: 'application/json',
			success: function(data) {
				switch(data.weather[0].main){
					case 'Sun':
						controller.set('icon', 'sun-o');
						controller.set('background', 'http://susanstilwell.com/wp-content/uploads/2011/10/dreamstimefree_20823097.jpg');
						break;
					case 'Clear':
						controller.set('icon', 'sun-o');
						controller.set('background', 'http://www.fusebox.coffs.com.au/files/clear%20sky%20background.JPG');
						break;
					case 'Rain':
						controller.set('background', 'http://newtopwallpapers.com/wp-content/uploads/2013/04/Rain-Falling-on-Trees.jpeg');
						controller.set('icon', 'fa-tint');
						break;
					case 'Clouds':
						controller.set('background', 'http://vapeaboutit.com/wp-content/uploads/2015/05/Clouds-over-the-Tasman-10.jpg');
						controller.set('icon', 'cloud');
						break;
					case 'Snow':
						controller.set('background', 'http://cdn1.theodysseyonline.com/files/2016/01/09/635879112155223228-319755513_635861833670816810507191518_6670-perfect-snow-1920x1080-nature-wallpaper.jpg');
						controller.set('icon', 'circle-thin');
						break;
					case 'Storm':
						controller.set('background', 'http://7-themes.com/data_images/out/25/6852482-storm.jpg');
						controller.set('icon', 'bolt');
						break;
				}
				controller.set('weather', data);
				controller.set('weatherFound', true);
			},
			error: function(err) {
				console.log(err);
			}
		});
	},
	
	actions: {
		cityInput: function() {
			var url = "http://api.openweathermap.org/data/2.5/weather?q=" + this.get('city') + "&APPID=e18a7372402f4236aceae23897fa1af9&units=metric";
			this.getWeather(url);
		},
		
		currentLocation: function(){
			let controller = this;
			this.set('loading', true);
			
			this.get('geolocation').getLocation().then(function(geoObject) {
				var url = "http://api.openweathermap.org/data/2.5/weather?lat=" + geoObject.coords.latitude + "&lon=" + geoObject.coords.longitude + "&APPID=e18a7372402f4236aceae23897fa1af9&units=metric";
				controller.getWeather(url);
			});
		},
	}
});
