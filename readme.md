## Introduction

The purpose of this app is for users to navigate movies on OMDB and nominate them.

Demo link: https://movie-nomination-omdb.herokuapp.com/test_page.html

## Special effects

- When hovering on the search icon(magnify glass), video background will fade in.
- When a movie is nominated, the video background will fade out and the poster of the nominated movie will show as the background of the webpage.
- When a movie is removed from the nomination list, the poster will be removed as well.
- When user tries to add more than 5 movies to the nomination list, user will be notified the limit of the nomination list is reached.
- When the nomination list is empty or all the nominated movies are removed from the nomination list, the video background will show up again.
When the user checks the nomination list when it's empty, there will be a message indicate this.

## Manual

**To nominate a movie**: click on the "Nominate" button next to the movie title, the movie will be added to the nomination list. In the meanwhile, the "Nominate" button will be disabled in the candidate list and the button text will be changed to "Nominated".

**To check the nomination list**: hover on the clapper icon, the nomination list will show on its right. Click anywhere on the webpage, except for the "Remove" or "Nominate" button, the nomination list will hide.

**To remove a movie from the nomination list**: Click on the "Remove" button on the nomination list, the selected movie will fade out from the nomination list. In the meanwhile, the "Nominate" button for this movie will be activated.
