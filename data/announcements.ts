import { AnnouncementData } from '@/types/models';

const announcements: AnnouncementData[] = [
  {
    title: 'New Services Available',
    description: 'We are excited to announce the addition of new services to our lineup, including hair coloring, intricate styling, and personalized grooming packages. Our expert team is ready to provide you with the latest trends and styles to keep you looking your best!',
    image: require('@/assets/ads/services.jpg'),
  },
  {
    title: 'Self Care Tips',
    description: 'Maintaining your hairstyle and overall well-being is essential. Check out our latest blog for comprehensive self-care tips that will help you keep your hair healthy, shiny, and stylish. From daily routines to advanced techniques, we’ve got you covered!',
    image: require('@/assets/ads/self-care.jpg'),
  },
  {
    title: 'How to Fade 101',
    description: 'Mastering the fade haircut is easier than you think. Our new guide, "How to Fade 101," walks you through the basics of achieving a perfect fade, whether you’re a beginner or looking to refine your skills. Dive into step-by-step instructions and expert tips!',
    image: require('@/assets/ads/portfolio.jpg'),
  },
];

export default announcements;
