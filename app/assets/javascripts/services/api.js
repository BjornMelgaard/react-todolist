import "isomorphic-fetch" // very important to import like this for fetch mockery

function getCsrfToken() {
  const el = document.querySelector("meta[name='csrf-token']")
  return el && el.getAttribute("content")
}

function parseJSON(response) {
  return response.json()
}

function checkStatus(response) {
  if (response.ok) return response

  const error = new Error(response.statusText)
  error.response = response
  throw error
}

function api(url, method, body = null) {
  const options = {
    headers: {
      "Content-Type":     "application/json",
      "Accept":           "application/json",
      "X-CSRF-TOKEN":     getCsrfToken(),
      "X-Requested-With": "XMLHttpRequest",
    },
    credentials: "same-origin",
    method:      method,
    body:        (typeof body === "string") ? body : JSON.stringify(body),
  }
  return fetch(window.config.api_host + url, options)
    .then(checkStatus)
    .then(parseJSON)
}

function get(url) {
  return api(url, "GET")
}

function post(url, body) {
  return api(url, "POST", body)
}

function put(url, body) {
  return api(url, "PUT", body)
}

function del(url) {
  return api(url, "DELETE")
}

export function getUploaderApiOptions() {
  return {
    baseUrl:        `${window.config.api_host}/attachments`,
    requestHeaders: {
      "X-CSRF-TOKEN":     getCsrfToken(),
      "X-Requested-With": "XMLHttpRequest",
    },
    withCredentials: true,
  }
}
export default {
  get,
  post,
  put,
  delete: del,
}
