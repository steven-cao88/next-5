class Util {
	// get full name of event type
	static getEventTypes() {
		return {
		  T: 'Thoroughbred',
		  H: 'Harness',
		  G: 'Greyhound'
		};
	}

	// get time in hh:mm:ss format
	// TODO: return AM and PM format
	static getTime(timeString) {
		return /\d\d:\d\d:\d\d/.exec(timeString)[0];
	}
}

export default Util;