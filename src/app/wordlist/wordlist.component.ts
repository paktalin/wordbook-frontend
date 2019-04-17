import { Component, OnInit } from '@angular/core';
import {WordRecord} from '../WordRecord';
import {HttpClient} from '@angular/common/http';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';

// noinspection TsLint
@Component({
  selector: 'app-wordlist',
  templateUrl: './wordlist.component.html',
  styleUrls: ['./wordlist.component.css']
})
export class WordlistComponent implements OnInit {
  private newWord: FormGroup;
  private foreignControl: FormControl;
  private translatedControl: FormControl;


  constructor(private http: HttpClient,
              private fb: FormBuilder) {
    this.foreignControl = new FormControl();
    this.translatedControl = new FormControl();

    this.newWord = fb.group({
      foreignControl: this.foreignControl,
      translatedControl: this.translatedControl
    });

  }

  public wordList: WordRecord[] = [];
  wordsUrl = 'http://localhost:9090/all_words';

  /*public newWord = new FormGroup({
    foreignControl: new FormControl(),
    translatedControl: new FormControl()
  });
*/
  public getList() {
    return this.http.get<WordRecord[]>(this.wordsUrl).subscribe(wordsList => {
      this.wordList = wordsList.reverse();
    });
  }

  ngOnInit() {
    this.getList();
    console.log(this.wordList);
  }

  submitWord() {
    console.log(this.newWord.get('foreignControl').value);
    console.log(this.newWord.get('translatedControl').value);
  }

}
