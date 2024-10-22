import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  private searchQuerySubject = new BehaviorSubject<string>('');
  currentSearchQuery = this.searchQuerySubject.asObservable();

  constructor() {}

  updateSearchQuery(query: string): void {
    this.searchQuerySubject.next(query);
  }
}
