$(".search-button").on("click", function () {
  $.ajax({
    url: "https://www.omdbapi.com/?apikey=dca61bcc&s=" + $(".input-keyword").val(),
    success: (result) => {
      const movies = result.Search;
      let cards = "";
      movies.forEach((element) => {
        cards += tambahCard(element);
      });
      $(".movie-container").html(cards);

      // ketika tombol detail diklik
      $(".modal-detail-button").on("click", function () {
        $.ajax({
          url: "https://www.omdbapi.com/?apikey=dca61bcc&i=" + $(this).data("imdbid"),
          success: (element) => {
            const movieDetail = tampilMovieDetail(element);
            $(".modal-body").html(movieDetail);
          },
        });
      });
    },
    error: (e) => {
      console.log(e.responseText);
    },
  });
});

function tambahCard(element) {
  return `<div class="col-md-4 my-3">
                <div class="card" >
                  <img src="${element.Poster}" class="card-img-top"/>
                  <div class="card-body">
                    <h5 class="card-title">${element.Title}</h5>
                    <h6 class="card-subtitle mb-2 text-body-secondary">${element.Year}</h6>
                    <a href="#" class="btn btn-primary modal-detail-button" data-bs-toggle="modal" data-bs-target="#detailFilmModal" data-imdbid="${element.imdbID}">Detail</a>
                  </div>
                </div>
</div>`;
}

function tampilMovieDetail(element) {
  return `<div class="container-fluid">
                <div class="row">
                  <div class="col-md-3">
                    <img src="${element.Poster}" alt="" class="img-fluid" />
                  </div>
                  <div class="col-md">
                    <ul class="list-group">
                      <li class="list-group-item"><h4>${element.Title} (${element.Year})</h4></li>
                      <li class="list-group-item">Director: ${element.Director}</li>
                      <li class="list-group-item">Actors: ${element.actors}</li>
                      <li class="list-group-item">Plot : <br />${element.Plot}</li>
                    </ul>
                  </div>
            </div>
</div>`;
}
