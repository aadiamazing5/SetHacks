# SetHacks

Espere is an easy to use web app that leverages the Foursquare Developer API and Google Maps API to allow the user to find shelters, foobanks and clothing donation centres near them. The app is made using Flask and VueJS to attempt to help achieve one of the United Nations Sustainable Development Goals. We chose to target SDG#2 and #3 which are Zero Hunger and Good Health/Wellbeing respectively. 

The project was submitted for the SET.Hacks() Hackathon 2020, and was awarded first place within SDG Category 1 (SDG#1 - #4) Basic Human Needs.

## Inspiration
Upon researching the United Nation's Sustainable Development Goals, we took it upon ourselves to do further research into the situations of the less fortunate. To our surprise, we found that tens of thousands of people are homeless on any given day in Canada. Worldwide, the number of homeless people is a shocking 150 million. Of those people, few are able to gain access to basic human needs such as shelter and food. Although there are institutions that can help, it may often be difficult to locate them navigate to them. Espere makes this step easier and allows the homeless and less fortunate to easily locate beneficial services near them.

## What it does
Our product, Espere, allows users to search for different services that they can take advantage of them. Using filters such as Adress, Type of Service (Shelter, Foodbank, Clothes Donation, etc.) and Type of Transportation (walking, biking, bus, car), our application offers a list of services that are tailored to the user, and are a feasible option in terms of distance.

## How we built it
Our goal was to have an application that could seamlessly link the many APIs we planned to use with an easy to use frontend user interface. In order to achieve this, we firstly used Flask - a python microweb framework - to create an efficient and seamless backend to easily work with the various APIs we used. However, in order to maintain an easy to use frontend user interface, we chose to use Flask to serve a Vue.Js application. Vue Js - an MVVM Javascript framework - is ideal for smaller one page applications, which made it a great fit for Espere. This application connects to two main APIs. Firstly, the Foursquare Developer API was used to find nearby services given the user's location, and display details regarding each service. Secondly, the Google Maps API was used to display the location of the service the user has selected, and to easily show navigation options to reach the desired destination.

## Challenges we ran into
One major challenge we ran into was the fact that our app's combination of Flask and VueJs was very unique, and many of the APIs and services we planned to use did not offer much information regarding integration that would work with Flask and Vue. This resulted in a lot of time being spent in error handling and debugging. Although this roadblock was time-consuming, we were able to overcome this limitation and complete our application.

## Accomplishments that we're proud of
Our team is very proud of what we have accomplished in the last 24 hours. Firstly, we are very proud that our user interface is elegant, visually pleasing, and very easy to use. Secondly, we are incredibly proud that we were able to successfully meet the goals we had set out for our backend. Using multiple frameworks, managing several APIs, and managing work between a team of 4 people was definitely challenging, but after accomplishing this task we have learned a lot and developed our skills as software developers. We look forward to attending another hackathon!

## What we learned
Although we learned many new software skills and frameworks like Flask, Vue, API integration, and many more, I feel the most important takeaway from this hackathon was the importance of team collaboration and communication. I found that when we were able to communicate well, we worked much more efficiently and synergized well. On the other hand, there were times where we struggled, as we weren't effectively communicating. This lesson will carry forward with us in our education, careers, and beyond.

## What's next for Espere
We believe that although our product is well rounded in its current state, we believe that it can be further improved upon with the addition of user accounts. Features such as a favorites list (where users can store the information of frequently used services) and a user preferences tab (where users can define their location, gender and age to automatically tailor searches) is on the horizon for Espere. We hope to continue updating and maintaining this application for a long time after this hackathon.
