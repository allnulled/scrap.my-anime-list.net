window.enviar_datos = async function(datos) {
    try {
        const respuesta = await window.fetch("http://127.0.0.1:9095", {
            method: "POST",
            cors: true,
            body: JSON.stringify(datos),
            headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
        });
        const respuesta_en_texto = await respuesta.text();
        console.log(respuesta_en_texto);
    } catch(error) {
        console.log("Falló en envío de datos al servidor local:", error);
    }
};

(async () => {
  const items = Array.from(document.querySelectorAll("table.top-ranking-table tr.ranking-list"));
  for(let indexTr = 0; indexTr < items.length; indexTr++) {
    const tr = items[indexTr];
    try {
      const rank = parseInt(tr.querySelectorAll("td.rank > span")[0].textContent);
      const titleElement = tr.querySelectorAll("td.title")[0];
      const link1 = titleElement.querySelectorAll("a")[0];
      const link = link1.href;
      const imageElement = link1.querySelectorAll("img")[0];
      const image = imageElement.src;
      const titleLinkElement = titleElement.querySelectorAll(".detail > h3 > a")[0];
      const title = titleLinkElement.textContent;
      const [ volumesBrute, timeBrute, membersBrute ] = titleElement.querySelectorAll(".detail > .information")[0].innerHTML.split("<br>");
      const volumes = volumesBrute.trim();
      const time = timeBrute.trim();
      const members = parseInt(membersBrute.trim().replace(" members", "").replace(",", ""));
      const score = tr.querySelectorAll("td.score")[0].textContent.trim();
      const dato = {
        rank,
        title,
        image,
        volumes,
        time,
        members,
        score,
      };
      await window.enviar_datos({
        base: "myanimelist.net",
        dato,
        id: title.replace(/[^A-Za-z0-9áéíóúÁÉÍÓÚ_\- ]/g, "")
      });
    } catch(error5) {
      console.log("Error 5:", error5);
      window.enviar_datos({
        base: "myanimelist.net",
        dato: { error: error5.message, html: tr.innerHTML },
      });
    }
  }
})();