import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataClientService {
  private score=0;
  private _scoreDataSubject = new BehaviorSubject<number>(0);
  public scoreData$ = this._scoreDataSubject.asObservable();
  constructor() { }

  public setScore(value: number) {
    this.score = value;
    this._scoreDataSubject.next(this.score);
  }

  public addScore(value: number) {
    this.score =  this.score + value;
    this._scoreDataSubject.next(this.score);
  }
}
