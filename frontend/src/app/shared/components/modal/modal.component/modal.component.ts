import { Component, computed, HostListener, input, output } from '@angular/core';

@Component({
  imports: [],
  selector: 'app-modal', //es el que te permite seleccionarlo al llamarlo en un componente
  templateUrl: './modal.component.html',
})
export class ModalComponent {
  isOpen = input(false)
  title = input('')
  size = input<'sm' | 'md' | 'lg'>('md')
  showFooter = input(false)
  closed = output<void>() //solo abrí la puerta sin decir nada
  position= input<'center' | 'dropdown'>('dropdown')

  close() { this.closed.emit() }
  @HostListener('document:keydown.escape')
  onEscape() { if (this.isOpen()) this.closed.emit() }
}


//output<string>() → abrí la puerta y dije hola
