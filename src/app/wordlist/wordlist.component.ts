import {Component, OnInit} from '@angular/core';
import {Word} from '../Word';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {Tag} from '../Tag';

// noinspection TsLint
@Component({
  selector: 'app-wordlist',
  templateUrl: './wordlist.component.html',
  styleUrls: ['./wordlist.component.css']
})
export class WordlistComponent implements OnInit {

  constructor(private http: HttpClient, private formBuilder: FormBuilder) {
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
    return this.http.get<Word[]>('/api/words').subscribe(wordsList => {
      this.wordList = wordsList.reverse();
    }, error => console.log(error));
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
      this.http.post<Word>('api/save_word', newWord, this.httpOptions)
        .subscribe(savedWord => { this.wordList.unshift(savedWord); }, error => console.log(error));
    }
  }

  deleteWord(word: Word) {
    this.wordList.splice(this.wordList.indexOf(word), 1);
  }

  getTags() {
    return this.tags;
  }
}
