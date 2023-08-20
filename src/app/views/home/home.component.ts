import { Component } from '@angular/core';

interface AutoCompleteCompleteEvent {
  originalEvent: Event;
  query: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  students: any[] | undefined;

  selectedStudent: any;

  filteredStudents: any[] | undefined;
  //Le code commenté va etre utilisé une fois que le WS sera implémenté en attendant on mock la liste des étudiants
  //constructor(private studentService: CountryService) {}

  ngOnInit() {
      /*this.studentService.getListStudents().then((students) => {
          this.students = students;
      });*/
      this.students = [
        {
          name: "AbdAllah",
          id: "1"
        },
        {
          name: "Adam",
          id: "2"
        },
        {
          name: "Yassir",
          id: "3"
        },
        {
          name: "Mohammad",
          id: "4"
        },
        {
          name: "Moussa",
          id: "5"
        },
        {
          name: "Dorian",
          id: "6"
        },
        {
          name: "Fadil",
          id: "7",
        },
        {
          name: "AbdaRahman",
          id: "8",
        }
      ];
  }

  filterStudents(event: AutoCompleteCompleteEvent) {
      let filtered: any[] = [];
      let query = event.query;

      for (let i = 0; i < (this.students as any[]).length; i++) {
          let student = (this.students as any[])[i];
          if (student.name.toLowerCase().indexOf(query.toLowerCase()) == 0) {
              filtered.push(student);
          }
      }

      this.filteredStudents = filtered;
  }
}

