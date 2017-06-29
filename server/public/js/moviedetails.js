/*calling searchmovie when click search button */

function searchmovie() {

        $.ajax({
            url: '/movie/search' + document.getElementById('searchid').value,
            type: 'GET',

            error: function(data) {

    alert("enter the film to be searched");

               // $('#moviesdetails').html('<p>An error has occurred</p>');
            },
            success: function(json_obj) {
                /*only 10 movies to display while searching*/

                var totalfilms = json_obj.total_results;
                if (totalfilms > 10) {
                    totalfilms = 10;
                }

                var displayHTML = '';
                for (var i = 0; i < totalfilms; i++) {
                    var posterpath = 'http://image.tmdb.org/t/p/w185/' + json_obj.results[i].poster_path;

                    var movieobj = {
                            title: json_obj.results[i].title,
                            poster: posterpath,
                            release_date: json_obj.results[i].release_date
                        }
                        /*displaying searched movies in table format*/
                    var movieobj1 = JSON.stringify(movieobj);
                    displayHTML += '<tr>'
                    displayHTML += '<td>' + json_obj.results[i].title + '<td>';
                    displayHTML += '<td>' + '<img src=' + posterpath + '>' + '<td>';
                    displayHTML += '<td>' + json_obj.results[i].release_date + '<td>';
                    displayHTML += "<td><button onclick='addtofav(event)' value='" + movieobj1 + "'><span class='glyphicon glyphicon-heart'></span>Add to Favourite</button></td>";
                    displayHTML += '<tr>';
                }

                $("#moviesdetails tbody").html(displayHTML);

            }
        });
    }
    /*adding films into the database*/
var favmovarr = [];

function addtofav(event) {

        var favourite = JSON.parse(event.target.value)

        favmovarr.push(favourite);
        var data_to_send = JSON.stringify(favmovarr);
        //ajax call
        $.ajax({
            url: '/movie/add',
            type: 'POST',
            data: {
                
                data_got: event.target.value,
                 username: localStorage.getItem("username")
            },

            error: function() {
                throw error;

            },
            //if the added data to be recieved means alert will be shown
            success: function(data) {
                alert("movie has been added in the favourite list");
            }
        });
    }
    /*all favourite films to be displayed when click addtofav button*/
function displayfav() {
        //ajax call 
        $.ajax({
            url: '/movie/view',
            type: 'GET',
            data :{username : localStorage.getItem("username")},
            success: function(data) {
                var displayHTML = '';
                for (let i = 0; i < data.length; i++) {

                    displayHTML += '<tr>';
                    displayHTML += '<td>' + data[i].title + '</td>';
                    displayHTML += '<td>' + '<img src=' + data[i].poster + '>' + '</td>';
                    displayHTML += '<td>' + data[i].release_date + '</td>';
                    var Obj_to_Del = {
                        title: data[i].title,
                        date: data[i].release_date,
                    };

                    displayHTML += "<td><button onclick='deletefavv(event)' value='" + Obj_to_Del.title + "'>Delete from Favourite</button></td>";
                    displayHTML += '</tr>';
                }
                $("#moviesdetails tbody").html(displayHTML);
            }

        });



    }
    /*the selected movie will be deleted in the favourite list*/

function deletefavv(event) {

    $.ajax({
        url: '/movie/delete',
        type: 'GET',

        data: {
            title: event.target.value,
             username : localStorage.getItem("username")
        },
        success: function(data) {
            alert("movie has been deleted from the favourite list");
        }
    });
    displayfav();
}