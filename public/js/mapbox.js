/* eslint-disable */

module.exports = displayMap = (locations) => {
  mapboxgl.accessToken =
    'pk.eyJ1IjoiamlheWluZzMzMCIsImEiOiJjbTV5aTZ3MHYwaHppMmpweTkwcmJuejZ3In0.p_m97NkZcposU6CcueIZ9Q';

  var map = new mapboxgl.Map({
    container: 'map',
    style:
      'mapbox://styles/jiaying330/cm5yl8qy2000t01ssc5agfj2k',
    // style:
    //   'mapbox://styles/jonasschmedtmann/cjvi9q8jd04mi1cpgmg7ev3dy',
    scrollZoom: false,
    // center: [-118.113491, 34.111745],
    // zoom: 10,
    // interactive: false
  });

  const bounds = new mapboxgl.LngLatBounds();

  locations.forEach((loc) => {
    // Create marker
    const el = document.createElement('div');
    el.className = 'marker';

    // Add marker
    new mapboxgl.Marker({
      element: el,
      anchor: 'bottom',
    })
      .setLngLat(loc.coordinates)
      .addTo(map);

    // Add popup
    new mapboxgl.Popup({
      offset: 30,
    })
      .setLngLat(loc.coordinates)
      .setHTML(`<p>Day ${loc.day}: ${loc.description}</p>`)
      .addTo(map);

    // Extend map bounds to include current location
    bounds.extend(loc.coordinates);
  });

  map.fitBounds(bounds, {
    padding: {
      top: 200,
      bottom: 150,
      left: 100,
      right: 100,
    },
  });
};
