import { Notification as AppNotification } from './notification.model';
import { Audio as AppAudio } from './audio.model';

export interface Student {
    id: string;
    username: string;
    isPublic: boolean;
    isActive: boolean;
    idInstitute: number;
    email: string;
    userType: string;
    password: string;
    notifications: AppNotification[];
    audios: AppAudio[];
    
  }