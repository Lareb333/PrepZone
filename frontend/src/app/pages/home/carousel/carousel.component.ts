import { Component, OnInit } from '@angular/core';

interface carouselImage {
  imageSrc: string;
  imageAlt: string;
  imageHeading: string;
  imageText: string;
}

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss'],
})
export class CarouselComponent implements OnInit {
  constructor() { }

  height: string = '400px';
  selectedIndex: number = 0;
  loadIndex: number = 0;
  indicators: boolean = true;
  controls: boolean = true;
  autoScroll: boolean = true;
  images: carouselImage[] = [
    {
      imageSrc: './assets/carousel1.webp',
      imageAlt: 'carousel1.webp',
      imageHeading: 'Your Path to JEE & NEET Excellence',
      imageText:
        'Expert Guidance, Comprehensive Resources, and Personalized Support for Your Academic Triumph',
    },
    {
      imageSrc: './assets/carousel2.webp',
      imageAlt: 'carousel2.webp',
      imageHeading: 'Ace JEE and NEET with Confidence',
      imageText:
        'Join Us for Unparalleled Coaching, Practice, and Results – Your Future Begins Here',
    },
    {
      imageSrc: './assets/carousel1.webp',
      imageAlt: 'carousel3.webp',
      imageHeading: 'Empowering Your JEE and NEET Journey',
      imageText:
        'From Aspirations to Achievements - Experience the Difference of Quality Education and Support',
    },
  ];
  ngOnInit(): void {
    if (this.autoScroll) {
      setInterval(() => {
        this.onNextClick();
      }, 10000);
    }
  }
  selectImage(index: number): string {
    if (index == this.selectedIndex) {
      return 'center';
    } else if (index == this.images.length - 1 && this.selectedIndex == 0) {
      return 'left';
    } else if (index == this.selectedIndex - 1) {
      return 'left';
    }
    return 'right';
  }
  onPrevClick(): void {
    if (this.selectedIndex === 0) {
      this.selectedIndex = this.images.length - 1;
    } else {
      this.selectedIndex--;
    }
  }
  onNextClick(): void {
    if (this.selectedIndex === this.images.length - 1) {
      this.selectedIndex = 0;
    } else {
      this.selectedIndex++;
    }
  }
  private swipeCoord: [number, number] = [0, 0];
  private swipeTime: number = 0;
  swipe(e: TouchEvent, when: string): void {
    const coord: [number, number] = [
      e.changedTouches[0].pageX,
      e.changedTouches[0].pageY,
    ];
    const time = new Date().getTime();
    if (when === 'start') {
      this.swipeCoord = coord;
      this.swipeTime = time;
    } else if (when === 'end') {
      const direction = [
        coord[0] - this.swipeCoord[0],
        coord[1] - this.swipeCoord[1],
      ];
      const duration = time - this.swipeTime;
      if (
        duration < 1000 &&
        Math.abs(direction[0]) > 30 &&
        Math.abs(direction[0]) > Math.abs(direction[1] * 3)
      ) {
        if (direction[0] < 0) {
          this.onNextClick();
        } else {
          this.onPrevClick();
        }
      }
    }
  }
}
