import { Component, OnInit } from '@angular/core';
import { TraceAudioService } from 'src/app/core/services/trace-audio.service';
import { TraceAudio } from 'src/app/core/models/traceAudio.model';
import { StudentService } from 'src/app/core/services/student.service';
import { Student } from 'src/app/core/models/student.model';

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
            labels: ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Aout', 'Septembre', 'Octobre', 'Novembre', 'Décembre'],
            datasets: [{
                label: 'Nombre de jour absent dans le mois',
                data: Array(12).fill(0),
                fill: false,
                borderColor: this.documentStyle.getPropertyValue('--blue-600'),
                tension: 0.4
            }]
        };

        this.options = {
            maintainAspectRatio: false,
            aspectRatio: 0.6,
            plugins: {
                legend: {
                    labels: { color: 'black' }
                }
            },
            scales: {
                x: {
                    ticks: { color: 'black' },
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
                        color: 'black'
                    },
                    grid: {
                        color: this.documentStyle.getPropertyValue('--surface-border'),
                        drawBorder: false
                    }
                }
            }
        };
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

        const absencesParMois = this.calculateMonthlyAbsences(traces, studentId);

        this.data = {
            labels: this.data.labels,
            datasets: [{
                ...this.data.datasets[0],
                data: absencesParMois
            }]
        };
    }
// Calcule le nombre d'absences par mois pour un étudiant donné basé sur les traces audio.
    private calculateMonthlyAbsences(traces: TraceAudio[], studentId: number): number[] {
        const absencesParMois = Array(12).fill(0);
    
        traces.forEach(trace => {
            if (trace.idStudent === studentId) {
                const month = new Date(trace.dateOfAudio).getMonth();
                absencesParMois[month]++;
            }
        });
    
        for (let i = 0; i < 12; i++) {
            const daysInMonth = new Date(new Date().getFullYear(), i + 1, 0).getDate();
            absencesParMois[i] = daysInMonth - absencesParMois[i];
        }
    
        return absencesParMois;
    }
    
// Récupère la liste des étudiants.
    getStudents(): void {
        this.studentService.getStudents().subscribe(students => {
            this.students = students;
        });
    }
// Gère le changement de sélection de l'étudiant, met à jour le graphique en conséquence.
    onStudentChange(event: any): void {
        const studentId = Number((event.target as HTMLSelectElement).value);
        const debutAnnee = new Date();
        debutAnnee.setFullYear(debutAnnee.getFullYear() - 1);
        debutAnnee.setHours(0, 0, 0, 0);

        const finAnnee = new Date();
        finAnnee.setHours(23, 59, 59, 999);

        this.traceAudioService.getTraceAudiosByDateRange(debutAnnee.toISOString(), finAnnee.toISOString())
            .subscribe((traces: TraceAudio[]) => {
                this.updateChartData(traces, studentId);
            });
    }
}
