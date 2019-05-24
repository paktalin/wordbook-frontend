import {Component, OnInit} from '@angular/core';
import {Word} from '../../DTO/Word';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {Tag} from '../../DTO/Tag';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import {AlertService} from '../../services/alert.service';
import {UserResponse} from '../../DTO/UserResponse';

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
  public words: Word[] = [];
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };
  request: string;

  private queryWordList() {
    return this.http.get<UserResponse>('/api/words').subscribe(result => {
      this.wordList = result.wordList.reverse();
      this.words = result.wordList;
    }, error => this.authService.coordinateError(error)
    );
  }

  private queryTags() {
    return this.http.get<UserResponse>('/api/tags').subscribe(result => {
        this.tags = result.tagList;
    }, error => this.authService.coordinateError(error)
    );
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
      this.http.post<UserResponse>('api/save_word', newWord, this.httpOptions)
        .subscribe(result => {
          this.wordList.unshift(result.word);
          this.alertService.success(result.message);
        }, error => this.authService.coordinateError(error)
        );
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
    this.http.post<UserResponse>('api/save_tag', newTag, this.httpOptions)
      .subscribe(result => {
        this.tags.unshift(result.tag);
        this.alertService.success(result.message);
      }, error => this.authService.coordinateError(error)
      );
    tagName.value = '';
  }

  search(reqeust: string) {
    this.wordList = this.words.filter(word => word.foreignWord.includes(reqeust) || word.translatedWord.includes(reqeust));
  }
}
