import { Point } from './../../models/Point';
import { PointService } from './../../services/api/point.service';
import { Component, AfterViewInit } from '@angular/core';
import * as Feather from 'feather-icons';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Email } from '@teamhive/capacitor-email';


@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
})
export class DetailPage implements AfterViewInit {

  point: Point;
  route$: Subscription;

  constructor(private route: ActivatedRoute, private pointService: PointService) { }

  ionViewWillEnter() {
    this.route$ = this.route.queryParams.subscribe(async (params) => {
      this.point = await this.pointService.get(params.id);
      this.point.itemsDisplay = this.point.items.map(item => item.title).join(', ');
    });
  }

  ionViewDidLeave() {
    this.point = null;
    this.route$.unsubscribe();
  }

  ngAfterViewInit() {
    Feather.replace();
  }

  async sendEmail() {

    const email = new Email();

    const hasPermission = await email.hasPermission();
    if (!hasPermission) {
      await email.requestPermission();
    }

    const available = await email.isAvailable();
    if (available.hasAccount) {
      email.open({
        to: [this.point.email],
        subject: 'Interesse em coleta de resíduos',
      });
    }
  }

  sendWhatsapp() {
    const text = 'Tenho interesse em coleta de resíduos';
    window.location.href = `whatsapp//send?phone=${this.point.whatsapp}&text=${text}`;
  }

}
