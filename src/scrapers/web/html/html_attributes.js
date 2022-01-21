module.exports = async (axios, cheerio) => {
  const url = 'https://www.w3schools.com/tags/ref_attributes.asp';
  const root_url = 'https://www.w3schools.com/tags/'

  function fixHTML(str) {
    if (str !== undefined)
      return str.replace(/</g,'&lt;')
    return ''
  }

  return axios(url)
    .then(response => {
      try {
        const html = response.data;
        const $ = cheerio.load(html)
        const tags = $('.w3-responsive tr');


        const random_attribute = tags[Math.floor(Math.random()*tags.length)];

        const td_name = random_attribute.children[1]
        const td_belongsTo = random_attribute.children[3]
        const td_description = random_attribute.children[5]

        // console.log(td_name.children[0].children[0].data)

        // css attribute data
        let htmlAttribute_name = '', htmlAttribute_url = '';
        if (td_name.children[0].attribs === undefined) {
          // does not have link
          htmlAttribute_name = td_name.children[0].data
        } else {
          // has link
          htmlAttribute_name = td_name.children[0].children[0].data
          htmlAttribute_url = root_url + td_name.children[0].attribs.href
        }


        const htmlAttribute_belongsTo = td_belongsTo.children[0].data
        const htmlAttribute_description = td_description.children[0].data

        // print to screen
        // console.log('Linux command:');
        // console.log(htmlAttribute_name);
        // console.log(htmlAttribute_description);
        // console.log(htmlAttribute_url);
        // console.log()

        return `
          <a class='name' href='${url}' target='_blank'>HTML5 Attributes</a>:<br>
          <a href='${htmlAttribute_url}' target='_blank'>${fixHTML(htmlAttribute_name)}</a><br>
          Belongs to: ${fixHTML(htmlAttribute_belongsTo)}<br>
          ${fixHTML(htmlAttribute_description)}<br>
        `
      } catch {
        return "HTML5 Attributes: FAILED"
      }

    })
    .catch(console.error);
}
