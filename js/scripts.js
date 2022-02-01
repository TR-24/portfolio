/*!
 * Start Bootstrap - Freelancer v7.0.5 (https://startbootstrap.com/theme/freelancer)
 * Copyright 2013-2021 Start Bootstrap
 * Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-freelancer/blob/master/LICENSE)
 */
//
// Scripts
//

window.addEventListener('DOMContentLoaded', (event) => {
  // Navbar shrink function
  var navbarShrink = function () {
    const navbarCollapsible = document.body.querySelector('#mainNav');
    if (!navbarCollapsible) {
      return;
    }
    if (window.scrollY === 0) {
      navbarCollapsible.classList.remove('navbar-shrink');
    } else {
      navbarCollapsible.classList.add('navbar-shrink');
    }
  };

  // Shrink the navbar
  navbarShrink();

  // Shrink the navbar when page is scrolled
  document.addEventListener('scroll', navbarShrink);

  // Activate Bootstrap scrollspy on the main nav element
  const mainNav = document.body.querySelector('#mainNav');
  if (mainNav) {
    new bootstrap.ScrollSpy(document.body, {
      target: '#mainNav',
      offset: 72,
    });
  }

  // Collapse responsive navbar when toggler is visible
  const navbarToggler = document.body.querySelector('.navbar-toggler');
  const responsiveNavItems = [].slice.call(document.querySelectorAll('#navbarResponsive .nav-link'));
  responsiveNavItems.map(function (responsiveNavItem) {
    responsiveNavItem.addEventListener('click', () => {
      if (window.getComputedStyle(navbarToggler).display !== 'none') {
        navbarToggler.click();
      }
    });
  });
});

// Seach movie

function searchMovie() {
  $('#movie-list').html('');

  $.ajax({
      url: 'http://omdbapi.com',
      type: 'get',
      dataType: 'json',
      data: {
          'apikey': 'ed712282',
          's': $('#search-input').val()
      },
      success: function (result) {
          if (result.Response == "True") {
              let movies = result.Search;

              $.each(movies, function (i, data) {
                  $('#movie-list').append(`
                      <div class="col-md-4">
                          <div class="card mb-3">
                              <img src="${data.Poster}" class="card-img-top" alt="...">
                              <div class="card-body">
                              <h5 class="card-title">${data.Title}</h5>
                              <h6 class="card-subtitle mb-2 text-muted">${data.Year}</h6>
                              <a href="#" class="card-link see-detail" data-toggle="modal" data-target="#exampleModal" data-id="${data.imdbID}">See Detail</a>
                              </div>
                          </div>
                      </div>
                  `);
              });

              $('#search-input').val('');

          } else {
              $('#movie-list').html(`
                  <div class="col">
                      <h1 class="text-center">` + result.Error + `</h1>
                  </div>
              `)
          }
      }
  });
}

$('#search-button').on('click', function () {
  searchMovie();
});

$('#search-input').on('keyup', function (e) {
  if (e.which === 13) {
      searchMovie();
  }
});


$('#movie-list').on('click', '.see-detail', function () {

  $.ajax({
      url: 'http://omdbapi.com',
      dataType: 'json',
      type: 'get',
      data: {
          'apikey': 'ed712282',
          'i': $(this).data('id')
      },
      success: function (movie) {
          if (movie.Response === "True") {

              $('.modal-body').html(`
                  <div class="container-fluid">
                      <div class="row">
                          <div class="col-md-4">
                              <img src="`+ movie.Poster + `" class="img-fluid">
                          </div>

                          <div class="col-md-8">
                              <ul class="list-group">
                                  <li class="list-group-item"><h3>`+ movie.Title + `</h3></li>
                                  <li class="list-group-item">Released : `+ movie.Released + `</li>
                                  <li class="list-group-item">Genre : `+ movie.Genre + `</li>                 
                                  <li class="list-group-item">Director : `+ movie.Director + `</li>                 
                                  <li class="list-group-item">Director : `+ movie.Actors + `</li>                 
                              </ul>
                          </div>
                      </div>
                  </div>
              `);

          }
      }
  });

});
