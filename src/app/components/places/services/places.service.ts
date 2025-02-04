import { Injectable } from '@angular/core';
import { Place } from '../models/places.model';

@Injectable({
  providedIn: 'root',
})
export class PlacesService {
  private _places: Place[] = [
    new Place(
      'place-1',
      'Hamburg',
      "Hamburg is northern Germany's hub for business, tourism and culture",
      'https://www.flightgift.com/media/wp/FG/2024/03/hamburg-1024x768.jpeg',
      149.9,
      new Date('2025-02-04'),
      new Date('2025-02-07')
    ),
    new Place(
      'place-2',
      'Kyiv',
      'Kyiv, the capital of Ukraine, is known for its rich history and stunning architecture.',
      'https://content.r9cdn.net/rimg/dimg/27/bb/1e63bfbb-city-15139-1645cdf896a.jpg?width=1366&height=768&xhint=2663&yhint=911&crop=true',
      99.9,
      new Date('2025-02-04'),
      new Date('2025-02-07')
    ),
    new Place(
      'place-3',
      'Tokyo',
      "Tokyo, Japan's bustling capital, mixes the ultramodern with traditional culture.",
      'https://www.advantour.com/img/japan/images/tokyo.jpg',
      199.9,
      new Date('2025-02-04'),
      new Date('2025-02-12')
    ),
    new Place(
      'place-4',
      'Paris',
      "Paris, France's capital, is a global center for art, fashion, and culture.",
      'https://media.timeout.com/images/106181719/image.jpg',
      249.9,
      new Date('2025-02-04'),
      new Date('2025-02-20')
    ),
    new Place(
      'place-5',
      'New York',
      'New York City, the largest city in the USA, is known as the city that never sleeps.',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/4/47/New_york_times_square-terabass.jpg/1200px-New_york_times_square-terabass.jpg',
      299.9,
      new Date('2025-02-04'),
      new Date('2025-02-07')
    ),
    new Place(
      'place-6',
      'Sydney',
      "Sydney, Australia's largest city, is famous for its harborfront Sydney Opera House.",
      'https://cdnblog.fly.homes/uploads/2023/10/Interesting-Facts-About-Sydney.webp',
      199.9,
      new Date('2025-02-04'),
      new Date('2025-02-07')
    ),
    new Place(
      'place-7',
      'Rio de Janeiro',
      'Rio de Janeiro is a vibrant Brazilian city known for its beaches and Carnival festival.',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/Cidade_Maravilhosa.jpg/800px-Cidade_Maravilhosa.jpg',
      129.9,
      new Date('2025-02-04'),
      new Date('2025-02-07')
    ),
    new Place(
      'place-8',
      'Cape Town',
      'Cape Town, South Africa, is renowned for its harbor, natural setting, and Table Mountain.',
      'https://cdn.britannica.com/42/126842-050-0803BC41/Sea-Point-Cape-Town-SAf.jpg',
      179.9,
      new Date('2025-02-04'),
      new Date('2025-02-07')
    ),
    new Place(
      'place-9',
      'Bangkok',
      'Bangkok, Thailand’s capital, is known for ornate shrines and vibrant street life.',
      'https://static.independent.co.uk/2025/01/03/14/newFile-12.jpg',
      89.9,
      new Date('2025-02-04'),
      new Date('2025-02-07')
    ),
    new Place(
      'place-10',
      'Rome',
      "Rome, Italy's capital, is famed for its nearly 3,000 years of globally influential art and architecture.",
      'https://i.natgeofe.com/k/a6c9f195-de20-445d-9d36-745ef56042c5/OG_Colosseum_Ancient-Rome_KIDS_1122_3x2.jpg',
      159.9,
      new Date('2025-02-04'),
      new Date('2025-02-07')
    ),
  ];

  get places() {
    return [...this._places];
  }

  constructor() {}

  getPlaceById(placeId: string) {
    return { ...this.places.find((place) => place._id === placeId) };
  }
}
