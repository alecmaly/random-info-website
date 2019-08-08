module.exports  = (axios, cheerio) => {
  const url = 'https://ss64.com/bash/';

  axios(url)
    .then(response => {
      const html = response.data;
      const $ = cheerio.load(html)
      const commands = $('pre > a');

      const random_command = commands[Math.floor(Math.random()*commands.length)];

      // const topPremierLeagueScorers = [];

      // statsTable.each(function () {
      //   const rank = $(this).find('.rank > strong').text();
      //   const playerName = $(this).find('.playerName > strong').text();
      //   const nationality = $(this).find('.playerCountry').text();
      //   const goals = $(this).find('.mainStat').text();

      //   topPremierLeagueScorers.push({
      //     rank,
      //     name: playerName,
      //     nationality,
      //     goals,
      //   });
      // });


      // command data
      const command_name = random_command.children[0].data.trim()
      const command_url = url + random_command.attribs.href.trim()
      const command_description = random_command.next.data.trim()

      // print to screen
      console.log('Linux command:');
      console.log(command_name);
      console.log(command_description);
      console.log(command_url);
    })
    .catch(console.error);
}
