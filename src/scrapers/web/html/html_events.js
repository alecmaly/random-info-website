module.exports = async (axios, cheerio) => {
  const url = 'https://www.w3schools.com/tags/ref_eventattributes.asp';
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
      const events = $('.w3-table-all tr');


      const random_event = events[Math.floor(Math.random()*events.length)];


      const td_name = random_event.children[1]
      const td_description = random_event.children[5]

      // console.log(td_name.children[0].children[0].data)

      // css property data
      let htmlEvent_name = '', htmlEvent_url = '';
      if (td_name.children[0].attribs === undefined) {
        // does not have link
        htmlEvent_name = td_name.children[0].data
      } else {
        // has link
        htmlEvent_name = td_name.children[0].children[0].data
        htmlEvent_url = root_url + td_name.children[0].attribs.href
      }

      const htmlEvent_description = td_description.children[0].data

      // print to screen
      // console.log('Linux command:');
      // console.log(htmlEvent_name);
      // console.log(htmlEvent_description);
      // console.log(htmlEvent_url);
      // console.log()

      return `
        <a class='name' href='${url}' target='_blank'>HTML5 Events</a>:<br>
        <a href='${htmlEvent_url}' target='_blank'>${fixHTML(htmlEvent_name)}</a><br>
        ${fixHTML(htmlEvent_description)}<br>
      `

    })
    .catch(console.error);
}
