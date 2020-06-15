import { City } from './../models/City';
import { Uf } from './../models/Uf';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class IbgeService {

  constructor(private http: HttpClient) { }

  async getUfs(): Promise<Uf[]> {

    const params = new HttpParams({
      fromObject: {
        orderBy: 'nome',
      }
    });

    const ibgeUfs = await this.http.get<any[]>('https://servicodados.ibge.gov.br/api/v1/localidades/estados', { params }).toPromise();

    const ufs = ibgeUfs.map((uf) => {
      return ({ id: uf.id, initial: uf.sigla } as Uf);
    });

    return ufs;

  }

  async getCitysByUf(ufId: number) {

    // tslint:disable-next-line: max-line-length
    const ibgeCitys = await this.http.get<any[]>(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufId}/municipios`).toPromise();

    const citys = ibgeCitys.map((city) => {
      return ({ id: city.id, name: city.nome } as City);
    });

    return citys;
  }

}
