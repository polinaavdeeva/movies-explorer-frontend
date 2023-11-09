class MoviesApi {
  constructor({ baseUrl }) {
    this._baseUrl = baseUrl;
  }

  _checkResponse(response) {
    if (response.ok) {
      return response.json();
    } else {
      return Promise.reject({status: response.status, res: response});
    }
  }

  getMovies() {
    return fetch(`${this._baseUrl}`, {
      headers: {
        "Content-Type": "application/json",
      },
    }).then(this._checkResponse);
  }
}

export const moviesApi = new MoviesApi({
  baseUrl: "https://api.nomoreparties.co/beatfilm-movies",
});
