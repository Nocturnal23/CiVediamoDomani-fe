import {Component} from '@angular/core';
import {EventDto} from "../../core/dto/event-dto";
import {EventService} from "../../core/services/event.service";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthenticationService} from "../../core/services/authentication.service";
import {faFacebook, faStaylinked, faTwitter} from "@fortawesome/free-brands-svg-icons";

@Component({
    selector: 'app-info-event',
    templateUrl: './info-event.component.html',
    styleUrls: ['./info-event.component.css']
})
export class InfoEventComponent {
    eventDto: EventDto;
    url: string
    eventDate: string;
    attending: boolean;
    favorite: boolean;
    fbIcon = faFacebook
    twIcon = faTwitter
    copyIcon = faStaylinked

    constructor(private eventService: EventService,
                private router: Router,
                private activatdRoute: ActivatedRoute) {

        this.eventDto = this.router.getCurrentNavigation()?.extras?.state?.['event']
        if (this.eventDto) {
            this.eventDate = new Date(this.eventDto?.datetime).toLocaleString()
            this.attending = this.eventDto.attendees.includes(AuthenticationService.getAppUser.url)
            this.favorite = this.eventDto.followers.includes(AuthenticationService.getAppUser.url)
            this.isFree()
        } else {
            this.activatdRoute.params.subscribe(({url}) => {
                this.url = url;
                this.eventService.getByUrl(this.url).subscribe((event) => {
                    this.eventDto = event;
                    this.eventDate = new Date(this.eventDto?.datetime).toLocaleString()
                    this.attending = this.eventDto.attendees.includes(AuthenticationService.getAppUser.url)
                    this.favorite = this.eventDto.followers.includes(AuthenticationService.getAppUser.url)
                    this.isFree()
                });
            });
        }
    }

    isFree() {
        return this.eventDto?.price == 0;
    }

    onGoing() {
        return new Date(this.eventDto?.datetime) > new Date();
    }
}
