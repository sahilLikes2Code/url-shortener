export function root_path() {
  return '/'
}

export function urls_path() {
  return '/urls'
}

export function hostname() {
  return 'https://sal-kap-url-muncher.herokuapp.com/'
  // return 'http://localhost:3000/'
}

export function url_path(id) {
  return `/urls/${id}`;
}

export function increase_click_count(id) {
  return `/urls/${id}`;
}

