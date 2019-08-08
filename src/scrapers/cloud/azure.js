module.exports  = async (axios, cheerio) => {
  const url = 'https://azure.microsoft.com/en-us/services';

  return axios(url)
    .then(response => {
      const html = response.data;
      const $ = cheerio.load(html)
      const services = $('#products-list').find('div > a');

      // skipping first row
      const random_service = services[Math.floor(Math.random()*(services.length))];



      const service_name = random_service.children[1].children[1].children[0].data
      const service_url = 'https://azure.microsoft.com/' + random_service.attribs.href
      const service_description = random_service.next.next.children[0].data


      // // print to screen
      // console.log('Kali Tool:');
      // console.log(service_name)
      // console.log(service_url)
      // console.log(service_category)
      console.log(random_service.next.next.children[0].data)

      return `
        Azure Service:<br>
        ${service_name}<br>
        <a href='${service_url}' target='_blank'>${service_url}</a><br>
        ${service_description}<br>
      `
    })
    .catch(console.error);
}

