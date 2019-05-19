import {Component, Input, OnInit} from '@angular/core';
import {WordRecord} from '../WordRecord';
import {State} from '../State';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Component({
  selector: 'app-word-field',
  templateUrl: './word-field.component.html',
  styleUrls: ['./word-field.component.css']
})
export class WordFieldComponent implements OnInit {
  @Input() word: WordRecord;
  private state: State = State.None;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };
  constructor(private http: HttpClient) { }

  ngOnInit() {
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

  saveChanges(word: WordRecord, foreignField, translatedField, editBtn, saveBtn, discardBtn) {
    word.foreignWord = foreignField.value;
    word.translatedWord = translatedField.value;
    this.http.put('api/update_word', word, this.httpOptions).subscribe(error => console.log(error));
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

  openDropdownMenu() {
    document.getElementById('dropdown').classList.toggle("show");
  }

  log() {
    console.log('hi!');
  }
}
