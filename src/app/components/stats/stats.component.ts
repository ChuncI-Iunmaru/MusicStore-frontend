import {Component, OnInit} from '@angular/core';
import {StatsService} from "../../services/stats.service";
import {FormBuilder, FormGroup} from "@angular/forms";
import {StoreFormService} from "../../services/store-form.service";

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.css']
})
export class StatsComponent implements OnInit {

  constructor(private formBuilder: FormBuilder,
              private formService: StoreFormService,
              private statsService: StatsService) {
  }

  salesData = [] as any;
  profitsData = [] as any;
  // @ts-ignore
  yearFormGroup: FormGroup;
  years = [2019, 2020, 2021, 2020]

  colorScheme = {
    domain: [
      '#fffe01',
      '#ff8606',
      '#e83b36',
      '#600538',
      '#460a40',
      '#fed20f',
      '#f09f12',
      '#8c0d1c'
    ]
  };

  ngOnInit(): void {
    this.yearFormGroup = this.formBuilder.group({
      yearInformation: this.formBuilder.group({
        year: ['']})
    });
    this.handleYearChange();
  }

  getYear() {
    return this.yearFormGroup.get('yearInformation.year');
  }

  handleYearChange() {
    this.salesData = [];
    this.profitsData = [];
    this.statsService.getMonthlySales(parseInt(this.getYear()?.value)).subscribe(data => {
      this.salesData = [
        {name: "Styczeń", value: data[0]},
        {name: "Luty", value: data[1]},
        {name: "Marzec", value: data[2]},
        {name: "Kwiecień", value: data[3]},
        {name: "Maj", value: data[4]},
        {name: "Czerwiec", value: data[5]},
        {name: "Lipiec", value: data[6]},
        {name: "Sierpień", value: data[7]},
        {name: "Wrzesień", value: data[8]},
        {name: "Październik", value: data[9]},
        {name: "Listopad", value: data[10]},
        {name: "Grudzień", value: data[11]}
      ]
      console.log(this.salesData);
    })
    this.statsService.getMonthlyProfits(parseInt(this.getYear()?.value)).subscribe(data => {
      this.profitsData = [
        {name: "Styczeń", value: data[0]},
        {name: "Luty", value: data[1]},
        {name: "Marzec", value: data[2]},
        {name: "Kwiecień", value: data[3]},
        {name: "Maj", value: data[4]},
        {name: "Czerwiec", value: data[5]},
        {name: "Lipiec", value: data[6]},
        {name: "Sierpień", value: data[7]},
        {name: "Wrzesień", value: data[8]},
        {name: "Październik", value: data[9]},
        {name: "Listopad", value: data[10]},
        {name: "Grudzień", value: data[11]}
      ]
    })
  }

}
