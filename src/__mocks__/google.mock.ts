import { Place, PlaceEvent } from '../types/place';

export const events: PlaceEvent[] = [
  {
    name: 'Example 1',
    startTime: new Date(),
    endTime: new Date(),
    galery: [
      'https://interactive-examples.mdn.mozilla.net/media/examples/plumeria.jpg',
      'https://interactive-examples.mdn.mozilla.net/media/examples/plumeria.jpg',
      'https://interactive-examples.mdn.mozilla.net/media/examples/plumeria.jpg',
      'https://interactive-examples.mdn.mozilla.net/media/examples/plumeria.jpg',
      'https://interactive-examples.mdn.mozilla.net/media/examples/plumeria.jpg',
    ],
    image:
      'https://interactive-examples.mdn.mozilla.net/media/examples/plumeria.jpg',
    description: 'Example description',
  },
  {
    name: 'Example 2',
    startTime: new Date(),
    endTime: new Date(),
    galery: [
      'https://interactive-examples.mdn.mozilla.net/media/examples/plumeria.jpg',
      'https://interactive-examples.mdn.mozilla.net/media/examples/plumeria.jpg',
      'https://interactive-examples.mdn.mozilla.net/media/examples/plumeria.jpg',
      'https://interactive-examples.mdn.mozilla.net/media/examples/plumeria.jpg',
      'https://interactive-examples.mdn.mozilla.net/media/examples/plumeria.jpg',
    ],
    image:
      'https://interactive-examples.mdn.mozilla.net/media/examples/plumeria.jpg',
    description: 'Example description',
  },
  {
    name: 'Example 3',
    startTime: new Date(),
    endTime: new Date(),
    galery: [
      'https://interactive-examples.mdn.mozilla.net/media/examples/plumeria.jpg',
      'https://interactive-examples.mdn.mozilla.net/media/examples/plumeria.jpg',
      'https://interactive-examples.mdn.mozilla.net/media/examples/plumeria.jpg',
      'https://interactive-examples.mdn.mozilla.net/media/examples/plumeria.jpg',
      'https://interactive-examples.mdn.mozilla.net/media/examples/plumeria.jpg',
    ],
    image:
      'https://interactive-examples.mdn.mozilla.net/media/examples/plumeria.jpg',
    description: 'Example description',
  },
  {
    name: 'Example 4',
    startTime: new Date(),
    endTime: new Date(),
    galery: [
      'https://interactive-examples.mdn.mozilla.net/media/examples/plumeria.jpg',
      'https://interactive-examples.mdn.mozilla.net/media/examples/plumeria.jpg',
      'https://interactive-examples.mdn.mozilla.net/media/examples/plumeria.jpg',
      'https://interactive-examples.mdn.mozilla.net/media/examples/plumeria.jpg',
      'https://interactive-examples.mdn.mozilla.net/media/examples/plumeria.jpg',
    ],
    image:
      'https://interactive-examples.mdn.mozilla.net/media/examples/plumeria.jpg',
    description: 'Example description',
  },
];

export const pins: Place[] = [
  {
    name: 'Exmaple',
    coordinate: {
      lat: 59.9638699,
      lng: 30.2873573,
    },
    workTime: {
      mon: [
        { hours: 9, minutes: 0 },
        { hours: 18, minutes: 0 },
      ],
      tue: [
        { hours: 9, minutes: 0 },
        { hours: 18, minutes: 0 },
      ],
      fri: [
        { hours: 9, minutes: 0 },
        { hours: 18, minutes: 0 },
      ],
      wed: [
        { hours: 9, minutes: 0 },
        { hours: 18, minutes: 0 },
      ],
      sat: [
        { hours: 9, minutes: 0 },
        { hours: 18, minutes: 0 },
      ],
      sun: [
        { hours: 9, minutes: 0 },
        { hours: 18, minutes: 0 },
      ],
      thu: [
        { hours: 9, minutes: 0 },
        { hours: 18, minutes: 0 },
      ],
    },
    address: 'Example address',
    description: 'Example description',
    image:
      'https://interactive-examples.mdn.mozilla.net/media/examples/plumeria.jpg',
    galery: [
      'https://interactive-examples.mdn.mozilla.net/media/examples/plumeria.jpg',
      'https://interactive-examples.mdn.mozilla.net/media/examples/plumeria.jpg',
      'https://interactive-examples.mdn.mozilla.net/media/examples/plumeria.jpg',
      'https://interactive-examples.mdn.mozilla.net/media/examples/plumeria.jpg',
      'https://interactive-examples.mdn.mozilla.net/media/examples/plumeria.jpg',
    ],
    events,
  },
];
