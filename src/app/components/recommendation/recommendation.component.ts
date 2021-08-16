import { Component, OnInit } from '@angular/core';
import {RecommendationService} from "../../services/recommendation.service";
import {ActivatedRoute} from "@angular/router";
import {AlbumWrapper} from "../../common/album-wrapper";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-recommendation',
  templateUrl: './recommendation.component.html',
  styleUrls: ['./recommendation.component.css']
})
export class RecommendationComponent implements OnInit {

  recommendations: AlbumWrapper[] = [];
  modes: string[] = [ 'Euclidean Distance on Genre',
                      "Euclidean Similarity on genre & subgenre",
                      "Mixed cosine similarity, artist & year",
                      "Cosine similarity on Genre & Subgenre"];
  currentMode: string = this.modes[0];
  // @ts-ignore
  modePicker: FormGroup;

  constructor(private recService: RecommendationService, private route: ActivatedRoute, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.modePicker = this.formBuilder.group({
      modeList: new FormControl('', [Validators.required])
    });
    this.route.paramMap.subscribe(() => {
      this.handleRecommendation();
    })
  }

  private handleRecommendation() {
    // @ts-ignore
    const currentAlbumId: number = +this.route.snapshot.paramMap.get('id');
    const modeIndex = this.modes.findIndex(mode => mode === this.currentMode);
    if (modeIndex === 0) {
      this.recService.getGenreEuclidRecommendations(currentAlbumId).subscribe(data => {
        console.log('Zmiana rekomendowanych');
        console.log(data);
        this.recommendations = data
      });
    } else if (modeIndex === 1) {
      this.recService.getSubgenreEuclidRecommendations(currentAlbumId).subscribe(data => {
        console.log('Zmiana rekomendowanych');
        console.log(data);
        this.recommendations = data
      });
    } else if (modeIndex === 2) {
      this.recService.getMixedRecommendations(currentAlbumId).subscribe(data => {
        console.log('Zmiana rekomendowanych');
        console.log(data);
        this.recommendations = data
      });
    } else if (modeIndex === 3) {
      this.recService.getCosineRecommendations(currentAlbumId).subscribe(data => {
        console.log('Zmiana rekomendowanych');
        console.log(data);
        this.recommendations = data
      });
    }
  }

  handleModeSwitch() {
    console.log(`Zmiana wybranej wartości: ${this.modePicker.get('modeList')?.value}`);
    this.currentMode = this.modePicker.get('modeList')?.value;
    this.handleRecommendation();
  }
}
