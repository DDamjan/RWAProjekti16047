import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import {APPID, APPCODE} from '../../../constants/map-credentials';
declare var H: any;

@Component({
  selector: 'map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})

export class MapComponent implements OnInit {
  @ViewChild('map', null)
  public mapElement: ElementRef;

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

  public constructor() { }

  public ngOnInit() { }

  public ngAfterViewInit() {
    const platform = new H.service.Platform({
      app_id: APPID,
      app_code: APPCODE
    });
    const defaultLayers = platform.createDefaultLayers();
    const map = new H.Map(
      this.mapElement.nativeElement,
      defaultLayers.normal.map,
      {
        zoom: this.zoom,
        center: { lat: this.lat, lng: this.lng }
      }
    );
    const behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map));
    const ui = H.ui.UI.createDefault(map, defaultLayers);

  }
}
