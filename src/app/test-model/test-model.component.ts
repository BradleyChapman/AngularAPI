import { Component, OnInit } from '@angular/core';
import { ApiserviceService } from '../apiservice.service';
import { TestModel } from '../Models/test-model';

@Component({
  selector: 'app-test-model',
  templateUrl: './test-model.component.html',
  styleUrls: ['./test-model.component.css']
})
export class TestModelComponent implements OnInit {

  public searchID: number;
  public dataItems: Array<TestModel>;
  public newTestModel: TestModel;

  constructor(private apiService:ApiserviceService) {
    this.newTestModel = new TestModel;
    this.apiService.getStuff()
    .subscribe(x => {
      this.dataItems = x,
      error => console.log("Error: " + error);
      console.log(this.dataItems);
    })
  }

  ngOnInit() {
  }

  public onButtonClick()
  {
    // this.apiService.getStuff().subscribe(x=> console.log(x));

    // console.log has to happen in the multiline code block because the code runs asynchronously
    // meaning the subscribe wouldnt be finished yet when you tried to log the dataItems
    this.apiService.getStuff()
      .subscribe(x => {

        this.dataItems = x,
        error => console.log("Error: " + error);
        console.log(this.dataItems);

      })
  }

  public onPutClick(tmodel: TestModel)
  {
    this.apiService.putStuff(tmodel).subscribe();
  }

  public onDeleteClick(tmodel: TestModel)
  {
    this.apiService.deleteStuff(tmodel).subscribe(x => {
      let index = this.dataItems.indexOf(tmodel) //.find(x => x.id == tmodel.id);
      this.dataItems.splice(index, 1)
    });
  }

  public onAddClick(tmodel: TestModel)
  {
    this.apiService.addStuff(tmodel).subscribe(x => {
      this.dataItems.push(x);
      this.newTestModel = new TestModel;    
    });
  }

}
