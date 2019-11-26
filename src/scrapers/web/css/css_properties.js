module.exports = async (axios, cheerio) => {
  const url = 'https://www.w3schools.com/cssref/default.asp';
  const root_url = 'https://www.w3schools.com/cssref/'

  return axios(url)
    .then(response => {
      const html = response.data;
      const $ = cheerio.load(html)
      const properties = $('#cssproperties tr');


      const random_property = properties[Math.floor(Math.random()*properties.length)];

      const td_name = random_property.children[1]
      const td_description = random_property.children[3]


      // console.log(td_name.children[0].children[0].data)

      // css property data
      let property_name = '', property_url = '';
      if (td_name.children[0].attribs === undefined) {
        // does not have link
        property_name = td_name.children[0].data
      } else {
        // has link
        property_name = td_name.children[0].children[0].data
        property_url = root_url + td_name.children[0].attribs.href
      }

      const property_description = td_description.children[0].data.trim()

      // print to screen
      // console.log('Linux command:');
      // console.log(property_name);
      // console.log(property_description);
      // console.log(property_url);
      // console.log()

      return `
        <a class='name' href='${url}' target='_blank'>CSS Property</a>:<br>
        <a href='${property_url}' target='_blank'>${property_name}</a><br>
        ${property_description.replace(/</g,'&lt;')}<br>
      `

    })
    .catch(console.error);
}
