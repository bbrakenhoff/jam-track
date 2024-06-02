import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';


export const firebaseConfig = {
  projectId: "jam-track-2bce1",
  appId: "1:226481456230:web:73e4ae094b1fc386c699a7",
  storageBucket: "jam-track-2bce1.appspot.com",
  apiKey: "AIzaSyDOGiY1ZyYFELU9ucPVfN63jMBt5jKFXVA",
  authDomain: "jam-track-2bce1.firebaseapp.com",
  messagingSenderId: "226481456230",
  measurementId: "G-EMZSY0SVH2"
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideAuth(() => getAuth()), provideFirestore(() => getFirestore())
  ]
};
