export const validName = new RegExp('^[a-zA-Z ]+$');
export const validuserName = new RegExp('^(?=.*?[A-Za-z])(?=.*?[0-9]).{8,12}$');
export const validEmail = new RegExp('^[a-zA-Z0-9]+@(?:[a-zA-Z0-9]+.)+[A-Za-z]+$');
export const validPhone = new RegExp('^([0-9]{10})+$');