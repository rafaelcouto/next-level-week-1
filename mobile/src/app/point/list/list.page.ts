import { PointService } from './../../services/api/point.service';
import { Point } from './../../models/Point';
import { ItemsService } from './../../services/api/items.service';
import { Item } from './../../models/Item';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import * as Feather from 'feather-icons';
import { tileLayer, latLng, LatLng, marker, icon, LeafletMouseEvent } from 'leaflet';
import { Plugins } from '@capacitor/core';
import { Router, NavigationExtras } from '@angular/router';

const { Geolocation } = Plugins;

@Component({
  selector: 'app-list',
  templateUrl: './list.page.html',
  styleUrls: ['./list.page.scss'],
})
export class ListPage implements OnInit, AfterViewInit {

  leafLetOptions: any;
  leftLetLayers: any[] = [];
  initialPosition: LatLng;

  items: Item[];
  selectedItems: number[] = [];

  points: Point[];

  constructor(private itemsService: ItemsService, private pointService: PointService, private router: Router) { }

  async ngOnInit() {
    this.setLeafLetOptions();
    this.items = await this.itemsService.getAll();

    this.points = await this.pointService.getAll();
    this.setMarkers(this.points);
  }

  onMarkerClick(point: Point) {
    this.router.navigate(['/point/detail'], {
      queryParams: { id: point.id }
    });
  }

  private setLeafLetOptions() {

    this.leafLetOptions = {
      layers: [
        tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: '...' })
      ],
      zoom: 15,
    };

    Geolocation.getCurrentPosition().then((coordinates) => {
      const { latitude, longitude } = coordinates.coords;
      this.initialPosition = latLng(latitude, longitude);
    });

  }

  setMarkers(points: Point[]) {

    this.leftLetLayers = [];

    points.forEach((point) => {

      const myMarker = marker([point.latitude, point.longitude], {
        icon: icon({
          iconUrl: 'leaflet/marker-icon.png',
          tooltipAnchor: [-5, 40]
        })
      });

      myMarker.bindTooltip(point.name, { permanent: true, direction: 'left' });
      myMarker.on('click', (e: LeafletMouseEvent) => this.onMarkerClick(point));

      this.leftLetLayers.push(myMarker);

    });

  }

  onSelectItem(item: Item) {

    const selectedIndex = this.selectedItems.indexOf(item.id);
    if (selectedIndex !== -1) {
      this.selectedItems.splice(selectedIndex, 1);
      return;
    }

    this.selectedItems.push(item.id);

  }

  ngAfterViewInit() {
    Feather.replace();
  }

}
