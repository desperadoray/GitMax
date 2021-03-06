/**
 * Open new popup window at the center of the screen
 * @param url
 * @param title
 * @param w
 * @param h
 * @returns {Window}
 */
const popCenterWindow = (url, title, w, h) => {
  let wLeft = window.screenLeft ? window.screenLeft : window.screenX;
  let wTop = window.screenTop ? window.screenTop : window.screenY;
  
  let left = wLeft + (window.innerWidth / 2) - (w / 2);
  let top = wTop + (window.innerHeight / 2) - (h / 2);
  return window.open(url, title,
      'toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=yes,' +
      ' resizable=no, copyhistory=no, width=' +
      w + ', height=' + h + ', top=' + top + ', left=' + left);
};

/**
 * Get parameter value from URL
 * @param url
 * @param name
 * @returns {*} - returns parameter value if found, other wise return empty string
 */
const getUrlParam = (url, name) => {
  name = name.replace(/[[]/, "\[").replace(/[]]/, "\]");
  let regexS = "[\?&]" + name + "=([^&#]*)";
  let regex = new RegExp(regexS);
  let results = regex.exec(url);
  if (results == null)
    return "";
  else
    return results[1];
};

//Todo better influence factor calculation method (including repo stars)
/**
 * Calculate influence factor parameter
 * @param user
 * @returns {string}
 */
const calcInfluenceFactor = (user) => {
  let factor = (user.public_gists || 0) * 0.8 + (user.public_repos || 0) * 0.6 +
      (user.followers || 0) * 0.3 + (user.totalStars || 0) * 1.5;
  if (factor >= 10000) return (factor/1000).toFixed(1) + "k";
  return String(factor.toFixed(1));
};

/**
 * Return if user has passed the 24 hour limit for follow friends
 * @param followedFriendsAt
 * @returns {boolean}
 */
const passTimeLimit = (followedFriendsAt) => {
  return !followedFriendsAt || calcMinsLeft(followedFriendsAt)<=0;
};

/**
 * Calculate how many minutes left
 * @param followedFriendsAt
 * @returns {number}
 */
const calcMinsLeft = (followedFriendsAt)=>{
  return (followedFriendsAt + 24 * 60 * 60 * 1000 - new Date().getTime()) / 1000 / 60;
};

export {getUrlParam, popCenterWindow, calcInfluenceFactor, passTimeLimit, calcMinsLeft}