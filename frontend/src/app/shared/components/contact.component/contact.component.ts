import { Component, signal } from '@angular/core';

@Component({
  imports: [],
  selector: 'app-contact.component',
  templateUrl: './contact.component.html',
})
export class ContactComponent {
  telefonos= signal<{ind: number, telf: string}[]>([
    {ind: 1, telf: '+593 987 654 321'},
    {ind: 2, telf: '09 987 654 321'}
  ])

  direcciones= signal<{ind: number, dir: string}[]>([
    {ind: 1, dir: 'Av. Principal 123, Quito'},
    {ind: 2, dir: 'Av. Principal 123, Quito'}
  ])

  correos= signal<{ind: number, correo: string}[]>([
    { ind: 1, correo: 'contacto@lite-techne.com' }
  ])
}
