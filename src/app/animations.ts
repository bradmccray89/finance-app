import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';

export const expand = trigger('expand', [
  transition(':enter', [
    style({ height: '0px', opacity: 0 }),
    animate('200ms ease-in', style({ height: '*', opacity: 1 })),
  ]),
  transition(':leave', [
    style({ height: '*', opacity: 1 }),
    animate('200ms ease-in', style({ height: '0px', opacity: 0 })),
  ]),
]);

export const fadeInOut = trigger('fadeInOut', [
  transition(':enter', [
    style({ opacity: 0.5 }),
    animate('200ms ease-in', style({ opacity: 1 })),
  ]),
  transition(':leave', [
    style({ opacity: 1 }),
    animate('200ms ease-in', style({ opacity: 0.5 })),
  ]),
]);
