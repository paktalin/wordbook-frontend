import {Component, Input, OnInit} from '@angular/core';
import {Tag} from '../../DTO/Tag';
import {Word} from '../../DTO/Word';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AlertService} from '../../services/alert.service';
import {AuthService} from '../../services/auth.service';
import {UserResponse} from '../../DTO/UserResponse';
import {WordFieldComponent} from '../wordlist/word-field/word-field.component';

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
  @Input() wordFieldRef: WordFieldComponent;

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
      this.word.tagIds.push(this.tag.id);
      this.wordFieldRef.addTagName(this.tag.name);
    }, error => this.authService.coordinateError(error)
    );
  }
}
