import { Component, signal } from '@angular/core';

@Component({
  imports: [],
  selector: 'app-about.us.component',
  templateUrl: './about.us.component.html',
})
export class AboutUsComponent {
  historia = signal<string[]>([
    "Lorem ipsum dolor sit amet consectetur adipiscing elit et pellentesque arcu nam, metus tortor duis ac scelerisque inceptos faucibus nullam luctus aliquet maecenas, semper dictum praesent pharetra purus per cum eget diam posuere. Posuere commodo vel tincidunt sollicitudin pretium tempor congue vestibulum, sem netus ante venenatis dapibus mi odio luctus, taciti leo imperdiet faucibus dictumst malesuada torquent. A sem augue quam viverra tellus vehicula pharetra facilisi tortor, lobortis pellentesque natoque ultricies vulputate eleifend tristique quisque vitae, auctor ultrices per vel porttitor sodales conubia condimentum.",
    "Lectus nascetur felis mus cras iaculis mattis, morbi habitant turpis donec gravida, platea scelerisque eleifend metus libero. Montes ac phasellus morbi aptent quis lobortis felis justo nullam, arcu risus etiam feugiat sollicitudin vehicula blandit tellus, per torquent cum tincidunt nibh taciti nam condimentum. Non nam class accumsan aptent dictum iaculis a auctor, id sociis tempor libero aenean purus eros nullam, natoque at laoreet aliquet erat ullamcorper facilisis."
  ])

  mision_vision= signal<string[]>([
    "Lorem ipsum dolor sit amet consectetur adipiscing elit pellentesque facilisi ornare magna lacinia in diam dictumst, quis parturient condimentum feugiat ligula malesuada torquent massa euismod sagittis donec a conubia. Scelerisque nascetur sem mattis, libero quam.",
    "Lorem ipsum dolor sit amet consectetur adipiscing elit leo, fusce sapien integer rhoncus iaculis torquent."
  ])

  misionVision = signal<{ titulo: string; texto: string }[]>([
    { titulo: 'Misión', texto: 'Lorem ipsum dolor sit amet consectetur adipiscing elit pellentesque facilisi ornare magna lacinia in diam dictumst, quis parturient condimentum feugiat ligula malesuada torquent massa euismod sagittis donec a conubia. Scelerisque nascetur sem mattis, libero quam.",' },
    { titulo: 'Visión', texto: 'Lorem ipsum dolor sit amet consectetur adipiscing elit leo, fusce sapien integer rhoncus iaculis torquent.' },
  ])

  liderazgo = signal<{ nombre: string; cargo: string; descripcion: string }[]>([
    { nombre: 'Jaime Farfan', cargo: 'Presidente', descripcion: 'Lorem ipsum dolor sit amet consectetur adipiscing elit, dictumst mi montes felis sodales natoque, lobortis suscipit in augue sed volutpat.' },
    { nombre: 'Juan Velasco', cargo: 'CEO', descripcion: 'Lorem ipsum dolor sit amet consectetur adipiscing elit, dictumst mi montes felis sodales natoque, lobortis suscipit in augue sed volutpat.' },
  ])

}
