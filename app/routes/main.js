import Ember from 'ember';

export default Ember.Route.extend({
	setupController: function(controller){
		var url = localStorage.getItem('locationURL');
		if(url){
			controller.getWeather(url);
		}
	}
});
