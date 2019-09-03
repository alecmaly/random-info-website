module.exports  = () => {
  const networking_cheatsheets = [
    'https://cheatsheetscdn.azureedge.net/networking/tcpip.pdf'
  ]

  const pentesting_cheatsheets = [
    'https://cheatsheetscdn.azureedge.net/pentesting/Attack-Surfaces-Tools-and-Techniques.pdf',
    'https://cheatsheetscdn.azureedge.net/pentesting/linux-cheat-sheet.pdf',
    'https://cheatsheetscdn.azureedge.net/pentesting/misc-tools-sheet.pdf',
    'https://cheatsheetscdn.azureedge.net/pentesting/windows-cheat-sheet.pdf'
  ]

  const reverseEngineering_cheatsheets = [
      'https://cheatsheetscdn.azureedge.net/reverse%20engineering/analyzing-malicious-document-files.pdf',
    'https://cheatsheetscdn.azureedge.net/reverse%20engineering/EricZimmermanCommandLineToolsCheatSheet-v1.0.pdf',
    'https://cheatsheetscdn.azureedge.net/reverse%20engineering/FOR518-Reference-Sheet.pdf',
    'https://cheatsheetscdn.azureedge.net/reverse%20engineering/hex_file_and_regex_cheat_sheet.pdf',
    'https://cheatsheetscdn.azureedge.net/reverse%20engineering/linux-shell-survival-guide.pdf',
    'https://cheatsheetscdn.azureedge.net/reverse%20engineering/malware-analysis-cheat-sheet.pdf',
    'https://cheatsheetscdn.azureedge.net/reverse%20engineering/rekall-memory-forensics-cheatsheet.pdf',
    'https://cheatsheetscdn.azureedge.net/reverse%20engineering/remnux-malware-analysis-tips.pdf',
    'https://cheatsheetscdn.azureedge.net/reverse%20engineering/reverse-engineering-malicious-code-tips.pdf',
    'https://cheatsheetscdn.azureedge.net/reverse%20engineering/sift_cheat_sheet.pdf',
    'https://cheatsheetscdn.azureedge.net/reverse%20engineering/SQlite-PocketReference-final.pdf',
    'https://cheatsheetscdn.azureedge.net/reverse%20engineering/volatility-memory-forensics-cheat-sheet.pdf',
    'https://cheatsheetscdn.azureedge.net/reverse%20engineering/windows_to_unix_cheatsheet.pdf'
  ]


  function getRandomElement(arr) {
    max = arr.length;
    const rand_index =  Math.floor(Math.random() * max); //The maximum is exclusive
    return arr[rand_index]
  }

  function getCheatsheet(arr) {
    const url = getRandomElement(arr);
    const name = url.slice(url.lastIndexOf('/') + 1);
    return `<a href='${url}'>${name}</a>`;
  }


  let cheatsheet_html = "<div class='name'>Cheatsheets</div>"

  cheatsheet_html += getCheatsheet(networking_cheatsheets) + '<br>';
  cheatsheet_html += getCheatsheet(pentesting_cheatsheets) + '<br>';
  cheatsheet_html += getCheatsheet(reverseEngineering_cheatsheets) + '<br>';

  return cheatsheet_html;
}
