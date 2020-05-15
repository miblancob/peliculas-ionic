import { Injectable } from "@angular/core";
import { Storage } from "@ionic/storage";
import { PeliculaDetalle } from "../interfaces/interfaces";
import { ToastController } from "@ionic/angular";

@Injectable({
  providedIn: "root",
})
export class DataLocalService {
  peliculas: PeliculaDetalle[] = [];

  constructor(
    private storage: Storage,
    private toastController: ToastController
  ) {}

  favoritoPelicula(pelicula: PeliculaDetalle) {
    let existe = false;

    for (const peli of this.peliculas) {
      if (peli.id === pelicula.id) {
        existe = true;
        break;
      }
    }
    if (!existe) {
      this.peliculas = [...this.peliculas, pelicula];
      this.presentToast("Película agregada a favoritos");
    } else {
      this.peliculas = this.peliculas.filter((peli) => peli.id !== pelicula.id);
      this.presentToast("Película borrada de favoritos");
    }
    this.storage.set("peliculas", this.peliculas);
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 1500,
    });
    toast.present();
  }

  async cargarFavoritos() {
    const peliculas = await this.storage.get("peliculas");
    this.peliculas = peliculas || [];
    return this.peliculas;
  }

  async existePelicula(id: number) {
    await this.cargarFavoritos();
    const existe = this.peliculas.find((pelicula) => pelicula.id === id);
    return Boolean(existe);
  }
}
