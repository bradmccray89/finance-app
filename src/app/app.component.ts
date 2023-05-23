import { Component, signal } from '@angular/core';
import { DataService } from './data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'finance-app';
  financeData = signal([
    {
      name: 'Rent',
      nickname: '',
      amount: 2000,
      category: 'Bills',
      date: new Date('2021-01-01'),
    },
  ]);

  constructor(private dataService: DataService) {
    //this.getFinanceData();
  }

  // Get Finance Data from api call (eventually)
  getFinanceData() {
    console.log('Get Finance Data');
  }

  uploadFile(event: any) {
    console.log(event.target.files[0]);
    const file = event.target.files[0];
    if (file && file.type !== 'text/csv') {
      return;
    }
    let fileReader = new FileReader();
    fileReader.onload = (e) => {
      this.parseFinanceData(fileReader.result);
    };
  }

  parseFinanceData(data: any) {
    let transactionList = data.split('\n');
    console.log(transactionList[0]);
    transactionList.forEach((transaction: any, index: number) => {
      // split and remove quotes
      let transactionData = transaction.split(',').map((item: any) => {
        return item.replace(/['"]+/g, '');
      });
      let transactionObject = {
        date: new Date(transactionData[0]),
        amount: Number(transactionData[1]),
        name: String(transactionData[4]),
        nickname: '',
        category: '',
      };
      console.log(transactionObject);
      this.financeData.mutate((value) => {
        value[index] = transactionObject;
      });
    });
  }
}
