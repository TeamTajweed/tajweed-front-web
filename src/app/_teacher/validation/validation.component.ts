import { Component, Input } from '@angular/core';
import { QuranService } from '../../quran.service';
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
  Coran: any[] = [];
  selectedSurahText: string | undefined;
  showQuran: boolean = false;

  constructor(private quranService: QuranService) {}

  ngOnInit() {
    this.audiosStudent = [
      {
        name: "AbdAllah",
        id: "1",
        date: "1 Janvier 2023"
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
    this.getLanguages();
  }

  getLanguages() {
    this.quranService.getLanguages().subscribe((data: any) => {
      this.Coran = data.data.surahs;
    });
  }

  showSurahText(sourate: any) {
    this.selectedSurahText = sourate.text;
  } 
}
