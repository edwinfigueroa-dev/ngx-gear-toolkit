import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

@Component({
  selector: 'ui-icon',
  templateUrl: './icon.html',
  styleUrl: './icon.scss',
  standalone: true,
  imports: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiIconComponent {
  path = input<string>(''); // Puede ser: 'check', 'assets/img.png', 'assets/icons.svg#home'
  color = input<string>('currentColor');
  classIcon = input<string>('');
  libraryIcons = input<Record<string, string>>({});
  staticImage = input<boolean>(false);

  // 1. Detectar tipo de recurso
  type = computed(() => {
    const p = this.path().toLowerCase();
    if (this.libraryIcons()[p]) return 'internal';
    if (p.includes('#')) return 'sprite';
    if (p.endsWith('.png') || p.endsWith('.jpg') || p.endsWith('.jpeg') || p.endsWith('.webp') || p.endsWith('.gif')) return 'image';
    if (p.endsWith('.svg') && this.staticImage()) return 'image';
    return 'mask'; // Default para SVG externo
  });

  // 2. Lógica para Iconos Internos (Inline)
  internalPath = computed(() => this.libraryIcons()[this.path()] || '');

  // 3. Lógica para Sprites o Máscaras
  urlPath = computed(() => {
    const p = this.path();
    return p ? `url('${p}')` : 'none';
  });

  // 4. Estilos de Color (Tu lógica original mejorada)
  themeStyles = computed(() => {
    if (this.type() === 'image') return {};

    const val = this.color();
    const isDirectColor = val.startsWith('#') || val.startsWith('rgb') || val.startsWith('hsl') ||  val === 'currentColor' || val === 'transparent';

    const colorValue = isDirectColor ? val : `var(--color-${val}, var(--${val}, ${val}))`;
    
    return { '--ui-color-icon': colorValue };
  });
}