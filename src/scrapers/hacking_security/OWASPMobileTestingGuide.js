module.exports  = async (axios, cheerio) => {
  const url = 'https://book.hacktricks.xyz/';
  const u = new URL(url)
  return axios(url)
    .then(response => {
      try {
        const html = response.data;
        const $ = cheerio.load(html);
        let items = $($('.gitbook-root')[0].children[0].children[0].children[1].children[0]).find('a')
                
        const random_item = items[Math.floor(Math.random()*(items.length))];
        
        const item_name = $(random_item).text().trim()
        const item_url = u.origin + random_item.attribs.href

        return `
          <a class='name' href='${url}' target='_blank'>OWASP Mobile Testing Guide</a>:<br>
          <a href='${item_url}' target='_blank'>${item_name}</a><br>
          ${random_item.attribs.href.slice(1).split('/').slice(0, -1).join(' > ')}<br>
        `
      } catch {
        return "OWASP Mobile Testing Guide: FAILED"
      }
    })
    .catch(console.error);
}

