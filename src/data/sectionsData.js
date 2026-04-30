import aboutImg from '../assets/about.jpeg';
import successImg from '../assets/success.png';
import moneyImg from '../assets/money.png';
import relationshipsImg from '../assets/relationships.jpeg';
import videosImg from '../assets/videos.png';

const sections = [
  {
    id: 'about',
    title: 'About',
    image: aboutImg,
    description:
      'Discover the mind behind the movement. Theo Rallis brings decades of mastery in human potential, wealth creation, and the pursuit of excellence — guiding thousands to transform ambition into reality.',
    accent: '#c9a84c',
  },
  {
    id: 'success',
    title: 'Success',
    image: successImg,
    description:
      'Unlock the pathways to achievement and prosperity. Discover battle-tested strategies that elevate your mindset and fulfil your highest ambitions in the modern metropolis.',
    accent: '#c9a84c',
  },
  {
    id: 'money',
    title: 'Money · Money · Money',
    image: moneyImg,
    description:
      'Master the flow of wealth and financial abundance. Learn the secrets of accumulation, preservation, and exponential growth in the modern age.',
    accent: '#e8c96a',
  },
  {
    id: 'relationships',
    title: 'Relationships',
    image: relationshipsImg,
    description:
      'Forge meaningful connections and alliances. Navigate the social landscape with grace and build networks that propel your journey to lasting success.',
    accent: '#c9a84c',
  },
  {
    id: 'videos',
    title: 'Free Videos',
    image: videosImg,
    description:
      'Access exclusive visual content and tutorials. Watch and learn from Theo who has mastered the art of thriving in the modern world.',
    accent: '#c9a84c',
    hasPlay: true,
  },
];

export default sections;
