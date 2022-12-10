import { Component, OnInit } from '@angular/core';
import { RatingModule } from 'ngx-bootstrap/rating';

@Component({
  selector: 'app-estadistica',
  templateUrl: './estadistica.component.html',
  styleUrls: ['./estadistica.component.scss']
})
export class EstadisticaComponent implements OnInit {
  correctAnswers = Number(sessionStorage.getItem("respuestas"))
  infoClicks = Number(sessionStorage.getItem("infoClicks"))
  
  rate?:number;
  max:number = 3;
  isReadOnly:boolean = true;
  
  constructor() {
    const nota = this.correctAnswers + this.infoClicks
    if (nota===0){
      this.rate = 0
    }
    else if (1<=nota && nota<=2){
      this.rate = 1
    }
    else if (3<=nota && nota<=5){
      this.rate = 2
    }
    else if (6<=nota && nota<=7){
      this.rate = 3
    }
  }
  
  ngOnInit(): void {
  }

}
