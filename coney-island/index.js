/**
    Copyright 2014-2015 Amazon.com, Inc. or its affiliates. All Rights Reserved.

    Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at

        http://aws.amazon.com/apache2.0/

    or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
*/

/**
 * This simple sample has no external dependencies or session management, and shows the most basic
 * example of how to create a Lambda function for handling Alexa Skill requests.
 *
 * Examples:
 * One-shot model:
 *  User: "Alexa, ask Space Geek for a space fact"
 *  Alexa: "Here's your space fact: ..."
 */

/**
 * App ID for the skill
 */
var APP_ID = undefined; //replace with "amzn1.echo-sdk-ams.app.[your-unique-value-here]";

/**
 * Array containing facts.
 */
var CI_FACTS = [
    "Stunt man Suicide Simon debuted at Coney in 1947. The stunt man performed numerous times at the park in the 50`s and 60`s blasting himself out of a cannon twice daily.",
    "Arthur Rozzi first put on an Independence day fireworks display at Coney Island in 1934",
    "The Manhattan Hotel, Coney’s first luxury hotel, opened in 1877.",
    "World's first roller coaster debuts June 16th, 1884. It was known as a switchback railway.",
    "The Cyclone roller coaster opened in June 26, 1927.",
    " Coney Island, at it's peak, was covered in 250,000 electric lights.", 
    "At its height, Coney Island contained three competing major amusement parks, Luna Park, Dreamland, and Steeplechase Park, as well as many independent amusements.",
    "In the 1900s, it cost 25 cents to view premature babies in glass incubators. Of the 8,000 premature babies that were brought to Couney, approximately 6,500 survived.",
    "In the summer of 1919, Archie and Elton Kohr blended egg yolks into their ice cream mixture and accidentally created the world’s first silky-smooth frozen custard.",
    "The 1979 movie, The Warriors, the gang at the center of the movie, The Warriors, are from Coney Island.",
    "The first bike path in the country, designed by Frederick Law Olmsted and Calvert Vaux, was built in 1894 to connect Coney Island to Brooklyn's Prospect Park.",
    "Coney Island was the center of new technological events, with electric lights, rollercoasters, and baby incubators among the innovations at Coney island in the 1900s.",
    "The original Luna Park on Coney Island, was opened in 1903 by the showmen and entrepreneurs Frederic Thompson and Elmer Skip Dundy",
    "The Luna Park in Coney Island was destroyed by a pair of fires in 1944. A third fire in 1946 closed the park for good.",
    "The Coney Island boardwalk opened in 1923",
    "Coney Island is discovered by Dutch explorer Henry Hudson in 1609",
    "Between about 1880 and World War II, Coney Island was the largest amusement area in the United States, attracting several million visitors per year.",
    "In 1903, Sea-Lion Park became the first Coney Island amusement park.",
    "Dreamland amusment park had  the Dreamland tower, the lagoon, and the Lilliputian Village that was staffed by three hundred dwarfs, burned down in 1911.",
    "Built in 1920 by the Eccentric Ferris Wheel Company, Coney Island's Wonder Wheel has a total capacity of 144 passengers.",
    "Nathan Handwerker, of Nathan's hotdogs, charged customers just five cents in 1916 for his famous hot dogs.", 
    "The Subway connected Coney Island with Manhattan and Brooklyn in 1920."
];

/**
 * The AlexaSkill prototype and helper functions
 */
var AlexaSkill = require('./AlexaSkill');

/**
 * SpaceGeek is a child of AlexaSkill.
 * To read more about inheritance in JavaScript, see the link below.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Introduction_to_Object-Oriented_JavaScript#Inheritance
 */
var SpaceGeek = function () {
    AlexaSkill.call(this, APP_ID);
};

// Extend AlexaSkill
SpaceGeek.prototype = Object.create(AlexaSkill.prototype);
SpaceGeek.prototype.constructor = SpaceGeek;

SpaceGeek.prototype.eventHandlers.onSessionStarted = function (sessionStartedRequest, session) {
    console.log("SpaceGeek onSessionStarted requestId: " + sessionStartedRequest.requestId
        + ", sessionId: " + session.sessionId);
    // any initialization logic goes here
};

SpaceGeek.prototype.eventHandlers.onLaunch = function (launchRequest, session, response) {
    console.log("SpaceGeek onLaunch requestId: " + launchRequest.requestId + ", sessionId: " + session.sessionId);
    handleNewFactRequest(response);
};

/**
 * Overridden to show that a subclass can override this function to teardown session state.
 */
SpaceGeek.prototype.eventHandlers.onSessionEnded = function (sessionEndedRequest, session) {
    console.log("SpaceGeek onSessionEnded requestId: " + sessionEndedRequest.requestId
        + ", sessionId: " + session.sessionId);
    // any cleanup logic goes here
};

SpaceGeek.prototype.intentHandlers = {
    "GetNewFactIntent": function (intent, session, response) {
        handleNewFactRequest(response);
    },

    "AMAZON.HelpIntent": function (intent, session, response) {
        response.ask("You can ask me tell me a fact, or, you can say exit... What can I help you with?", "What can I help you with?");
    },

    "AMAZON.StopIntent": function (intent, session, response) {
        var speechOutput = "Goodbye";
        response.tell(speechOutput);
    },

    "AMAZON.CancelIntent": function (intent, session, response) {
        var speechOutput = "Goodbye";
        response.tell(speechOutput);
    }
};

/**
 * Gets a random new fact from the list and returns to the user.
 */
function handleNewFactRequest(response) {
    // Get a random space fact from the space facts list
    var factIndex = Math.floor(Math.random() * CI_FACTS.length);
    var fact = CI_FACTS[factIndex];

    // Create speech output
    var speechOutput = "Here's your Coney Island fact: " + fact;

    response.tellWithCard(speechOutput, "ConeyIslandBaby", speechOutput);
}

// Create the handler that responds to the Alexa Request.
exports.handler = function (event, context) {
    // Create an instance of the SpaceGeek skill.
    var spaceGeek = new SpaceGeek();
    spaceGeek.execute(event, context);
};

