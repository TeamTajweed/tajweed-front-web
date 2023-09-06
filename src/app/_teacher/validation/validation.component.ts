import { Component,Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-validation',
  templateUrl: './validation.component.html',
  styleUrls: ['./validation.component.scss'],
  imports: [
    CommonModule
  ],
  standalone: true
})
export class ValidationComponent {

  @Input() selectedStudent: any;  

  audiosStudent: any[] = [];

  audiosTeacher: any[] = [];

  //Le code commenté va etre utilisé une fois que le WS sera implémenté en attendant on mock la liste des audios
  //constructor(private studentService: CountryService) {}
  // la mise en place dynamique des éléments reste à voir avec l'équipe afin de mettre au clair le modele de donnée pour les dates , heures , ect.
  ngOnInit() {
      
      this.audiosStudent = [
        {
          name: "AbdAllah",
          id: "1",
          date:"1 Janvier 2023"
        },
        {
          name: "Adam",
          id: "2",
          
        },
        {
          name: "Yassir",
          id: "3",
          
        }
      ];
      this.audiosTeacher = [
        {
          name: "AbdAllah",
          id: "1",
          
        },
        {
          name: "Adam",
          id: "2",
          
        },
        {
          name: "Yassir",
          id: "3",
          
        }
      ];
  }
  
}
