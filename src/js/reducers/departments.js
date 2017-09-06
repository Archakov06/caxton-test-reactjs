const initialState = [];

export default function (state = initialState, action) {

  switch (action.type) {

    case 'SET_DEPARTMENTS':
      return action.payload;

    case 'REMOVE_DEPARTMENT':
      return state = state.filter(({ id }) => action.payload != id);

    case 'RENAME_DEPARTMENT':
      return state = state.map((item) => {
        if (action.payload.id === item.id) {
          item.name = action.payload.name;
        }

        return item;
      });

    default:
      return state;

  }

};
