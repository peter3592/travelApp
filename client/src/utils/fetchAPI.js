export const fetchAPI = async (endpoint, method, body) => {
  const debug = 0;

  if (
    method &&
    method !== "GET" &&
    method !== "POST" &&
    method !== "DELETE" &&
    method !== "PATCH"
  )
    return { ok: false };

  if (method === "POST" && !body) throw new Error("Internal Error [1]");

  const config = {
    credentials: "include",
    method,
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
  };

  if (body) {
    config.body = body instanceof FormData ? body : JSON.stringify(body);
    config.headers =
      body instanceof FormData
        ? {}
        : {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          };
  }

  // When client is runned with npm start, .env.development is used
  let url = process.env.REACT_APP_URL ? process.env.REACT_APP_URL : "";

  try {
    const res = await fetch(`${url}/${endpoint}`, config);

    if (res.status === 413) throw new Error("Sorry, max file size is 4.5MB");

    if (debug) console.log(res);

    if (debug) console.log("Step 1");

    if (res.status === 429) throw new Error("Too Many Requests");

    if (debug) console.log("Step 2");

    // Token expired
    if (res.status === 401 && window.location.pathname !== "/login")
      return (document.location.href = "/");

    if (debug) console.log("Step 3");

    if (res.status === 404) throw new Error("(404) Bad request");

    if (debug) console.log("Step 4");

    if (method === "DELETE" && res.ok) return;

    if (debug) console.log("Step 5");

    const { status, data, message } = await res.json();

    if (debug) console.log({ status, data, message });

    if (method === "DELETE" && !res.ok) throw new Error(message);

    if (debug) console.log("Step 6");

    if (status === "success") return data;

    if (debug) console.log("Step 7");

    if (status === "error") throw new Error(message);

    if (debug) console.log("Step 8");

    if (!status) throw new Error("Internal Error [2]");
  } catch (e) {
    if (debug) console.log("Step 9");
    throw e;
  }
};
