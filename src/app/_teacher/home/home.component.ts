import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  Renderer2,
} from "@angular/core";
import { ValidationComponent } from "../../_teacher/validation/validation.component";
import { Student } from "../../core/models/student.model";
import { StudentService } from "../../core/services/student.service";
import { NotificationService } from "../../core/services/notification.service";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";
import { Notification as AppNotification } from "../../core/models/notification.model";
import { sourates } from "../../_students/homestudents/homestudents.component";
import { ChangeDetectorRef } from "@angular/core";



interface AutoCompleteCompleteEvent {
  originalEvent: Event;
  query: string;
}

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
})
export class HomeComponent implements OnInit {
  @ViewChild(ValidationComponent) validationComponent!: ValidationComponent;
  students: Student[] = [];
  notifications: AppNotification[] = [];
  selectedStudent: Student | null = null;
  selectedStudentId: string | null = null;
  buttonDisplayed: boolean = false;
  displayStudentCard = false;
  sidebarWidth: string = "100%";
  phoneticValue: string | null = null;
  phoneticsForNotifications: { [key: number]: string } = {};

  constructor(
    private cdr: ChangeDetectorRef,
    private http: HttpClient,
    private el: ElementRef,
    private renderer: Renderer2,
    private studentService: StudentService,
    private notificationService: NotificationService
  ) {}

  ngOnInit() {
    this.getStudents();
  }

  //je récupère la liste des étudiants , pour chaque étudiant, je récupère leurs notifications
  getStudents() {
    this.studentService.getStudents().subscribe((students) => {
      this.students = students;

      this.students.forEach((student) => {
        this.getNotificationsByStudentId(student.id).subscribe(
          (notifications: AppNotification[]) => {
            student.notifications = notifications;
            this.loadPhoneticsForNotifications();
            this.cdr.detectChanges();
          }
        );
      });
    });
  }

  // parcourt la liste des étudiants et leurs notifications Pour chaque notification, j'utilise la valeur de la propriété 'surate' pour obtenir une valeur phonétique en appelant 'getPhoneticBySurateId'
  loadPhoneticsForNotifications(): void {
    for (let student of this.students) {
      if (student.notifications) {
        // S'assurer que les notifications existent
        for (let notification of student.notifications) {
          const phoneticValue = this.getPhoneticBySurateId(
            +notification.surate
          );
          if (phoneticValue) {
            this.phoneticsForNotifications[+notification.surate] =
              phoneticValue;
          }
        }
      }
    }
  }

  // recherche une sourate par son identifiant 'id' dans le tableau 'sourates' dans homeStudents.component.ts
  getPhoneticBySurateId(id: number): string | null {
    const surate = sourates.find((s) => s.id === id);
    return surate ? surate.phonetic : null;
  }

  //récupère la valeur phonétique 'sourates' dans homeStudents.component.ts
  getPhoneticForSurate(surateId: number): string {
    return this.phoneticsForNotifications[surateId];
  }

  // obtient les notifications pour un étudiant, recherche les valeurs phonétiques correspondantes des sourates, et renvoie un Observable contenant la liste des notifications pour l'étudiant.
  getNotificationsByStudentId(
    studentId: string
  ): Observable<AppNotification[]> {
    const numericStudentId = parseInt(studentId, 10);
    return this.notificationService
      .getNotificationsByStudentId(numericStudentId)
      .pipe(
        tap((notifications: AppNotification[]) => {
          const tempPhonetics: { [key: number]: string } = {};
          notifications.forEach((notification) => {
            const phoneticValue = this.getPhoneticBySurateId(
              Number(notification.surate)
            );
            if (phoneticValue) {
              tempPhonetics[Number(notification.surate)] = phoneticValue;
            }
          });
          this.phoneticsForNotifications = tempPhonetics;
        })
      );
  }

  updateSelectedPage(student: Student | null): void {}

  //affiche la carte d'étudiant en prenant un objet étudiant en entrée, elle met à jour plusieurs propriétés et affiche la carte d'étudiant,
  showStudentCard(student: any) {
    if (student) {
      console.log(student);
      this.selectedStudent = student;
      this.selectedStudentId = student.id;
      this.buttonDisplayed = true;
      this.validationComponent.showStudentCard(student);
      this.validationComponent.updateSelectedPage(student);
      this.validationComponent.showQuran = false;
    } else {
      this.selectedStudent = null;
      this.selectedStudentId = null;
      this.buttonDisplayed = true;
    }
  }

  //fonction pour le responsive
  toggleSidebar() {
    this.sidebarWidth = this.sidebarWidth === "20%" ? "100%" : "20%";
    const leftSidebar = this.el.nativeElement.querySelector(".left-sidebar");
    if (this.sidebarWidth === "20%") {
      this.renderer.setStyle(leftSidebar, "display", "none");
    } else {
      this.renderer.setStyle(leftSidebar, "display", "block");
    }
  }
}
