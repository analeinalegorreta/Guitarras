import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, map } from 'rxjs';
import { Guitar, SearchResponse } from '../guitar-Interface/guitar.interface';


@Injectable({
  providedIn: 'root'
})
export class GuitarService {

  private baseUrl: string = 'http://69.231.77.3:8080/api/v1/guitarras'

  constructor(private http: HttpClient,) { }

  public carrito: Guitar[] = [];
  public totaldelaOrden: number = 0
  private dataSubject = new Subject<Guitar[]>();

  getGuitar(): Observable<Guitar[]> {  //lo que regresa
    return this.http.get<SearchResponse>(`${this.baseUrl}`)// lo que consulta
      .pipe(
        map(Respuesta => Respuesta.body  // lo que quiero filtrar

        )
      )
  }


  addCarrito(guitar: Guitar) {
    const itemExists = this.carrito.findIndex(x => x.id === guitar.id)

    if (itemExists >= 0) {
      this.carrito[itemExists].cantidad += 1
    } else {
      guitar.cantidad = 1

      this.carrito.push(guitar);


    }
    this.dataSubject.next(this.carrito);// avisar q hay cambios


  }

  obtenerCarrito() {
    return this.dataSubject.asObservable(); // para detectar los cambios
  }







  borrarGuitar(id: number): void {
    let indice = 0

    for (let a = 0; a < this.carrito.length; a++) {
      if (this.carrito[a].id == id) {
        indice = a
        break;

      }
    }

    this.carrito.splice(indice, 1)


  }



//dado un id de guitarra lo busca en el arreglo carrito y le suma 1 en cantidad

  aumentarCantidadGuitar(id: number): void {
    const result = this.carrito.filter((obj) => {  // filter:regresa un arreglo filtrado
      return obj.id === id;
    });
    if (result[0].cantidad < 5) {
      result[0].cantidad += 1
    }


  }

  disminCantidadGuitar(id: number): void {
    const result = this.carrito.filter((obj) => {
      return obj.id === id;
    });

    if (result[0].cantidad > 1) {
      result[0].cantidad -= 1
    }
  }



  calcularTotal() {

    this.totaldelaOrden = 0
    for (let a = 0; a < this.carrito.length; a++) {
      let detalleActual = this.carrito[a]
      detalleActual.total = detalleActual.cantidad * detalleActual.price
      this.totaldelaOrden += detalleActual.total


    }

    return this.totaldelaOrden
  }





}
