import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterUserComponent } from './register-user.component';
import { AuthService } from '../auth.service';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';

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
    usernameInput: () => (fixture.nativeElement as HTMLElement).querySelector('#usernameInput') as HTMLInputElement,
    usernameError: () => (fixture.debugElement).query(By.css('#usernameError')),
    emailInput: () => (fixture.nativeElement as HTMLElement).querySelector('#emailInput') as HTMLInputElement,
    emailError: () => (fixture.debugElement.nativeElement as HTMLElement).querySelector('#emailError'),
    passwordInput: () => (fixture.nativeElement as HTMLElement).querySelector('#passwordInput') as HTMLInputElement,
    passwordError: () => (fixture.debugElement.nativeElement as HTMLElement).querySelector('#passwordError'),
    clickSubmitButton: () => {
      ((fixture.nativeElement as HTMLElement).querySelector('#submitButton') as HTMLButtonElement).click()
      fixture.detectChanges();
    },
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

    expect(htmlElements.usernameError()).toBeNull();
    expect(htmlElements.emailError()).toBeNull();
    expect(htmlElements.passwordError()).toBeNull();
  });

  describe('submit form', () => {

    test('should request to register through firebase when submitted form is valid', () => {
      htmlElements.setInput(htmlElements.usernameInput(), testData.username);
      htmlElements.setInput(htmlElements.emailInput(), testData.email);
      htmlElements.setInput(htmlElements.passwordInput(), testData.password);

      htmlElements.clickSubmitButton()

      expect(authServiceMock.signUp).toHaveBeenCalledWith(testData.username, testData.email, testData.password);
    });

    test.only('should not request to register through firebase when submitted form is empty', () => {
      expect(component.authForm.value).toEqual({ username: '', email: '', password: '' });
      htmlElements.clickSubmitButton()
      fixture.detectChanges();

      expect(htmlElements.usernameError()).not.toBeNull();
      expect(htmlElements.emailError()).not.toBeNull();
      expect(htmlElements.passwordError()).not.toBeNull();
      expect(authServiceMock.signUp).not.toHaveBeenCalled();
    });

    test('should not request to register through firebase when submitted form contains empty username', () => {
      htmlElements.setInput(htmlElements.emailInput(), testData.email);
      htmlElements.setInput(htmlElements.passwordInput(), testData.password);

      htmlElements.clickSubmitButton()

      expect(htmlElements.usernameError()).not.toBeNull();
      expect(htmlElements.emailError()).toBeNull();
      expect(htmlElements.passwordError()).toBeNull();
      expect(authServiceMock.signUp).not.toHaveBeenCalled();
    });

    test('should not request to register through firebase when submitted form contains empty email', () => {
      htmlElements.setInput(htmlElements.usernameInput(), testData.username);
      htmlElements.setInput(htmlElements.passwordInput(), testData.password);

      htmlElements.clickSubmitButton()

      expect(htmlElements.usernameError()).toBeNull();
      expect(htmlElements.emailError()).not.toBeNull();
      expect(htmlElements.passwordError()).toBeNull();
      expect(authServiceMock.signUp).not.toHaveBeenCalled();
    });

    test('should not request to register through firebase when submitted form contains empty password', () => {
      htmlElements.setInput(htmlElements.usernameInput(), testData.username);
      htmlElements.setInput(htmlElements.emailInput(), testData.email);

      htmlElements.clickSubmitButton();

      expect(htmlElements.usernameError()).toBeNull();
      expect(htmlElements.emailError()).not.toBeNull();
      expect(htmlElements.passwordError()).toBeNull();
      expect(authServiceMock.signUp).not.toHaveBeenCalled();
    });
  });
});