export class ApiClient {
  baseUri: string;

  contructor(baseUri: string) {
    this.baseUri = baseUri;
  }

  getSeed(size: number): Promise<Object> {
    return fetch(
      `${self.baseUri}/generate/seed` + new SearchParams({ size: size }), {
        method: 'GET',
        mode: 'cors',
      })
      .then(res => res.json())
  }

  generate(genomes: Array<Array<number>>): Promise<Object> {
    return fetch(`${self.baseUri}/generate`, {
      method: 'POST',
      mode: 'cors',
      body: JSON.stringify({ genomes: genomes }),
    })
    .then(res => res.json())
  }

  evolve(genomes: Array<Array<number>>, size: number): Promise<Object> {
    return fetch(`${self.baseUri}/evolve`, {
      method: 'POST',
      mode: 'cors',
      body: JSON.stringify({ genomes: genomes , num_children: size}),
    })
    .then(res => res.json())
  }

  prove(genome: Array<number>): Promise<Object> {
    return fetch(`${self.baseUri}/prove`, {
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

  getCollection(collection: string): Promise<Object> {

  }
}


