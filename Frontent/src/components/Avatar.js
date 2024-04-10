import male from "../assets/Male.png";
import female from "../assets/Female.png";
export const Avatar = (sex) => {
  switch (sex) {
    case "Male":
      return male;
    case "Female":
      return female;
    default:
      return male;
  }
};
