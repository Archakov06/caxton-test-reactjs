const initialState = [];

export default function (state = initialState, action) {

  switch (action.type) {

    case 'SET_EMPLOYEES':
      return action.payload;

    case 'REMOVE_EMPLOYEE':
      return state = state.filter(item => action.payload != item.id);

    case 'EDIT_EMPLOYEE':
      return state = state.map((item) => {

        if (action.payload.id === item.id) {
          item.firstName = action.payload.firstName;
          item.lastName = action.payload.lastName;
          item.departmentId = action.payload.departmentId;
        }

        return item;
      });

    default:
      return state;

  }

};
