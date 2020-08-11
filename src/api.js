const fetchData = async (url, query ) => {
  function queryString(obj) {
    let keys = Object.keys(obj);
    let str = '';
    keys.forEach(k => {
        if (obj[k]) {
            str += `&${k}=${obj[k]}`;
        }
    });
    return str.slice(1);
  }
  try {
    let res = await fetch(url + queryString(query))
    return res
  } catch(e) {
    console.log(e)
  }

  }

  export default fetchData