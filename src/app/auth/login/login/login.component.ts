import { Component } from '@angular/core';
import { SupabaseService } from '../../../../services/supabase.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  email = '';
  password = '';
  errorMessage = '';

  constructor(private supabaseService: SupabaseService, private router: Router,
    private toastr:ToastrService
  ) {}

  async onSubmit() {
    const { data, error } = await this.supabaseService.signIn(
      this.email,
      this.password
    );
    if (error) {
      this.toastr.error(error.message, 'Error!');

      this.errorMessage = error.message;
    } else {
      console.log(this.toastr)
      this.toastr.success(data?.user?.email +  ' User successfully loggedin');
      console.log('Login successful!', data);
      this.router.navigate(['/dashboard']); // Redirect to dashboard after successful login

    }
  }
}