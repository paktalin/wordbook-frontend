import {Component, OnInit} from '@angular/core';
import {WordRecord} from '../WordRecord';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {State} from '../State';

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

  private newWord: FormGroup;
  public wordList: WordRecord[] = [];
  private readonly GlobalUrl = 'http://localhost:9090/';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };
  private state: State = State.None;

  public getList() {
    return this.http.get<WordRecord[]>(this.GlobalUrl + 'all_words').subscribe(wordsList => {
      this.wordList = wordsList.reverse();
    });
  }

  ngOnInit() {
    this.getList();
    console.log(this.wordList);
  }

  submitByEnter(event) {
    const foreignWord = this.newWord.get('foreignControl').value;
    const translatedWord = this.newWord.get('translatedControl').value;
    if (event.key === 'Enter') {
      const wordRecord = new WordRecord(foreignWord, translatedWord);
      this.wordList.unshift(wordRecord);
      this.newWord.controls.foreignControl.setValue('');
      this.newWord.controls.translatedControl.setValue('');
      this.http.post(this.GlobalUrl + 'save_word', wordRecord, this.httpOptions).subscribe();
    }
  }

  editWord(fw, tw, btn) {
     console.log(this.state);
     if (this.state === State.None) {
       this.state = State.Edit;
       fw.disabled = false;
       tw.disabled = false;

     }
     if (this.state === State.Edit) {

     }
     // document.getElementById(this.generateForeignWordId(word.id)).removeAttribute('disabled');
     // document.getElementById(this.generateTranslatedId(word.id)).removeAttribute('disabled');
  }

  saveChanges(wordId: number, foreignField: HTMLInputElement, translatedField: HTMLInputElement) {
    const wordRecord = new WordRecord(foreignField.value, translatedField.value, 1, wordId);
    this.http.post(this.GlobalUrl + 'update_word/' + wordId, wordRecord, this.httpOptions).subscribe();
    this.state = State.None;
  }

}
