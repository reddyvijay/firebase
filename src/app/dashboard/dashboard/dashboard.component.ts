import { Component, OnInit } from '@angular/core';
import { SupabaseService } from '../../../services/supabase.service'
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  user: any = null;

  constructor(private supabaseService: SupabaseService, private router: Router,
    private toastr:ToastrService
  ) {}

  async ngOnInit() {
    const { data } = await this.supabaseService.getCurrentUser();
    this.user = data?.session?.user;
    if (!this.user) {
      this.router.navigate(['/login']); // Redirect if not authenticated on load
    }
  }

  async logout() {
    const { error } = await this.supabaseService.signOut();
    if (error) {
      console.error('Error signing out:', error);
    } else {
      this.toastr.success('User logout successfully', 'Success!');
      this.router.navigate(['/login']);
    }
  }
}