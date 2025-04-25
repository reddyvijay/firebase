import { Component } from '@angular/core';
import { SupabaseService } from '../../../services/supabase.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {
  email: string = '';
  password: string = '';
  errorMessage = '';
  sucessMessage = '';

  constructor(private supabaseService: SupabaseService, private router: Router,
    private toastr: ToastrService
  ) { }

  async onSubmit() {
    const { data, error } = await this.supabaseService.signUp(
      this.email,
      this.password
    );
    if (error) {
      this.toastr.error(error.message, 'Error!');
      this.errorMessage = error.message;
    } else {
      console.log('Registration successful!', data);
      this.toastr.success('created successfully', 'Success!');
      this.sucessMessage = 'Check your email to verify your account & Login after verify.'

      // this.router.navigate(['/login']); // Redirect to login after successful registration
    }
  }
}
