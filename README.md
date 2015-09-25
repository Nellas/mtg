An app I built to manage a collection of Magic the Gathering cards.  Users are able to search for any existing card and add it to a collection or to a deck.

The search page uses the cardbrew api to search for the closest matches to the users input.  It then uses Firebase to store those cards to the respective areas the user chooses.  In the background the Angular Service is using $q to edit the card object before it is sent to a colletion or deck.

The collection page uses Angular tools to show and filter all cards currently added to the collection.  Cards are an object that includes a key value of "amount" to store how many of a given card a user has.  The page also uses Data Driven Documents (D3) to track and display the number of cards for each color in a dynamically changing bar graph.
The filter options are also associated with color and are bound to the symbols at the top of the page.  These can be clicked to view only cards of that color.  A user is able to remove 1 or more of any card from this page, as well as add it to his/her deck.

The deck page shows all cards added to the firebase deck array in a list format.  The card image changes as the user hovers over different list items.  Each card includes an amount and a warning indicator if a card that is restricted to 4 per deck has more than 4 added.  This page also uses D3 to display the balance of card types in the deck is a donut graph.  A user is able to click a button to draw a sample hand.  In the background this function is creating an array that takes into account all cards (meaning the amount key is turned into the actual amount of cards) and then shuffles the deck thoroughly.  Once every item in the array has been shuffled the function will display the first seven items in the array using Angular.

 Tools used in project:
    * AngularJS:
        ng-route
        ng-animate
        custom directives
        $q promises
        custom services
        custom controllers
    * JQuery
    * Data Driven Documents (D3)
    * HTML5
        custom views for ng-route
        custom templates for angular directives
    * CSS3
        Animations
        Media Queries
    * AJAX
    * JSON
    * Firebase
    * Angular Fire

