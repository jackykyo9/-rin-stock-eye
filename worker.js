export default {
  async fetch(request, env) {
    if (!env.FUGLE_API_KEY) {
      return new Response("NO_KEY", { status: 500 });
    }

    const url = new URL(request.url);
    const match = url.pathname.match(/^\/quote\/(\d{4,6})$/);

    if (!match) {
      return new Response(
        JSON.stringify({
          ok: true,
          service: "rin-stock-eye",
          usage: "/quote/2330"
        }),
        {
          status: 200,
          headers: {
            "content-type": "application/json; charset=utf-8"
          }
        }
      );
    }

    const symbol = match[1];

    const r = await fetch(
      `https://api.fugle.tw/marketdata/v1.0/stock/intraday/quote/${symbol}`,
      {
        headers: {
          "X-API-KEY": env.FUGLE_API_KEY
        }
      }
    );

    return new Response(await r.text(), {
      status: r.status,
      headers: {
        "content-type": "application/json; charset=utf-8"
      }
    });
  }
};
