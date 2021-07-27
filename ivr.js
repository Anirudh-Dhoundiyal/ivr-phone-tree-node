
const Router = require('express').Router
const {welcome, menu, aniNum, redirectWelcome} = require('./ivr-tree');
const router = new Router();


//POST: /ivr/welcome
router.post('/welcome', (req, res) => {
   res.send(welcome());
    });

//POST: //ivr/menu
router.post('/menu', (req, res) => {
    console.log(req.body);
    
    if(req.body.Digits){
        const digit = req.body.Digits;
        if(digit > 0 && digit <= 2){
        res.send(menu(digit));}

        else{
                res.send(redirectWelcome());
                
        }
   }
    
        else if(req.body.SpeechResult){
            command = req.body.SpeechResult.toLowerCase();
            switch(command){
                case 'updates.':
                    digit = 1;
                    res.send(menu(digit));
                    break;
                case 'tree.':
                    digit = 2;
                    res.send(menu(digit));
                    break;
                default:
                    res.send(redirectWelcome());
                    break;

            }
        }
});
    

//POST: /ivr/aniNum
router.post('/aniNum', (req, res) => {
    console.log(req.body);
    
    if(req.body.Digits){
        const digit = req.body.Digits;
        if(digit > 0 && digit <= 2){
            res.send(aniNum(digit));
        }

        else{
                res.send(redirectWelcome());
                
        }
        }
    
        else if(req.body.SpeechResult){
            command = req.body.SpeechResult.toLowerCase();
            switch(command){
                case 'call.':
                    digit = 2;
                    res.send(aniNum(digit));
                    break;
                case 'magic phone.':
                    digit = 3;
                    res.send(aniNum(digit));
                    break;
                case 'nice idea.':
                    digit = 4;
                    res.send(aniNum(digit));
                    break;
                default:
                    res.send(redirectWelcome());
                    break;

            }
        }
    
    
    });
module.exports = router;