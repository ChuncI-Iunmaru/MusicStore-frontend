import {Component, OnInit} from '@angular/core';
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

  constructor(private albumService: AlbumService, private route: ActivatedRoute, private formBuilder: FormBuilder, private router: Router) {
  }

  genres: string[] = [];
  subgenres: string[] = [];

  ngOnInit(): void {
    this.createFormGroup();
    this.populateLists();
    this.route.paramMap.subscribe(() => {
      // Ustawiać inaczej wartości form group
      this.handleProductDetails();
    })
  }

  handleProductDetails(): void {
    // @ts-ignore
    let theProductId: number = +this.route.snapshot.paramMap.get('id');

    if (theProductId === -1) {
      console.log("Powinien być pusty album");
      console.log(this.album);
      this.album.albumId = -1;
    } else {
      this.albumService.getAlbum(theProductId).subscribe(
        data => {
          console.log("Pobrano album");
          console.log(data);
          this.album = data;
          console.log("Powinien być pobrany album");
          console.log(this.album);
          this.getTitle()?.setValue(this.album.albumTitle);
          this.getImageUrl()?.setValue(this.album.imageUrl);
          this.getPrice()?.setValue(this.album.albumPrice);
          this.getYear()?.setValue(this.album.albumYear);

          this.getGenreA()?.setValue(this.album.genres.length >= 1 ? this.album.genres[0].genreName : '-');
          this.getGenreB()?.setValue(this.album.genres.length >= 2 ? this.album.genres[1].genreName  : '-');
          this.getGenreC()?.setValue(this.album.genres.length >= 3 ? this.album.genres[2].genreName  : '-');

          this.getSubgenreA()?.setValue(this.album.subgenres.length >= 1 ? this.album.subgenres[0].subgenreName  : '-');
          this.getSubgenreB()?.setValue(this.album.subgenres.length >= 2 ? this.album.subgenres[1].subgenreName : '-');
          this.getSubgenreC()?.setValue(this.album.subgenres.length >= 3 ? this.album.subgenres[2].subgenreName : '-');
        })
      this.albumService.getArtistName(theProductId).subscribe(data => {
        this.album.artistName = data;
        console.log('Pobrano artystę ' + data)
        this.getArtistName()?.setValue(this.album.artistName);
      })
    }
  }

  createFormGroup(): void {
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
        price: new FormControl(0.00, [Validators.required,
          Validators.minLength(4), Validators.maxLength(5),
          Validators.pattern('^(?:0|[1-9][0-9]*)\.[0-9]+$')])
      }),
      albumGenres: this.formBuilder.group({
        genreA: ['-'],
        genreB: ['-'],
        genreC: ['-'],
        subgenreA: ['-'],
        subgenreB: ['-'],
        subgenreC: ['-']
      })
    })
  }

  populateLists(): void {
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

  getPrice() {
    return this.albumFormGroup.get('albumInfo.price');
  }

  getGenreA() {
    return this.albumFormGroup.get('albumGenres.genreA');
  }
  getGenreB() {
    return this.albumFormGroup.get('albumGenres.genreB');
  }
  getGenreC() {
    return this.albumFormGroup.get('albumGenres.genreC');
  }

  getSubgenreA() {
    return this.albumFormGroup.get('albumGenres.subgenreA');
  }
  getSubgenreB() {
    return this.albumFormGroup.get('albumGenres.subgenreB');
  }
  getSubgenreC() {
    return this.albumFormGroup.get('albumGenres.subgenreC');
  }

  onSubmit() {
    if (this.albumFormGroup.invalid) {
      this.albumFormGroup.markAllAsTouched();
      return;
    }
    this.album.albumTitle = this.getTitle()?.value;
    this.album.artistName = this.getArtistName()?.value;
    this.album.albumYear = this.getYear()?.value;
    this.album.albumPrice = this.getPrice()?.value;
    this.album.imageUrl = this.getImageUrl()?.value;

    this.album.genres = [];
    this.album.subgenres = [];

    this.getGenreA()?.value !== '-' ? this.album.genres.push(this.getGenreA()?.value) : null;
    this.getGenreB()?.value !== '-' ? this.album.genres.push(this.getGenreB()?.value) : null;
    this.getGenreC()?.value !== '-' ? this.album.genres.push(this.getGenreC()?.value) : null;

    this.getSubgenreA()?.value !== '-' ? this.album.subgenres.push(this.getSubgenreA()?.value) : null;
    this.getSubgenreB()?.value !== '-' ? this.album.subgenres.push(this.getSubgenreB()?.value) : null;
    this.getSubgenreC()?.value !== '-' ? this.album.subgenres.push(this.getSubgenreC()?.value) : null;

    console.log('Album submitted');
    console.log(this.album);

    // @ts-ignore
    let theProductId: number = +this.route.snapshot.paramMap.get('id');
    if (theProductId === -1) {
      console.log("Tworzenie albumu")
      this.albumService.addAlbum(this.album).subscribe(result => {
        console.log("Dodano album" + result)
        this.router.navigateByUrl("/products")
      })
    } else this.albumService.updateAlbum(this.album).subscribe(result => {
      console.log("Zaktualizowano album" + result)
      this.router.navigateByUrl("/products")
    });

  }
}
