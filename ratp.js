const request = require("request");

request.get("http://www.ratp.fr/horaires/fr/ratp/metro/prochains_passages/PP/porte+de+clichy/13/R", (err, res, body) => {
  console.log(body.split("Châtillon-Montrouge").filter((el, i) => i > 1 && i < 5)
	      .map(time => time.split(/<td>(.+?)<\/td>/)[1])) 
})

