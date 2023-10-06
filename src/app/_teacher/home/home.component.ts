import { Component, OnInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { ValidationComponent } from "../../_teacher/validation/validation.component";
import { FormsModule } from "@angular/forms";
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { QuranService } from '../../core/services/quran.service';
import { Student } from '../../core/models/student.model';
import { StudentService } from '../../core/services/student.service';
import { NotificationService } from '../../core/services/notification.service';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Notification as AppNotification } from '../../core/models/notification.model';

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
  sidebarWidth: string = '100%';

  constructor(private http: HttpClient, private el: ElementRef, private renderer: Renderer2, private studentService: StudentService, private notificationService: NotificationService) {}

  ngOnInit() {
    this.getStudents();
  }

  getStudents() {
    this.studentService.getStudents().subscribe(students => {
      this.students = students;
      this.students.forEach(student => {
        this.getNotificationsByStudentId(student.id).subscribe((notifications: AppNotification[]) => {
          student.notifications = notifications;
        });
      });
    });
  }

  getNotificationsByStudentId(studentId: string): Observable<AppNotification[]> {
    const numericStudentId = parseInt(studentId, 10);
    return this.notificationService.getNotificationsByStudentId(numericStudentId).pipe(
      tap(notifications => {
        this.notifications = notifications;
      })
    );
  }

  // updateSelectedPage(student: Student): void {}
  updateSelectedPage(student: Student | null): void {
  }


  showStudentCard(student: any) {
    if (student) {
      console.log(student)
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

  toggleSidebar() {
    this.sidebarWidth = this.sidebarWidth === '20%' ? '100%' : '20%';
    const leftSidebar = this.el.nativeElement.querySelector('.left-sidebar');
    if (this.sidebarWidth === '20%') {
      this.renderer.setStyle(leftSidebar, 'display', 'none');
    } else {
      this.renderer.setStyle(leftSidebar, 'display', 'block');
    }
  }
}
