import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _get from 'lodash/get';
import axios from 'axios';
import {
  parse,
  stringify,
  stringifyVtt,
  resync,
  toMS,
  toSrtTime,
  toVttTime
} from 'subtitle';
import { parseXml2Obj } from /* webpackPreload: true */ './preroll/adsUtil';

import UpcomingVideo from /* webpackPreload: true */ './upcoming-video';
import CustomController from /* webpackPreload: true */ './custom-controller';

import {
  container,
  childContainer,
  BannerImg,
  Poster,
  UserFeedback,
  ErrorFeedback,
  Icons,
  BugLogoWrapper
} from /* webpackPreload: true */ './mola-player.style';

let idleInterval;

/**
 * @param {props.recommendation} recommendation -> { id, title, shortDescription, images.cover: { portrait, landscape } }
 * @param {props.bugLogo} bugLogo -> { attributes: { logoType, imageURL } }
 * @param {props.playerConfig} playerConfig -> { togglePlayPauseEnabled, toggleFullscreenEnabled, toggleMuteEnabled, volumeBarEnabled, nextVideoEnabled, keyboardShortcutsEnabled, showForwardButton, showBackwardButton, preferredTextLanguage }
 */
const propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string,
  poster: PropTypes.string,
  children: PropTypes.node,
  bugLogo: PropTypes.object,
  isPlayButtonDisabled: PropTypes.bool,
  recommendation: PropTypes.object,
  playerConfig: PropTypes.object /** list to override controllerConfig */
};

const defaultProps = {
  playerConfig: {
    togglePlayPauseEnabled: true,
    toggleFullscreenEnabled: true,
    toggleMuteEnabled: true,
    seekBarEnabled: true,
    volumeBarEnabled: true,
    nextVideoEnabled: true,
    keyboardShortcutsEnabled: true,
    preferredTextLanguage: 'id' /** make sure to input in lowercase */,
  }
}

class Player extends Component {
  state = {
    isHover: false,
    isLoading: true,
    isPlaying: false,
    isError: false,
    errorMsg: '',
    hasNextVideo: true,
    hasPlayButton: false,
    banner: {
      id: '',
      link: '',
      mediaURL: ''
    },
    isPreroll: false,
    ads: [],
    autoplayEnabled: false
  };

  async componentDidMount() {
    // console.log('componentDidMount', this.props)
    if (process.env.BROWSER && window) {
      window[`playerProps${this.props.id}`] = this.props;

      await this.handleInitPreroll();

      if (shaka) {
        await this.loadPlayer();
      } else {
        console.log('Shaka not found')
      }

      // console.log('componentDidMount', this.props)
    }
  }

  loadPlayer = () => {
    // console.log(window.shaka)
    // Install built-in polyfills to patch browser incompatibilities.
    shaka.polyfill.installAll();

    // Check to see if the browser supports the basic APIs Shaka needs.
    if (shaka.Player.isBrowserSupported()) {
      // Everything looks good!
      this.initPlayer();

      this.handleUserIdle();
    } else {
      // This browser does not have the minimum set of APIs we need.
      console.error('Browser not supported!');
      that.onError({ customMsg: 'DISMISSED: Browser not supported!' });
    }
  };

  handleUserIdle = () => {
    const that = this;
    clearInterval(idleInterval);
    idleInterval = setInterval(() => {
      if (!document.cookie.includes('__idleSessionId')) {
        that.setState({ isHover: false });
      }
      // console.log('that.state.isPreroll', that.state.isPreroll)
      // console.log(that.state.isPreroll, that.state.ads)
    }, 1000);
  };

  // handleResumeVideoTime = (player, time = 0) => { // gakepake
  //   const player = this.player,
  //     video = player && player.getMediaElement()
  //   if (video && !isNaN(+time) && +time > 0) {
  //     video.currentTime = +time
  //   }
  // }

  handleOnAdsImpression = activeAds => {
    if (activeAds) {
      fetch(activeAds.impression, {
        method: 'GET', // *GET, POST, PUT, DELETE, etc.
        mode: 'no-cors', // no-cors, *cors, same-origin
        credentials: 'include', // include, *same-origin, omit
        headers: {
          Origin: 'https://mst.cx'
        }
      })
        .then(res => console.log(res.status))
        .catch(e => console.log('Error: ads impressions failed ', e));
    }
  };

  /**
   *
   * @param {*} time e.g. 10:15:30
   */
  getTimeFormatToSecond = time => {
    const hhmmss = time.split(':');
    let multiplier = {
      4: 86400,
      3: 3600,
      2: 60,
      1: 1
    };
    multiplier = multiplier[hhmmss.length];
    return hhmmss.reduce((p, c) => {
      const result = p + parseInt(c, 10) * multiplier;
      multiplier = multiplier / 60;
      return result;
    }, 0);
  };

  initPreroll = async () => {
    let activeAds;
    const { ads } = this.state;

    if (ads.length > 0) {
      const filteredAds = ads.map(eachAds => {
        if (eachAds.isPlayed === false && this.player) {
          if (eachAds.timeOffset === 'start') {
            if (this.player.totalWatchTime == 0) {
              activeAds = eachAds;
              return { ...eachAds, isPlayed: true };
            }
          } else {
            const timeInSeconds = this.getTimeFormatToSecond(
              eachAds.timeOffset
            );
            if (timeInSeconds == this.player.totalWatchTime) {
              activeAds = eachAds;
              return { ...eachAds, isPlayed: true };
            }
          }
        }
        return eachAds;
      });

      if (activeAds) {
        // console.log('masuk gak active ads preroll', activeAds, this.player.totalWatchTime)
        const config = {
          manifestUri: activeAds.mediafile,
          startTime: 0 /** preroll selalu start dari 0 */
        };

        if (this.player) {
          // console.log('masuk gak if preroll')
          this.handleInitPlayer(this.player, config);
          this.player.isPreroll = true;
        } else {
          let video = document.getElementById(`video-main-${this.props.id}`);

          const player = new shaka.Player(video);
          player.isPreroll = true;
          // console.log('masuk gak else preroll')
          this.handleInitPlayer(player, config);
        }

        this.handleOnAdsImpression(activeAds);
        this.setState({ ads: filteredAds, isPreroll: true });
      }
    }
  };

  initPlayer = async () => {
    let drm = _get(this.props, 'drm', ''),
      streamSourceUrl = _get(this.props, 'streamSourceUrl', ''),
      currentTime = _get(
        this.player,
        'totalWatchTime',
        0
      ) /** setelah preroll selesai kembali ke totalWatchTime */,
      watchTimePosition = Number(_get(this.props, 'watchTimePosition', 0));
    // console.log(watchTime, this.player)
    let video = document.getElementById(`video-main-${this.props.id}`);

    const player = this.player || new shaka.Player(video);

    if (currentTime === 0 && watchTimePosition > 0) {
      currentTime = watchTimePosition;
    }

    // console.log(streamSourceUrl, this.props)

    const isSafari = /.*Version.*Safari.*/.test(navigator.userAgent);
    const startTime = currentTime > 0 && !isNaN(currentTime) ? currentTime : 0;
    if (drm && drm.drmEnabled) {
      let drmStreamUrl = isSafari
        ? drm.fairplay.streamUrl
        : drm.widevine.streamUrl;
      let manifestUri = drmStreamUrl
        ? drmStreamUrl
        : this.props.streamSourceUrl;
      const deviceId = this.props.deviceId;

      if (!isSafari) {
        const config = {
          manifestUri,
          drm: {
            servers: {
              'com.widevine.alpha': `${
                drm.widevine.licenseUrl
              }?deviceId=${deviceId}`,
              'com.microsoft.playready': `${
                drm.playready.licenseUrl
              }?deviceId=${deviceId}`,
              'com.apple.fps.1_0': `${
                drm.fairplay.licenseUrl
              }?deviceId=${deviceId}`
            }
          },
          startTime
        };
        this.handleInitPlayer(player, config);
      } else {
        const req = await fetch(drm.fairplay.certificateUrl);
        if (!req.ok) {
          // handle error
          console.log('Failed to retrieve fairplay certificate');
          return;
        }

        const cert = await req.arrayBuffer();

        const config = {
          // vmapUrl, //: 'http://51.38.231.56:8000/vmap?tc=autorefresh_pre_roll',
          manifestUri,
          drm: {
            servers: {
              'com.widevine.alpha': `${
                drm.widevine.licenseUrl
              }?deviceId=${deviceId}`,
              'com.microsoft.playready': `${
                drm.playready.licenseUrl
              }?deviceId=${deviceId}`,
              'com.apple.fps.1_0': `${
                drm.fairplay.licenseUrl
              }?deviceId=${deviceId}`
            },
            advanced: {
              'com.apple.fps.1_0': {
                serverCertificate: new Uint8Array(cert)
              }
            }
            // fairPlayTransform: false,
          },
          startTime
        };
        this.handleInitPlayer(player, config);
      }
    } else if (streamSourceUrl !== '') {
      const config = {
        manifestUri: streamSourceUrl,
        startTime
      };
      this.handleInitPlayer(player, config);
    } else {
      console.log('Stream source not found');
    }

    return true;
  };

  handleInitPlayer = (player, config) => {
    // console.log('config', config)
    const that = this,
      streamSourceUrl = config.manifestUri,
      videoStartTime = config.startTime,
      retryParameters = {
        timeout: 10000, // timeout in ms, after which we abort; 0 means never
        maxAttempts: 2, // the maximum number of requests before we fail
        baseDelay: 1000, // the base delay in ms between retries
        backoffFactor: 1, // the multiplicative backoff factor between retries
        fuzzFactor: 0.5 // the fuzz factor to apply to each retry delay
      };

    delete config.manifestUri;
    delete config.startTime;

    player.getNetworkingEngine().registerResponseFilter((type, response) => {
      response.headers['Access-Control-Allow-Origin'] = '*';
      // console.log('registerResponseFilter', response)
      return response;
    });

    player.configure({
      ...config,
      // restrictions: {
      //   maxPixels: 1280 * 720 /** 1920*1080 1280*720 1024*576 640*360 480*270 */,
      // },
      abr: { enabled: false },
      manifest: {
        retryParameters
        // hls: {
        //   useFullSegmentsForStartTime: true,
        // },
      },
      streaming: {
        retryParameters
      },
      availabilityWindowOverride: 300 /** IMPORTANT: this enables seekRange on default Safari player */
    });
    try {
      // https://storage.googleapis.com/shaka-demo-assets/angel-one-hls/master.m3u8
      // https://devstreaming-cdn.apple.com/videos/streaming/examples/img_bipbop_adv_example_ts/master.m3u8
      // https://irtdashreference-i.akamaihd.net/dash/live/901161/keepixo1/playlistBR2.m3u8

      player.unload().then(() => {
        player
          .load(streamSourceUrl, videoStartTime)
          .then(() => {
            const video = player.getMediaElement();
            video.volume = that.props.volume;
            video.muted = that.props.muted;

            /** Shaka auto disabled texttracks when changing source, set mode back to hidden */
            for (let i = 0; i < video.textTracks.length; i++) {
              video.textTracks[i].mode = 'hidden';
            }
            console.log('player loaded');

            that.setState({
              isLoading: false,
              hasPlayButton: true
            });

            /** prevent legacy code Error terminate */
            player.reset = errorMsg => {
              if (errorMsg) {
                that.setState({ isError: true, errorMsg });
              }
              player.unload(); /** unload, detach, destroy */
              that.player = null;
              window[`player${that.props.id}`] = null;
            };

            /** if that.player already exist, then skip adding new event listener */
            if (!that.player) {
              that.player = player;
              window[`player${that.props.id}`] = player;

              that.handlePlayerEventListener(player);
              console.log('Player Controls loaded and ready');

              if (that.childRefs) {
                that.childRefs.addEventListener(
                  'mouseenter',
                  that.handleOnMouseMove
                );
                that.childRefs.addEventListener(
                  'mousemove',
                  that.handleOnMouseMove
                );
                that.childRefs.addEventListener(
                  'mouseout',
                  that.handleOnMouseExit
                );
              }
            }
          })
          .catch(that.onError); // onError is executed if the asynchronous load fails
      });
    } catch (e) {
      console.warn('Error: player load failed ', e);
    }
  };

  handleInitPreroll = () => {
    const that = this;
    try {
      // update banner
      const url = this.props.adsSource || '';
      // const url =
      //   'https://api.stag.supersoccer.tv/v1/ads/ads-rubik/api/v1/get-inplayer-banner?params=eyJwcm9qZWN0X2lkIjoiMiIsInZpZGVvX2lkIjoid2VicGxheTAwMSIsImFwcF9pZCI6Im1vbGFfYWRzIiwic2Vzc2lvbl9pZCI6Imo4OWk4NTVkenJmeWg0aDF0NHY1OG9tc2poemV0OWlxbSIsImNsaWVudF9pcCI6IjM1LjE4Ni4xNTMuMTc1IiwidXVpZCI6IjU5MTA5MjBlLTMwYjMtNDExZS04ZmFkLTE2MTJhNDljMjQyOCIsInRpbWVfb2Zmc2V0IjoiNyIsInVzZXJfaWQiOiJlN3BGb3VmYUdlMjBUR1BKR1ZqeDRvRGpCWXIyMFoifQ=='
      if (url) {
        axios
          .get(url)
          .then(response => {
            if (response.status == 200 && response.data) return response.data;
            else return null;
          })
          .then(function(data) {
            // console.log(data)
            if (data) {
              /* data = dummyAdsPrerollXml */
              let adsResponse = parseXml2Obj(data);
              adsResponse.then(ads => {
                const filteredAds = ads.map(eachAds => ({
                  ...eachAds,
                  isPlayed: false
                }));

                if (filteredAds.length > 0) {
                  // filteredAds.push({ ...filteredAds[0], timeOffset: '00:00:30' }) // uji coba midroll
                  // console.log(filteredAds)
                  that.setState({ ads: filteredAds });
                }
              });
            }
          });
      }
    } catch (e) {
      console.log('Error: fetch preroll API failed ', e);
    }
  };

  handleInitBanner = () => {
    try {
      // update banner
      const url = this.props.adsBannerUrl || '';
      // const url =
      //   'https://api.stag.supersoccer.tv/v1/ads/ads-rubik/api/v1/get-inplayer-banner?params=eyJwcm9qZWN0X2lkIjoiMiIsInZpZGVvX2lkIjoid2VicGxheTAwMSIsImFwcF9pZCI6Im1vbGFfYWRzIiwic2Vzc2lvbl9pZCI6Imo4OWk4NTVkenJmeWg0aDF0NHY1OG9tc2poemV0OWlxbSIsImNsaWVudF9pcCI6IjM1LjE4Ni4xNTMuMTc1IiwidXVpZCI6IjU5MTA5MjBlLTMwYjMtNDExZS04ZmFkLTE2MTJhNDljMjQyOCIsInRpbWVfb2Zmc2V0IjoiNyIsInVzZXJfaWQiOiJlN3BGb3VmYUdlMjBUR1BKR1ZqeDRvRGpCWXIyMFoifQ=='
      if (url) {
        axios.get(url).then(res => {
          // console.log(res)
          if (res.status === 200) {
            const data = _get(res, 'data.data.data[0]', {});

            /** Skip banner BLANK: bannerIds '89' movies, '93' vod, '97' linear, live '101', replay '105', trailers '109' */
            const blankBannerIds = ['89', '93', '97', '101', '105', '109'];
            if (blankBannerIds.includes(data.id)) {
              this.handleInitBanner();
            } else {
              this.setState({
                banner: {
                  id: data.id,
                  link: data.link,
                  mediaURL: data.mediaURL
                }
              });
            }
          }
        });
      }
    } catch (e) {
      console.warn('Error: fetch banner API failed ', e);
    }
  };

  onErrorEvent = event => {
    this.onError(event.detail);
  };

  onError = error => {
    // Log the error
    const { category, code, data, severity, message } = error;
    const { errorCodes } = this.props;
    console.error('Player error: ', error);
    if (this.props.handleVideoError) {
      this.props.handleVideoError(error);
    }

    if (this.player) this.player.reset();

    this.setState({
      isError: true,
      errorMsg:
        error.customMsg ||
        `${_get(
          errorCodes,
          `${code}`,
          'Silahkan refresh browser anda dalam beberapa saat lagi'
        )} ‒ ${code} `
    });
  };

  handlePlayerEventListener = player => {
    const that = this;

    let loadedInterval,
      loadedCount = 0;
    loadedInterval = setInterval(() => {
      if (player && player.getLoadMode && player.getLoadMode() > 1)
        clearInterval(loadedInterval);
      if (loadedCount > 40) {
        clearInterval(loadedInterval);
        that.onError({
          customMsg:
            'TIMEOUT: Failed to Load media, Silahkan refresh browser anda.'
        });
      }
    }, 500);

    // console.log(player, getLocalPlayer)
    player.addEventListener('error', that.onErrorEvent);

    const video = player && player.getMediaElement();
    // console.log('WACHAO', video, player)
    if (video) {
      // console.log('that.props.subtitles', that.props.subtitles)
      if (that.props.subtitles && that.props.subtitles.length > 0) {
        for (const s of that.props.subtitles) {
          // console.log(s)
          // const lngMap = {
          //   id: 'Indonesian',
          //   en: 'English',
          //   uk: 'English',
          //   zh: 'Chinese',
          //   nl: 'Dutch',
          //   de: 'German',
          //   fr: 'French',
          //   it: 'Italian',
          //   pl: 'Polish',
          //   pt: 'Portuguese',
          //   ru: 'Russian',
          //   es: 'Spanish',
          //   vi: 'Viêt Namese',
          //   el: 'Greek',
          //   'pt-br': 'Portuguese'
          // };

          /**
           * @param s = {
           *   kind: type,         // subtitles or metadata
           *   src: subtitleUrl,   // typical url source
           *   country,            // id, eng (always in lowercase follow lngMap samples)
           *   label: language,    // Bahasa Inconesia, English, 官话, etc
           *   type: subtitleType  // srt or vtt
           * }
           */
          if (s.label && s.label.trim() == '') return;
          const track = video.addTextTrack('metadata', s.label, s.country);
          // track.mode = 'showing'
          axios
            .get(s.src)
            .then(response => {
              if (response.status == 200 && response.data) {
                const srt = parse(response.data);
                // console.log(srt)
                srt.map(cue => {
                  // console.log(cue)
                  const newCue = new VTTCue(
                    cue.start / 1000,
                    cue.end / 1000,
                    cue.text
                  );
                  window.cue = newCue;
                  // newCue.size = 60
                  // newCue.line = -12
                  track.addCue(newCue);
                });
              }
            })
            .catch(e => console.log('Error: fetch subtitle failed ', e));
        }
      }
      let visitedTimeInSeconds = [],
        firstTimeFlag = 0,
        currentTime = 0;
      video.addEventListener('play', function(e) {
        if (that.props.handleOnPlayCallback)
          that.props.handleOnPlayCallback(that.player);
        // console.log('play', that.state)
        if (!firstTimeFlag) {
          // console.log('!firstTimeFlag')
          that.player.totalWatchTime = visitedTimeInSeconds.length;
          if (that.props.handleVideoWatchTime) {
            that.props.handleVideoWatchTime(that.player);
          }
          firstTimeFlag = 1;
        }
        // that.handleResumeVideoTime(that.player, that.props.watchTimePosition)
        that.durationInterval = setInterval(function() {
          const player = that.player,
            video = player && player.getMediaElement();

          if (video && !that.state.isPreroll) {
            currentTime = Math.floor(video.currentTime);
            // console.log('visitedTimeInSeconds.indexOf(totalWatchTime) ', visitedTimeInSeconds.indexOf(totalWatchTime))
            if (visitedTimeInSeconds.indexOf(currentTime) === -1) {
              if (visitedTimeInSeconds.length % 30 === 0) {
                that.handleInitBanner();
              }

              that.initPreroll();
              visitedTimeInSeconds.push(currentTime);
            }
            // console.log("currentTime", currentTime)
            // console.log('visitedTimeInSeconds', visitedTimeInSeconds)
            that.player.levels_ =
              player &&
              player.getVariantTracks(); /** cocokin dengan legacy voplayer */
            that.player.totalWatchTime = visitedTimeInSeconds.length;
            // console.log("visitedTimeInSeconds.length", visitedTimeInSeconds.length)
          }

          if (that.props.handleVideoWatchTime) {
            that.props.handleVideoWatchTime(player);
          }
        }, 1000);
      });
      video.addEventListener('pause', function() {
        // console.log('paused')
        clearInterval(that.durationInterval);
        if (that.props.handleVideoPause) {
          that.props.handleVideoPause(player);
        }
      });
      video.addEventListener('ended', function() {
        // console.log('Playback ended')
        clearInterval(that.durationInterval);
        if (that.props.handleVideoEnded) {
          that.props.handleVideoEnded(player);
        }

        if (that.player.isPreroll) {
          that.setState({ isPreroll: false }, () => {
            that.initPlayer();
            that.player.isPreroll = false;
          });
        }
      });
      video.addEventListener('durationchange', function(e) {
        clearInterval(that.durationInterval);
        if (that.props.handleDurationChange) {
          that.props.handleDurationChange(player);
        }
      });
      video.addEventListener('volumechange', function(e) {
        /** function set localStorage moved to custom controller `_updateVolume` method */
        if (that.props.handleOnVideoVolumeChange) {
          that.props.handleOnVideoVolumeChange(player);
        }
      });

      if (that.props.autoPlay) that.handlePlayButton();
    }
  };

  handlePlayButton = () => {
    if (this.props.handleOnPlayCallback)
      this.props.handleOnPlayCallback(this.player);

    if (this.props.isPlayerBlocked) return;

    if (this.player) {
      const player = this.player,
        video = player && player.getMediaElement();

      const { ads } = this.state;

      if (video) {
        this.setState(
          {
            isPlaying: true,
            autoplayEnabled: true
          },
          () => {
            const hasPreroll = ads.filter(a => a.timeOffset === 'start')[0];
            if (hasPreroll && !hasPreroll.isPlayed) {
              this.player.totalWatchTime = 0;
              this.initPreroll();
            } else {
              video.play();
            }
          }
        );
      }
    }
  };

  handleSubtreeOnChange = () => {
    const videoHeight = _get(
      document.getElementById(`video-main-${this.props.id}`),
      'offsetHeight',
      ''
    );
    const videoChildEl = _get(
      document.getElementsByClassName(childContainer),
      '[0]',
      ''
    );

    /** update child container */
    if (videoHeight && videoChildEl) {
      videoChildEl.style.height = `${videoHeight}px`;
      videoChildEl.style.width = `${(videoHeight * 16) / 9}px`;
    }
  };

  componentWillUnmount() {
    if (this.durationInterval) {
      clearInterval(this.durationInterval);
    }
    if (this.childRefs) {
      this.childRefs.removeEventListener('mouseenter', this.handleOnMouseMove);
      this.childRefs.removeEventListener('mousemove', this.handleOnMouseMove);
      this.childRefs.removeEventListener('mouseout', this.handleOnMouseExit);
    }
    if (this.player) {
      this.player.getNetworkingEngine().clearAllResponseFilters();
      this.player = null;
      window[`player${this.props.id}`] = null;
    }

    clearInterval(idleInterval);
  }

  handleOnMouseExit = e => {
    this.setState({ isHover: false });
  };

  handleOnMouseMove = e => {
    document.cookie = `__idleSessionId=mola; max-age=${5}; path=/;`;
    if (!this.state.isHover) this.setState({ isHover: true });
  };

  handleCancelUpcVideo = e => {
    this.setState({
      hasNextVideo: false
    });
  };

  renderNextVideo = hasNextVideo => {
    if (this.player) {
      const data = _get(this.props, 'recommendation', null);

      if (data && hasNextVideo && !this.player.isLive()) {
        return (
          <UpcomingVideo
            data={data}
            handleCancelVideo={this.handleCancelUpcVideo}
            startInterval={10}
          />
        );
      } else {
        return <div />;
      }
    }
  };

  renderBugLogo = bugLogoVideo => {
    let BLClassName = '';
    if (bugLogoVideo.type === 3) {
      /** fullscreen */
      BLClassName = 'fullscreen';
    } else if (bugLogoVideo.type === 2) {
      /** wide */
      BLClassName = 'wide';
    } else if (bugLogoVideo.type === 1) {
      /** square */
      BLClassName = 'square';
    }

    return (
      <BugLogoWrapper className={BLClassName}>
        <img
          id={`video-bug-logo-${this.props.id}`}
          src={bugLogoVideo.image}
          alt="Bug-logo Player"
        />
      </BugLogoWrapper>
    );
  };

  render() {
    const {
      isLoading,
      isError,
      isPlaying,
      isPreroll,
      errorMsg,
      isHover,
      hasNextVideo,
      hasPlayButton,
      banner,
      autoplayEnabled
    } = this.state;
    const {
      id,
      title,
      poster,
      children,
      isPlayButtonDisabled,
      recommendation,
      playerConfig = {}
    } = this.props;
    // console.log('banner', banner)
    const bugLogoVideo = {
      type: _get(this.props, 'bugLogo.attributes.logoType', null),
      image: _get(this.props, 'bugLogo.attributes.imageURL', null)
    };

    const player = this.player,
      video = player && player.getMediaElement();
    const isBuffering =
      this.player && !this.player.isPreroll && this.player.isBuffering();
    // console.log('canStartNextVideo', canStartNextVideo)
    const controllerConfig = {
      togglePlayPauseEnabled: true,
      toggleFullscreenEnabled: true,
      toggleMuteEnabled: true,
      seekBarEnabled: true,
      volumeBarEnabled: true,
      nextVideoEnabled: true,
      keyboardShortcutsEnabled: true,
      preferredTextLanguage: 'id' /** make sure to input in lowercase */,
      ...playerConfig
    };

    const canStartNextVideo =
      this.player &&
      !this.player.isPreroll &&
      !this.player.isLive() &&
      video &&
      video.duration - video.currentTime <= 10 &&
      controllerConfig.nextVideoEnabled;

    // console.log(this.state)
    this.handleSubtreeOnChange();

    const videoOnlyHeight =
      _get(document.getElementById(`video-context-${id}`), 'offsetHeight', 0) -
      _get(document.getElementById(`video-banner-${id}`), 'height', 0);

    const isFullscreen = document && document.fullscreenElement;

    return (
      <div
        ref={node => (this.childRefs = node)}
        id={`video-context-${id}`}
        className={`${container} ${isFullscreen ? 'fullscreen' : ''}`}
      >
        {!isPlaying &&
          poster && (
            <Poster>
              <img id={`video-poster-${id}`} src={poster} />
            </Poster>
          )}
        {!isPlaying && (
          <UserFeedback>
            {isLoading &&
              !isError &&
              !isPlayButtonDisabled && <code>Loading . . .</code>}
            {!isError &&
              hasPlayButton &&
              !isPlayButtonDisabled && (
                <Icons
                  className={'playIcon'}
                  onClick={() => this.handlePlayButton()}
                />
              )}
          </UserFeedback>
        )}
        {isError && (
          <ErrorFeedback>
            <code>{errorMsg}</code>
          </ErrorFeedback>
        )}
        <video
          id={`video-main-${id}`}
          // width="100%"
          autoPlay={autoplayEnabled}
          style={{
            width: (videoOnlyHeight * 16) / 9,
            height: videoOnlyHeight
          }}
        />
        {banner &&
          banner.mediaURL &&
          this.player &&
          !isPreroll && (
            <BannerImg
              id={`video-banner-${id}`}
              alt={`banner-${banner.id}`}
              src={banner.mediaURL}
              // width={(videoOnlyHeight * 16) / 9}
              onClick={() => window.open(banner.link)}
              onError={() => this.setState({ banner: null })}
            />
          )}
        {/* {this.player && <Preroll player={this.player} adsSource={this.props.adsSource} />} */}
        {this.player &&
          isPlaying && (
            <div className={childContainer} id="video-child">
              {this.renderBugLogo(bugLogoVideo)}
              {children}
              {isBuffering &&
                isHover && (
                  <UserFeedback>
                    <code>Buffering . . .</code>
                  </UserFeedback>
                )}
              <CustomController
                id={id}
                player={this.player}
                isPreroll={isPreroll}
                isHover={isHover}
                config={controllerConfig}
                recommendation={recommendation}
              />
              {canStartNextVideo && this.renderNextVideo(hasNextVideo)}
            </div>
          )}
      </div>
    );
  }
}

Player.propTypes = propTypes;
Player.defaultProps = defaultProps;

export default Player;
