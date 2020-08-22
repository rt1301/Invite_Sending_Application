var mongoose = require('mongoose');
var Event    = require('./models/event.js');
var date = new Date;
var data = [
    {
        title:"Demo Invite",
        to: "Everyone",
        body: "Hello this is a demo invite, this is how your invites will look. To accept the invite click on accept or to reject the invite click on reject",
        from: "Rishabh Taparia",
        time: date.toLocaleString(),
        accept: false,
    },
];
function seedDB()
{
     // Add the demo invite
     data.forEach(function(seed){
        Event.create(seed,function(err,event){
            if(err)
            {
                console.log(err);
            }
        });
    });
}

module.exports = seedDB;