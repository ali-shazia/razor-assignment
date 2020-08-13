import Unsplash, { toJson } from "unsplash-js";
const APP_ACCESS_KEY = "P39cEClCJVbJmldGIbkZnO3kLHZNdVRLRzxLHp3uNUU";
const unsplash = new Unsplash({
  accessKey: APP_ACCESS_KEY,
  timeout: 2000 // values set in ms
});

export { unsplash, toJson };
