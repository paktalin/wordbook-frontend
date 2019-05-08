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
  isCollapsed: boolean;

  public getList() {
    return this.http.get<WordRecord[]>('/api/all_words').subscribe(wordsList => {
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
      console.log(wordRecord);
      this.wordList.unshift(wordRecord);
      this.newWord.controls.foreignControl.setValue('');
      this.newWord.controls.translatedControl.setValue('');
      this.http.post('save_word', wordRecord, this.httpOptions).subscribe(error => console.log(error));
    }
  }

  enableEditing(foreignField, translatedField, editBtn, saveBtn, discardBtn) {
    if (this.state === State.None) {
      this.state = State.Edit;
      foreignField.disabled = false;
      translatedField.disabled = false;
      editBtn.style.display = 'none';
      saveBtn.style.display = 'inline';
      discardBtn.style.display = 'inline';
    }
  }

  saveChanges(wordRecord: WordRecord, foreignField, translatedField, editBtn, saveBtn, discardBtn) {
    wordRecord.foreignWord = foreignField.value;
    wordRecord.translatedWord = translatedField.value;
    this.http.put('update_word/' + wordRecord.id, wordRecord, this.httpOptions).subscribe(error => console.log(error));
    this.finishEditing(foreignField, translatedField, editBtn, saveBtn, discardBtn);
  }

  discardChanges(wordRecord: WordRecord, foreignField: HTMLInputElement, translatedField: HTMLInputElement, editBtn, saveBtn, discardBtn) {
    console.log(typeof foreignField);
    foreignField.value = wordRecord.foreignWord;
    translatedField.value = wordRecord.translatedWord;
    this.finishEditing(foreignField, translatedField, editBtn, saveBtn, discardBtn);
  }

  finishEditing(foreignField, translatedField, editBtn, saveBtn, discardBtn) {
    foreignField.disabled = true;
    translatedField.disabled = true;
    editBtn.style.display = 'inline';
    saveBtn.style.display = 'none';
    discardBtn.style.display = 'none';
    this.state = State.None;
  }

  sortByDate() {
    this.wordList.sort((w1, w2) => w2.id - w1.id);
  }

  sortByForeign() {
    this.wordList.sort((w1, w2) => w1.foreignWord.localeCompare(w2.foreignWord));
  }

  sortByTranslated() {
    this.wordList.sort((w1, w2) => w1.translatedWord.localeCompare(w2.translatedWord));
  }

  sortByTagName() {
    this.isCollapsed = !this.isCollapsed;
  }
}
