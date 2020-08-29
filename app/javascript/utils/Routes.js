export function root_path() {
  return '/'
}

export function urls_path() {
  return '/urls'
}

export function hostname() {
  // return 'https://warm-hollows-22949.herokuapp.com/'
  return 'http://localhost:3000/'
}

export function url_path(id) {
  return `/urls/${id}`;
}

