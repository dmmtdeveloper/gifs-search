import { Component, ElementRef, ViewChild } from '@angular/core';
import { GifsService } from '../../services/gifs.service';

@Component({
  selector: 'gifs-search-box',
  template: `
    <h5>Buscar:</h5>
    <input
      type="text"
      class="form-control"
      placeholder="Buscar gifs..."
      (keyup.enter)="searchTag()"
      #txtTagInput
    />
  `,
})
export class SearchBoxComponent {
  @ViewChild('txtTagInput')
  public tagInput!: ElementRef<HTMLInputElement>;
  //inyección de servicio
  constructor(private gifsService: GifsService) {}

  searchTag() {
    const newTag = this.tagInput.nativeElement.value;
    // se almacena el valor del input
    this.gifsService.searchTag(newTag);

    // se limpia el input
    this.tagInput.nativeElement.value = '';
  }
}




