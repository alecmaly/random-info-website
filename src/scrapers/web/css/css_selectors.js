module.exports = async (axios, cheerio) => {
  const url = 'https://www.w3schools.com/cssref/css_selectors.asp';
  const root_url = 'https://www.w3schools.com/cssref/'

  return axios(url)
    .then(response => {
      try {
        const html = response.data;
        const $ = cheerio.load(html)
        const properties = $('.w3-responsive tr');

        const random_property = properties[Math.floor(Math.random()*properties.length)];

        const td_name = random_property.children[1]
        const td_example = random_property.children[3]
        const td_description = random_property.children[5]


        // css selector data
        let selector_name = '', selector_url = '';
        if (td_name.children[0].attribs === undefined) {
          // does not have link
          selector_name = td_name.children[0].data
        } else {
          // has link
          selector_name = td_name.children[0].children[0].data
          selector_url = root_url + td_name.children[0].attribs.href
        }

        const selector_example = td_example.children[0].data.trim()
        const selector_description = td_description.children[0].data.trim()

        // console.log(selector_description)
        // print to screen
        // console.log('Linux command:');
        // console.log(selector_name);
        // console.log(selector_description);
        // console.log(selector_url);
        // console.log()

        return `
          <a class='name' href='${url}' target='_blank'>CSS Selectors</a>:<br>
          <a href='${selector_url}' target='_blank'>${selector_name}</a><br>
          ${selector_description.replace(/</g,'&lt;')}<br>
          <span>Example: ${selector_example}</span><br>
        `
      } catch {
        return "CSS Selectors: FAILED"
      }

    })
    .catch(console.error);
}
