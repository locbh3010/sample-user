export const titleCase = (str) => {
  let splitStr = str.toLowerCase().split(" ");

  for (var i = 0; i < splitStr.length; i++)
    splitStr[i] =
      splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);

  return splitStr.join(" ");
};
export const nameRegExp = /^[a-zA-Z ]{2,30}$/;
export const passwordRegExp = /^[a-z0-9A-Z][!@#$%^&*]/;
export const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
