import { TestBed } from '@angular/core/testing';

import { Auth, getAuth, provideAuth, signOut } from '@angular/fire/auth';
import { AuthFirebaseService } from './auth-firebase.service';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { firebaseConfig } from '../../app.config';

describe('AuthFirebaseService', () => {
  let service: AuthFirebaseService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideFirebaseApp(() => initializeApp(firebaseConfig)),
        provideAuth(() => getAuth())
      ]
    });
    service = TestBed.inject(AuthFirebaseService);
  });

  test('should be created', () => {
    expect(service).toBeTruthy();
  });
});
