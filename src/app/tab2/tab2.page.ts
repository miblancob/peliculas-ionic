import { Component } from "@angular/core";
import { MoviesService } from "../services/movies.service";
import { Pelicula } from "../interfaces/interfaces";
import { ModalController } from "@ionic/angular";
import { DetalleComponent } from "../components/detalle/detalle.component";

@Component({
  selector: "app-tab2",
  templateUrl: "tab2.page.html",
  styleUrls: ["tab2.page.scss"],
})
export class Tab2Page {
  textoBuscar = "";
  peliculas: Pelicula[] = [];
  ideas: string[] = [
    "Spiderman",
    "Avenger",
    "El señor de los anillos",
    "La vida es bella",
  ];
  mostrarSpinner = false;
  mostrarIdeas = true;

  constructor(
    private moviesService: MoviesService,
    private modalCtrl: ModalController
  ) {}

  buscar(event) {
    const valor: string = event.detail.value;
    if (valor.length > 0) {
      this.mostrarIdeas = false;
      this.mostrarSpinner = true;

      this.moviesService.buscarPeliculas(valor).subscribe((res) => {
        this.peliculas = res.results;
        this.mostrarSpinner = false;
      });
    } else {
      this.peliculas = [];
      this.mostrarIdeas = true;
    }
  }

  onClickIdea(idea) {
    this.textoBuscar = idea;
  }

  async mostrarPelicula(id: string) {
    const modal = await this.modalCtrl.create({
      component: DetalleComponent,
      componentProps: { id },
    });
    modal.present();
  }
}
