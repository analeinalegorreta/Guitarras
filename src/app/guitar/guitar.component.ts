import { Component, OnInit } from '@angular/core';
import { Guitar } from '../guitar-Interface/guitar.interface';
import { GuitarService } from '../guitar-service/guitar-service.service';

@Component({
  selector: 'app-guitar',
  templateUrl: './guitar.component.html',
  styleUrls: ['./guitar.component.css']
})
export class GuitarComponent implements OnInit{
  constructor(private guitarService: GuitarService) { }
  public carrito: Guitar[] = [];
  public totaldelaOrden: number = 0


ngOnInit(): void {
this.guitarService.obtenerCarrito().subscribe(
  resp =>{this.carrito=resp
    this.totaldelaOrden=this.guitarService.calcularTotal()
  }

 )

}



borrarGuitar(id: number): void {
  this.guitarService.borrarGuitar(id)
}

aumentarCantidad(id: number): void {
  this.guitarService.aumentarCantidadGuitar(id)
  this.carrito = this.guitarService.carrito
 this.totaldelaOrden = this.guitarService.calcularTotal()


}

disminCantidadLibro(id: number): void {


  this.guitarService.disminCantidadGuitar(id)
  this.carrito = this.guitarService.carrito
this.totaldelaOrden = this.guitarService.calcularTotal()

}




vaciarGuitar(){
  this.carrito=[]
 this. totaldelaOrden = 0
}










}

