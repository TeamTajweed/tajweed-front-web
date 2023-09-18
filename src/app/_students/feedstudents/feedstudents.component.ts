import { Component } from '@angular/core';

@Component({
  selector: 'app-feedstudents',
  templateUrl: './feedstudents.component.html',
  styleUrls: ['./feedstudents.component.scss']
})
export class FeedstudentsComponent {
publications: publication[] | undefined;
ngOnInit() {
  this.publications = [
      { id: 1, title: 'Introduction aux règles de Tajwid' , level: 'Débutant', content: 'Le Tajwid – تَجْوِيدٌ est un mot arabe qui vient du mot racine ja-wa-da – جَوَدَ signifiant linguistiquement le fait d’améliorer et de rendre meilleur.' },
      { id: 1, title: 'Introduction aux règles de Tajwid' , level: 'Débutant', content: 'Le Tajwid – تَجْوِيدٌ est un mot arabe qui vient du mot racine ja-wa-da – جَوَدَ signifiant linguistiquement le fait d’améliorer et de rendre meilleur.' },
      { id: 1, title: 'Introduction aux règles de Tajwid' , level: 'Débutant', content: 'Le Tajwid – تَجْوِيدٌ est un mot arabe qui vient du mot racine ja-wa-da – جَوَدَ signifiant linguistiquement le fait d’améliorer et de rendre meilleur.' },
      { id: 1, title: 'Introduction aux règles de Tajwid' , level: 'Débutant', content: 'Le Tajwid – تَجْوِيدٌ est un mot arabe qui vient du mot racine ja-wa-da – جَوَدَ signifiant linguistiquement le fait d’améliorer et de rendre meilleur.' },
      { id: 1, title: 'Introduction aux règles de Tajwid' , level: 'Débutant', content: 'Le Tajwid – تَجْوِيدٌ est un mot arabe qui vient du mot racine ja-wa-da – جَوَدَ signifiant linguistiquement le fait d’améliorer et de rendre meilleur.' },
      { id: 1, title: 'Introduction aux règles de Tajwid' , level: 'Débutant', content: 'Le Tajwid – تَجْوِيدٌ est un mot arabe qui vient du mot racine ja-wa-da – جَوَدَ signifiant linguistiquement le fait d’améliorer et de rendre meilleur.' },
      { id: 1, title: 'Introduction aux règles de Tajwid' , level: 'Débutant', content: 'Le Tajwid – تَجْوِيدٌ est un mot arabe qui vient du mot racine ja-wa-da – جَوَدَ signifiant linguistiquement le fait d’améliorer et de rendre meilleur.' },
      { id: 1, title: 'Introduction aux règles de Tajwid' , level: 'Débutant', content: 'Le Tajwid – تَجْوِيدٌ est un mot arabe qui vient du mot racine ja-wa-da – جَوَدَ signifiant linguistiquement le fait d’améliorer et de rendre meilleur.' },
      { id: 1, title: 'Introduction aux règles de Tajwid' , level: 'Débutant', content: 'Le Tajwid – تَجْوِيدٌ est un mot arabe qui vient du mot racine ja-wa-da – جَوَدَ signifiant linguistiquement le fait d’améliorer et de rendre meilleur.' },
      { id: 1, title: 'Introduction aux règles de Tajwid' , level: 'Débutant', content: 'Le Tajwid – تَجْوِيدٌ est un mot arabe qui vient du mot racine ja-wa-da – جَوَدَ signifiant linguistiquement le fait d’améliorer et de rendre meilleur.' },
      { id: 1, title: 'Introduction aux règles de Tajwid' , level: 'Débutant', content: 'Le Tajwid – تَجْوِيدٌ est un mot arabe qui vient du mot racine ja-wa-da – جَوَدَ signifiant linguistiquement le fait d’améliorer et de rendre meilleur.' },
      { id: 1, title: 'Introduction aux règles de Tajwid' , level: 'Débutant', content: 'Le Tajwid – تَجْوِيدٌ est un mot arabe qui vient du mot racine ja-wa-da – جَوَدَ signifiant linguistiquement le fait d’améliorer et de rendre meilleur.' },
      { id: 1, title: 'Introduction aux règles de Tajwid' , level: 'Débutant', content: 'Le Tajwid – تَجْوِيدٌ est un mot arabe qui vient du mot racine ja-wa-da – جَوَدَ signifiant linguistiquement le fait d’améliorer et de rendre meilleur.' },
      { id: 1, title: 'Introduction aux règles de Tajwid' , level: 'Débutant', content: 'Le Tajwid – تَجْوِيدٌ est un mot arabe qui vient du mot racine ja-wa-da – جَوَدَ signifiant linguistiquement le fait d’améliorer et de rendre meilleur.' },
      { id: 1, title: 'Introduction aux règles de Tajwid' , level: 'Débutant', content: 'Le Tajwid – تَجْوِيدٌ est un mot arabe qui vient du mot racine ja-wa-da – جَوَدَ signifiant linguistiquement le fait d’améliorer et de rendre meilleur.' },
      { id: 1, title: 'Introduction aux règles de Tajwid' , level: 'Débutant', content: 'Le Tajwid – تَجْوِيدٌ est un mot arabe qui vient du mot racine ja-wa-da – جَوَدَ signifiant linguistiquement le fait d’améliorer et de rendre meilleur.' },
      { id: 1, title: 'Introduction aux règles de Tajwid' , level: 'Débutant', content: 'Le Tajwid – تَجْوِيدٌ est un mot arabe qui vient du mot racine ja-wa-da – جَوَدَ signifiant linguistiquement le fait d’améliorer et de rendre meilleur.' },
      { id: 1, title: 'Introduction aux règles de Tajwid' , level: 'Débutant', content: 'Le Tajwid – تَجْوِيدٌ est un mot arabe qui vient du mot racine ja-wa-da – جَوَدَ signifiant linguistiquement le fait d’améliorer et de rendre meilleur.' },
      { id: 1, title: 'Introduction aux règles de Tajwid' , level: 'Débutant', content: 'Le Tajwid – تَجْوِيدٌ est un mot arabe qui vient du mot racine ja-wa-da – جَوَدَ signifiant linguistiquement le fait d’améliorer et de rendre meilleur.' },
      { id: 1, title: 'Introduction aux règles de Tajwid' , level: 'Débutant', content: 'Le Tajwid – تَجْوِيدٌ est un mot arabe qui vient du mot racine ja-wa-da – جَوَدَ signifiant linguistiquement le fait d’améliorer et de rendre meilleur.' },
      { id: 1, title: 'Introduction aux règles de Tajwid' , level: 'Débutant', content: 'Le Tajwid – تَجْوِيدٌ est un mot arabe qui vient du mot racine ja-wa-da – جَوَدَ signifiant linguistiquement le fait d’améliorer et de rendre meilleur.' },
      { id: 1, title: 'Introduction aux règles de Tajwid' , level: 'Débutant', content: 'Le Tajwid – تَجْوِيدٌ est un mot arabe qui vient du mot racine ja-wa-da – جَوَدَ signifiant linguistiquement le fait d’améliorer et de rendre meilleur.' },
      { id: 1, title: 'Introduction aux règles de Tajwid' , level: 'Débutant', content: 'Le Tajwid – تَجْوِيدٌ est un mot arabe qui vient du mot racine ja-wa-da – جَوَدَ signifiant linguistiquement le fait d’améliorer et de rendre meilleur.' },
      { id: 1, title: 'Introduction aux règles de Tajwid' , level: 'Débutant', content: 'Le Tajwid – تَجْوِيدٌ est un mot arabe qui vient du mot racine ja-wa-da – جَوَدَ signifiant linguistiquement le fait d’améliorer et de rendre meilleur.' },
      { id: 1, title: 'Introduction aux règles de Tajwid' , level: 'Débutant', content: 'Le Tajwid – تَجْوِيدٌ est un mot arabe qui vient du mot racine ja-wa-da – جَوَدَ signifiant linguistiquement le fait d’améliorer et de rendre meilleur.' },
      { id: 1, title: 'Introduction aux règles de Tajwid' , level: 'Débutant', content: 'Le Tajwid – تَجْوِيدٌ est un mot arabe qui vient du mot racine ja-wa-da – جَوَدَ signifiant linguistiquement le fait d’améliorer et de rendre meilleur.' },
  ];
}
}
//On représente la sourate
interface publication{
  id: number;
  level: string;
  title: string;
  content: string;
}