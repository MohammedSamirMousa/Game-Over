export class Ui {
  displayGames(data) {
    let cartona = "";
    for (let i = 0; i < data.length; ++i) {
      cartona += `

      <div class="data col-lg-3 col-md-4" data-id="${data[i].id}">
                    <div class="card bg-2 h-100 filter" id="Card">
                    <div class="card-body">
                                    <figure>
                                        <img src="${
                                          data[i].thumbnail
                                        }" class="w-100" alt="">
                                    </figure>
                                    <figcaption>
                                        <div class="detail text-white d-flex justify-content-between align-items-center">
                                            <h5>${data[i].title}</h5>
                                            <span class="bg p-2 rounded-3">free</span>
                                        </div>
                                        <p class="text-white-50 text-center mt-3">${data[
                                          i
                                        ].short_description.split(" ", 8)}</p>
                                    </figcaption>
                                </div>
                                <div class="card-footer text-white d-flex justify-content-between align-items-center">
                                    <span class="bg m-0 p-1 rounded-3">${
                                      data[i].genre
                                    }</span>
                                    <span class="bg m-0 p-1 rounded-3 w-50 text-center">${
                                      data[i].platform
                                    }</span>
                                </div>
                        
                    </div>
                </div>
            `;
    }
    document.getElementById("SS").innerHTML = cartona;
  }

  displayGamesDetail(data) {
    const boxDetail = `
  <div class="col-4">
                    <figcaption>
                        <h3 class="text-white">Details Game</h3>
                    </figcaption>
                    <figure>
                        <img src="${data.thumbnail}" class="w-100" alt="">
                    </figure>
                </div>
                <div class="col-8 text-white">
                    <p>Title: <span class="bg-info rounded-3 p-1 text-black">${data.title}</span></p>
                    <p>Category: <span class="bg-info rounded-3 p-1 text-black">${data.genre}</span></p>
                    <p>Platform: <span class="bg-info rounded-3 p-1 text-black">${data.platform}</span></p>
                    <p>Status: <span class="bg-info rounded-3 p-1 text-black">${data.status}</span></p>
                    <span>
                    ${data.description}
                    </span>
                    <div class="py-3">
                        <a class="btn btn-outline-warning text-white" target="_blank" href="${data.game_url}">Show Game</a>
                    </div>
                </div>
        
              `;

    document.getElementById("content").innerHTML = boxDetail;
  }
}
