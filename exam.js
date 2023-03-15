const cheerio = require('cheerio');
const axios = require('axios');
const express = require('express');
const app = express()
//`${url}${video}/${id}`
let url = 'http://mycinema.asia/';
app.get('/:name/:id', async (req, res, next) => {
     let id = req.params.id;
     let video = req.params.name;
    axios(`${url}${video}/${id}`).then(response => {
        const $ = cheerio.load(response.data);
        const regex = /.*.m3u8"]/;
        const match = $('body').html().match(regex);
        if (match) {
            var video = match[0];
            const regex1 = /"([^"]+)"/;
            const match1 = regex1.exec(video);
            const result = match1 && match1[1];
            const link = 'http://media1.mycinema.asia/media/' + result
            
           res.send({movieLink:link});
        }
       
    });
  
});


app.listen(3000, console.log('m3u8 is Seaching'));
