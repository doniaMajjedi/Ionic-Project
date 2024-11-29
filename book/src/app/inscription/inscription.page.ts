import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Auth, getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { Router } from '@angular/router'; 
@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.page.html',
  styleUrls: ['./inscription.page.scss'],
})
export class InscriptionPage implements OnInit {
  registerForm: FormGroup|any;
  auth: Auth;

  constructor(private fb: FormBuilder,private router: Router) {
    this.auth = getAuth();}

  ngOnInit() {
    // Initialiser le formulaire réactif
    this.registerForm = this.fb.group({
      lastName: ['', Validators.required],
      firstName: ['', Validators.required],
      age: ['', [Validators.required, Validators.min(18)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onRegister() {
    if (this.registerForm.invalid) {
      return;
    }

    const { email, password } = this.registerForm.value;

    createUserWithEmailAndPassword(this.auth, email, password)
      .then((userCredential) => {
        console.log('Utilisateur inscrit :', userCredential);
        this.router.navigate(['/home']);
        // Effectuer une redirection ou une autre action
      })
      .catch((error) => {
        console.error('Erreur lors de l\'inscription :', error);
      });
  }
}
