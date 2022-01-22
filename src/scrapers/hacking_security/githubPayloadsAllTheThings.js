module.exports  = async (axios, cheerio) => {
  const url = 'https://github.com/swisskyrepo/PayloadsAllTheThings';
  const u = new URL(url)
  return axios(url)
    .then(response => {
      try {
        const html = response.data;
        const $ = cheerio.load(html);
        let items = $('[aria-label="Directory"]');
                
        const ignored_folders = ['.github', '_template_vuln', 'Methodology and Resources']
        items = Array.from(items).filter(ele => { return !ignored_folders.includes($(ele.parent.parent.children[3].children[1]).text()) })
        const random_item = items[Math.floor(Math.random()*(items.length))];
        
        const item_name = $(random_item.parent.parent.children[3].children[1]).text().trim()
        const item_url = u.origin + random_item.parent.parent.children[3].children[1].children[0].attribs.href

        return `
          <a class='name' href='${url}' target='_blank'>PayloadsAllTheThings (github)</a>:<br>
          <a href='${item_url}' target='_blank'>${item_name}</a><br>
        `
      } catch {
        return "PayloadsAllTheThings (github): FAILED"
      }
    })
    .catch(console.error);
}

