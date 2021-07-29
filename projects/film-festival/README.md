# Film Festival

This is a static website that is responsive to tablet and mobile screen sizes.
On smaller screens, the navigation menu is collapsed and all content is shown in one column so that users can easily scroll from top to bottom of the web pages.

## Getting Started

Just open the `index.html` page in any browser to play.

## Technical Details

- This website is using Twitter Bootstrap version 4 components such as the grid layout, nav bar, carousel, cards, Modal, collapse and form.
- It contains custom CSS using a media query for adjusting the layout on different screen sizes.
- It uses the CSS flex `order` property to re-arrange the elements from side-by-side to top-down layout.
- It uses Bootstrap’s color variables to share the same colors everywhere.

## Features

The website is for an outdoor film festival, called “Watch it outside Boston edition”. It is to show the films, news, announcements and take pre-registrations.

### Homepage

- The homepage shows the company’s name and a big photo of the event.
- It has a sliding carousel to show all of the 12 films. Users can click on each of the films to learn more about it.
- It includes the latest news about the festival. Users can click on each of the news cards to go to the news website for reading more about the event.
- The footer of the page contains information about the company, City of Boston and Boston public garden. It also has an input for users to enter their email for notifications.
- The homepage also has an Announcements section to show the date, time and location of the event. Users can click at the link to see the schedule for the specific show time of each film.

### Schedules and Pre-registration

- On the homepage and the the festival schedule page, each shows the datetime and duration of the films. Users can click on the book tickets button to reserve their seats.
- A dedicated booking page allows the users select a film, enter their contact information. They can also enter the number of adults and kids who will go to see the films.



-------------------------------

This website is using Twitter Bootstrap version 4.

I combine multiple components such as the grid layout, nav bar, carousel, cards, Modal, collapse and form.

I also write some custom CSS using a media query for adjusting the layout on different screen sizes.

To make the website responsive, I use the flex order to re-arrange the elements from side-by-side to top-down layout.

And I use Bootstrap’s color variables to make sure the elements share the same colors everywhere.

-------------------------------

That’s all. Thanks for watching my presentation.

Next, I will show you a demo of the live website.


To make the carousel slide:
  *  First, I copy the sample code from Twitter Bootstrap for the carousel.
  *  Then, I insert the card group to show 4 cards in each slide.
  *  In each card, I write custom CSS to show more content on hover, using the CSS pseudo element :hover.
  *  When the user clicks on the card, I show a Modal dialog for the details of the film such as photos and trailers.

Fortunately, Twitter Bootstrap already makes the carousel, the card group and the Modal dialog components responsive. That saves me a lot of work on the home page.

-------------------------------

To make the responsive menu:
  *  First, I copy the navbar component from Twitter Bootstrap.
  *  It already has a hidden button for the hamburger menu. This button is only visible on a smaller screen.
  *  Then, I copy the div's id to the data-target attribute of the button. This makes the div expand or collapse when clicking at the button.

-------------------------------

To make the schedule page:
  *  First I copy the grid layout from Twitter Bootstrap. Each row has only 1 column for the date.
  * Each film is a pair of rows. The first row shows the title, duration, category of the film and the book now button. The second row has more details about the film but it is collapsed.
  *  Then, I copy the second row's id to the data-target attribute of the first row. This makes the second row expand or collapse when clicking at the first row.

To make the schedule page responsive:
  *  I also use the flex order to rearrange the columns.
  *  Then, I make the columns wider on a smaller screen so that the title and the book now button takes the first line in the row.
  *  The duration and category columns are pushed to the second line in the same row.

-------------------------------

To highlight the film on the booking ticket page:
  *  First, I give each film on the booking page an id.
  *  Then, I copy the id to the links and book-now buttons everywhere.
  *  Finally, I use the CSS selector pseudo element :target and change the card's background color to make it stand out.


