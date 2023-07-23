export const ML_BACKEND_API_URL = import.meta.env.VITE_ML_BACKEND_API_URL;

interface ImageResponse {
  image: string;
  genome: Array<number>;
}

interface ProofResponse {
  image: string;
  genome: Array<number>;
  proof: Uint8Array;
}

export class ApiClient {
  baseUri: string;

  constructor(baseUri: string) {
    this.baseUri = baseUri;
  }

  async getSeed(size: number): Promise<Array<ImageResponse>> {
    const response = await fetch(
      `${this.baseUri}/generate/seed?` +
        new URLSearchParams({ size: size.toString() }),
      {
        method: "GET",
        mode: "cors",
      },
    );

    const data: { image: string; genome: number[] }[] = await response.json();
    return data;
  }

  async generate(genomes: Array<Array<number>>): Promise<Array<ImageResponse>> {
    return fetch(`${this.baseUri}/generate`, {
      method: "POST",
      mode: "cors",
      body: JSON.stringify({ genomes: genomes }),
    }).then((res) => res.json());
  }

  async evolve(
    genomes: Array<Array<number>>,
    size: number,
  ): Promise<Array<ImageResponse>> {
    return fetch(`${this.baseUri}/generate/evolve`, {
      method: "POST",
      mode: "cors",
      body: JSON.stringify({ genomes: genomes, num_children: size }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }).then((res) => res.json());
  }

  async prove(genome: Array<number>): Promise<ProofResponse> {
    return fetch(`${this.baseUri}/prove`, {
      method: "POST",
      mode: "cors",
      body: JSON.stringify({ genome: genome }),
    }).then((res) => res.json());
  }
}
