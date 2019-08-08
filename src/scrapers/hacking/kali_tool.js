module.exports  = async (axios, cheerio) => {
  const url = 'https://tools.kali.org/tools-listing';

  return axios(url)
    .then(response => {
      const html = response.data;
      const $ = cheerio.load(html)
      const tools = $('li > a');

      // skipping first row
      const random_tool = tools[Math.floor(Math.random()*(tools.length))];



      const tool_name = random_tool.children[0].data
      const tool_url = random_tool.attribs.href
      const tool_category = random_tool.parent.parent.parent.children[1].children[0].data


      // // print to screen
      // console.log('Kali Tool:');
      // console.log(tool_name)
      // console.log(tool_url)
      // console.log(tool_category)
      // console.log()

      return `
        Kali Tool:<br>
        ${tool_name}<br>
        <a href='${tool_url}' target='_blank'>${tool_url}</a><br>
        ${tool_category}<br>
      `
    })
    .catch(console.error);
}

