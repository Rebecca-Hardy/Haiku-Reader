/* eslint-disable  func-names */
/* eslint-disable  no-console */

const Alexa = require('ask-sdk-core');

const GetNewFactHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'LaunchRequest'
      || (request.type === 'IntentRequest');
  },
  handle(handlerInput) {
    const factArr = data;
    const factIndex = Math.floor(Math.random() * factArr.length);
    const randomFact = factArr[factIndex];
    const speechOutput = GET_FACT_MESSAGE + randomFact;

    return handlerInput.responseBuilder
      .speak(speechOutput)
      .withSimpleCard(SKILL_NAME, randomFact)
      .getResponse();
  },
};

const HelpHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'IntentRequest'
      && request.intent.name === 'AMAZON.HelpIntent';
  },
  handle(handlerInput) {
    return handlerInput.responseBuilder
      .speak(HELP_MESSAGE)
      .reprompt(HELP_REPROMPT)
      .getResponse();
  },
};

const ExitHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'IntentRequest'
      && (request.intent.name === 'AMAZON.CancelIntent'
        || request.intent.name === 'AMAZON.StopIntent');
  },
  handle(handlerInput) {
    return handlerInput.responseBuilder
      .speak(STOP_MESSAGE)
      .getResponse();
  },
};

const SessionEndedRequestHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'SessionEndedRequest';
  },
  handle(handlerInput) {
    console.log(`Session ended with reason: ${handlerInput.requestEnvelope.request.reason}`);

    return handlerInput.responseBuilder.getResponse();
  },
};

const ErrorHandler = {
  canHandle() {
    return true;
  },
  handle(handlerInput, error) {
    console.log(`Error handled: ${error.message}`);

    return handlerInput.responseBuilder
      .speak('Sorry, an error occurred.')
      .reprompt('Sorry, an error occurred.')
      .getResponse();
  },
};

const SKILL_NAME = 'Haiku Reader';
const GET_FACT_MESSAGE = 'Here's a haiku for you: ';
const HELP_MESSAGE = 'You can say tell me a haiku...  or, you can say stop... What can I help you with?';
const HELP_REPROMPT = 'You can ask me to tell a haiku or exit to stop. What can I help you with?';
const STOP_MESSAGE = 'Okey Dokey - Goodbye!';

const data = [
  `Warming summertime.
   Lusciously a wine dances.
   At the old pepper`,

  `Wintry wintertime.
   Where little, jagged cups sing.
   Whilst watching wine`,

  `Rainy afternoon.
   A powdered, sooty dog sits.
   Enjoying the wine`,

  `Shimmering nighttime.
   A boastful pixie natters.
   As ducks are dancing`,

  `Unripened garden.
   A small pixie plots quietly.
   Observing the green`,

  `New warm milk today.
   Quite acidic tastes the milk.
   Where is the sweetness?`,

  `Fancy kitchenette.
   The sous chefs sample the wine.
   Before the head chef`,

  `A new aurora.
   The dwarf guzzles sparkling wine.
   Forgetting the beer`,

  `Night in the alleys.
   A sailor merrily sings.
   Hugging some old port`,

  `New townspeople.
   Amazed at harvest rejoice.
   They pour plenty wine`,

  `Chilly dusk today.
   A hungry bear taps strongly.
   To drink the whiskey`,

  `Glorious workshop.
   Merrily the brewer tastes.
   The sak??, his craft`,

  `Warm the wine cellar.
   Two golden geese are arriving.
   Unleash the sherry`,

  `Glistening lagoon.
   A swan dazzles tonight.
   Sharing the shochu`,

  `New townspeople.
   Amazed at harvest rejoice.
   They pour plenty wine`,

  `Heating summertime.
   A selfish moorhen hoards.
   The brandy is gone`,

  `Garden gatherings.
   Sheeps angrily disgusted.
   The pimms is lacking `,

  `Trendy coffee bar.
   A lady cautiously sips.
   The cocktail shimmers `


];

const skillBuilder = Alexa.SkillBuilders.custom();

exports.handler = skillBuilder
  .addRequestHandlers(
    GetNewFactHandler,
    HelpHandler,
    ExitHandler,
    SessionEndedRequestHandler
  )
  .addErrorHandlers(ErrorHandler)
  .lambda();
