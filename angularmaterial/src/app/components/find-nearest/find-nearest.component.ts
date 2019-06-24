import { Component, OnInit, ViewChild } from '@angular/core';
import { MapComponent } from '../map/map.component';


@Component({
  selector: 'app-find-nearest',
  templateUrl: './find-nearest.component.html',
  styleUrls: ['./find-nearest.component.css']
})
export class FindNearestComponent implements OnInit {
  @ViewChild('mapView', null) mapView: MapComponent;
  private adressName: string;
  private distance: number;
  private ETA: string;

  constructor() { }
  ngOnInit() {
  }

  onSubmit(event) {
    this.adressName = event.target.adressName.value;
    this.mapView.findAdress(this.adressName);
  }

  receiveRouteParams($event) {
    this.distance = $event.distance;
    this.ETA = $event.ETA;
  }

}
