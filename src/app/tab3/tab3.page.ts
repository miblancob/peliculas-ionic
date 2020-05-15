import { Component, OnInit } from "@angular/core";
import { PeliculaDetalle, Genero } from "../interfaces/interfaces";
import { DataLocalService } from "../services/data-local.service";
import { MoviesService } from "../services/movies.service";

@Component({
  selector: "app-tab3",
  templateUrl: "tab3.page.html",
  styleUrls: ["tab3.page.scss"],
})
export class Tab3Page implements OnInit {
  peliculas: PeliculaDetalle[] = [];
  generos: Genero[] = [];
  favoritoGenero: any[] = [];

  constructor(
    private dataLocal: DataLocalService,
    private moviesService: MoviesService
  ) {}

  ngOnInit(): void {}

  ionViewWillEnter() {
    this.dataLocal.cargarFavoritos().then((peliculas) => {
      this.peliculas = peliculas;
      this.moviesService.getGeneros().subscribe((res) => {
        this.generos = res.genres;
        this.pelisPorGenero();
      });
    });
  }

  pelisPorGenero() {
    this.favoritoGenero = [];
    this.generos.forEach((genero) => {
      this.favoritoGenero.push({
        genero: genero.name,
        pelis: this.peliculas.filter((peli) => {
          return peli.genres.find((gen) => gen.id === genero.id);
        }),
      });
    });
    console.log(this.favoritoGenero);
  }
}
