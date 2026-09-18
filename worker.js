export default {
  async fetch(request, env) {
    if (!env.FUGLE_API_KEY) {
      return new Response("NO_KEY", { status: 500 });
    }

    const r = await fetch(
      "https://api.fugle.tw/marketdata/v1.0/stock/intraday/quote/2330",
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
