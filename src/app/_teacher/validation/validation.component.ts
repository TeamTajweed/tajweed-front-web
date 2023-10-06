import { Component, Input, OnInit } from "@angular/core";
import { QuranService } from "../../core/services/quran.service";
import { DomSanitizer, SafeUrl } from "@angular/platform-browser";
import { AudioRecordingService } from "../../core/services/audio.recording.service";

@Component({
  selector: "app-validation",
  templateUrl: "./validation.component.html",
  styleUrls: ["./validation.component.scss"],
})
export class ValidationComponent implements OnInit {
  @Input() selectedStudent: any;
  audiosStudent: any[] = [];
  audiosTeacher: any[] = [];
  Coran: any[] = [];
  selectedSurahText: string | undefined;
  showQuran: boolean = false;
  totalSourate: boolean[][] = [];
  selectedStudentId: string | null = null;
  students: any[] = [];
  

  ayah: any = null;
  selectedPage: number = 1;
  selectedVerset: string = "";
  selectedSourateName: string = "";
  selectedSourate: any = null;

  //Audio
  isRecording = false;
  recordedTime: string | undefined;
  blobUrl: SafeUrl | null | undefined;
  teste: any;
  audioList: AudioforTransit[] = [];
  currentVerse: number = 0;
  currentlyPlayingAudio: HTMLAudioElement | null = null;
  isAudioPlaying: { [key: string]: boolean } = {};
  // Propriété pour stocker l'ID de la frame d'animation pour la progress barre
  private animationFrameId: number | undefined;
  // tableau pour stocker la vitesse de lecture de chaque élément audio
  audioPlaybackRates: { [key: string]: number } = {};

  //On représente l'objet de transit d'un audio

  constructor(
    private quranService: QuranService,
    private audioRecordingService: AudioRecordingService,
    private sanitizer: DomSanitizer
  ) {
    this.audioRecordingService
      .recordingFailed()
      .subscribe(() => (this.isRecording = false));
    this.audioRecordingService
      .getRecordedTime()
      .subscribe((time) => (this.recordedTime = time));
    this.audioRecordingService.getRecordedBlob().subscribe((data) => {
      this.teste = data;
      this.blobUrl = this.sanitizer.bypassSecurityTrustUrl(
        URL.createObjectURL(data.blob)
      );
    });
  }
  ngOnInit() {
    this.getDataQuran();
  }

  getDataQuran() {
    this.quranService.getDataQuran().subscribe((data: any) => {
      this.Coran = data.data.surahs;
      this.totalSourate = this.Coran.map((sourate) => []);
    });
  }
  showSurahText(sourate: any) {
    this.selectedSurahText = sourate.text;
  }
  toggleBackgroundColor(sourateIndex: number, ayahIndex: number) {
    if (!this.totalSourate[sourateIndex]) {
      this.totalSourate[sourateIndex] = [];
    }
    this.totalSourate[sourateIndex][ayahIndex] =
      !this.totalSourate[sourateIndex][ayahIndex];
    console.log("Numéro du verset cliqué :", ayahIndex);
  }
  // Initialisation de la fonction pour pouvoir l'importer de home component dans validation component
  showStudentCard(student: any) {}

  //fonction pour faire matcher la page saisi par l'étudiant et la page du Qur'an de l'api
  updateSelectedPage(student: any): void {
    if (student.notifications && student.notifications.length > 0) {
      const matchingSourate = this.Coran.find(
        (sourate) => sourate.number === student.notifications[0].surate
      );

      if (matchingSourate) {
        this.selectedSourate = matchingSourate; // Met à jour la sourate sélectionnée
      }
    }
  }


  //fonction pour faire matcher le verset débutant l'audio saisi par l'étudiant et les verset du Qur'an de l'api
  updateSelectVerset(student: any): void {
    const matchingVerset = this.Coran.find((sourate: any) =>
      sourate.ayahs.some(
        (ayah: any) =>
          ayah.numberInSurah === student.notifications[0].verseStart

      )
    );

    if (matchingVerset) {
      this.selectedVerset = matchingVerset.ayahs[0];
    }
  }
  // fonction du boutton pour aller directement au verset rentrer par l'étudiant
  scrollToAnchor(verseNumber: number): void {
    const elementId = "verse" + verseNumber;
    const targetElement = document.getElementById(elementId);

    if (targetElement) {
      targetElement.scrollIntoView();
    }
  }
  // Fonctions relatives aux audios
  startRecording() {
    if (!this.isRecording) {
      this.isRecording = true;
      this.audioRecordingService.startRecording();
    }
  }

  abortRecording() {
    if (this.isRecording) {
      this.isRecording = false;
      this.audioRecordingService.abortRecording();
    }
  }

  stopRecording() {
    if (this.isRecording) {
      this.audioRecordingService.stopRecording();
      this.isRecording = false;
    }
  }
  //supprime l'audio en cours d'enregistrement
  clearRecordedData() {
    this.stopRecording();
    this.blobUrl = null;
    this.audioRecordingService.resetTimer();
  }

  ngOnDestroy(): void {
    this.abortRecording();
  }

  download(): void {
    const url = window.URL.createObjectURL(this.teste.blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = this.teste.title;
    link.click();
  }

  private updateProgress() {
    // Demandez à mettre à jour la progression de la barre de progression lors de la prochaine frame d'animation
    this.animationFrameId = requestAnimationFrame(() => {
      if (this.currentlyPlayingAudio) {
        const currentTime = this.currentlyPlayingAudio.currentTime;
        const duration = this.currentlyPlayingAudio.duration;

        if (!isNaN(duration) && duration > 0) {
          // Mise à jour la barre de progression
          const progress = (currentTime / duration) * 100;

          // Continue à mettre à jour la progression
          this.updateProgress();
        } else {
          // Arrêt de la mise à jour de la progression si la lecture est terminée ou si la durée n'est pas valide
          this.animationFrameId = undefined;
        }
      } else {
        // Si l'audio est null, arrêtez la mise à jour de la progression
        this.animationFrameId = undefined;
      }
    });
  }

  playAudio(audioUrl: string) {
    if (
      this.currentlyPlayingAudio &&
      this.currentlyPlayingAudio.src === audioUrl
    ) {
      // Si le même audio est en cours de lecture, reprendre la lecture
      if (this.currentlyPlayingAudio.paused) {
        this.isAudioPlaying[audioUrl] = true; // Réglez l'état de lecture à true
        this.currentlyPlayingAudio.play();
      } else {
        this.currentlyPlayingAudio.pause();
        this.isAudioPlaying[audioUrl] = false; // Réglez l'état de lecture à false
      }
    } else {
      // Arrêtez l'audio en cours de lecture, le cas échéant
      if (this.currentlyPlayingAudio) {
        this.currentlyPlayingAudio.pause();
        this.isAudioPlaying[this.currentlyPlayingAudio.src] = false;
      }

      // Jouez le nouvel audio
      const audio = new Audio(audioUrl);

      // Mise à jour de la progression dès le début de la lecture
      audio.addEventListener("loadedmetadata", () => {
        this.updateProgress();
      });

      audio.play();
      this.currentlyPlayingAudio = audio;
      this.isAudioPlaying[audio.src] = true;

      //  gestionnaire d'événement pour l'événement "ended" pour réinitialiser l'audio
      this.currentlyPlayingAudio.addEventListener("ended", () => {
        this.isAudioPlaying[audio.src] = false;
        this.currentlyPlayingAudio = null;
      });
    }
  }

  pauseAudio() {
    if (this.currentlyPlayingAudio) {
      // Mémorise la position de lecture actuelle
      const currentTime = this.currentlyPlayingAudio.currentTime;
      this.currentlyPlayingAudio.pause();
      this.isAudioPlaying[this.currentlyPlayingAudio.src] = false;

      // Rétablie la position de lecture lorsque la lecture est reprise
      this.currentlyPlayingAudio.currentTime = currentTime;
    }
  }

  // fonction pour supprimer l'audio mais aussi le container de l'audio
  removeAudio(index: number) {
    if (index >= 0 && index < this.audioList.length) {
      // Obtenez l'URL de l'audio à supprimer
      const audioUrlToRemove = this.audioList[index].url;

      // Arrête l'audio en cours de lecture s'il s'agit de l'audio en cours
      if (
        this.currentlyPlayingAudio &&
        this.currentlyPlayingAudio.src === audioUrlToRemove
      ) {
        this.currentlyPlayingAudio.pause();
        this.currentlyPlayingAudio = null;
      }

      // Supprimez l'audio de la liste
      this.audioList.splice(index, 1);
    }
  }

  //fonction pour augmenter la vitesse de lecture
  speedUpAudio(audio: AudioforTransit): void {
    if (audio) {
      const audioSrc = audio.url;
      if (audioSrc) {
        // Vérifie si l'audio est actuellement en cours de lecture
        if (
          this.currentlyPlayingAudio &&
          this.currentlyPlayingAudio.src === audioSrc
        ) {
          // Augmente progressivement la vitesse de lecture
          if (this.audioPlaybackRates[audioSrc] === undefined) {
            this.audioPlaybackRates[audioSrc] = 1.0;
          } else if (this.audioPlaybackRates[audioSrc] === 1.0) {
            this.audioPlaybackRates[audioSrc] = 1.5;
          } else if (this.audioPlaybackRates[audioSrc] === 1.5) {
            this.audioPlaybackRates[audioSrc] = 2.0;
          } else {
            this.audioPlaybackRates[audioSrc] = 1.0;
          }

          // Applique la nouvelle vitesse de lecture à l'audio en cours
          this.currentlyPlayingAudio.playbackRate =
            this.audioPlaybackRates[audioSrc];
          // Ajoute un gestionnaire d'événement pour l'événement "ended" pour réinitialiser l'audio
          this.currentlyPlayingAudio.addEventListener("ended", () => {
            this.isAudioPlaying[audioSrc] = false;
            this.currentlyPlayingAudio = null;
            this.audioPlaybackRates[audioSrc] = 1.0;
          });
        }
      }
    }
  }

  //fonction de calcul pour la barre de progression
  calculateProgress(index: number): number {
    if (
      index >= 0 &&
      index < this.audioList.length &&
      this.audioList[index] &&
      this.currentlyPlayingAudio &&
      this.currentlyPlayingAudio.src === this.audioList[index].url
    ) {
      // Vérifie si la durée est disponible et n'est ni null ni Infinity
      const duration = this.currentlyPlayingAudio.duration;
      if (duration !== null && duration !== Infinity && !isNaN(duration)) {
        const currentTime = this.currentlyPlayingAudio.currentTime;
        const progress = (currentTime / duration) * 100;

        return progress;
      }
    }

    return 0;
  }

  delay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  async addRecordToRecords() {
    //j'ai honte de faire ca mais les promesses et les observables font n'imp
    this.stopRecording();
    await this.delay(250);
    const url = window.URL.createObjectURL(this.teste.blob);
    var audioForTransit = new AudioforTransit();
    audioForTransit.url = url;
    audioForTransit.numberVerse = this.currentVerse;
    audioForTransit.duration = this.recordedTime;
    this.audioList?.push(audioForTransit);
    this.currentVerse++;
  }

  getArrayOfSize(n: number): any[] {
    return new Array(n);
  }
}

class AudioforTransit {
  numberVerse: number | undefined;
  url: string | undefined;
  duration: string | undefined;
}
