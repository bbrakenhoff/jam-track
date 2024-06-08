import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';
import { AuthFirebaseService } from './auth-firebase.service';
import { User, UserCredential, user } from '@angular/fire/auth';
import { of, throwError } from 'rxjs';

describe('AuthService', () => {
  let service: AuthService;

  const authFirebaseServiceMock = {
    createUserWithEmailAndPassword: jest.fn(),
    updateProfile: jest.fn()
  }

  beforeEach(() => {
    jest.clearAllMocks();

    TestBed.configureTestingModule({
      providers: [{
        provide: AuthFirebaseService, useValue: authFirebaseServiceMock
      }]
    });

    service = TestBed.inject(AuthService);
  });

  test('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('signUp()', () => {
    const username = 'username123'
    const email = 'user@test.com';
    const password = 'password123';

    test('should return "success" when creating user and updating username was succesfull', (done: jest.DoneCallback) => {
      const userCredentialMock = { user: {} } as UserCredential;
      authFirebaseServiceMock.createUserWithEmailAndPassword.mockReturnValueOnce(of(userCredentialMock));
      authFirebaseServiceMock.updateProfile.mockReturnValueOnce(of(void 0));

      service.signUp(username, email, password).subscribe({
        next: (result: string) => {
          expect(authFirebaseServiceMock.createUserWithEmailAndPassword).toHaveBeenCalledWith(email, password);
          expect(authFirebaseServiceMock.updateProfile).toHaveBeenCalledWith(userCredentialMock.user, { displayName: username });
          expect(result).toEqual('success');
          done();
        },
        error: done.fail
      });
    });

    test('should return "updateProfileFailed" when setting username failed', (done: jest.DoneCallback) => {
      const userCredentialMock = { user: {} } as UserCredential;
      authFirebaseServiceMock.createUserWithEmailAndPassword.mockReturnValueOnce(of(userCredentialMock));
      authFirebaseServiceMock.updateProfile.mockReturnValueOnce(throwError(() => new Error('failed setting username')));

      service.signUp(username, email, password).subscribe({
        next: (result: string) => {
          expect(authFirebaseServiceMock.createUserWithEmailAndPassword).toHaveBeenCalledWith(email, password);
          expect(authFirebaseServiceMock.updateProfile).toHaveBeenCalledWith(userCredentialMock.user, { displayName: username });
          expect(result).toEqual('updateProfileFailed');
          done();
        },
        error: done.fail
      });
    });

    test('should return "createUserWithEmailAndPasswordFailed" when user could not be created', (done: jest.DoneCallback) => {
      const userCredentialMock = {} as UserCredential;
      authFirebaseServiceMock.createUserWithEmailAndPassword.mockReturnValueOnce(of(userCredentialMock));

      service.signUp(username, email, password).subscribe({
        next: (result: string) => {
          expect(authFirebaseServiceMock.createUserWithEmailAndPassword).toHaveBeenCalledWith(email, password);
          expect(authFirebaseServiceMock.updateProfile).not.toHaveBeenCalledWith(userCredentialMock.user, { displayName: username });
          expect(result).toEqual('createUserWithEmailAndPasswordFailed');
          done();
        },
        error: done.fail
      });
    });

    test('should return "createUserWithEmailAndPasswordFailed" when results in an error', (done: jest.DoneCallback) => {
      const userCredentialMock = { user: {} } as UserCredential;
      authFirebaseServiceMock.createUserWithEmailAndPassword.mockReturnValueOnce(throwError(() => new Error('Could not create user')));

      service.signUp(username, email, password).subscribe({
        next: (result: string) => {
          expect(authFirebaseServiceMock.createUserWithEmailAndPassword).toHaveBeenCalledWith(email, password);
          expect(authFirebaseServiceMock.updateProfile).not.toHaveBeenCalledWith(userCredentialMock.user, { displayName: username });
          expect(result).toEqual('createUserWithEmailAndPasswordFailed');
          done();
        },
        error: done.fail
      });
    });
  });
});
