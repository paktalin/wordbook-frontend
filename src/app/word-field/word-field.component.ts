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
  constructor(private http: HttpClient) {
  }

  @Input() word: WordRecord;
  private state: State = State.None;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  static closeDropdownMenu() {
    const dropdowns = document.getElementsByClassName('dropdown-content');
    let i;
    for (i = 0; i < dropdowns.length; i++) {
      const openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
  ngOnInit() {
  }

  /*enableEditing(foreignField, translatedField, editBtn, saveBtn, discardBtn) {
    if (this.state === State.None) {
      this.state = State.Edit;
      foreignField.disabled = false;
      translatedField.disabled = false;
      editBtn.style.display = 'none';
      saveBtn.style.display = 'inline';
      discardBtn.style.display = 'inline';
    }
  }*/

  enableEditing() {
    if (this.state === State.None) {
      this.state = State.Edit;
      WordFieldComponent.closeDropdownMenu();
      (document.getElementById('foreign-word') as HTMLInputElement).disabled = false;
      (document.getElementById('translated-word') as HTMLInputElement).disabled = false;
      document.getElementById('submit-block').style.display = 'block';
    }
  }

  finishEditing() {
    (document.getElementById('foreign-word') as HTMLInputElement).disabled = true;
    (document.getElementById('translated-word') as HTMLInputElement).disabled = true;
    document.getElementById('submit-block').style.display = 'none';
    this.state = State.None;
  }

  openDropdownMenu() {
    document.getElementById('dropdown').classList.toggle('show');
  }

  log() {
    console.log('hi!');
  }

  submitEdits() {
    this.word.foreignWord = (document.getElementById('foreign-word') as HTMLInputElement).value;
    this.word.translatedWord = (document.getElementById('translated-word') as HTMLInputElement).value;
    this.http.put('api/update_word', this.word, this.httpOptions).subscribe(() => {
    }, error => console.log(error));
    this.finishEditing();
  }

  cancelEdits() {
    console.log(this.word);
    (document.getElementById('foreign-word') as HTMLInputElement).value = this.word.foreignWord;
    (document.getElementById('translated-word') as HTMLInputElement).value = this.word.translatedWord;
    this.finishEditing();
  }
}
