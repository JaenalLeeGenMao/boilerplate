import xml2js from 'xml2js'
import _get from 'lodash/get'

export const parseXml2Obj = data => {
  return xml2js
    .parseStringPromise(data.toString() /*, options */)
    .then(function(result) {
      // console.dir(result);
      let ads = _get(result, "['vmap:VMAP']['vmap:AdBreak']", [])
      ads = ads.map(eachAds => {
        const id = _get(
          eachAds,
          "['vmap:AdSource']['0']['vmap:VASTAdData']['0']['VAST']['0']['Ad']['0']['$']['id']",
          '',
        )
        const impression = _get(
          eachAds,
          "['vmap:AdSource']['0']['vmap:VASTAdData']['0']['VAST']['0']['Ad']['0']['InLine']['0']['Impression']['0']",
          '',
        )
        const creatives = _get(
          eachAds,
          "['vmap:AdSource']['0']['vmap:VASTAdData']['0']['VAST']['0']['Ad']['0']['InLine']['0']['Creatives']['0']['Creative']['0']['Linear']['0']",
          '',
        )
        return {
          ...eachAds.$,
          id,
          impression,
          durations: _get(creatives, 'Duration', []),
          mediafile: _get(creatives, "['MediaFiles']['0']['MediaFile']['0']['_']", ''),
          isPlayed: false,
        }
      })

      return ads
    })
    .catch(function(err) {
      // Failed
      console.log('failed', err)
      return []
    })
}