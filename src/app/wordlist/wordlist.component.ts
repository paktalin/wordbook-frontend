import { Component, OnInit } from '@angular/core';
import {WordRecord} from '../WordRecord';
import {HttpClient, HttpHeaders} from '@angular/common/http';

// noinspection TsLint
@Component({
  selector: 'app-wordlist',
  templateUrl: './wordlist.component.html',
  styleUrls: ['./wordlist.component.css']
})
export class WordlistComponent implements OnInit {
// hi
  constructor(private http: HttpClient) { }

  public wordList: WordRecord[] = [];
  wordsUrl = 'http://localhost:9090/all_words';

/*  public getList() {
    this.wordList.push({foreignWord: 'ciao', translatedWord: 'hi'});
    this.wordList.push({foreignWord: 'ciao', translatedWord: 'bye'});
    this.wordList.push({foreignWord: 'grazie', translatedWord: 'thanks'});
    this.wordList.push({foreignWord: 'prego', translatedWord: 'welcome'});
  }*/

  public getList() {
    return this.http.get(this.wordsUrl).subscribe(list => {
      console.log(list);
      this.wordList = list;
    });
  }

  ngOnInit() {
    this.getList();
    console.log(this.wordList);
  }

}
