import { Component, OnInit } from '@angular/core';
import {Album} from "../../common/album";
import {AlbumService} from "../../services/album.service";
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {CustomValidator} from "../../validators/custom-validator";

@Component({
  selector: 'app-crud-page',
  templateUrl: './crud-page.component.html',
  styleUrls: ['./crud-page.component.css']
})
export class CrudPageComponent implements OnInit {
  // @ts-ignore
  album: Album = new Album();
  // @ts-ignore
  albumFormGroup: FormGroup;
  constructor(private albumService: AlbumService, private route: ActivatedRoute, private formBuilder: FormBuilder, private router: Router) { }

  genres: string[] = [];
  subgenres: string[] = [];

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      let theProductId: number;
      if (this.route.snapshot.paramMap.get('id') === null) {
        theProductId = -1
        this.album.albumId = -1
      } else { // @ts-ignore
        theProductId = +this.route.snapshot.paramMap.get('id');
        this.albumService.getAlbum(theProductId).subscribe(
          data => {
            this.album = data;
          })
      }
    })

    // Create form group
    this.albumFormGroup = this.formBuilder.group({
      albumInfo: this.formBuilder.group({
        title: new FormControl('', [Validators.required,
          Validators.minLength(2),
          CustomValidator.notOnlyWhitespace]),
        artistName: new FormControl('', [Validators.required,
          Validators.minLength(2),
          CustomValidator.notOnlyWhitespace]),
        imageUrl: new FormControl('', [Validators.required,
          Validators.minLength(2),
          CustomValidator.notOnlyWhitespace]),
        year: new FormControl(1999, [Validators.required,
          Validators.minLength(4), Validators.maxLength(4),
          Validators.pattern('^[0-9]*$')]),
      }),
      albumGenres: this.formBuilder.group({
        genreA: [''],
        genreB: [''],
        genreC: [''],
        subgenreA: [''],
        subgenreB: [''],
        subgenreC: ['']
      })
    })

    // Populate genres and subgenres
    this.albumService.getGenres().subscribe(
      data => {
        this.genres = data;
        this.genres.unshift('-');
      });
    this.albumService.getSubgenres().subscribe(
      data => {
        this.subgenres = data;
        this.subgenres.unshift('-');
      });
  }

  getTitle() {
    return this.albumFormGroup.get('albumInfo.title');
  }

  getArtistName() {
    return this.albumFormGroup.get('albumInfo.artistName');
  }

  getImageUrl() {
    return this.albumFormGroup.get('albumInfo.imageUrl');
  }

  getYear() {
    return this.albumFormGroup.get('albumInfo.year');
  }

  onSubmit() {
    console.log('Album submitted')
  }
}
