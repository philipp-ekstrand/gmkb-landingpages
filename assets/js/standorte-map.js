/* ============================================================
   GMKB Standorte – Google Maps mit allen 12 Einrichtungen
   ============================================================ */

function initStandorteMap() {
  var mapEl = document.getElementById('standorte-map');
  if (!mapEl) return;

  var locations = [
    // Medizinzentren
    { lat: 50.6833, lng: 7.1523, name: 'MEZ Godesburg', address: 'Am Michaelshof 4b, 53177 Bonn', type: 'mez' },
    { lat: 50.7488, lng: 7.0786, name: 'MEZ Bonn', address: 'Graurheindorfer Str. 149a, 53117 Bonn', type: 'mez' },
    { lat: 50.9096, lng: 6.9414, name: 'MEZ Köln', address: 'Herthastr. 4, 50969 Köln', type: 'mez' },
    { lat: 50.7340, lng: 7.0997, name: 'KJP Bonner Markt', address: 'Markt 9, 53111 Bonn', type: 'mez' },
    { lat: 50.8757, lng: 6.8697, name: 'KJP Hürth', address: 'Vogelsanger Weg 6, 50354 Hürth', type: 'mez' },
    // Therapie-Praxen
    { lat: 50.7371, lng: 7.0963, name: 'TEO', address: 'Oxfordstr. 12–16, 53111 Bonn', type: 'therapie' },
    { lat: 50.6833, lng: 7.1523, name: 'ITZ Godesburg', address: 'Am Michaelshof 4b, 53177 Bonn', type: 'therapie' },
    { lat: 50.7488, lng: 7.0786, name: 'ITZ Auerberg', address: 'Pariser Str. 40, 53117 Bonn', type: 'therapie' },
    { lat: 50.7540, lng: 7.0570, name: 'ITZ Gustav-Heinemann-Haus', address: 'Waldenburger Ring 44, 53119 Bonn', type: 'therapie' },
    { lat: 50.7265, lng: 7.0487, name: 'ITZ Kindernierenzentrum', address: 'Im Mühlenbach 2b, 53127 Bonn', type: 'therapie' },
    { lat: 50.7606, lng: 6.9922, name: 'ITZ Kloster Bornheim', address: 'Klosterstr. 2, 53332 Bornheim', type: 'therapie' },
    { lat: 50.7352, lng: 7.0965, name: 'GMBiff', address: 'Joachimstr. 10–12, 53113 Bonn', type: 'therapie' }
  ];

  var center = { lat: 50.78, lng: 7.02 };

  var map = new google.maps.Map(mapEl, {
    center: center,
    zoom: 11,
    mapId: 'gmkb-standorte',
    disableDefaultUI: false,
    zoomControl: true,
    mapTypeControl: false,
    streetViewControl: false,
    fullscreenControl: true,
    styles: [
      { featureType: 'poi', stylers: [{ visibility: 'off' }] },
      { featureType: 'transit', stylers: [{ visibility: 'simplified' }] },
      { featureType: 'water', stylers: [{ color: '#D4EAEA' }] },
      { featureType: 'landscape', stylers: [{ color: '#F5FAFA' }] },
      { featureType: 'road.highway', stylers: [{ color: '#E0E8E8' }] },
      { featureType: 'road.arterial', stylers: [{ color: '#E8F0F0' }] }
    ]
  });

  var infoWindow = new google.maps.InfoWindow();

  locations.forEach(function (loc) {
    var pinColor = loc.type === 'mez' ? '#046C6C' : '#0D9B9B';

    var marker = new google.maps.Marker({
      position: { lat: loc.lat, lng: loc.lng },
      map: map,
      title: loc.name,
      icon: {
        path: google.maps.SymbolPath.CIRCLE,
        scale: 10,
        fillColor: pinColor,
        fillOpacity: 1,
        strokeColor: '#FFFFFF',
        strokeWeight: 2.5
      }
    });

    marker.addListener('click', function () {
      infoWindow.setContent(
        '<div style="font-family:Inter,system-ui,sans-serif;padding:4px 2px;">' +
          '<strong style="color:#046C6C;font-size:14px;">' + loc.name + '</strong><br>' +
          '<span style="color:#4A5A5A;font-size:13px;">' + loc.address + '</span>' +
          '<br><a href="https://www.google.com/maps/dir/?api=1&destination=' +
          encodeURIComponent(loc.address) +
          '" target="_blank" rel="noopener" style="color:#0D7377;font-size:13px;text-decoration:none;font-weight:600;">Route planen →</a>' +
        '</div>'
      );
      infoWindow.open(map, marker);
    });
  });
}

window.initStandorteMap = initStandorteMap;
