import {Component, OnInit} from '@angular/core';
import {WordRecord} from '../WordRecord';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {State} from '../State';
import {AuthService} from '../auth.service';
import {Router} from "@angular/router";

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
              private router: Router) {
    this.newWord = formBuilder.group({
      foreignControl: new FormControl(),
      translatedControl: new FormControl()
    });
  }

  private newWord: FormGroup;
  public wordList: WordRecord[] = [];
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  public getList() {
    return this.http.get<WordRecord[]>('/api/words').subscribe(wordsList => {
      this.wordList = wordsList.reverse();
    }, error => {
      if (error.status === 400) {
          this.authService.logout();
          this.router.navigate(['/login']);
      }
    });
  }

  ngOnInit() {
    this.getList();
  }

  submitByEnter(event) {
    const foreignWord = this.newWord.get('foreignControl').value;
    const translatedWord = this.newWord.get('translatedControl').value;
    if (event.key === 'Enter') {
      const wordRecord = new WordRecord(foreignWord, translatedWord);
      console.log(wordRecord);
      this.wordList.unshift(wordRecord);
      this.newWord.controls.foreignControl.setValue('');
      this.newWord.controls.translatedControl.setValue('');
      this.http.post('api/save_word', wordRecord, this.httpOptions).subscribe(error => console.log(error));
    }
  }




}
