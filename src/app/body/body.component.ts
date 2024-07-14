import { Component, OnInit } from '@angular/core';
import { Guitar } from '../guitar-Interface/guitar.interface';
import { GuitarService } from '../guitar-service/guitar-service.service';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css']
})
export class BodyComponent implements OnInit{
  public guitar: Guitar[] = [];

  constructor(private guitarService: GuitarService) { }

  ngOnInit(): void {
    this.guitarService.getGuitar()
    .subscribe(guitar=>this.guitar=guitar);
  }


   addToCart(guitar:Guitar) {
    this.guitarService.addCarrito(guitar)
  }























}
