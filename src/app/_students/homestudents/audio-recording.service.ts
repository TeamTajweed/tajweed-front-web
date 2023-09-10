import { Injectable } from "@angular/core";
import * as RecordRTC from "recordrtc";
import * as moment from "moment";
import { Observable, Subject } from "rxjs";

interface RecordedAudioOutput {
  blob: Blob;
  title: string;
}

@Injectable()
export class AudioRecordingService {
  private stream: any;
  private recorder: any;
  private interval: any;
  private startTime: any;
  //Observables
  private _recorded = new Subject<RecordedAudioOutput>();
  private _recordingTime = new Subject<string>();
  private _recordingFailed = new Subject<string>();

  getRecordedBlob(): Observable<RecordedAudioOutput> {
    return this._recorded.asObservable();
  }

  getRecordedTime(): Observable<string> {
    return this._recordingTime.asObservable();
  }

  recordingFailed(): Observable<string> {
    return this._recordingFailed.asObservable();
  }

  //Lancement de l'enregistrement
  startRecording() {
    if (this.recorder) {
      // l'enregistrement est deja lancé
      return;
    }

    this._recordingTime.next("00:00");
    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then(s => {
        this.stream = s;
        this.record();
      })
      .catch(error => {
        this._recordingFailed.next("error")
        console.log(error);
      });
  }

  //On abandonne l'enregistrement
  abortRecording() {
    this.stopMedia();
  }

  //Fonction privée appelée dans le lancement d'enregistrement
  private record() {
    this.recorder = new RecordRTC.StereoAudioRecorder(this.stream, {
      type: "audio",
      mimeType: "audio/webm"
    });

    this.recorder.record();
    this.startTime = moment();
    this.interval = setInterval(() => {
      const currentTime = moment();
      const diffTime = moment.duration(currentTime.diff(this.startTime));
      const time =
        this.toString(diffTime.minutes()) +
        ":" +
        this.toString(diffTime.seconds());
      this._recordingTime.next(time);
    }, 1000);
  }

  //Fct utilitaire
  private toString(value: number) {
    let val2 = ""
    if (!value){
        val2 = "00";  
    } 
    if (value < 10){
        val2 = "0" + value;
    } 
    return val2;
  }

  //Arret de l'enregistrement
  stopRecording() {
    if (this.recorder) {
      this.recorder.stop(
          (blob: any) => {
          if (this.startTime) {
            const mp3Name = encodeURIComponent(
              "audio_" + new Date().getTime() + ".mp3"
            );
            this.stopMedia();
            this._recorded.next({ blob: blob, title: mp3Name });
          }
        },
        () => {
          this.stopMedia();
          this._recordingFailed.next("error");
        }
      );
    }
  }

  //On remet le compteur à 0
  resetTimer(){
    this._recordingTime.next("00:00");
  }

  //Fct privée appelée dans le abort
  private stopMedia() {
    if (this.recorder) {
      this.recorder = null;
      clearInterval(this.interval);
      this.startTime = null;
      if (this.stream) {
        this.stream.getAudioTracks().forEach((track: { stop: () => any; }) => track.stop());
        this.stream = null;
      }
    }
  }
}
