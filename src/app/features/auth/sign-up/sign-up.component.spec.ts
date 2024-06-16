import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignUpComponent } from './sign-up.component';
import { AuthService } from '../auth.service';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';

describe('SignUpComponent', () => {
  let component: SignUpComponent;
  let fixture: ComponentFixture<SignUpComponent>;
  const authServiceMock = { signUp: jest.fn().mockReturnValue(of('success')) };

  const testData = {
    name: 'Melissa Rivas',
    email: 'melissa.rivas@test.com',
    password: 'Mll!55@Rivas'
  }
  const htmlElements = {
    nameInput: () => (fixture.nativeElement as HTMLElement).querySelector('#nameInput') as HTMLInputElement,
    nameError: () => (fixture.debugElement).query(By.css('#nameError')),
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
      imports: [SignUpComponent],
      providers: [{ provide: AuthService, useValue: authServiceMock }]
    }).compileComponents();

    fixture = TestBed.createComponent(SignUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  test('should create', () => {
    expect(component).toBeTruthy();

    expect(htmlElements.nameError()).toBeNull();
    expect(htmlElements.emailError()).toBeNull();
    expect(htmlElements.passwordError()).toBeNull();
  });

  describe('submit form', () => {

    test('should request to sign up through firebase when submitted form is valid', () => {
      htmlElements.setInput(htmlElements.nameInput(), testData.name);
      htmlElements.setInput(htmlElements.emailInput(), testData.email);
      htmlElements.setInput(htmlElements.passwordInput(), testData.password);

      htmlElements.clickSubmitButton()

      expect(authServiceMock.signUp).toHaveBeenCalledWith(testData.name, testData.email, testData.password);
    });

    test.only('should not request to sign up through firebase when submitted form is empty', () => {
      expect(component.signUpForm.value).toEqual({ name: '', email: '', password: '' });
      htmlElements.clickSubmitButton()
      fixture.detectChanges();

      expect(htmlElements.nameError()).not.toBeNull();
      expect(htmlElements.emailError()).not.toBeNull();
      expect(htmlElements.passwordError()).not.toBeNull();
      expect(authServiceMock.signUp).not.toHaveBeenCalled();
    });

    test('should not request to sign up through firebase when submitted form contains empty name', () => {
      htmlElements.setInput(htmlElements.emailInput(), testData.email);
      htmlElements.setInput(htmlElements.passwordInput(), testData.password);

      htmlElements.clickSubmitButton()

      expect(htmlElements.nameError()).not.toBeNull();
      expect(htmlElements.emailError()).toBeNull();
      expect(htmlElements.passwordError()).toBeNull();
      expect(authServiceMock.signUp).not.toHaveBeenCalled();
    });

    test('should not request to sign up through firebase when submitted form contains empty email', () => {
      htmlElements.setInput(htmlElements.nameInput(), testData.name);
      htmlElements.setInput(htmlElements.passwordInput(), testData.password);

      htmlElements.clickSubmitButton()

      expect(htmlElements.nameError()).toBeNull();
      expect(htmlElements.emailError()).not.toBeNull();
      expect(htmlElements.passwordError()).toBeNull();
      expect(authServiceMock.signUp).not.toHaveBeenCalled();
    });

    test('should not request to sign up through firebase when submitted form contains empty password', () => {
      htmlElements.setInput(htmlElements.nameInput(), testData.name);
      htmlElements.setInput(htmlElements.emailInput(), testData.email);

      htmlElements.clickSubmitButton();

      expect(htmlElements.nameError()).toBeNull();
      expect(htmlElements.emailError()).not.toBeNull();
      expect(htmlElements.passwordError()).toBeNull();
      expect(authServiceMock.signUp).not.toHaveBeenCalled();
    });
  });
});