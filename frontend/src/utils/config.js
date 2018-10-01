export const api = process.env.REACT_APP_BACKEND || 'http://localhost:3001'
export const headers = { 
  'Accept': 'application/json',
  'Content-Type': 'application/json',
  'Authorization': 'ATokenPlease'
}
export const hasWithCredentials = process.env.REACT_APP_BACKEND ? true : false