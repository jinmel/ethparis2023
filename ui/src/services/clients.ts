interface ImageResponse {
  image: string;
  genome: Array<number>;
}

export class ApiClient {
  baseUri: string;

  contructor(baseUri: string) {
    this.baseUri = baseUri;
  }

  async getSeed(size: number): Promise<Array<ImageResponse>> {
    return fetch(
      `${this.baseUri}/generate/seed` + new URLSearchParams({ size: size.toString() }), {
        method: 'GET',
        mode: 'cors',
      })
      .then(res => res.json())
  }

  async generate(genomes: Array<Array<number>>): Promise<Array<ImageResponse>> {
    return fetch(`${this.baseUri}/generate`, {
      method: 'POST',
      mode: 'cors',
      body: JSON.stringify({ genomes: genomes }),
    })
    .then(res => res.json())
  }

  async evolve(genomes: Array<Array<number>>, size: number): Promise<Array<ImageResponse>> {
    return fetch(`${this.baseUri}/evolve`, {
      method: 'POST',
      mode: 'cors',
      body: JSON.stringify({ genomes: genomes , num_children: size}),
    })
    .then(res => res.json())
  }

  async prove(genome: Array<number>): Promise<Object> {
    return fetch(`${this.baseUri}/prove`, {
      method: 'POST',
      mode: 'cors',
      body: JSON.stringify({ genome: genome }),
    })
    .then(res => res.json())
  }
}

export class GraphClient {
  baseUri: string;
  apiKey: string;

  constructor(baseUri: string, apiKey: string) {
    this.baseUri = baseUri;
    this.apiKey = apiKey;
  }
}


