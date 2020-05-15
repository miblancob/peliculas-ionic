import { Component, OnInit, Input } from "@angular/core";
import { MoviesService } from "src/app/services/movies.service";
import { PeliculaDetalle, Cast } from "src/app/interfaces/interfaces";
import { ModalController } from "@ionic/angular";
import { DataLocalService } from "src/app/services/data-local.service";

@Component({
  selector: "app-detalle",
  templateUrl: "./detalle.component.html",
  styleUrls: ["./detalle.component.scss"],
})
export class DetalleComponent implements OnInit {
  @Input() id;
  pelicula: PeliculaDetalle;
  peliculaFavorita = false;
  actores: Cast[] = [];
  oculto = 150;
  modificado = false;

  slidesActores = {
    slidesPerView: 3.3,
    freeMode: true,
    spacebetween: -5,
  };

  constructor(
    private moviesService: MoviesService,
    private modalCtrl: ModalController,
    private dataLocal: DataLocalService
  ) {}

  async ngOnInit() {
    this.modificado = false;
    this.peliculaFavorita = await this.dataLocal.existePelicula(this.id);
    console.log(this.peliculaFavorita);
    this.moviesService.getPeliculaDetalle(this.id).subscribe((res) => {
      this.pelicula = res;
    });

    this.moviesService.getActoresPelicula(this.id).subscribe((res) => {
      this.actores = res.cast;
    });
  }

  regresar() {
    this.modalCtrl.dismiss({ modificado: this.modificado });
  }

  favorito() {
    this.dataLocal.favoritoPelicula(this.pelicula);
    this.peliculaFavorita = !this.peliculaFavorita;
    this.modificado = true;
  }
}
