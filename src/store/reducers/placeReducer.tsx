import { Reducer } from 'redux';
import { Place, PlaceEvent } from '../../types/place';
import { StoreActionType } from '.';

type PlaceEventWithPlace = {
  event: PlaceEvent;
  place?: Place;
};

type State = {
  placeEvent?: PlaceEventWithPlace;
};

const initialState: State = {
  placeEvent: {
    event: {
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
    place: {
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
    },
  },
};

export const SET_PLACE_EVENT = 'SET_PLACE_EVENT';

const actionTypes = [SET_PLACE_EVENT] as const;
type ActionType = typeof actionTypes[number];

export const placeReducer: Reducer<State, StoreActionType<ActionType>> = (
  state = initialState,
  action: StoreActionType<ActionType>
) => {
  const { data, type } = action;
  switch (type) {
    case 'SET_PLACE_EVENT':
      return { ...state, placeEvent: data as PlaceEventWithPlace | undefined };
    default:
      return state;
  }
};

export const setPlaceEvent = (data?: PlaceEventWithPlace) => {
  return {
    type: SET_PLACE_EVENT,
    data,
  };
};
