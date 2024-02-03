import { state, style, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HubConnectionBuilder, HubConnection } from '@aspnet/signalr';

import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,ToastModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  animations: [
    trigger('toastAnimation', [
      state('start', style({
        opacity: 1,
        transform: 'translateY(0)'
      })),
      // other animation states and transitions...
    ])
  ],
  providers: [MessageService] // Add MessageService as a provider
})
export class AppComponent implements OnInit {

  private _hubConnection: HubConnection | undefined;
  public signalRSummary: string = ''; 
  public accountGUID1: string = 'F591529B-D7B5-4A24-8542-0A28B457B51D!!!'; // NOTE : Please get this accountGUID from endpoint /api/Account

  constructor(private messageService: MessageService) { }

  ngOnInit(): void {
    this._hubConnection = new HubConnectionBuilder()
      .withUrl('http://localhost:5072/api/v1.0/notify')
      .build();

    this._hubConnection
      .start()
      .then(() => console.log('Connection started!'))
      .catch(err => console.log('Error while establishing connection :('));

    this._hubConnection.on('BroadcastMessage', (accountGUID: string, type: string, payload: string) => {
      
      if(accountGUID === this.accountGUID1){
        this.showNotification(type, payload); // Call showNotification when a message is received
      }

    });
  }

  showNotification(type: string, payload: string): void {
    this.signalRSummary = payload; // Update the summary property
    this.messageService.add({ severity: type, summary: payload });
  }

}
