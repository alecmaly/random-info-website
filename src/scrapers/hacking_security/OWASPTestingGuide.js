module.exports  = async (axios, cheerio) => {
  const url = 'https://owasp.org/www-project-web-security-testing-guide/stable/';
  const u = new URL(url)
  return axios(url)
    .then(response => {
      try {
        const html = response.data;
        const $ = cheerio.load(html);
        let items = $('.sidebar a[href*="testing-guide"]')
        
        const random_item = items[Math.floor(Math.random()*(items.length))];

        const item_name = $(random_item).text().trim()
        const item_url = u.origin + random_item.attribs.href

        return `
          <a class='name' href='${url}' target='_blank'>OWASP Testing Guide</a>:<br>
          <a href='${item_url}' target='_blank'>${item_name}</a><br>
        `
      } catch {
        return "OWASP Testing Guide: FAILED"
      }
    })
    .catch(console.error);
}

