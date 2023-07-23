export async function register() {
  return fetch(`http://localhost:3001/register`, {
    method: "POST",
    mode: "cors",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      userAddr: "0x7730Edfb83212BABe9396064d765a3d5afEc671a",
      root: "0x0af56413ce40afa6b17f17db55cb8ccf0b64b587bb3b20a16060dfa0781b8528",
      group: "0x1",
      signal: "",
      nullifierHash:
        "0x2fa9f1941d38f1f23b6bba33ab6527ba0df09d0eead60f96b4eda0a308c698fc",
      appId: "app_574b973f44f8e4ce8aef8b29c16aea75",
      actionId: "signup",
      proof:
        "0x13ba405fead422cbf7d8f7b4b44dc9e9fa951a7e917fa6f8f09b19a7c8645357270b192b9d20f98a98ff47e465c1cd97bf70684dc194a64dda32742393cb3834202be75aaa8746d2077783a366d611203e8663bf4da45d1a9d917d85e1223d442e759405bfbb8642840bfeadb7449e9ca72f3166cc379faf834920fe6d90878005c65905cb419b5a878362d78f65d1ff47775c00d56197d1abcbee9c1c4d78700d4c192968310eb7876b42fe41050cf54d001bd795a73c3d6608bdf7b62b3c700cdce966cbf54c74e7696acf8c14122db8d869c1d53c7bb3131c9fc9247e415a2ec7b2642aecdda9d7de5e9dd3a2cf3eecb21ef6acd053be00827b58092f2a46",
    }),
  })
    .then((res) => res.json())
    .then((response) => console.log("Success: ", JSON.stringify(response)))
    .catch((error) => console.error("Error: ", error));
}
