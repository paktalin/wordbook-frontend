import { Component, OnInit } from '@angular/core';
import {WordRecord} from '../WordRecord';
import {HttpClient} from '@angular/common/http';
import {FormControl, FormGroup} from '@angular/forms';

// noinspection TsLint
@Component({
  selector: 'app-wordlist',
  templateUrl: './wordlist.component.html',
  styleUrls: ['./wordlist.component.css']
})
export class WordlistComponent implements OnInit {
  constructor(private http: HttpClient) { }

  public wordList: WordRecord[] = [];
  wordsUrl = 'http://localhost:9090/all_words';

  public newWord = new FormGroup({
    foreignControl: new FormControl(),
    translatedControl: new FormControl()
  });

  public getList() {
    return this.http.get(this.wordsUrl).subscribe(wordsList => {
      this.wordList = wordsList;
      this.wordList = this.wordList.reverse();
    });
  }

  ngOnInit() {
    this.getList();
    console.log(this.wordList);
  }

  submitWord() {
    console.log(this.newWord.value.foreignControl);
  }

}
