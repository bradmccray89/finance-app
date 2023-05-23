import { Component, effect, signal } from '@angular/core';
import { DataService } from './data.service';

interface ITransaction {
  name: string;
  nickname: string;
  date: Date;
  amount: number;
  category: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'finance-app';
  financeData = signal<ITransaction[] | null>(null);
  file: any = null;

  constructor(private dataService: DataService) {
    //this.getFinanceData();
  }

  // Get Finance Data from api call (eventually)
  getFinanceData() {
    console.log('Get Finance Data');
  }

  uploadFile(event: any) {
    console.log(event.target.files[0]);
    this.file = event.target.files[0];
    if (this.file && this.file.type !== 'text/csv') {
      return;
    }
    let fileReader = new FileReader();
    fileReader.onload = (e) => {
      this.parseFinanceData(fileReader.result);
    };
    fileReader.readAsText(this.file);
  }

  parseFinanceData(data: any) {
    let transactionList: [] = data.split('\n');
    const updatedList: ITransaction[] = [];
    transactionList.forEach((transaction: any, index: number) => {
      if (!transaction) return;
      // split and remove quotes
      let transactionData = transaction.split(',').map((item: any) => {
        return item.replace(/['"]+/g, '');
      });
      let transactionObject = {
        date: new Date(transactionData[0]),
        amount: +transactionData[1],
        name: String(transactionData[4]),
        nickname: '',
        category: '',
      };
      updatedList.push(transactionObject);
    });
    this.financeData.set(updatedList);
  }

  clearFinanceData() {
    this.financeData.set(null);
    this.file = null;
    // clear file input
    let fileInput = document.getElementById('fileInput') as HTMLInputElement;
    fileInput.value = '';
    console.log('Clear Finance Data', fileInput);
  }
}
