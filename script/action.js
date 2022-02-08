const fetch = (link, cb) => {
  const xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        cb({
          error: false,
          status: xhr.status,
          response: JSON.parse(xhr.responseText),
        });
      } else {
        cb({
          error: true,
          status: xhr.status,
          response: JSON.parse(xhr.responseText).message,
        });
      }
    }
  };
  xhr.open("GET", link);
  xhr.send();
};
