import Moment from 'moment'

export const calculateDate = (date) => {
  const daysAgo = (Moment(date).diff(Moment(), 'days'));
  if (daysAgo > 365) {
    return Moment(date).format('MMM D, YYYY');
  } else if (daysAgo > 30) {
    return Moment(date).format('MMM D');
  }
  return Moment(date).fromNow();
}

// Capitalize the first letter of a word
const capitalizeFirstLetter = (string: string) =>
  string.charAt(0).toUpperCase() + string.slice(1);

export const capitalize = (string: string) => {
  const words = string.split(' ');
  const capitalizedWords = words.map(word => capitalizeFirstLetter(word))
  return capitalizedWords.join(' ')
}