const VoiceResponse = require('twilio').twiml.VoiceResponse;

exports.welcome = function welcome() {
  const voiceResponse = new VoiceResponse();

  const gather = voiceResponse.gather({
    input: 'DTMF speech', // changes made here
    timeout:'5',
    hints:'updates, tree',
    action: '/ivr/menu',
    numDigits: '1',
    method: 'POST',
  });

  gather.say(
    'Welcome to Aani\'s I V R Implementation       ' +
    'If you want to hear updates on the project, Please press 1 or say updates' +
    'If want to check out the I V R tree, Please press 2 or say tree',
    {loop: 1, voice: 'alice', language: 'en-GB'}
  );
  console.log('hello');
  return voiceResponse.toString();
  
 
};

exports.menu = function menu(digit) {
  const optionActions = {
    '1': ivrUpdate,
    '2': callAni,
  };

  return (optionActions[digit])
    ? optionActions[digit]()
    : redirectWelcome();
};

exports.aniNum = function aniNum(digit) {
  const optionActions = {
    '2': '+16056958069',
    '3': '+16056958069',
    '4': '+16056958069',
  };

  if (optionActions[digit]) {
    const twiml = new VoiceResponse();
    twiml.dial(optionActions[digit]);
    return twiml.toString();
  }

  return redirectWelcome();
};

/**
 * Returns Twiml
 * @return {String}
 */
function ivrUpdate() {
  const twiml = new VoiceResponse();

  twiml.say({
    voice: 'alice'
    },'Project updates are as following:');

  twiml.say(
    'This is the second iteration for the IVR.' +
    'The voice recognition is now working' +
    'This project is fun',
    {voice: 'alice', language: 'en-GB'}
  );

  twiml.say(
    'Thank you for calling the Phone IVR Service - the ' +
    'support team\'s first choice in learning twilio',
    {voice: 'alice', language: 'en-GB'} 
  );

  twiml.hangup();
  return twiml.toString();
}

/**
 * Returns a TwiML to interact with the client
 * @return {String}
 */
function callAni() {
  const twiml = new VoiceResponse();
  
  const gather = twiml.gather({
    input: 'DTMF speech', // changes made here
    timeout:'5',
    hints:'call, magic phone, nice idea',
    action: '/ivr/aniNum',
    numDigits: '1',
    method: 'POST',
  });

  gather.say(
    'Trees are nice, I like the tall ones!' +
    'All you can do is Call Ani' + 
    'To call Ani, press 2 or Say CALL, To call Ani  ' +
    'press 3 or Say Magic phone. To call Ani, press 4 or say Nice idea. To ' +
    'go back to the main menu, press the star key ',
    {voice: 'alice', language: 'en-GB', loop: 3}
  );

  return twiml.toString();
}

/**
 * Returns an xml with the redirect
 * @return {String}
 */
 exports.redirectWelcome = function redirectWelcome() {
  const twiml = new VoiceResponse();

  twiml.say('I do not understand the response,' + 'Returning to the main menu',{
    voice: 'alice',
    language: 'en-GB',
  });

  twiml.redirect('/ivr/welcome');

  return twiml.toString();
}
