import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { CustomValidator } from 'src/app/validators/custom.validator';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { UserUtil } from 'src/app/utils/user.util';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
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
  submit() {
    if (this.form.valid) {
      let login = this.form.value;
      this.service.login(login).subscribe((login) => {
        if (!login || login.length == 0) {
          this.toastr.error("E-mail ou senha inválidos");
        } else {
          UserUtil.set(login[0]);
          this.router.navigate(["/home"]);
        }
      });
    }
  }
}
