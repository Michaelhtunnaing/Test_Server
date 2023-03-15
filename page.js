const axios = require('axios');
const cheerio = require('cheerio');
const express = require('express');
const app = express();

const BaseURL = 'http://mycinema.asia/film?page=';
app.get('/',(req,res,next)=>{
    async function getMovies(){
        try{
            const movieItems = [];
            for(let i = 1;i <= 3; i++){
                 const response = await axios.get(`${BaseURL}${i}`);
                 const $ = cheerio.load(response.data);
                 $('.w3-tooltip').each((index,element)=>{
                    const title = $(element).text().trim();
                    const allTitle = title.replace(/\t|\n/g,"");
                    const img = $(element).find('img').attr('src');
                    const movieId = $(element).find('a').attr('href');
                    movieItems.push({
                        allTitle,img,movieId
                    });
                 });

            }
            res.send({msg:'Success',
        data:movieItems});
        }catch(error){
            console.log('error');
        }
    }getMovies();
})
app.listen(3000,console.log('Server is running'));