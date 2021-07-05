const fetch = require('node-fetch');
(async () => {
  try {
    const response = await fetch('http://8-aris-bs:8888/api/getallbp', {
      method: "GET",
      headers: {
        "Accept": "application/json",
        "Content-Encoding": "gzip, identity, deflate, gzip",
        "Accept-Encoding": "gzip"
      }
    })
    const allbp = await response.json()
    let t = 0;
    let checked = true;
    // var biasDateFormat = new java.text.SimpleDateFormat("yyyy-MM-dd");
    let numbersOnly = new RegExp('^[0-9]+$.');
    let idChecker = new RegExp("^[0-9]{7}");
    let allbpidarray = allbp.map(function (id) { return id.id });
    let numbpChecker = new RegExp("^(\\d+[.])+$");
    let currAnalitic = null;
    for (i = 0; i < allbp.length; i++) {
      currAnalitic = analiticsArray.filter(function (an) { return String(an.an) == String(allbp[i].bpanalitic) })[0]
      if (biasDateFormat.parse(allbp[i].dateBegin).getTime() < biasDateFormat.parse("2013-01-31").getTime()) {
        currAnalitic.message = currAnalitic.message + "\n" + "ОШИБКА: Для БП " + allbp[i].name + " дата начала действия БП меньше 31/01/2013. необходимо исправить ";
        checked = false;
      }
      if (biasDateFormat.parse(allbp[i].dateBegin).getTime() > biasDateFormat.parse(allbp[i].dateEnd).getTime()) {
        currAnalitic.message = currAnalitic.message + "\n" + "ОШИБКА: Для БП " + allbp[i].name + " дата начала действия БП=" + allbp[i].dateBegin + " больше даты окончания БП=" + allbp[i].dateEnd + ". необходимо исправить ";
      }
      if (!idChecker.test(allbp[i].id)) {
        currAnalitic.message = currAnalitic.message + "\n" + "Для БП " + allbp[i].name + " идентификатор содержит недопустимые символы или длину. необходимо исправить ";

        checked = false;
      }
      if (!numbpChecker.test(allbp[i].num)) {

        currAnalitic.message = currAnalitic.message + "\n" + "Для БП " + allbp[i].name + " неправильная структура номера БП. необходимо исправить " + allbp[i].num;
        checked = false;
      }
      if (allbpidarray.filter(function (id) { return allbp[i].id == id }).length > 1) {
        currAnalitic.message = currAnalitic.message + "\n" + "Для БП " + allbp[i].name + " идентификатор  БП в выгружаемом файле содержится более ОДНОГО РАЗА. необходимо исправить";
        checked = false;
      }
    }  // КОНЕЦ блок внутрениих контролей
  } catch (error) {
    console.log(error);
  } finally {
    console.log("finally........")
  }
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////
})();