import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-alert-message',
  imports: [],
  templateUrl: './alert-message.component.html',
  styleUrl: './alert-message.component.css'
})
export class AlertMessageComponent {
  @Input() message: string = ""
  @Output() yesEnvent = new EventEmitter<void>
  @Output() noEnvent = new EventEmitter<void>

}
