import Store from '../store/walks';

export const initialState = Store;

export default function walkReducer(state = initialState, action) {
  switch (action.type) {
    case 'FAVOURITES_REPLACE': {
      return {
        ...state,
        favourites: action.data || [],
      };
    }
    case 'MEALS_REPLACE': {
      return {
        ...state,
        error: null,
        loading: false,
        meals: action.data,
      };
    }
    case 'WALKS_ERROR': {
      return {
        ...state,
        error: action.data,
      };
    }
    case 'WALKS_REPLACE': {
      let walks = [];

      // Pick out the props I need
      if (action.data && typeof action.data === 'object') {
        walks = action.data.map(item => ({
          id: item.id,
          city: item.city,
          country: item.country,
          fullDescription: item.fullDescription,
          latitude: item.latitude,
          length: item.length,
          longtitude: item.longtitude,
          name: item.name,
          picture: item.picture,
          postCode: item.postCode,
          shortDescription: item.shortDescription,
          startAddress: item.startAddress,
          time: item.time,
          author: item.author,
          steps: item.steps,
          image: item.image,
          mapImage: item.mapImage,
          waypoints: item.waypoints
        }));
      }

      return {
        ...state,
        error: null,
        loading: false,
        walks,
      };
    }
    default:
      return state;
  }
}
