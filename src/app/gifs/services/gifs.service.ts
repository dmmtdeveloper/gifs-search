import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchResponse } from '../interfaces/gifs.interfaces';
@Injectable({ providedIn: 'root' })
export class GifsService {
  private _tagsHistory: string[] = [];

  public gifList: Gif[] = [];

  private apiKey: string = 'dZ46rat3MDlby733RMnkpROXgQrZeSiW';
  private serviceUrl: string = 'http://api.giphy.com/v1/gifs';

  constructor(private http: HttpClient) {
    this.loadLocalStorage();
    console.log('Gigs service readys');
  }

  get tagsHistory() {
    return [...this._tagsHistory];
  }

  private organizeHistory(tag: string) {
    //guardar en minuscula en el arreglo de historial de búqueda
    tag = tag.toLowerCase();

    //areglo con todos los tag
    if (this._tagsHistory.includes(tag)) {
      this._tagsHistory = this._tagsHistory.filter((oldTag) => oldTag !== tag);
    }

    this._tagsHistory.unshift(tag);
    // mantener el arreglo limitado a 10
    this._tagsHistory = this.tagsHistory.splice(0, 10);
    this.saveLocalStorage();
  }

  // guardar información en localStorage
  private saveLocalStorage(): void {
    localStorage.setItem('history', JSON.stringify(this._tagsHistory));
  }

  // cargar información guardada en localStorage
  private loadLocalStorage(): void {
    if (!localStorage.getItem('history')) return;
    this._tagsHistory = JSON.parse(localStorage.getItem('history')!);

    //guardar última petición y mostrar los gifs en pantalla
    if (this._tagsHistory.length === 0) return;
    this.searchTag(this._tagsHistory[0]);
  }

  searchTag(tag: string): void {
    //no devolvera nada el input si el campo esta vacio
    if (tag.length === 0) return;
    this.organizeHistory(tag);

    //petición Http
    const params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('limit', '10')
      .set('q', tag);

    this.http
      .get<SearchResponse>(`${this.serviceUrl}/search`, { params })
      .subscribe((res) => {
        this.gifList = res.data;
        console.log({ gifs: this.gifList });
      });
  }
}
