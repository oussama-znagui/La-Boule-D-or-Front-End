import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-flash-message',
  imports: [],
  templateUrl: './flash-message.component.html',
  styleUrl: './flash-message.component.css'
})
export class FlashMessageComponent {
  @Input() message: string = ""

}
