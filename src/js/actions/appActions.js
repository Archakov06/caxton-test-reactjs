export const setDepartments = (payload) => ({
  type: 'SET_DEPARTMENTS',
  payload: payload,
});

export const removeDepartment = (i) => ({
  type: 'REMOVE_DEPARTMENT',
  payload: i,
});

export const renameDepartment = (i, name) => ({
  type: 'RENAME_DEPARTMENT',
  payload: {
    id: i,
    name: name,
  },
});

export const setEmployees = (payload) => ({
  type: 'SET_EMPLOYEES',
  payload: payload,
});

export const removeEmployee = (i) => ({
  type: 'REMOVE_EMPLOYEE',
  payload: i,
});

export const editEmployee = (obj) => ({
  type: 'EDIT_EMPLOYEE',
  payload: {
    id: obj.id,
    firstName: obj.firstName,
    lastName: obj.lastName,
    departmentId: obj.departmentId,
  },
});
