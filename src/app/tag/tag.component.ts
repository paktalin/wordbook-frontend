import {Component, Input, OnInit} from '@angular/core';
import {Tag} from '../Tag';
import {Word} from '../Word';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AlertService} from '../alert/alert.service';
import {AuthService} from '../auth.service';
import {UserResponse} from '../UserResponse';

@Component({
  selector: 'app-tag',
  templateUrl: './tag.component.html',
  styleUrls: ['./tag.component.css']
})
export class TagComponent implements OnInit {

  constructor(private http: HttpClient,
              private alertService: AlertService,
              private authService: AuthService) {
  }
  @Input() tag: Tag;
  @Input() word: Word;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  ngOnInit() {
  }

  addTag() {
    this.http.put<UserResponse>('api/add_tag?tag_id=' + this.tag.id, this.word, this.httpOptions).subscribe(result => {
      this.alertService.success(result.message);
    }, error => this.authService.coordinateError(error)
    );
  }
}
