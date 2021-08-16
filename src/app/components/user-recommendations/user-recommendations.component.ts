import { Component, OnInit } from '@angular/core';
import {AlbumWrapper} from "../../common/album-wrapper";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {RecommendationService} from "../../services/recommendation.service";

@Component({
  selector: 'app-user-recommendations',
  templateUrl: './user-recommendations.component.html',
  styleUrls: ['./user-recommendations.component.css']
})
export class UserRecommendationsComponent implements OnInit {

  recommendations: AlbumWrapper[] = [];
  modes: string[] = [ 'Spearman with nearest-n neighborhood',
                      'Spearman with threshold neighborhood',
                      'Pearson with nearest-n neighborhood',
                      'Pearson with threshold neighborhood',];
  currentMode: string = this.modes[0];
  // @ts-ignore
  modePicker: FormGroup;

  constructor(private recService: RecommendationService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.modePicker = this.formBuilder.group({
      modeList: new FormControl('', [Validators.required])
    });
    this.handleRecommendations();
    console.log("Inicjalizacja user recommendations");
  }

  private handleRecommendations() {
    // Docelowo tu wyłuskać id zalogowenego usera/customera ze storage
    const currentUserId = 4;
    this.recommendations = [];
    const modeIndex = this.modes.findIndex(mode => mode === this.currentMode);
    if (modeIndex === 0) {
      this.recService.getSpearmanNearestNRecs(currentUserId).subscribe(data => {
        console.log('Zmiana rekomendowanych');
        console.log(data);
        this.recommendations = data
      });
    } else if (modeIndex == 1) {
      this.recService.getSpearmanThresholdRecs(currentUserId).subscribe(data => {
        console.log('Zmiana rekomendowanych');
        console.log(data);
        this.recommendations = data
      });
    } else if (modeIndex == 2) {
      this.recService.getPearsonNearestNRecs(currentUserId).subscribe(data => {
        console.log('Zmiana rekomendowanych');
        console.log(data);
        this.recommendations = data
      });
    } else if (modeIndex == 3) {
      this.recService.getPearsonThresholdRecs(currentUserId).subscribe(data => {
        console.log('Zmiana rekomendowanych');
        console.log(data);
        this.recommendations = data
      });
    }
  }

  handleModeSwitch() {
    console.log(`Zmiana wybranej wartości: ${this.modePicker.get('modeList')?.value}`);
    this.currentMode = this.modePicker.get('modeList')?.value;
    this.handleRecommendations();
  }
}
