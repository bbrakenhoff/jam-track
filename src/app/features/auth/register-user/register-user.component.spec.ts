import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterUserComponent } from './register-user.component';
import { AuthService } from '../auth.service';
import { of } from 'rxjs';

describe('RegisterUserComponent', () => {
  let component: RegisterUserComponent;
  let fixture: ComponentFixture<RegisterUserComponent>;
  const authServiceMock = { signUp: jest.fn().mockReturnValue(of('success')) };

  const testData = {
    username: 'username123',
    email: 'username123@test.com',
    password: 'username123@'
  }
  const htmlElements = {
    usernameInput: () => (fixture.debugElement.nativeElement as HTMLElement).querySelector('#usernameInput') as HTMLInputElement,
    emailInput: () => (fixture.debugElement.nativeElement as HTMLElement).querySelector('#emailInput') as HTMLInputElement,
    passwordInput: () => (fixture.debugElement.nativeElement as HTMLElement).querySelector('#passwordInput') as HTMLInputElement,
    submitButton: () => (fixture.debugElement.nativeElement as HTMLElement).querySelector('#submitButton') as HTMLButtonElement,
    setInput: (htmlInputElement: HTMLInputElement, value: string) => {
      htmlInputElement.value = value;
      htmlInputElement.dispatchEvent(new Event('input', { bubbles: true }));
    }
  }

  beforeEach(async () => {
    jest.clearAllMocks();

    await TestBed.configureTestingModule({
      imports: [RegisterUserComponent],
      providers: [{ provide: AuthService, useValue: authServiceMock }]
    }).compileComponents();

    fixture = TestBed.createComponent(RegisterUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  test('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('onSubmit()', () => {
    test('should write the filled in values to reactive form object', () => {
      htmlElements.setInput(htmlElements.usernameInput(), testData.username);
      htmlElements.setInput(htmlElements.emailInput(), testData.email);
      htmlElements.setInput(htmlElements.passwordInput(), testData.password);

      expect(component.authForm.value).toEqual({ displayName: testData.username, email: testData.email, password: testData.password });
    });

    test('should request to register through firebase when form valid', () => {
      htmlElements.setInput(htmlElements.usernameInput(), testData.username);
      htmlElements.setInput(htmlElements.emailInput(), testData.email);
      htmlElements.setInput(htmlElements.passwordInput(), testData.password);

      htmlElements.submitButton().click();

      expect(authServiceMock.signUp).toHaveBeenCalledWith(testData.username, testData.email, testData.password);
    });

    test('should not request to register through firebase when form empty', () => {
      htmlElements.submitButton().click();

      expect(authServiceMock.signUp).not.toHaveBeenCalled();
    });

    test('should not request to register through firebase when username empty', () => {
      htmlElements.setInput(htmlElements.emailInput(), testData.email);
      htmlElements.setInput(htmlElements.passwordInput(), testData.password);
      htmlElements.submitButton().click();

      expect(authServiceMock.signUp).not.toHaveBeenCalled();
    });

    test('should not request to register through firebase when email empty', () => {
      htmlElements.setInput(htmlElements.usernameInput(), testData.username);
      htmlElements.setInput(htmlElements.passwordInput(), testData.password);

      htmlElements.submitButton().click();

      expect(authServiceMock.signUp).not.toHaveBeenCalled();
    });

    test('should not request to register through firebase when email empty', () => {
      htmlElements.setInput(htmlElements.usernameInput(), testData.username);
      htmlElements.setInput(htmlElements.emailInput(), testData.email);

      htmlElements.submitButton().click();

      expect(authServiceMock.signUp).not.toHaveBeenCalled();
    });
  });
});
