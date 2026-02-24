import { Component, contentChildren, signal, computed, input, effect, untracked } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UiCarouselItemDirective } from './directives/ui-carousel-item.directive';

@Component({
  selector: 'ui-carousel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './carousel.html',
  styleUrl: './carousel.scss',
})
export class UiCarouselComponent {
  readonly slides = contentChildren(UiCarouselItemDirective);
  readonly currentIndex = signal(0);
  readonly isTransitioning = signal(true);
  readonly isPaused = signal(false);
  
  private readonly timerTrigger = signal(0);
  private touchStartX = 0;

  // Inputs de Configuración
  autoPlay = input<boolean>(false);
  interval = input<number>(3000);
  showArrows = input<boolean>(true);
  arrowsPosition = input<'inside' | 'outside'>('inside');
  dotsPosition = input<'inside' | 'outside'>('inside');
  containerClass = input<string>(''); 
  arrowClass = input<string>('');
  animateContent = input<boolean>(true);

  constructor() {
    effect((onCleanup) => {
      if (this.autoPlay() && !this.isPaused() && this.slides().length > 1) {
        this.timerTrigger(); // Dependencia para reiniciar el timer
        const timer = setInterval(() => {
          untracked(() => this.next(false)); 
        }, this.interval());
        onCleanup(() => clearInterval(timer));
      }
    });
  }

  next(isManual = true) {
    const total = this.slides().length;
    if (total <= 1) return;
    if (isManual) this.resetTimer();

    if (this.currentIndex() === total - 1) {
      this.jumpTo(0);
    } else {
      this.currentIndex.update(i => i + 1);
    }
  }

  prev(isManual = true) {
    const total = this.slides().length;
    if (total <= 1) return;
    if (isManual) this.resetTimer();

    if (this.currentIndex() === 0) {
      this.jumpTo(total - 1);
    } else {
      this.currentIndex.update(i => i - 1);
    }
  }

  private jumpTo(target: number) {
    this.isTransitioning.set(false);
    this.currentIndex.set(target);
    setTimeout(() => this.isTransitioning.set(true), 50);
  }

  goTo(index: number) {
    this.resetTimer();
    this.isTransitioning.set(true);
    this.currentIndex.set(index);
  }

  private resetTimer() {
    if (this.autoPlay()) this.timerTrigger.update(v => v + 1);
  }

  // Handlers de Interacción
  setHover(status: boolean) { this.isPaused.set(status); }
  onTouchStart(e: TouchEvent) { this.touchStartX = e.touches[0].clientX; }
  onTouchEnd(e: TouchEvent) {
    const delta = this.touchStartX - e.changedTouches[0].clientX;
    if (Math.abs(delta) > 50) delta > 0 ? this.next() : this.prev();
  }
}