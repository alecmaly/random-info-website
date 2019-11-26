module.exports = async (axios, cheerio) => {
  const url = 'https://www.w3schools.com/tags/default.asp';
  const root_url = 'https://www.w3schools.com/tags/'

  function fixHTML(str) {
    if (str !== undefined)
      return str.replace(/</g,'&lt;')
    return ''
  }

  return axios(url)
    .then(response => {
      const html = response.data;
      const $ = cheerio.load(html)
      const tags = $('#htmltags tr');


      const random_tag = tags[Math.floor(Math.random()*tags.length)];

      const td_name = random_tag.children[1]
      const td_description = random_tag.children[3]


      // console.log(td_name.children[0].children[0].data)

      // css property data
      const htmlTag_name = td_name.children[0].children[0].data
      const htmlTag_url = root_url + td_name.children[0].attribs.href
      const htmlTag_description = td_description.children[0].data

      // print to screen
      // console.log('Linux command:');
      // console.log(htmlTag_name);
      // console.log(htmlTag_description);
      // console.log(htmlTag_url);
      // console.log()

      return `
        <a class='name' href='${url}' target='_blank'>HTML5 Tags</a>:<br>
        <a href='${htmlTag_url}' target='_blank'>${fixHTML(htmlTag_name)}</a><br>
        ${fixHTML(htmlTag_description)}<br>
      `

    })
    .catch(console.error);
}
