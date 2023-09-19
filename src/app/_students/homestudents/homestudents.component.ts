import { Component } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { AudioRecordingService } from '../../core/services/audio.recording.service';
@Component({
  selector: 'app-homestudents',
  templateUrl: './homestudents.component.html',
  styleUrls: ['./homestudents.component.scss']
})
export class HomestudentsComponent {

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
        { id: 1, name: 'الفَاتِحَة' , phonetic: 'Al Fatiha', nbVerses: 7, src: '../../assets/images/SVGSourah/1.svg' },
        { id: 2, name: 'البَقَرَة' , phonetic: 'Al Baqara', nbVerses: 286, src: '../../assets/images/SVGSourah/2.svg' },
        { id: 3, name: 'آل عِمرَان' , phonetic: 'Al 3Imran', nbVerses: 200, src: '../../assets/images/SVGSourah/3.svg' },
        { id: 4, name: 'النِّسَاء' , phonetic: 'An Nisa', nbVerses: 176, src: '../../assets/images/SVGSourah/4.svg' },
        { id: 5, name: 'المَائدة' , phonetic: 'Al Maidah', nbVerses: 120, src: '../../assets/images/SVGSourah/5.svg' },
        { id: 6, name: 'الأنعَام' , phonetic: 'Al An3am', nbVerses: 165, src: '../../assets/images/SVGSourah/6.svg' },
        { id: 7, name: 'الأعرَاف' , phonetic: 'Al A3raf', nbVerses: 206, src: '../../assets/images/SVGSourah/7.svg' },
        { id: 8, name: 'الأنفَال' , phonetic: 'Al Anfal', nbVerses: 75, src: '../../assets/images/SVGSourah/8.svg' },
        { id: 9, name: 'التوبَة' , phonetic: 'At Tawbah', nbVerses: 129, src: '../../assets/images/SVGSourah/9.svg' },
        { id: 10, name: 'يُونس' , phonetic: 'Yunus', nbVerses: 109, src: '../../assets/images/SVGSourah/10.svg' },
        { id: 11, name: 'هُود' , phonetic: 'Hud', nbVerses: 123, src: '../../assets/images/SVGSourah/11.svg' },
        { id: 12, name: 'يُوسُف' , phonetic: 'Yusuf', nbVerses: 111, src: '../../assets/images/SVGSourah/12.svg' },
        { id: 13, name: 'الرَّعْد' , phonetic: 'Ar Ra3d', nbVerses: 43, src: '../../assets/images/SVGSourah/13.svg' },
        { id: 14, name: 'إبراهِيم' , phonetic: 'Ibrahim', nbVerses: 52, src: '../../assets/images/SVGSourah/14.svg' },
        { id: 15, name: 'الحِجْر' , phonetic: 'Al Hijr', nbVerses: 99, src: '../../assets/images/SVGSourah/15.svg' },
        { id: 16, name: 'النَّحْل' , phonetic: 'An Nahl', nbVerses: 128, src: '../../assets/images/SVGSourah/16.svg' },
        { id: 17, name: 'الإسْرَاء' , phonetic: 'Al Isra', nbVerses: 111, src: '../../assets/images/SVGSourah/17.svg' },
        { id: 18, name: 'الكهْف' , phonetic: 'Al Kahf', nbVerses: 110, src: '../../assets/images/SVGSourah/18.svg' },
        { id: 19, name: 'مَريَم'  , phonetic: 'Maryam', nbVerses: 98, src: '../../assets/images/SVGSourah/19.svg' },
        { id: 20, name: 'طه'  , phonetic: 'Ta-Ha', nbVerses: 135, src: '../../assets/images/SVGSourah/20.svg' },
        { id: 21, name: 'الأنبيَاء'  , phonetic: 'Al Anbiya', nbVerses: 112, src: '../../assets/images/SVGSourah/21.svg' },
        { id: 22, name: 'الحَج'  , phonetic: 'Al Hajj', nbVerses: 78, src: '../../assets/images/SVGSourah/22.svg' },
        { id: 23, name: 'المُؤمنون'  , phonetic: 'Al Muminun', nbVerses: 118, src: '../../assets/images/SVGSourah/23.svg' },
        { id: 24, name: 'النُّور'  , phonetic: 'An Nour', nbVerses: 64, src: '../../assets/images/SVGSourah/24.svg' },
        { id: 25, name: 'الفُرْقان'  , phonetic: 'Al Furqan', nbVerses: 77, src: '../../assets/images/SVGSourah/25.svg' },
        { id: 26, name: 'الشُّعَرَاء'  , phonetic: 'Ash Shu3ra', nbVerses: 227, src: '../../assets/images/SVGSourah/26.svg' },
        { id: 27, name: 'النَّمْل'  , phonetic: 'An Naml', nbVerses: 93, src: '../../assets/images/SVGSourah/27.svg' },
        { id: 28, name: 'القَصَص'  , phonetic: 'Al Qassas', nbVerses: 88, src: '../../assets/images/SVGSourah/28.svg' },
        { id: 29, name: 'العَنكبوت'  , phonetic: 'Al 3ankabout', nbVerses: 69, src: '../../assets/images/SVGSourah/29.svg' },
        { id: 30, name: 'الرُّوم'  , phonetic: 'Ar Rum', nbVerses: 60, src: '../../assets/images/SVGSourah/30.svg' },
        { id: 31, name: 'لقمَان'  , phonetic: 'Luqman', nbVerses: 34, src: '../../assets/images/SVGSourah/31.svg' },
        { id: 32, name: 'السَّجدَة'  , phonetic: 'As Sajda', nbVerses: 30, src: '../../assets/images/SVGSourah/32.svg' },
        { id: 33, name: 'الأحزَاب'  , phonetic: 'Al Ahzab', nbVerses: 73, src: '../../assets/images/SVGSourah/33.svg'  },
        { id: 34, name: 'سَبَأ'  , phonetic: 'Saba', nbVerses: 54, src: '../../assets/images/SVGSourah/34.svg'  },
        { id: 35, name: 'فَاطِر'  , phonetic: 'Faatir', nbVerses: 45, src: '../../assets/images/SVGSourah/35.svg'  },
        { id: 36, name: 'يس'  , phonetic: 'YaSin', nbVerses: 83, src: '../../assets/images/SVGSourah/36.svg'  },
        { id: 37, name: 'الصَّافات'  , phonetic: 'As Saafaat', nbVerses: 182, src: '../../assets/images/SVGSourah/37.svg'  },
        { id: 38, name: 'ص'  , phonetic: 'Sad', nbVerses: 88, src: '../../assets/images/SVGSourah/38.svg'  },
        { id: 39, name: 'الزُّمَر'  , phonetic: 'Az Zumar', nbVerses: 75, src: '../../assets/images/SVGSourah/39.svg'  },
        { id: 40, name: 'غَافِر'  , phonetic: 'Ghafir', nbVerses: 85, src: '../../assets/images/SVGSourah/40.svg'  },
        { id: 41, name: 'فُصِّلَتْ'  , phonetic: 'Fussilat', nbVerses: 54, src: '../../assets/images/SVGSourah/41.svg' },
        { id: 42, name: 'الشُّورَى'  , phonetic: 'Ash Shura', nbVerses: 53, src: '../../assets/images/SVGSourah/42.svg' },
        { id: 43, name: 'الزُّخْرُف'  , phonetic: 'Az Zukhruf', nbVerses: 89, src: '../../assets/images/SVGSourah/43.svg' },
        { id: 44, name: 'الدُّخان'  , phonetic: 'Ad Dukhan', nbVerses: 59, src: '../../assets/images/SVGSourah/44.svg' },
        { id: 45, name: 'الجاثِية'  , phonetic: 'Al Jathiyah', nbVerses: 37, src: '../../assets/images/SVGSourah/45.svg' },
        { id: 46, name: 'الأحقاف'  , phonetic: 'Al Ahqaf', nbVerses: 35, src: '../../assets/images/SVGSourah/46.svg' },
        { id: 47, name: 'مُحَمّد'  , phonetic: 'Muhammad', nbVerses: 38, src: '../../assets/images/SVGSourah/47.svg' },
        { id: 48, name: 'الفَتْح'  , phonetic: 'Al Fath', nbVerses: 29, src: '../../assets/images/SVGSourah/48.svg' },
        { id: 49, name: 'الحُجُرات'  , phonetic: 'Al Houjourat', nbVerses: 18, src: '../../assets/images/SVGSourah/49.svg' },
        { id: 50, name: 'ق'  , phonetic: 'Qaf', nbVerses: 45, src: '../../assets/images/SVGSourah/50.svg' },
        { id: 51, name: 'الذَّاريَات'  , phonetic: 'Ad Dhariyat', nbVerses: 60, src: '../../assets/images/SVGSourah/51.svg' },
        { id: 52, name: 'الطُّور'  , phonetic: 'An Najm', nbVerses: 49, src: '../../assets/images/SVGSourah/52.svg' },
        { id: 53, name: 'النَّجْم'  , phonetic: 'At Tour', nbVerses: 62, src: '../../assets/images/SVGSourah/53.svg' },
        { id: 54, name: 'القَمَر'  , phonetic: 'Al Qamar', nbVerses: 55, src: '../../assets/images/SVGSourah/54.svg' },
        { id: 55, name: 'الرَّحمن'  , phonetic: 'Ar Rahman', nbVerses: 78, src: '../../assets/images/SVGSourah/55.svg' },
        { id: 56, name: 'الواقِعَة'  , phonetic: 'Al Waqi3ah', nbVerses: 96, src: '../../assets/images/SVGSourah/56.svg' },
        { id: 57, name: 'الحَديد'  , phonetic: 'Al Hadid', nbVerses: 29, src: '../../assets/images/SVGSourah/57.svg' },
        { id: 58, name: 'المُجادَلة'  , phonetic: 'Al Mujadilah', nbVerses: 22, src: '../../assets/images/SVGSourah/58.svg' },
        { id: 59, name: 'الحَشْر'  , phonetic: 'Al Hashr', nbVerses: 24, src: '../../assets/images/SVGSourah/59.svg' },
        { id: 60, name: 'المُمتَحَنة'  , phonetic: 'Al Mumtahina', nbVerses: 13, src: '../../assets/images/SVGSourah/60.svg' },
        { id: 61, name: 'الصَّف'  , phonetic: 'As Saf', nbVerses: 14, src: '../../assets/images/SVGSourah/61.svg' },
        { id: 62, name: 'الجُّمُعة'  , phonetic: 'Al Joumou3ah', nbVerses: 11, src: '../../assets/images/SVGSourah/62.svg' },
        { id: 63, name: 'المُنافِقُون'  , phonetic: 'Al Munafiqoun', nbVerses: 11, src: '../../assets/images/SVGSourah/63.svg' },
        { id: 64, name: 'التَّغابُن'  , phonetic: 'At Taghabun', nbVerses: 18, src: '../../assets/images/SVGSourah/64.svg' },
        { id: 65, name: 'الطَّلاق' , phonetic: 'At Talaq', nbVerses: 12, src: '../../assets/images/SVGSourah/65.svg' },
        { id: 66, name: 'التَّحْريم'  , phonetic: 'At Tahrim', nbVerses: 12, src: '../../assets/images/SVGSourah/66.svg' },
        { id: 67, name: 'المُلْك'  , phonetic: 'Al Mulk', nbVerses: 30, src: '../../assets/images/SVGSourah/67.svg' },
        { id: 68, name: 'القَلـََم'  , phonetic: 'Al Qalam', nbVerses: 52, src: '../../assets/images/SVGSourah/68.svg' },
        { id: 69, name: 'الحَاقّـَة'  , phonetic: 'Al Haqq', nbVerses: 52, src: '../../assets/images/SVGSourah/69.svg' },
        { id: 70, name: 'المَعارِج'  , phonetic: 'Al Ma3arij', nbVerses: 44, src: '../../assets/images/SVGSourah/70.svg' },
        { id: 71, name: 'نُوح'  , phonetic: 'Nuh', nbVerses: 28, src: '../../assets/images/SVGSourah/71.svg' },
        { id: 72, name: 'الجِنّ'  , phonetic: 'Al Jinn', nbVerses: 28, src: '../../assets/images/SVGSourah/72.svg' },
        { id: 73, name: 'المُزَّمّـِل'  , phonetic: 'Al Muzzamil', nbVerses: 20, src: '../../assets/images/SVGSourah/73.svg' },
        { id: 74, name: 'المُدَّثــِّر'  , phonetic: 'Al Muddathir', nbVerses: 56, src: '../../assets/images/SVGSourah/74.svg' },
        { id: 75, name: 'القِيامَة'  , phonetic: 'Al Qiyamah', nbVerses: 40, src: '../../assets/images/SVGSourah/75.svg' },
        { id: 76, name: 'الإنسان'  , phonetic: 'Al Insan', nbVerses: 31, src: '../../assets/images/SVGSourah/76.svg' },
        { id: 77, name: 'المُرسَلات'  , phonetic: 'Al Mursalat', nbVerses: 50, src: '../../assets/images/SVGSourah/77.svg' },
        { id: 78, name: 'النـَّبأ'  , phonetic: 'An Naba', nbVerses: 40, src: '../../assets/images/SVGSourah/78.svg' },
        { id: 79, name: 'النـّازِعات'  , phonetic: 'An Naazi3at', nbVerses: 46, src: '../../assets/images/SVGSourah/79.svg' },
        { id: 80, name: 'عَبَس'  , phonetic: '3abassa', nbVerses: 42, src: '../../assets/images/SVGSourah/80.svg' },
        { id: 81, name: 'التـَّكْوير'  , phonetic: 'Al Takwir', nbVerses: 29, src: '../../assets/images/SVGSourah/81.svg' },
        { id: 82, name: 'الإنفِطار'  , phonetic: 'Al Infitar', nbVerses: 19, src: '../../assets/images/SVGSourah/82.svg' },
        { id: 83, name: 'المُطـَفِّفين'  , phonetic: 'Al Mutafifin', nbVerses: 36, src: '../../assets/images/SVGSourah/83.svg' },
        { id: 84, name: 'الإنشِقاق'  , phonetic: 'Al Inshiqaq', nbVerses: 25, src: '../../assets/images/SVGSourah/84.svg' },
        { id: 85, name: 'البُروج'  , phonetic: 'Al Buruj', nbVerses: 22, src: '../../assets/images/SVGSourah/85.svg' },
        { id: 86, name: 'الطّارق'  , phonetic: 'At Taariq', nbVerses: 17, src: '../../assets/images/SVGSourah/86.svg' },
        { id: 87, name: 'الأعلی'  , phonetic: 'Al A3la', nbVerses: 19, src: '../../assets/images/SVGSourah/87.svg' },
        { id: 88, name: 'الغاشِيَة'  , phonetic: 'Al Ghashiyah', nbVerses: 26, src: '../../assets/images/SVGSourah/88.svg' },
        { id: 89, name: 'الفَجْر'  , phonetic: 'Al Fajr', nbVerses: 30, src: '../../assets/images/SVGSourah/89.svg' },
        { id: 90, name: 'البَـلـَد'  , phonetic: 'Al Balad', nbVerses: 20, src: '../../assets/images/SVGSourah/90.svg' },
        { id: 91, name: 'الشــَّمْس'  , phonetic: 'As Shams', nbVerses: 15, src: '../../assets/images/SVGSourah/91.svg'  },
        { id: 92, name: 'اللـَّيل'  , phonetic: 'Al Layl', nbVerses: 21, src: '../../assets/images/SVGSourah/92.svg'  },
        { id: 93, name: 'الضُّحی'  , phonetic: 'Al Duha', nbVerses: 11, src: '../../assets/images/SVGSourah/93.svg'  },
        { id: 94, name: 'الشَّرْح'  , phonetic: 'Al Sharh', nbVerses: 8, src: '../../assets/images/SVGSourah/94.svg'  },
        { id: 95, name: 'التـِّين'  , phonetic: 'At Tin', nbVerses: 8, src: '../../assets/images/SVGSourah/95.svg'  },
        { id: 96, name: 'العَلـَق'  , phonetic: 'Al 3alaq', nbVerses: 19, src: '../../assets/images/SVGSourah/96.svg'  },
        { id: 97, name: 'القـَدر'  , phonetic: 'Al Qadr', nbVerses: 5, src: '../../assets/images/SVGSourah/97.svg'  },
        { id: 98, name: 'البَيِّنَة'  , phonetic: 'Al Bayyinah', nbVerses: 8, src: '../../assets/images/SVGSourah/98.svg'  },
        { id: 99, name: 'الزلزَلة'  , phonetic: 'Az Zalzalah', nbVerses: 8, src: '../../assets/images/SVGSourah/99.svg'  },
        { id: 100, name: 'العَادِيات'  , phonetic: 'Al 3adiyat', nbVerses: 11, src: '../../assets/images/SVGSourah/100.svg'  },
        { id: 101, name: 'القارِعَة'  , phonetic: 'Al Qari3ah', nbVerses: 11, src: '../../assets/images/SVGSourah/101.svg' },
        { id: 102, name: 'التَكاثـُر'  , phonetic: 'At Takathur', nbVerses: 8, src: '../../assets/images/SVGSourah/102.svg' },
        { id: 103, name: 'العَصْر'  , phonetic: 'Al 3Asr', nbVerses: 3, src: '../../assets/images/SVGSourah/103.svg' },
        { id: 104, name: 'الهُمَزَة'  , phonetic: 'Al Humazah', nbVerses: 9, src: '../../assets/images/SVGSourah/104.svg' },
        { id: 105, name: 'الفِيل'  , phonetic: 'Al Fil', nbVerses: 5, src: '../../assets/images/SVGSourah/105.svg' },
        { id: 106, name: 'قـُرَيْش'  , phonetic: 'Quraysh', nbVerses: 4, src: '../../assets/images/SVGSourah/106.svg' },
        { id: 107, name: 'المَاعُون'  , phonetic: 'Al Ma3oun', nbVerses: 7, src: '../../assets/images/SVGSourah/107.svg' },
        { id: 108, name: 'الكَوْثَر'  , phonetic: 'Al Kawthar', nbVerses: 3, src: '../../assets/images/SVGSourah/108.svg' },
        { id: 109, name: 'الكَافِرُون'  , phonetic: 'Al Kafiroun', nbVerses: 6, src: '../../assets/images/SVGSourah/109.svg' },
        { id: 110, name: 'النـَّصر'  , phonetic: 'An Nasr', nbVerses: 3, src: '../../assets/images/SVGSourah/110.svg' },
        { id: 111, name: 'المَسَد'  , phonetic: 'Al Masad', nbVerses: 5, src: '../../assets/images/SVGSourah/111.svg' },
        { id: 112, name: 'الإخْلَاص'  , phonetic: 'Al Ikhlass', nbVerses: 4, src: '../../assets/images/SVGSourah/112.svg' },
        { id: 113, name: 'الفَلَق'  , phonetic: 'Al Falaq', nbVerses: 5, src: '../../assets/images/SVGSourah/113.svg' },
        { id: 114, name: 'النَّاس'  , phonetic: 'An Nass', nbVerses: 6, src: '../../assets/images/SVGSourah/114.svg' }
    ];
  }
}
//On représente la sourate
interface sourah{
  id: number;
  name: string;
  phonetic: string;
  nbVerses: number;
  src: string;
}
//On représente l'objet de transit d'un audio
class AudioforTransit{
  numberVerse: number | undefined;
  url: string | undefined;
  duration: string |undefined;
}