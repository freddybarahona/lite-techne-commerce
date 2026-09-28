import { AfterViewInit, Component, ElementRef, inject, OnDestroy, OnInit, signal, ViewChild } from '@angular/core';
import EmblaCarousel, { EmblaOptionsType, EmblaCarouselType } from 'embla-carousel';
import AutoPlay from 'embla-carousel-autoplay';
import { CategoryDTO } from '../../interfaces/categories/category.dto.interface';
import { CategoriesService } from '../../services/categories.service';


@Component({
  imports: [],
  selector: 'app-home.component',
  templateUrl: './home.component.html',
})
export class HomeComponent implements AfterViewInit, OnDestroy, OnInit{
  @ViewChild('viewport', { static: true}) viewportRef!: ElementRef<HTMLElement>
  private sv_categories = inject(CategoriesService)
  categorias = signal<CategoryDTO[]>([])
  loading = signal(true)
  dots = signal<number[]>([])
  selected = signal(0)
  
  private embla?: EmblaCarouselType
  
  slides = signal<{ url: string; title: string }[]>([  
    { url: 'https://tse2.mm.bing.net/th/id/OIP.YqjvU3w1zUlNGs-97dlTrAHaHa?r=0&rs=1&pid=ImgDetMain&o=7&rm=3', title: 'Oferta 1' },
    { url: 'https://quillbot.com/blog/wp-content/uploads/2025/11/QB-tonos-negro-1.png', title: 'Oferta 2' },
    { url: 'https://img.freepik.com/vector-premium/tonos-moda-paleta-colores-turquesa-son-vectores-libres_1114724-887.jpg?w=2000', title: 'Oferta 3' },
  ])
  
  ngOnInit(): void {
    this.sv_categories.getCategories().subscribe({
    next: (res) => { this.categorias.set(res.data); this.loading.set(false) },
    error: () => this.loading.set(false),
    })
  }

  ngAfterViewInit(): void {
    if (typeof window === 'undefined') return            // guard SSR (el hook corre en servidor)
    this.embla = EmblaCarousel(this.viewportRef.nativeElement, {
      loop: true,
      align: 'center',
    }, [AutoPlay({ delay: 4000, stopOnMouseEnter: true })])
    this.dots.set(this.embla.scrollSnapList().map((_, i) => i))
    this.embla.on('select', () => this.selected.set(this.embla!.selectedScrollSnap()))
  }
  
  ngOnDestroy(): void { this.embla?.destroy() }                // ← obligatorio: limpia el observer
  
  prev() { this.embla?.scrollPrev() }
  next() { this.embla?.scrollNext() }
  go(i: number) { this.embla?.scrollTo(i) }
}
