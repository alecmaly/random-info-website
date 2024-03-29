module.exports  = async (axios, cheerio) => {
  const url = 'https://cheatsheetseries.owasp.org/Glossary.html';
  const u = new URL(url)
  return axios(url)
    .then(response => {
      try {
        const html = response.data;
        const $ = cheerio.load(html);
        const items = $('[href*="cheatsheets/"]');
                
        const random_item = items[Math.floor(Math.random()*(items.length))];

        const item_name = random_item.children[0].data.trim()
        const item_url = `${u.origin}/${random_item.attribs.href}`

        // // print to screen
        // console.log('Kali Tool:');
        // console.log(tool_name)
        // console.log(tool_url)
        // console.log(random_item)

        return `
          <a class='name' href='${url}' target='_blank'>OWASP Cheat Sheets</a>:<br>
          <a href='${item_url}' target='_blank'>${item_name}</a><br>
        `
      } catch {
        return "OWASP Cheat Sheets: FAILED"
      }
    })
    .catch(console.error);
}

