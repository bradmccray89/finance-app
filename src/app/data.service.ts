import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor() {}

  getFinanceData() {
    console.log('Get Finance Data');
  }
}
