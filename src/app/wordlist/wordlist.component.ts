import { Component, OnInit } from '@angular/core';
import {WordRecord} from '../WordRecord';
import {HttpClient} from '@angular/common/http';

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
