import { Component, OnInit } from '@angular/core';
import { CustomValidator } from 'src/app/validators/custom.validator';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { UserUtil } from 'src/app/utils/user.util';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  form: FormGroup;
  showPassword: boolean = true;

  constructor(
    private fb: FormBuilder,
    private service: AuthService,
    private router: Router,
    private toastr: ToastrService) {
    this.form = fb.group({
      email: ['', Validators.compose([
        Validators.minLength(5),
        Validators.maxLength(120),
        Validators.required,
        CustomValidator.EmailValidator
      ])],
      password: ['', Validators.compose([
        Validators.minLength(6),
        Validators.maxLength(20),
        Validators.required
      ])]
    });
  }


  ngOnInit() {
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  submit() {
    if (this.form.valid) {
      let user = this.form.value;
      this.service.signup(user).subscribe(() => {
        UserUtil.set(user);
        this.toastr.success("Usuário cadastrado com sucesso!");
        this.router.navigate(["/home"]);
      });
    }
  }
}
