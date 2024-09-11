import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class GifsService {
  private _tagsHistory: string[] = [];
  constructor() {}

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
  }

  public searchTag(tag: string): void {
    //no devolvera nada el input si el campo esta vacio
    if (tag.length === 0) return;
    this.organizeHistory(tag);

    // this._tagsHistory.unshift(tag);
  }
}
