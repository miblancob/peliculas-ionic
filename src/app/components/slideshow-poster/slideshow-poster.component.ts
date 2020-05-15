import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { Pelicula } from "src/app/interfaces/interfaces";
import { ModalController } from "@ionic/angular";
import { DetalleComponent } from "../detalle/detalle.component";

@Component({
  selector: "app-slideshow-poster",
  templateUrl: "./slideshow-poster.component.html",
  styleUrls: ["./slideshow-poster.component.scss"],
})
export class SlideshowPosterComponent implements OnInit {
  @Input() peliculas: Pelicula[] = [];
  slidesOpts = {
    slidesPerView: 3.3,
    freeMode: true,
  };
  @Output() modalFavorito = new EventEmitter();

  constructor(private modalCtrl: ModalController) {}

  ngOnInit() {}

  async verDetalle(id: string) {
    const modal = await this.modalCtrl.create({
      component: DetalleComponent,
      componentProps: { id },
    });
    modal.onDidDismiss().then((data) => {
      if (data.data.modificado) {
        this.modalFavorito.emit();
      }
    });
    modal.present();
  }
}
