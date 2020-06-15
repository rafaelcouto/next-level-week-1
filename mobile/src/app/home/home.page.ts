import { Router } from '@angular/router';
import { IbgeService } from './../services/ibge.service';
import { City } from './../models/City';
import { Component, AfterViewInit, OnInit } from '@angular/core';
import * as Feather from 'feather-icons';
import { Uf } from '../models/Uf';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit, AfterViewInit {

  ufs: Uf[] = [];
  citys: City[] = [];

  data: any = {};

  constructor(private ibgeService: IbgeService, private route: Router) { }

  async ngOnInit() {
    this.ufs = await this.ibgeService.getUfs();
  }

  async onChangeUf() {

    const selectedUf = this.ufs.find((uf) => uf.initial === this.data.uf);

    if (!selectedUf) {
      this.citys = [];
      return;
    }

    this.citys = await this.ibgeService.getCitysByUf(selectedUf.id);
  }

  ngAfterViewInit() {
    Feather.replace();
  }

  enter() {
    this.route.navigate(['/point/list'], { queryParams: this.data });
  }

}
