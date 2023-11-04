import { Component, OnInit } from '@angular/core';
import { TraceAudioService } from 'src/app/core/services/trace-audio.service';
import { TraceAudio } from 'src/app/core/models/traceAudio.model';
import { StudentService } from 'src/app/core/services/student.service';
import { Student } from 'src/app/core/models/student.model';


interface AutoCompleteCompleteEvent {
    originalEvent: Event;
    query: string;
}

@Component({
    selector: 'app-statistiques',
    templateUrl: './statistiques.component.html',
    styleUrls: ['./statistiques.component.scss']
})
export class StatistiquesComponent implements OnInit {
    data: any;                                   // Données pour le graphique.
    options: any;                                // Options de configuration pour le graphique.
    students: Student[] = [];                    // Liste des étudiants.
    selectedStudentId: number | null = null;     // ID de l'étudiant sélectionné.
    selectedStudent: any;
    filteredStudents: any[] = [];
    mois = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Aout', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];

    // Accès direct aux styles du document pour récupérer les couleurs, etc.
    private readonly documentStyle: CSSStyleDeclaration = getComputedStyle(document.documentElement);

    constructor(
        private traceAudioService: TraceAudioService,
        private studentService: StudentService
    ) { }

    ngOnInit(): void {
        this.initializeChart();
        this.getStudents();
        this.loadTraceAudiosForCurrentMonth();
    }
    // Graphique intégrer avec PrimeNG
    private initializeChart(): void {
        this.data = {
            labels: this.mois,
            datasets: [{
                label: 'Nombre de jour présent dans le mois',
                data: Array(12).fill(0),
                fill: false,
                borderColor: this.documentStyle.getPropertyValue('--yellow-500'),
                tension: 0.4
            }]
        };
    this.options = {
        responsive: true,
        maintainAspectRatio: false,
        aspectRatio: 0.6,
        plugins: {
            tooltip: {
                titleFont: {
                    size: 15
                },
                bodyFont: {
                    size: 15
                }
            },
            legend: {
                labels: {
                    color: 'black',
                    font: {
                        size: 15  
                    }
                }
            }
        },
            scales: {
                x: {
                    ticks: { color: 'black',
                    font: {
                        size: 15
                    }
                
                  },
                    grid: {
                        color: this.documentStyle.getPropertyValue('--surface-border'),
                        drawBorder: false
                    }
                },
                y: {
                    min: 0,
                    max: 31,
                    ticks: {
                        stepSize: 1,
                        color: 'black',
                        font: {
                            size: 15
                        }
                    },
                    grid: {
                        color: this.documentStyle.getPropertyValue('--surface-border'),
                        drawBorder: false
                    }
                }
            }
        };
    }


    // Récupère la liste des étudiants.
    getStudents(): void {
        this.studentService.getStudents().subscribe(students => {
            this.students = students;
        });
    }

    //Filtre la liste des étudiants
    filterName(event: { query: string }) {
        let query = event.query;
        this.filteredStudents = this.students.filter(student => {
            return student.username.toLowerCase().includes(query.toLowerCase());
        });
    }
    // Gestionnaire d'événement déclenché lorsque qu'un étudiant est sélectionné.
    onStudentSelected(event: any): void {
        this.selectedStudentId = this.selectedStudent.id;
        this.updateChartForSelectedStudent();
    }
    //Met à jour le graphique pour l'étudiant actuellement sélectionné. 
    updateChartForSelectedStudent(): void {
        const debutAnnee = new Date();
        debutAnnee.setFullYear(debutAnnee.getFullYear() - 1);
        debutAnnee.setHours(0, 0, 0, 0);
    
        const finAnnee = new Date();
        finAnnee.setHours(23, 59, 59, 999);
    
        this.traceAudioService.getTraceAudiosByDateRange(debutAnnee.toISOString(), finAnnee.toISOString())
            .subscribe((traces: TraceAudio[]) => {
                this.updateChartData(traces, this.selectedStudentId);
            });
    }
    
    
    
    //Charge les traces audio pour le mois en cours.
    private loadTraceAudiosForCurrentMonth(): void {
        const [debutMois, finMois] = this.getCurrentMonthDateRange();

        this.traceAudioService.getTraceAudiosByDateRange(debutMois.toISOString(), finMois.toISOString())
            .subscribe((traces: TraceAudio[]) => {
                this.updateChartData(traces, this.selectedStudentId);
            });
    }
    //Renvoie la plage de dates pour le mois en cours.
    private getCurrentMonthDateRange(): [Date, Date] {
        const debutMois = new Date();
        debutMois.setDate(1);
        debutMois.setHours(0, 0, 0, 0);

        const finMois = new Date();
        finMois.setMonth(finMois.getMonth() + 1);
        finMois.setDate(0);
        finMois.setHours(23, 59, 59, 999);

        return [debutMois, finMois];
    }
    // Met à jour les données du graphique basé sur les traces audio et l'ID de l'étudiant.
    updateChartData(traces: TraceAudio[], studentId: number | null): void {
        if (studentId === null) return;

        const absencesParMois = this.calculateMonthlyPresence(traces, studentId);

        this.data = {
            labels: this.data.labels,
            datasets: [{
                ...this.data.datasets[0],
                data: absencesParMois
            }]
        };
    }
    // Calcule le nombre de présence par mois pour un étudiant donné basé sur les traces audio.
    private calculateMonthlyPresence(traces: TraceAudio[], studentId: number): number[] {
        const presenceParMois = Array(12).fill(0);
        
        traces.forEach(trace => {
            if (trace.idStudent === studentId) {
                const month = new Date(trace.dateOfAudio).getMonth();
                presenceParMois[month]++;
            }
        });
        
        return presenceParMois;
    }   
}
