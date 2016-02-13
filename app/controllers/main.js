import Ember from 'ember';

export
default Ember.Controller.extend({
	geolocation: Ember.inject.service(),
	
	city: '',
	weatherFound: false,
	weather: {
		background: 'https://static.pexels.com/photos/8605/nature-sky-sunset-sun.jpg'
	},
	loading: false,
	
	getWeather: function(url){
		let controller = this;
		
		Ember.$.ajax({
			url: url,
			type: 'GET',
			accepts: 'application/json',
			success: function(data) {
				var weather = data;
				weather.icon = '';
				weather.background = 'https://static.pexels.com/photos/9574/pexels-photo.jpeg';
				switch(data.weather[0].main){
					case 'Sun':
						weather.icon = 'sun-o'
						weather.background ='https://static.pexels.com/photos/5055/sea-sky-beach-holiday.jpeg';
						break;
					case 'Clear':
						weather.icon = 'sun-o';
						weather.background ='http://www.fusebox.coffs.com.au/files/clear%20sky%20background.JPG';
						break;
					case 'Rain':
						weather.background ='https://static.pexels.com/photos/17739/pexels-photo.jpg';
						weather.icon = 'fa-tint';
						break;
					case 'Clouds':
						weather.background ='https://static.pexels.com/photos/7167/clouds.jpg';
						weather.icon = 'cloud';
						break;
					case 'Snow':
						weather.background ='https://static.pexels.com/photos/1127/cold-snow-landscape-nature.jpg';
						weather.icon = 'circle-thin';
						break;
					case 'Storm':
						weather.background ='https://static.pexels.com/photos/799/city-lights-night-clouds.jpg';
						weather.icon = 'bolt';
						break;
				}
				controller.set('weather', weather);
				controller.set('weatherFound', true);
				localStorage.clear();
				localStorage.setItem('locationURL', url);
			},
			error: function(err) {
				console.log(err);
			}
		});
	},
	
	actions: {
		back: function(){
			this.set('weatherFound', false);
			this.set('weather', {
				background: 'https://static.pexels.com/photos/8605/nature-sky-sunset-sun.jpg'
			});
			localStorage.clear();
		},
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
