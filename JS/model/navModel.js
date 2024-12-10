const NavModel = (() => {
    // Private function to get stored locations
    const getLocations = () => {
        return JSON.parse(localStorage.getItem('ultimasLocalidades')) || [];
    };

    // Private function to save a location to localStorage
    const saveLocation = (location) => {
        let locations = getLocations();

        // Add new location to the start, avoiding duplicates
        if (!locations.includes(location)) {
            locations.unshift(location);
        }

        // Limit to 5 saved locations
        if (locations.length > 5) {
            locations.pop();
        }

        // Save back to localStorage
        localStorage.setItem('ultimasLocalidades', JSON.stringify(locations));
    };

    const saveHospitals = (hospitals) => {
        localStorage.setItem('hospitaisExibidos', JSON.stringify(hospitals));
    };

    // Retrieve hospitals from localStorage
    const getHospitals = () => {
        return JSON.parse(localStorage.getItem('hospitaisExibidos')) || [];
    };

    return {
        getLocations,
        saveLocation,
        saveHospitals,
        getHospitals,
    };
})();