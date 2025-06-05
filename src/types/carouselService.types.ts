type ImageType = {
  id: string;
  url: string;
};

type CarouselColorType = {
  id: string;
  background_color: string;
  percentage_color: string;
  button_background_color: string;
};

export type CarouselType = {
  id: string;
  text: string;
  sub_text: string;
  url: string;
  carousel_color: CarouselColorType;
  image: ImageType;
};

export type CarouselDiscountType = {
  id: string;
  url: string;
  image: ImageType;
};
