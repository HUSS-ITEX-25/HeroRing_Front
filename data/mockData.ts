export const mockDriveHistory = [
  {
    id: '1',
    date: 'Today, 3:45 PM',
    duration: '1h 23m',
    distance: '45 km',
    location: 'Home to Office',
    alerts: 2,
    status: 'warning',
  },
  {
    id: '2',
    date: 'Today, 9:12 AM',
    duration: '32m',
    distance: '12 km',
    location: 'Office to Meeting',
    alerts: 0,
    status: 'normal',
  },
  {
    id: '3',
    date: 'Yesterday, 6:30 PM',
    duration: '45m',
    distance: '23 km',
    location: 'Office to Home',
    alerts: 4,
    status: 'critical',
  },
  {
    id: '4',
    date: 'Yesterday, 8:15 AM',
    duration: '35m',
    distance: '14 km',
    location: 'Home to Office',
    alerts: 1,
    status: 'warning',
  },
  {
    id: '5',
    date: '2 days ago, 7:20 PM',
    duration: '1h 10m',
    distance: '52 km',
    location: 'Office to Restaurant',
    alerts: 0,
    status: 'normal',
  },
];

export const mockChartData = {
  heartRate: [
    { x: 0, y: 72 },
    { x: 1, y: 75 },
    { x: 2, y: 79 },
    { x: 3, y: 82 },
    { x: 4, y: 76 },
    { x: 5, y: 71 },
    { x: 6, y: 74 },
  ],
  hrv: [
    { x: 0, y: 45 },
    { x: 1, y: 42 },
    { x: 2, y: 39 },
    { x: 3, y: 35 },
    { x: 4, y: 38 },
    { x: 5, y: 43 },
    { x: 6, y: 40 },
  ],
  gsr: [
    { x: 0, y: 8.2 },
    { x: 1, y: 9.1 },
    { x: 2, y: 10.3 },
    { x: 3, y: 14.7 },
    { x: 4, y: 12.5 },
    { x: 5, y: 10.8 },
    { x: 6, y: 9.4 },
  ],
};

export const mockStats = [
  {
    title: 'Avg. Heart Rate',
    value: '74',
    unit: 'BPM',
    change: {
      value: 5,
      isPositive: false,
    },
    icon: 'heart',
  },
  {
    title: 'Avg. Drive Duration',
    value: '45',
    unit: 'min',
    change: {
      value: 12,
      isPositive: true,
    },
    icon: 'clock',
  },
  {
    title: 'Alert Frequency',
    value: '1.4',
    unit: '/drive',
    change: {
      value: 8,
      isPositive: false,
    },
    icon: 'zap',
  },
  {
    title: 'Total Drives',
    value: '28',
    unit: '',
    change: {
      value: 15,
      isPositive: true,
    },
    icon: 'car',
  },
];

export const mockArticles = [
  {
    id: '1',
    title: 'How Smart Rings Monitor Your Health',
    excerpt: 'Learn about the advanced sensors in smart rings and how they track your vital signs.',
    imageUrl: 'https://images.pexels.com/photos/4047186/pexels-photo-4047186.jpeg',
    readTime: '3 min read',
    category: 'technology',
  },
  {
    id: '2',
    title: 'Signs of Drowsiness While Driving',
    excerpt: 'Recognize the early signs of fatigue and drowsiness to prevent accidents.',
    imageUrl: 'https://images.pexels.com/photos/7357/startup-photos.jpg',
    readTime: '4 min read',
    category: 'safety',
  },
  {
    id: '3',
    title: 'Heart Rate Variability Explained',
    excerpt: 'Understanding HRV and why it is an important indicator of your health.',
    imageUrl: 'https://images.pexels.com/photos/9464471/pexels-photo-9464471.jpeg',
    readTime: '5 min read',
    category: 'health',
  },
  {
    id: '4',
    title: 'Preventing Driver Fatigue',
    excerpt: 'Practical tips to stay alert and avoid fatigue during long drives.',
    imageUrl: 'https://images.pexels.com/photos/1231643/pexels-photo-1231643.jpeg',
    readTime: '4 min read',
    category: 'safety',
  },
  {
    id: '5',
    title: 'The Future of Wearable Technology',
    excerpt: 'How wearables are evolving to save lives and improve health outcomes.',
    imageUrl: 'https://images.pexels.com/photos/4482911/pexels-photo-4482911.jpeg',
    readTime: '6 min read',
    category: 'technology',
  },
];

export const mockCategories = [
  {
    id: 'technology',
    name: 'Technology',
  },
  {
    id: 'health',
    name: 'Health',
  },
  {
    id: 'safety',
    name: 'Safety',
  },
];