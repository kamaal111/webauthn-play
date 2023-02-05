class WebAuthN {
  constructor() {}

  createCredentials({
    email,
    displayName,
  }: {
    email: string;
    displayName: string;
  }) {
    // const publicKeyCredentialCreationOptions = {
    //   challenge: Uint8Array.from(
    //       randomStringFromServer, c => c.charCodeAt(0)),
    //   rp: {
    //       name: "Duo Security",
    //       id: "duosecurity.com",
    //   },
    //   user: {
    //       id: Uint8Array.from(
    //           "UZSL85T9AFC", c => c.charCodeAt(0)),
    //       name: "lee@webauthn.guide",
    //       displayName: "Lee",
    //   },
    //   pubKeyCredParams: [{alg: -7, type: "public-key"}],
    //   authenticatorSelection: {
    //       authenticatorAttachment: "cross-platform",
    //   },
    //   timeout: 60000,
    //   attestation: "direct"
    // };
  }
}

export default WebAuthN;
