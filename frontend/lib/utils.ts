import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
// import img12 from "../assets/image12.jpg";
import img24 from "../public/assets/image24.jpg";
import img29 from "../public/assets/image29.jpg";

export { img24, img29 };

// export function getImages() {
//   return [
//     "/assets/image1.jpg",
//     "/assets/image2.jpg",
//     "/assets/image3.jpg",
//     "/assets/image4.jpg",
//     "/assets/image5.jpg",
//     "/assets/image6.jpg",
//     "/assets/image7.jpg",
//     "/assets/image8.jpg",
//     "/assets/image9.jpg",
//     "/assets/image10.jpg",
//     "/assets/image11.jpg",
//     "/assets/image12.jpg",
//     "/assets/image13.jpg",
//     "/assets/image14.jpg",
//     "/assets/image15.jpg",
//     "/assets/image16.jpg",
//     "/assets/image17.jpg",
//     "/assets/image18.jpg",
//     "/assets/image19.jpg",
//     "/assets/image20.jpg",
//     "/assets/image21.jpg",
//     "/assets/image22.jpg",
//     "/assets/image23.jpg",
//     "/assets/image24.jpg",
//     "/assets/image25.jpg",
//     "/assets/image26.jpg",
//     "/assets/image27.jpg",
//     "/assets/image28.jpg",
//     "/assets/image29.jpg",
//     "/assets/image30.jpg",
//   ];
// }

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// const images = [
//   "https://assets.aceternity.com/cloudinary_bkp/3d-card.png",
//   "https://assets.aceternity.com/animated-modal.png",
//   "https://assets.aceternity.com/animated-testimonials.webp",
//   "https://assets.aceternity.com/cloudinary_bkp/Tooltip_luwy44.png",
//   "https://assets.aceternity.com/github-globe.png",
//   "https://assets.aceternity.com/glare-card.png",
//   "https://assets.aceternity.com/layout-grid.png",
//   "https://assets.aceternity.com/flip-text.png",
//   "https://assets.aceternity.com/hero-highlight.png",
//   "https://assets.aceternity.com/carousel.webp",
//   "https://assets.aceternity.com/placeholders-and-vanish-input.png",
//   "https://assets.aceternity.com/shooting-stars-and-stars-background.png",
//   "https://assets.aceternity.com/signup-form.png",
//   "https://assets.aceternity.com/cloudinary_bkp/stars_sxle3d.png",
//   "https://assets.aceternity.com/spotlight-new.webp",
//   "https://assets.aceternity.com/cloudinary_bkp/Spotlight_ar5jpr.png",
//   "https://assets.aceternity.com/cloudinary_bkp/Parallax_Scroll_pzlatw_anfkh7.png",
//   "https://assets.aceternity.com/tabs.png",
//   "https://assets.aceternity.com/cloudinary_bkp/Tracing_Beam_npujte.png",
//   "https://assets.aceternity.com/cloudinary_bkp/typewriter-effect.png",
//   "https://assets.aceternity.com/glowing-effect.webp",
//   "https://assets.aceternity.com/hover-border-gradient.png",
//   "https://assets.aceternity.com/cloudinary_bkp/Infinite_Moving_Cards_evhzur.png",
//   "https://assets.aceternity.com/cloudinary_bkp/Lamp_hlq3ln.png",
//   "https://assets.aceternity.com/macbook-scroll.png",
//   "https://assets.aceternity.com/cloudinary_bkp/Meteors_fye3ys.png",
//   "https://assets.aceternity.com/cloudinary_bkp/Moving_Border_yn78lv.png",
//   "https://assets.aceternity.com/multi-step-loader.png",
//   "https://assets.aceternity.com/vortex.png",
//   "https://assets.aceternity.com/wobble-card.png",
//   "https://assets.aceternity.com/world-map.webp",
// ];

// export function getImages() {
//   return images;
// }
