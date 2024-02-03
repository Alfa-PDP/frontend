import Users from '../assets/icons/Users.svg';
import Briefcase from '../assets/icons/Briefcase.svg';
import Student from '../assets/icons/Student.svg';
import HourglassMedium from '../assets/icons/HourglassMedium.svg';
import HandCoins from '../assets/icons/HandCoins.svg';
import Wallet from '../assets/icons/Wallet.svg';
import Gauge from '../assets/icons/Gauge.svg';

export const navItemsLeaderData = [
  {
    icon: Users,
    text: 'Моя команда',
    path: '/my-team',
  },
  {
    icon: Briefcase,
    text: 'Подбор',
    path: '/recruitment',
  },
  {
    icon: Student,
    text: 'Обучение',
    path: '/learning',
  },
  {
    icon: HourglassMedium,
    text: 'Адаптация',
    path: '/adaptation',
  },
  {
    icon: HandCoins,
    text: 'Премии и доход',
    path: '/rewards',
  },
  {
    icon: Wallet,
    text: 'Лимиты и ставки',
    path: '/limits',
  },
  {
    icon: Gauge,
    text: 'Дашборды',
    path: '/dashboards',
  },
];

export const navItemsWorkerData = [
  {
    icon: Users,
    text: 'Моё развитие',
    path: `/progress/`,
  },
  {
    icon: Student,
    text: 'Обучение',
    path: '/learning',
  },
];
