import { Formation } from './../../model/Formation';
import { FormationService } from 'src/app/service/formation.service';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CalendarOptions } from '@fullcalendar/core';  // Correct import
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { Router } from '@angular/router';
import {RouterModule } from '@angular/router';
@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {
  events : any[] = [];
  calendarOptions: CalendarOptions = {
    plugins: [dayGridPlugin, interactionPlugin],
    initialView: 'dayGridYear',
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,dayGridWeek,dayGridDay'
    },
    editable: true,
    selectable: true,
    selectMirror: true,
    dayMaxEvents: true,
    events: [],
    dateClick: this.handleDateClick.bind(this),
    eventClick: this.handleEventClick.bind(this) // 👈 Add this
  };

  constructor(private http: HttpClient,private FormationService:FormationService,  private router: Router  ) {}

  ngOnInit(): void {
    this.loadEvents();  // Fetch events when the component loads
  }
  handleEventClick(arg: any): void {
    const event = arg.event;
    const formationTitle = event.title;
    const formationStart = event.start;
  
    // If you have ID in extendedProps:
    const formationId = event.extendedProps.id;
  
    console.log('Clicked formation:', formationTitle);
  
    if (formationId) {
      console.log('Formation ID:', formationId);
      this.router.navigate([`/formation/${formationId}`]);
    } else {
      alert('Formation ID not found.');
    }
    
  }

  loadEvents() {
    this.FormationService.getFormations().subscribe(
      (formations) => {
        console.log('Fetched formations:', formations);
        const colors = ['#1abc9c', '#3498db', '#9b59b6', '#e67e22', '#e74c3c'];
  
        // Filter formations with nombrePlace > 0
        const filteredFormations = formations.filter((formation) => formation.nombrePlace > 0);
  
        const formattedEvents = filteredFormations.map((formation, index) => ({
          title: formation.nomFormation,
          start: new Date(formation.dateFormation),
          id: formation.id ? formation.id.toString() : '',
          backgroundColor: colors[index % colors.length],
          borderColor: colors[index % colors.length],
          textColor: 'white',
          extendedProps: {
            id: formation.id?.toString() ?? '',
            description: formation.description,
            nombrePlace: formation.nombrePlace
          }
        }));
  
        console.log('Formatted events:', formattedEvents);
  
        // Update calendar options dynamically
        this.calendarOptions.events = formattedEvents;
      },
      (error) => {
        console.error('Error fetching events:', error);
      }
    );
  }
  
  



  handleDateClick(arg: any): void {
    console.log('Date clicked:', arg.dateStr);
  }
}
