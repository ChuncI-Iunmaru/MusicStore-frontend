import { Component, OnInit } from '@angular/core';
import {AlbumWrapper} from "../../common/album-wrapper";
import {RecommendationService} from "../../services/recommendation.service";

@Component({
  selector: 'app-bestseller-recommendations',
  templateUrl: './bestseller-recommendations.component.html',
  styleUrls: ['./bestseller-recommendations.component.css']
})
export class BestsellerRecommendationsComponent implements OnInit {

  recommendations: AlbumWrapper[] = [];

  constructor(private recService: RecommendationService) { }

  ngOnInit(): void {
    this.recommendations = [];
    this.recService.getRecentBestsellers().subscribe(data => {
      console.log('Zmiana bestsellerów');
      console.log(data);
      this.recommendations = data
    });
  }

}
