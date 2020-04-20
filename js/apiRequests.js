import HttpRequests from "./http.js";
import Ui from "./ui.js";
class ApiRequest {
  getPosts() {
    const http = new HttpRequests();
    http
      .get("http://localhost:3000/posts")
      .then((response) => {
        const ui = new Ui();
        ui.sortByDate(response);
        return response;
      })
      .catch((error) => {
        console.log(error);
      });
  }
  getTags() {
    const http = new HttpRequests();
    http
      .get("http://localhost:3000/tags")
      .then((response) => {
        return response;
      })
      .catch((error) => {
        console.log(error);
      });
  }
  getComments() {
    const http = new HttpRequests();
    http
      .get("http://localhost:3000/comments")
      .then((response) => {
        console.log(response);
        return response;
      })
      .catch((error) => {
        console.log(error);
      });
  }
  getAuthors() {
    const http = new HttpRequests();
    http
      .get("http://localhost:3000/authors")
      .then((response) => {
        console.log(response);
        return response;
      })
      .catch((error) => {
        console.log(error);
      });
  }
  getUsers() {
    const http = new HttpRequests();
    http
      .get("http://localhost:3000/users")
      .then((response) => {
        console.log(response);
        return response;
      })
      .catch((error) => {
        console.log(error);
      });
  }
  getAuthorLatest(value) {
    const http = new HttpRequests();
    const ui = new Ui();
    http
      .get(`http://localhost:3000/authors/${value}`)
      .then((response) => response);
  }
  getAuthorRest(value) {
    const http = new HttpRequests();
    http
      .get(`http://localhost:3000/authors/${value}`)
      .then(
        (response) =>
          (document.querySelector(
            ".authorSpaceTwo"
          ).innerHTML = `<strong>Author: </strong> ${response.name} ${response.lastName}`)
      );
  }
}

export const apiReq = new ApiRequest();
