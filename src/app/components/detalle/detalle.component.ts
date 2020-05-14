import { Component, OnInit, Input } from "@angular/core";
import { MoviesService } from "src/app/services/movies.service";
import { PeliculaDetalle, Cast } from "src/app/interfaces/interfaces";
import { ModalController } from "@ionic/angular";

@Component({
  selector: "app-detalle",
  templateUrl: "./detalle.component.html",
  styleUrls: ["./detalle.component.scss"],
})
export class DetalleComponent implements OnInit {
  @Input() id;
  pelicula: PeliculaDetalle;
  actores: Cast[] = [];
  oculto = 150;

  slidesActores = {
    slidesPerView: 3.3,
    freeMode: true,
    spacebetween: -5,
  };

  constructor(
    private moviesService: MoviesService,
    private modalCtrl: ModalController
  ) {}

  ngOnInit() {
    this.moviesService.getPeliculaDetalle(this.id).subscribe((res) => {
      this.pelicula = res;
    });

    this.moviesService.getActoresPelicula(this.id).subscribe((res) => {
      this.actores = res.cast;
    });
  }

  regresar() {
    this.modalCtrl.dismiss();
  }

  favorito() {}
}
