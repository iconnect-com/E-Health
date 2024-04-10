import { getStoredUser } from "../storage";

function SpecificLoader(props) {
  const user = getStoredUser();
  return props[user?.role?.roleType] || (() => null);
}

export default SpecificLoader;
