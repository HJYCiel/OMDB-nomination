

$(document).ready(function() {
    // hover and turn the magnify glass icon into a capsule shape.
    $("#inpt_search").on('focus', function () {
        $(this).parent('label').addClass('active');
    });
    // turn back into the magnify glass shape when not hovering.
    $("#inpt_search").on('blur', function () {
        if($(this).val().length == 0)
            $(this).parent('label').removeClass('active');
    });
    });

//show the video background
$("#inpt_search").one("mouseover", function() {
    $("#myVideo").addClass('mousehover');
});

//When typing in the search box, a dropdown with movie titles will be provided to the users to select
$('#inpt_search').on('input',function(){
    $('#filter-records').hide();
    var searchField = $(this).val();
    $.ajax({
        url: "https://www.omdbapi.com/?apikey=a27dd633&s=" +searchField,
        type: "GET",
        success: function(result) {
            var regex = new RegExp(searchField, "i");
            var output = '<div class="row-result">';
              $.each(result.Search, function(key, val){
                if ((val.Title.search(regex) != -1)) {
                    if (val.hasOwnProperty('Title')) {
                        output += '<p id="titleOption">' + val.Title + '</p>'
                    }
                }
                $('#filter-records').show();
              });
              output += '</div>';
              $('#titleOption').css('cursor', 'pointer');
              $('#filter-records').html(output);  
        },
        error: function(error) {
          console.log(error);
        }
      });
});

// Select from the movie title dropdown and call the search_movie() function to search the movies with this title
$(document).on('click','#titleOption', function() {       
        $("#inpt_search").val($(this).text());
        search_movie();
    });


// Main search function; Search with the movie title provided in the input(search) box through OMDB database.
// When user press enter(or select movie title from the input dropdown), this function will be called.
function search_movie(){
    document.getElementById("filter-records").style.display="none";
        var input = document.getElementById("inpt_search").value;
       const container = document.getElementById('c1');
       container.innerHTML = "";
       document.getElementById("search_box").classList.remove('cntr');
       document.getElementById("search_box").classList.add('cntr_after');

        let request = new XMLHttpRequest();
        request.open("GET", "https://www.omdbapi.com/?apikey=a27dd633&s=" + input);
        request.send();
        request.onload = () => {
        console.log(request);
        if (request.status === 200) {
          var data =JSON.parse(request.response);
            data.Search.forEach((item) => {  
                const card = document.createElement('tr');
                card.setAttribute('class', 'card');

                const p1 = document.createElement('td');
                p1.setAttribute('class', 'p1')
                p1.innerText = item.Title+" "+item.Year;
                const div1=document.createElement('div');
                div1.setAttribute('style','display:none;')
                const img1=document.createElement('img');
                img1.setAttribute('src',item.Poster);
                img1.setAttribute('width','300');
                img1.setAttribute('height','450');
                img1.setAttribute('id','poster');

                const p2 = document.createElement('td');
                p2.setAttribute('class', 'p2')
                const button1=document.createElement('button');
                button1.setAttribute('type','button');
                button1.setAttribute('id','btn1');
                button1.innerText = "Nominate";
       
                container.appendChild(card);

                card.appendChild(p1);
                p1.appendChild(div1);
                div1.appendChild(img1);

                card.appendChild(p2);
                p2.appendChild(button1);
        })
        } else {
          console.log(`error ${request.status} ${request.statusText}`);
        }
      };
}

//This event happens when the user clicks on the "Nominate" button or the "Remove" button.
var badgeCount=0;
$(document).on('click','#btn1', function() { 
    $("#movie_con").show();
    $("#myVideo").fadeOut(1000);
    var $name= $(this).closest('table').attr('id');
    var $row = $(this).closest('tr');
    var $poster=$row.find('img');

    //Move the candidate movies to the nomination list
    if ($name=='c1') {
        $("#empty_list").hide();
        $("#nom_list").show();
        

        // add to nomination list only if the length of the list is less than 5.
        if($('#c2 tr').length<5){
            $(this).attr("disabled", true);
            $(this).html('Nominated');
            $poster.clone().appendTo('.posters'); //show the poster of the movie to the background when added to the nomination list
            $('.posters').fadeIn(1000);
            $('#badge').html(++badgeCount).show(); // badge displayed number +1

            $row.addClass("appended");
            $row.clone().appendTo('#c2').fadeIn(500);
            $('#c2 .appended').find('#btn1').attr("disabled", false);
            $('#c2 .appended').find('#btn1').html('Remove');

        }else{  // display the pop up when user tries to add more than 5 movies into nomination list.
                $( "#dialog" ).show();
                $('#dialog').delay(1000).fadeOut();
            }
    }

    // Move the movies from nomination list back to the candidate list
    if ($name=='c2') {

        //Remove the poster of the movie from the background when it was removed from the nomination list
        var $index=$row.index();
        $( ".posters img" ).eq($index).remove(); 
        $("#c1 tr.appended").eq($index).find('#btn1').attr("disabled", false);
        $("#c1 tr.appended").find('#btn1').html('Nominate');
        $("#c1 tr.appended").eq($index).removeClass("appended");

        $row.fadeOut(500, function(){ $row.remove(); });
        $('#badge').html(--badgeCount).show(); // badge displayed number -1
        if(badgeCount==0){
            $('#badge').hide();
            $("#empty_list").fadeIn(500);
            $("#nom_list").hide();
            $("#myVideo").fadeIn(1000);
        }
    }   
});

//hover on "film" icon to show the nomination list
//Click anywhere on the webpage other than the "remove" buttons to hide the nomination list
$(document).ready(function () {
 $("#movie_con").hover(function () {
        $(".nom-table").fadeIn(500);
        $(".nom-table").addClass('active');
        },function () {
            $('html').click(function(e) {                    
                if(!$(e.target).is("#btn1"))
                {
                    $(".nom-table").fadeOut(500);                
                }
            }); 
        }
        );
});

//Click anywhere on the webpage to hide the input search dropdown results.
$(document).on('click',function(){
    $('#filter-records').hide();
    
})

