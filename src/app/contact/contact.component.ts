import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  imports: [CommonModule, FormsModule,],
  styleUrls: ['./contact.component.css'],
})
export class ContactComponent {
  submitted = false;

  contactForm = {
    email: '',
    subject: '',
    message: '',
  };

  private apiUrl = 'http://localhost:3000/server';
  
  constructor(private http: HttpClient) {}

  onSubmit(contactForm : any): void {
    this.submitted = true;
    
    this.http.post(`${this.apiUrl}/contact`, contactForm).subscribe({
      next: (response: any) => {
        alert('Message sent successfully!');
        this.contactForm = { email: '', subject: '', message: '' };
      },
      error: (err) => {
        console.error('Error sending message:', err);
        alert('Failed to send message. Please try again later.');
      },
    });
  }
}
