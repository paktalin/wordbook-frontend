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
  constructor(private http: HttpClient,
              ) { }

  public wordList: WordRecord[] = [];

  public getList() {
    this.http.get('http://localhost:9090', {headers: HttpHeaders.})
  }

  ngOnInit() {
    this.getList();
    console.log(this.wordList);
  }

}
