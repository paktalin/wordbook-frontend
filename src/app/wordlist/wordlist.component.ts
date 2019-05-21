import {Component, OnInit} from '@angular/core';
import {Word} from '../Word';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {Tag} from '../Tag';
import {AuthService} from '../auth.service';
import {Router} from '@angular/router';
import {AlertService} from '../alert/alert.service';

// noinspection TsLint
@Component({
  selector: 'app-wordlist',
  templateUrl: './wordlist.component.html',
  styleUrls: ['./wordlist.component.css']
})
export class WordlistComponent implements OnInit {

  constructor(private http: HttpClient,
              private formBuilder: FormBuilder,
              private authService: AuthService,
              private router: Router,
              private alertService: AlertService) {
    this.newWord = formBuilder.group({
      foreignControl: new FormControl(),
      translatedControl: new FormControl()
    });
  }

  private tags: Tag[] = [];
  private newWord: FormGroup;
  public wordList: Word[] = [];
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  private queryWordList() {
    return this.http.get<any>('/api/words').subscribe(result => {
      this.wordList = result.wordList.reverse();
    }, error => {
      if (error.status === 400) {
        this.authService.logout();
        this.router.navigate(['/login']);
      }
    });
  }

  private queryTags() {
    return this.http.get<Tag[]>('/api/tags').subscribe(tags => {
      this.tags = tags;
    }, error => console.log(error));
  }

  ngOnInit() {
    this.queryWordList();
    this.queryTags();
  }

  submitByEnter(event) {
    const foreignWord = this.newWord.get('foreignControl').value;
    const translatedWord = this.newWord.get('translatedControl').value;
    if (event.key === 'Enter') {
      const newWord = new Word(foreignWord, translatedWord);
      this.newWord.controls.foreignControl.setValue('');
      this.newWord.controls.translatedControl.setValue('');
      this.http.post<any>('api/save_word', newWord, this.httpOptions)
        .subscribe(result => {
          this.wordList.unshift(result.word);
          this.alertService.success(result.message);
        }, error => {
          console.log(error.error);
          this.alertService.error(error.error.message);
        });
    }
  }

  deleteWord(word: Word) {
    this.wordList.splice(this.wordList.indexOf(word), 1);
  }

  getTags() {
    return this.tags;
  }

  addTag(tagName: HTMLInputElement) {
    const newTag: Tag = new Tag(tagName.value);
    this.http.post<any>('api/save_tag', newTag, this.httpOptions)
      .subscribe(result => {
        this.tags.unshift(result.tag);
        this.alertService.success(result.message);
      }, error => {
        console.log(error.error);
        this.alertService.error(error.error.message);
      });
    tagName.value = '';
  }
}
