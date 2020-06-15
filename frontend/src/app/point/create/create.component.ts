import { PointService } from './../../services/api/point.service';
import { City } from './../../models/City';
import { IbgeService } from './../../services/ibge.service';
import { Item } from './../../models/Item';
import { ItemsService } from './../../services/api/items.service';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import * as Feather from 'feather-icons';
import { latLng, tileLayer, marker, icon, LeafletMouseEvent, Marker, LatLng } from 'leaflet';
import { Uf } from 'src/app/models/Uf';
import { Point } from 'src/app/models/Point';
import { Router } from '@angular/router';


@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit, AfterViewInit {

  point: Point;

  leafLetOptions: any;
  selectedPosition: Marker;
  initialPosition: LatLng;

  items: Item[];
  ufs: Uf[];
  citys: City[];

  constructor(
    private itemsService: ItemsService,
    private ibgeService: IbgeService,
    private pointService: PointService,
    private router: Router) { }

  ngAfterViewInit() {
    Feather.replace();
  }

  async ngOnInit() {

    this.point = new Point();
    this.point.uf = '';
    this.point.city = '';

    this.setLeafLetOptions();

    this.items = await this.itemsService.getAll();
    this.ufs = await this.ibgeService.getUfs();
  }

  private setLeafLetOptions() {

    this.leafLetOptions = {
      layers: [
        tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: '...' })
      ],
      zoom: 15
    };

    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;
      this.initialPosition = latLng(latitude, longitude);
    });

  }

  async onChangeUf() {

    const selectedUf = this.ufs.find((uf) => uf.initial === this.point.uf);

    if (!selectedUf) {
      this.citys = [];
      return;
    }

    this.citys = await this.ibgeService.getCitysByUf(selectedUf.id);
  }

  onMapClick(event: LeafletMouseEvent) {

    this.point.latitude = event.latlng.lat;
    this.point.longitude = event.latlng.lng;

    this.selectedPosition = marker([this.point.latitude, this.point.longitude], {
      icon: icon({
        iconUrl: 'leaflet/marker-icon.png',
        shadowUrl: 'leaflet/marker-shadow.png'
      })
    });

  }

  onSelectItem(item: Item) {

    const selectedIndex = this.point.items.indexOf(item.id);
    if (selectedIndex !== -1) {
      this.point.items.splice(selectedIndex, 1);
      return;
    }

    this.point.items.push(item.id);

  }

  async onSubmit() {

    try {
      await this.pointService.create(this.point);
    } catch (e) {
      alert(e.error.message);
      return;
    }

    alert('Ponto de coleta cadastrado com sucesso');

    this.router.navigate(['/']);

  }

}
