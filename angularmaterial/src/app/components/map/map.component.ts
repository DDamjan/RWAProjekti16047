import { Component, OnInit, ViewChild, ElementRef, Input, Output, EventEmitter } from '@angular/core';
import { APPID, APPCODE } from '../../../constants/map-credentials';
import { toMMSS, toKM } from 'src/app/func/functions';
declare var H: any;
declare var bubble: any;

@Component({
  selector: 'map-component',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})

export class MapComponent implements OnInit {
  @ViewChild('map', null)
  public mapElement: ElementRef;

  public platform: any;
  public ui: any;
  public map: any;
  public defaultLayers: any;

  @Input()
  public width: any;

  @Input()
  public height: any;

  @Input()
  public lat: number;

  @Input()
  public lng: number;

  @Input()
  public zoom: number;

  @Output()
  routeParams = new EventEmitter<any>();

  public constructor() { }

  public ngOnInit() { }

  public ngAfterViewInit() {
    this.platform = new H.service.Platform({
      app_id: APPID,
      app_code: APPCODE
    });
    this.defaultLayers = this.platform.createDefaultLayers();
    this.map = new H.Map(
      this.mapElement.nativeElement,
      this.defaultLayers.normal.map,
      {
        zoom: this.zoom,
        center: { lat: this.lat, lng: this.lng }
      }
    );
    const behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(this.map));
    this.ui = H.ui.UI.createDefault(this.map, this.defaultLayers);

  }

  public findAdress(adress: string) {
    const geocoder = this.platform.getGeocodingService();
    const geocodingParameters = {
      searchText: adress,
      jsonattributes: 1
    };
    let driver = {
      lat: 43.313212,
      lng: 21.933879
    }
    geocoder.geocode(
      geocodingParameters, (result) => { this.onSuccess(result, driver) }, (error) => { console.log(error); }
    );
  }

  onSuccess(result, driver) {
    const route = result.response.view[0].result;
    this.addDriverToMap(driver);
    this.addLocationsToMap(route);
    this.calculateRouteFromAtoB(driver, route);
  }

  openBubble(position, text) {
    if (!bubble) {
      bubble = new H.ui.InfoBubble(
        position,
        { content: text });
      this.ui.addBubble(bubble);
    } else {
      bubble.setPosition(position);
      bubble.setContent(text);
      bubble.open();
    }
  }

  addLocationsToMap(locations) {
    let location;
    for (let i = 0; i < locations.length; i++) {
      location = {
        lat: locations[i].location.displayPosition.latitude,
        lng: locations[i].location.displayPosition.longitude
      }
      let marker = new H.map.Marker(location);
      this.map.addObject(marker);
      this.map.setCenter(location);
      this.map.setZoom(14);
    }
  }

  addDriverToMap(driver) {
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 36 36">
                 <path d="M0 0h24v24H0z" fill="none"/>
                 <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5H15V3H9v2H6.5c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z"/>
                 </svg>`
    const driverIcon = new H.map.Icon(svg);
    const marker = new H.map.Marker(driver, { icon: driverIcon });
    this.map.addObject(marker);
  }

  calculateRouteFromAtoB(driver, location) {
    const router = this.platform.getRoutingService();
    const convertCoordsDriver = driver.lat + ',' + driver.lng;
    const convertCoordsLoc = location[0].location.displayPosition.latitude + ',' + location[0].location.displayPosition.longitude;
    const routeRequestParams = {
      mode: 'fastest;car',
      representation: 'display',
      routeattributes: 'waypoints,summary,shape,legs',
      maneuverattributes: 'direction,action',
      waypoint0: convertCoordsDriver,
      waypoint1: convertCoordsLoc
    };


    router.calculateRoute(
      routeRequestParams, (success) => {
        this.addRouteShapeToMap(success);
        this.alertDispatcher(success);
      },
      (error) => { console.log(error); }
    );
  }

  addRouteShapeToMap(result) {
    const route = result.response.route[0];
    const lineString = new H.geo.LineString();
    const routeShape = route.shape;
    let polyline;

    routeShape.forEach((point) => {
      const parts = point.split(',');
      lineString.pushLatLngAlt(parts[0], parts[1]);
    });

    polyline = new H.map.Polyline(lineString, {
      style: {
        lineWidth: 4,
        strokeColor: 'rgba(0, 128, 255, 0.7)'
      }
    });

    this.map.addObject(polyline);
  }

  alertDispatcher(result) {
    const route = result.response.route[0];
    const msg = {
      distance: toKM(route.summary.distance),
      ETA: toMMSS(route.summary.travelTime)
    };
    this.routeParams.emit(msg);
  }
}