const fetchAPI = async (endpoint, method, body) => {
  //

  if (
    method &&
    method !== "GET" &&
    method !== "POST" &&
    method !== "DELETE" &&
    method !== "PATCH"
  )
    return { ok: false };

  if (method === "POST" && !body) return { ok: false };

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

  let url = process.env.REACT_APP_URL ? process.env.REACT_APP_URL : "";

  console.log("url", url);

  const res = await fetch(`${url}/${endpoint}`, config);

  // Token expired
  if (res.status === 401 && window.location.pathname !== "/login")
    return (document.location.href = "/");

  if (res.status === 404) return { ok: false, message: "(404) Bad request" };

  if (res.ok && method === "DELETE") return { ok: true };

  const { status, data, message } = await res.json();

  if (status === "success") return { ok: true, data };

  if (status === "error") return { ok: false, message };

  if (!status) return { ok: false, message: "Something went wrong" };
};

export default fetchAPI;
