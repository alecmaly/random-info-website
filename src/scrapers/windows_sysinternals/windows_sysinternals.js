module.exports  = async (axios, cheerio, category) => {
  const url = 'https://docs.microsoft.com/en-us/sysinternals/downloads/';

  const promise_arr = [],
        category_arr = ['file-and-disk-utilities', 'networking-utilities', 'process-utilities', 'security-utilities', 'system-information', 'misc-utilities'];

  function titleCase(str) {
    return str.toLowerCase().split(' ').map(function(word) {
      return word.replace(word[0], word[0].toUpperCase());
    }).join(' ');
  }


  category_arr.forEach(category => {
    promise_arr.push(
      axios(url + category)
        .then(response => {
          const html = response.data;
          const $ = cheerio.load(html)
          const items = $('p > a')

          // skipping first row
          const random_item = items[Math.floor(Math.random()*(items.length))];



          const item_name = random_item.children[0].data
          const item_url = url + random_item.attribs.href
          const item_description = random_item.next.next.data


          // // print to screen
          // console.log('Kali Tool:');
          // console.log(tool_name)
          // console.log(tool_url)
          // console.log(tool_category)
          // console.log(random_item)

          return `
            <a class='name' href='${url}' target='_blank'>${
              titleCase(category.replace(/-/g, ' '))
            }</a>:<br>
            <a href='${item_url}' target='_blank'>${item_name}</a><br>
            ${item_description}<br><br>
          `
        })
        .catch(console.error)
    )
  });
  return Promise.all(promise_arr).then(value => value.join(''))
}

