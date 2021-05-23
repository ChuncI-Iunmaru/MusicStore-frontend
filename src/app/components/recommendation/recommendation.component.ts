import { Component, OnInit } from '@angular/core';
import {RecommendationService} from "../../services/recommendation.service";
import {ActivatedRoute} from "@angular/router";
import {AlbumWrapper} from "../../common/album-wrapper";

@Component({
  selector: 'app-recommendation',
  templateUrl: './recommendation.component.html',
  styleUrls: ['./recommendation.component.css']
})
export class RecommendationComponent implements OnInit {

  private recommendations: AlbumWrapper[] = [];

  constructor(private recService: RecommendationService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.handleRecommendation();
    })
  }

  private handleRecommendation() {
    // @ts-ignore
    const currentAlbumId: number = +this.route.snapshot.paramMap.get('id');
    this.recService.getTestRecommendations(currentAlbumId).subscribe(data => {
      console.log('Zmiana rekomendowanych');
      console.log(data);
      this.recommendations = data
    });
  }
}
