module.exports  = async (axios, cheerio) => {
  const url_root = 'https://azure.microsoft.com'
  const url = url_root + '/en-us/services';

  return axios(url)
    .then(response => {
      const html = response.data;
      const $ = cheerio.load(html)
      const divs = $('#products-list').children('div');

      // build categories
      let categories = []
      Array.from(divs).forEach((div, i) => {
        // push category - based on css class identifier
        if (div.attribs.class === 'row row-size8 column')
          categories.push({
            "name": div.children[1].children[1].children[1].children[0].data,
            "index": i
          })
      })


      let output = '';

      // build categories
      categories.forEach((category, i, arr) => {
        let min_index = category.index + 1,
            max_index,
            rand_row_index,
            random_service,
            row,
            service_name,
            service_url,
            service_description;


        // set max index based on if last element in array
        if (i === arr.length - 1)
          max_index = divs.length
        else
          max_index = arr[i + 1].index

        // choose random row for category
        rand_row_index = min_index + Math.floor(Math.random()*(max_index - min_index))
        row = divs[rand_row_index]

        // console.log(row)
        // pick random service from two columns
        random_service = row.children[1]
        if (row.children[3] !== undefined) {
          if (Math.floor(Math.random()*(2)) === 1)
            random_service = row.children[3]
        }


        // random tool details
        service_name = random_service.children[1].children[1].children[1].children[0].data
        service_url =  url_root + random_service.children[1].attribs.href
        service_description = random_service.children[3].children[0].data


        // console.log()
        // console.log(category)
        // console.log(service_name)
        // console.log(service_url)
        // console.log(service_description)


        output += `
          <div class='cell'>
            ${category.name}<br>
            <a href='${service_url}' target='_blank'>${service_name}</a><br>
            ${service_description}<br><br>
          </div>
        `
      })



      return `
      <div class='name'><a href='${url}' target='_blank'>Azure Services</a>:</div><br>
        <div class='two-columns'>${output}</div>`
    })
    .catch(console.error);
}

