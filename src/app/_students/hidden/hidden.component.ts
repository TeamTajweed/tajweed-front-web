import { Component } from '@angular/core';
import { SafeUrl, DomSanitizer } from '@angular/platform-browser';
import { AudioRecordingService } from 'src/app/core/services/audio-recording.service';

@Component({
  selector: 'app-hidden',
  templateUrl: './hidden.component.html',
  styleUrls: ['./hidden.component.scss']
})
export class HiddenComponent {
  firstStep = true;
  secondStep = false;

    // Fonctions de gestion du wizard
    setFirstStep() {
      if (this.firstStep) {
      }
      else{
        this.secondStep = false;
        this.firstStep = true;
      }
    }

    setSecondStep() {
      if (this.secondStep) {
      }
      else{
        this.firstStep = false;
        this.secondStep = true;
      }
    }

  //DropDowns (remplissage des listes déroulantes)
  sourates: sourah[] | undefined;
  listVersesStart: Array<number> = [];
  listVersesEnd: Array<number> = [];
  nbVerseMax: number | undefined;
  nbVerseMin: number | undefined;

  //FormControl (valeurs sélectionnées et eventuels blocages pour empecher un comportement non désiré)
  selectedSourat: sourah | undefined;
  selectedSourate: sourah | undefined;
  selectedSourateName: string | undefined;
  selectedVerseStart: number | undefined;
  selectedVerseEnd: number | undefined;
  currentVerse: number = 0;

  //Audio
  isRecording = false;
  recordedTime: string | undefined;
  blobUrl: SafeUrl | null | undefined;
  teste: any;
  audioList: AudioforTransit[] = [];

  constructor(
    private audioRecordingService: AudioRecordingService,
    private sanitizer: DomSanitizer) 
    {
      this.audioRecordingService.recordingFailed().subscribe(() => (this.isRecording = false));
      this.audioRecordingService.getRecordedTime().subscribe(time => (this.recordedTime = time));
      this.audioRecordingService.getRecordedBlob().subscribe(data => {
        this.teste = data;
        this.blobUrl = this.sanitizer.bypassSecurityTrustUrl(
          URL.createObjectURL(data.blob)
        );
      });
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

  playAudio(audioUrl: string) {
    var audio = new Audio();
    audio.src = audioUrl;
    audio.load();
    audio.play();
  }

  clearAllAudios() {
    //Ne fonctionne pas check pourquoi
    this.clearRecordedData()
    this.blobUrl = null;
    this.audioRecordingService.resetTimer();
    this.audioList.length = 0;
  }

  async addRecordToRecords() {
    this.stopRecording();
    await this.delay(250);
    const url = window.URL.createObjectURL(this.teste.blob);
    var audioForTransit = new AudioforTransit;
    audioForTransit.url = url;
    audioForTransit.numberVerse = this.currentVerse;
    audioForTransit.duration = this.recordedTime;
    this.audioList?.push(audioForTransit);
    this.currentVerse++;
  }
  

  //Fonctions relatives au FormControl et aux actions user
  onSurahSelect(_selectedSouratId: number) {
    this.selectedSourate = this.sourates!.find(x => x.id == _selectedSouratId);
    this.selectedSourateName = this.selectedSourate?.name;
    this.listVersesStart.length = 0;
    this.listVersesEnd.length = 0;
    this.selectedVerseStart = undefined;
    this.selectedVerseEnd = undefined;
    this.fillArray(this.selectedSourate?.nbVerses!, this.listVersesStart!);
    this.fillArray(this.selectedSourate?.nbVerses!, this.listVersesEnd!);
  }

  onVerseSelect(_selectedVerse: number) {
    this.currentVerse = _selectedVerse;
    //On rajoute 1 pour le cas de la selection du dernier verset d'une sourate par exemple
    var chopchop = this.listVersesStart.length - _selectedVerse + 1;
    this.fillArray(this.listVersesStart.length, this.listVersesEnd!);

    while (this.listVersesEnd.length > chopchop) {
      this.listVersesEnd.shift();
    }
  }

  //Fonctions utilitaires
  fillArray(maxValue: number, array: number[]) {
    for(var i = 0; i < maxValue; i++){
      array[i] = i+1;
    }
  }

  clearArray(array: number[]) {
    while (array.length > 0) {
      array.pop();
    }
  }

  delay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  //Fcts de requetes
  submitAudios(array: AudioforTransit[]) {
    console.log(array);
  }

  ngOnInit() {
    this.sourates = [
        { id: 1 , name: 'Al Fatiha', nbVerses: 7 },
        { id: 2 , name: 'Al Baqara', nbVerses: 286 },
        { id: 3 , name: 'Al 3Imran', nbVerses: 200 },
        { id: 4 , name: 'An Nisa', nbVerses: 176 },
        { id: 5 , name: 'Al Maidah', nbVerses: 120 },
        { id: 6 , name: 'Al An3am', nbVerses: 165 },
        { id: 7 , name: 'Al A3raf', nbVerses: 206 },
        { id: 8 , name: 'Al Anfal', nbVerses: 75 },
        { id: 9 , name: 'At Tawbah', nbVerses: 129 },
        { id: 10 , name: 'Yunus', nbVerses: 109 },
        { id: 11 , name: 'Hud', nbVerses: 123 },
        { id: 12 , name: 'Yusuf', nbVerses: 111 },
        { id: 13 , name: 'Ar Ra3d', nbVerses: 43 },
        { id: 14 , name: 'Ibrahim', nbVerses: 52 },
        { id: 15 , name: 'Al Hijr', nbVerses: 99 },
        { id: 16 , name: 'An Nahl', nbVerses: 128 },
        { id: 17 , name: 'Al Isra', nbVerses: 111 },
        { id: 18 , name: 'Al Kahf', nbVerses: 110 },
        { id: 19 , name: 'Maryam', nbVerses: 98 },
        { id: 20 , name: 'Ta-Ha', nbVerses: 135 },
        { id: 21 , name: 'Al Anbiya', nbVerses: 112 },
        { id: 22 , name: 'Al Hajj', nbVerses: 78 },
        { id: 23 , name: 'Al Muminun', nbVerses: 118 },
        { id: 24 , name: 'An Nour', nbVerses: 64 },
        { id: 25 , name: 'Al Furqan', nbVerses: 77 },
        { id: 26 , name: 'Ash Shu3ra', nbVerses: 227 },
        { id: 27 , name: 'An Naml', nbVerses: 93 },
        { id: 28 , name: 'Al Qassas', nbVerses: 88 },
        { id: 29 , name: 'Al 3ankabout', nbVerses: 69 },
        { id: 30 , name: 'Ar Rum', nbVerses: 60 },
        { id: 31 , name: 'Luqman', nbVerses: 34 },
        { id: 32 , name: 'As Sajda', nbVerses: 30 },
        { id: 33 , name: 'Al Ahzab', nbVerses: 73 },
        { id: 34 , name: 'Saba', nbVerses: 54 },
        { id: 35 , name: 'Faatir', nbVerses: 45 },
        { id: 36 , name: 'YaSin', nbVerses: 83 },
        { id: 37 , name: 'As Saafaat', nbVerses: 182 },
        { id: 38 , name: 'Sad', nbVerses: 88 },
        { id: 39 , name: 'Az Zumar', nbVerses: 75 },
        { id: 40 , name: 'Ghafir', nbVerses: 85 },
        { id: 41 , name: 'Fussilat', nbVerses: 54 },
        { id: 42 , name: 'Ash Shura', nbVerses: 53 },
        { id: 43 , name: 'Az Zukhruf', nbVerses: 89 },
        { id: 44 , name: 'Ad Dukhan', nbVerses: 59 },
        { id: 45 , name: 'Al Jathiyah', nbVerses: 37 },
        { id: 46 , name: 'Al Ahqaf', nbVerses: 35 },
        { id: 47 , name: 'Muhammad', nbVerses: 38 },
        { id: 48 , name: 'Al Fath', nbVerses: 29 },
        { id: 49 , name: 'Al Houjourat', nbVerses: 18 },
        { id: 50 , name: 'Qaf', nbVerses: 45 },
        { id: 51 , name: 'Ad Dhariyat', nbVerses: 60 },
        { id: 52 , name: 'An Najm', nbVerses: 49 },
        { id: 53 , name: 'At Tour', nbVerses: 62 },
        { id: 54 , name: 'Al Qamar', nbVerses: 55 },
        { id: 55 , name: 'Ar Rahman', nbVerses: 78 },
        { id: 56 , name: 'Al Waqi3ah', nbVerses: 96 },
        { id: 57 , name: 'Al Hadid', nbVerses: 29 },
        { id: 58 , name: 'Al Mujadilah', nbVerses: 22 },
        { id: 59 , name: 'Al Hashr', nbVerses: 24 },
        { id: 60 , name: 'Al Mumtahina', nbVerses: 13 },
        { id: 61 , name: 'As Saf', nbVerses: 14 },
        { id: 62 , name: 'Al Joumou3ah', nbVerses: 11 },
        { id: 63 , name: 'Al Munafiqoun', nbVerses: 11 },
        { id: 64 , name: 'At Taghabun', nbVerses: 18 },
        { id: 65 , name: 'At Talaq', nbVerses: 12 },
        { id: 66 , name: 'At Tahrim', nbVerses: 12 },
        { id: 67 , name: 'Al Mulk', nbVerses: 30 },
        { id: 68 , name: 'Al Qalam', nbVerses: 52 },
        { id: 69 , name: 'Al Haqq', nbVerses: 52 },
        { id: 70 , name: 'Al Ma3arij', nbVerses: 44 },
        { id: 71 , name: 'Nuh', nbVerses: 28 },
        { id: 72 , name: 'Al Jinn', nbVerses: 28 },
        { id: 73 , name: 'Al Muzzamil', nbVerses: 20 },
        { id: 74 , name: 'Al Muddathir', nbVerses: 56 },
        { id: 75 , name: 'Al Qiyamah', nbVerses: 40 },
        { id: 76 , name: 'Al Insan', nbVerses: 31 },
        { id: 77 , name: 'Al Mursalat', nbVerses: 50 },
        { id: 78 , name: 'An Naba', nbVerses: 40 },
        { id: 79 , name: 'An Naazi3at', nbVerses: 46 },
        { id: 80 , name: '3abassa', nbVerses: 42 },
        { id: 81 , name: 'Al Takwir', nbVerses: 29 },
        { id: 82 , name: 'Al Infitar', nbVerses: 19 },
        { id: 83 , name: 'Al Mutafifin', nbVerses: 36 },
        { id: 84 , name: 'Al Inshiqaq', nbVerses: 25 },
        { id: 85 , name: 'Al Buruj', nbVerses: 22 },
        { id: 86 , name: 'At Taariq', nbVerses: 17 },
        { id: 87 , name: 'Al A3la', nbVerses: 19 },
        { id: 88 , name: 'Al Ghashiyah', nbVerses: 26 },
        { id: 89 , name: 'Al Fajr', nbVerses: 30 },
        { id: 90 , name: 'Al Balad', nbVerses: 20 },
        { id: 91 , name: 'As Shams', nbVerses: 15 },
        { id: 92 , name: 'Al Layl', nbVerses: 21 },
        { id: 93 , name: 'Al Duha', nbVerses: 11 },
        { id: 94 , name: 'Al Inshirah', nbVerses: 8 },
        { id: 95 , name: 'At Tin', nbVerses: 8 },
        { id: 96 , name: 'Al 3alaq', nbVerses: 19 },
        { id: 97 , name: 'Al Qadr', nbVerses: 5 },
        { id: 98 , name: 'Al Bayyinah', nbVerses: 8 },
        { id: 99 , name: 'Az Zalzalah', nbVerses: 8 },
        { id: 100 , name: 'Al 3adiyat', nbVerses: 11 },
        { id: 101 , name: 'Al Qari3ah', nbVerses: 11 },
        { id: 102 , name: 'At Takathur', nbVerses: 8 },
        { id: 103 , name: 'Al 3Asr', nbVerses: 3 },
        { id: 104 , name: 'Al Humazah', nbVerses: 9 },
        { id: 105 , name: 'Al Fil', nbVerses: 5 },
        { id: 106 , name: 'Quraysh', nbVerses: 4 },
        { id: 107 , name: 'Al Ma3oun', nbVerses: 7 },
        { id: 108 , name: 'Al Kawthar', nbVerses: 3 },
        { id: 109 , name: 'Al Kafiroun', nbVerses: 6 },
        { id: 110 , name: 'An Nasr', nbVerses: 3 },
        { id: 111 , name: 'Al Masad', nbVerses: 5 },
        { id: 112 , name: 'Al Ikhlass', nbVerses: 4 },
        { id: 113 , name: 'Al Falaq', nbVerses: 5 },
        { id: 114 , name: 'An Nass', nbVerses: 6 },
    ];
  }
}
//On représente la sourate
interface sourah{
  id: number;
  name: string;
  nbVerses: number;
}
//On représente l'objet de transit d'un audio
class AudioforTransit{
  numberVerse: number | undefined;
  url: string | undefined;
  duration: string |undefined;
}
