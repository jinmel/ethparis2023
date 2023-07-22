"""Scrape a collection from OpenSea."""

import os

from absl import app
from absl import flags
from absl import logging
import cairosvg
import requests

FLAGS = flags.FLAGS

flags.DEFINE_string('collection', None, 'Collection to scrape')
flags.DEFINE_string('output_dir', None, 'Output directory')

API_KEY = '027c5e7b50a74f51bdef7740a44f2471'


def get_collection(collection_name):
    """Get collection info from OpenSea API."""
    uri = f'https://api.opensea.io/v2/collection/{collection_name}/nfts'
    response = requests.get(uri, headers={'X-API-KEY': API_KEY})
    nfts = response.json()['nfts']
    next_token = response.json()['next']
    while next_token:
        response = requests.get(uri,
                                headers={'X-API-KEY': API_KEY},
                                params={'next': next_token})
        nfts.extend(response.json()['nfts'])
        next_token = response.json().get('next', None)
        logging.info('Total number: %d NFTs', len(nfts))
    return nfts


def main(_):
    nfts = get_collection(FLAGS.collection)
    os.makedirs(FLAGS.output_dir, exist_ok=True)
    for nft in nfts:
        svg_data = requests.get(nft['image_url']).text
        with open(os.path.join(FLAGS.output_dir, nft['name'] + '.png'),
                  'wb') as png_file:
            cairosvg.svg2png(bytestring=svg_data, write_to=png_file)
            logging.info('Saved %s', nft['name'])


if __name__ == '__main__':
    app.run(main)
