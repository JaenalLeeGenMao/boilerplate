import React, { Component } from 'react'
import _get from 'lodash/get'
import ReactMarkdown from 'react-markdown'

import { Feedback, Icons, VolumeBar, CueWrapper, container } from './custom-controller.style'

let tappingCount = 0,
  tappingTimer
class CustomController extends Component {
  state = {
    qualities: [],
    subtitles: [],
    bufferedPercentage: 0,
    isMuteFeedbackHidden: true,
    isPlayPauseFeedbackHidden: true,
    isSkipFeedbackHidden: true,
    isfullscreenFeedbackHidden: true,
    skippedDuration: 0,
    cue: {
      text: '',
      hidden: true,
    },
  }

  componentDidMount() {
    const player = this.props.player
    if (process.env.BROWSER && player) {
      this.handleQualityFilter()
      this.handleSubtitleFilter()

      this.initEventListeners(player)

      this.handleKeyboardEvent()

      // window._setSubtitle = this._setSubtitle
      // window._getSubtitle = this._getSubtitle
      // window._getQuality = this._getQuality
      // window._setQuality = this._setQuality
    }
  }

  componentWillUnmount() {
    if (this.props.config.keyboardShortcutsEnabled) document.onkeyup = null
  }

  _getElementById = (id) => {
    const customControllerId = `vpcc-custom-controller-${this.props.id}`

    return document.querySelector(`#${customControllerId} #${id}`)
  }

  handleFeedbackOnClick = () => {
    // console.log('feedback clicked...')
    const quality = this._getElementById('vpcc-quality'),
      qualityPopupEl = _get(quality, 'children[0]', '')

    const subtitle = this._getElementById('vpcc-subtitle'),
      subtitlePopupEl = _get(subtitle, 'children[0]', '')

    if (subtitlePopupEl) {
      subtitlePopupEl.style.display = 'none'
    }

    if (qualityPopupEl) {
      qualityPopupEl.style.display = 'none'
    }
  }

  handleKeyboardEvent = () => {

    if (this.props.config.keyboardShortcutsEnabled) {
      /** handle keyboard pressed */
      document.onkeyup = event => {
        const that = this

        const player = that.props.player,
          video = player && player.getMediaElement()

        const isPreroll = _get(this.props, 'isPreroll', false)

        switch (event.which || event.keyCode) {
          case 37 /* left */:
            if (!isPreroll) that._seekTo(-10)
            break
          case 38 /* up */:
            event.preventDefault()
            video.volume = Math.min(1, video.volume + 0.1)
            break
          case 39 /* right */:
            if (!isPreroll) that._seekTo(10)
            break
          case 40 /* down */:
            event.preventDefault()
            video.volume = Math.max(0, video.volume - 0.1)
            break
          case 70 /* f for toggle enter fullscreen or exit fullscreen */:
            event.preventDefault()
            that._toggleFullscreen()
            break
          case 77 /* m for toggle mute button */:
            event.preventDefault()
            that._toggleMute()
            break
          case 80 /* p for toggle playpause */:
            event.preventDefault()
            that._togglePlayPause()
            break
          default:
            event.preventDefault()
            break
        }
      }
    }

  }

  _getQuality = () => {
    const player = this.props.player
    if (player) return player.getVariantTracks() || []
    return []
  }

  _setQuality = index => {
    const player = this.props.player
    // console.log('_setQuality', index, quality[index])
    if (player) {
      const quality = this._getQuality()

      if (quality && quality.length > 0) {
        const selectedQuality = quality.filter(q => q.id == index)[0]
        // console.log('selectedQuality', quality, index)
        /** https://github.com/google/shaka-player/issues/1119 */
        if (selectedQuality) player.selectVariantTrack(selectedQuality, true)
        else {
          /** set to Auto by default */
          const playerStats = player.getStats()
          const estimatedBandWidth = _get(playerStats, 'estimatedBandwidth', 0)

          let autoQuality
          quality.reverse().map(q => {
            if (estimatedBandWidth > q.bandwidth && !autoQuality) {
              player.selectVariantTrack(q, true)
              autoQuality = q
            }
          })

          /** set to lowest possible bandwith, if users internet is doomed */
          if (!autoQuality) player.selectVariantTrack(quality[0], true)
        }
      }
    }
  }

  _getSubtitle = () => {
    const player = this.props.player,
      video = player && player.getMediaElement()

    if (player) return Array.from(video.textTracks) || []
    return []
  }

  _setSubtitle = index => {
    const player = this.props.player
    // console.log('_setSubtitle', index, this._getSubtitle()[index])
    if (player) {
      const subtitles = this._getSubtitle()

      if (subtitles && subtitles.length > 1) {
        const selectedSubtitle = subtitles[index]
        for (const s of subtitles) {
          if (selectedSubtitle.language == s.language) {
            // console.log(s)
            s.addEventListener('cuechange', this.handleCueOnChange)
            if (s.cues && s.cues.length > 0) {
              for (const cue of s.cues) {
                cue.addEventListener('enter', this.handleCueOnEnter)
                cue.addEventListener('exit', this.handleCueOnExit)
              }
            }
          } else {
            s.removeEventListener('cuechange', this.handleCueOnChange)
            if (s.cues && s.cues.length > 0) {
              for (const cue of s.cues) {
                cue.removeEventListener('enter', this.handleCueOnEnter)
                cue.removeEventListener('exit', this.handleCueOnExit)
              }
            }
          }
        }

        this.setState({
          cue: { text: '', hidden: true },
        }) /** always set the cue to empty string each time new subtitle is selected */
      }
    }
  }

  handleCueOnChange = e => {
    const activeCue = _get(e, 'target.activeCues', {})
    if (activeCue.length > 0) {
      this.setState(prevState => ({
        cue: {
          ...prevState.cue,
          text: activeCue[0].text,
        },
      }))
    }
  }

  handleCueOnEnter = () => {
    // console.log('handleCueOnEnter')
    this.setState(prevState => ({
      cue: {
        ...prevState.cue,
        hidden: false,
      },
    }))
  }

  handleCueOnExit = () => {
    // console.log('handleCueOnExit')
    this.setState(prevState => ({
      cue: {
        ...prevState.cue,
        text: '',
        hidden: true,
      },
    }))
  }

  handleQualityFilter = () => {
    const qualities = this._getQuality()
    const q = [],
      trackedIds = [],
      QUALITY_AUTO = { bandwidth: 'Auto', width: 'Auto', height: 'Auto', id: -1, active: true }
    qualities.reverse().map(pq => {
      if (pq.height && !trackedIds.includes(pq.height)) {
        trackedIds.push(pq.height)
        q.push({
          ...pq,
          active: false,
        })
      }
    })
    q.sort((a, b) => b.height - a.height)
    q.push(QUALITY_AUTO)

    this.setState({ qualities: q })
  }

  handleSubtitleFilter = () => {
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
    //   'pt-br': 'Portuguese',
    // }

    let tts = this._getSubtitle()
    tts = tts
      .map((t, index) => ({
        ...t,
        id: index,
        active: t.language.toLowerCase() == this.props.config.preferredTextLanguage.toLowerCase(), /** set preffered controller subtitle */
        name: t.language ? t.label : null,
      }))
      .filter(tn => tn.name)

    const activeSubs = tts.filter(t => t.active)[0]

    /** append off subtitles */
    const subtitles = [
      {
        id: 0,
        active: !activeSubs ? true : false,
        name: 'Off',
        type: 'SRT',
        kind: 'metadata',
      },
    ].concat(tts)

    this.setState({ subtitles: subtitles.reverse() || [] }, () => {
      if (activeSubs) {
        this._setSubtitle(activeSubs.id) /** set preffered player subtitle */
      }
    })
  }

  initEventListeners = player => {
    const seek = this._getElementById('vpcc-seek'),
      isLive = player && player.isLive()

    /** update seekbar tooltip and seekbar input */
    if (seek && !isLive) {
      seek.addEventListener('mousemove', this._updateSeekTooltip)
    }

    /** update progressbar buffer */
    const video = player && player.getMediaElement()
    video.addEventListener('progress', this._updateBuffer)
  }

  _updateBuffer = () => {
    const player = this.props.player,
      video = player && player.getMediaElement()

    const duration = Math.round(_get(video, 'duration', 0)),
      currentTime = Math.round(_get(video, 'currentTime', 0)),
      buffered = _get(video, 'buffered', [])

    if (duration > 0) {
      for (var i = 0; i < buffered.length; i++) {
        if (buffered.start(buffered.length - 1 - i) < currentTime) {
          this.setState({ bufferedPercentage: (buffered.end(buffered.length - 1 - i) / duration) * 100 })
          break
        }
      }
    }
  }

  _formatTime = timeInSeconds => {
    const formattedTime = isFinite(timeInSeconds) ? timeInSeconds : 0
    const t = new Date(Math.abs(formattedTime) * 1000).toISOString().substr(11, 8),
      time = {
        hours: t.substr(0, 2),
        minutes: t.substr(3, 2),
        seconds: t.substr(6, 2),
      }
    return parseInt(time.hours, 10) > 0 ? t : `${time.minutes}:${time.seconds}`
  }

  _updateSeekTooltip = event => {
    const player = this.props.player,
      video = player && player.getMediaElement()

    const seek = this._getElementById('vpcc-seek'),
      duration = Math.round(_get(video, 'duration', 0)),
      isPreroll = _get(this.props, 'isPreroll', false),
      isLive = player && player.isLive()

    if (video && !isPreroll && !isLive) {
      const seekTooltip = this._getElementById('vpcc-seek-tooltip')
      const skipTo = Math.round((event.offsetX / event.target.clientWidth) * duration)

      seek.setAttribute('data-seek', skipTo)
      seekTooltip.textContent = this._formatTime(skipTo)

      const rect = video.getBoundingClientRect()

      if (this.isFullscreen()) {
        seekTooltip.style.left = `${event.pageX - rect.left - rect.height * 0.0875}px`
      } else {
        seekTooltip.style.left = `${event.pageX - rect.left - rect.height * 0.0875}px`
      }
    }
  }

  _updateSeekValue = event => {
    const skipTo = event.target.value

    const player = this.props.player,
      video = player && player.getMediaElement()

    const isPreroll = _get(this.props, 'isPreroll', false),
      isLive = player && player.isLive()

    if (video && !isPreroll && !isLive && this.props.config.seekBarEnabled) {
      this.setState({ currentTime: skipTo }) /** ignore supaya responsive */
      video.currentTime = skipTo
    }
  }

  /**
   * @name local storage identifier type String
   * @payload type Object/JSON
   */
  _updateLocalStorage = (name, payload) => {
    try {
      const oldPayload = JSON.parse(localStorage.getItem(name))
      if (oldPayload) {
        localStorage.setItem(name, JSON.stringify({ ...oldPayload, ...payload }))
      } else {
        localStorage.setItem(name, JSON.stringify(payload))
      }
    } catch (err) {}
  }

  _updateVolume = e => {
    const player = this.props.player,
      video = player && player.getMediaElement()

      const volume = this._getElementById('vpcc-volume')

    if (video) {
      if (video.muted) {
        video.muted = false
      }
      this.setState({ volume: e.target.value }) /** ignore supaya responsive */
      video.volume = e.target.value

      this._updateLocalStorage('player-volume-info', {
        volume: video.volume,
        muted: video.muted,
      })
    }
  }

  _toggleMute = () => {
    const player = this.props.player,
      video = player && player.getMediaElement()

    const volume = this._getElementById('vpcc-volume')

    if (video && this.props.config.toggleMuteEnabled) {
      this._debounce(() => {
        video.muted = !video.muted

        if (video.muted) {
          // console.log(tappingCount)
          tappingCount = 0
          volume.setAttribute('data-volume', volume.value)
          video.volume = 0
        } else {
          // console.log(tappingCount)
          tappingCount = 0
          video.volume = volume?.dataset?.volume ?? 1
        }

        this._updateLocalStorage('player-volume-info', {
          volume: video.volume,
          muted: video.muted,
        })
        this.setState({ isMuteFeedbackHidden: true })
      }, 500)
      this.setState({ isMuteFeedbackHidden: false })
    }
  }

  _togglePlayPause = () => {
    const player = this.props.player,
      video = player && player.getMediaElement()

    // console.log(video)
    if (video && this.props.config.togglePlayPauseEnabled) {
      this._debounce(() => {
        // console.log(tappingCount)
        tappingCount = 0
        if (video.paused || video.ended) {
          video.play() /* end seeking */
        } else {
          video.pause()
        }

        this.setState({ isPlayPauseFeedbackHidden: true })
      }, 500)
      this.setState({ isPlayPauseFeedbackHidden: false })
    }
  }

  _toggleFullscreen = () => {
    const player = this.props.player,
      video = player && player.getMediaElement()

    /* View in fullscreen */
    const openFullscreen = () => {
      if (video.parentNode.requestFullscreen) {
        video.parentNode.requestFullscreen()
      } else if (video.parentNode.mozRequestFullScreen) {
        /* Firefox */
        video.parentNode.mozRequestFullScreen()
      } else if (video.parentNode.webkitRequestFullscreen) {
        /* Chrome, Safari and Opera */
        video.parentNode.webkitRequestFullscreen()
      } else if (video.parentNode.msRequestFullscreen) {
        /* IE/Edge */
        video.parentNode.msRequestFullscreen()
      }
    }

    /* Close fullscreen */
    const closeFullscreen = () => {
      if (document.exitFullscreen) {
        document.exitFullscreen()
      } else if (document.mozCancelFullScreen) {
        /* Firefox */
        document.mozCancelFullScreen()
      } else if (document.webkitExitFullscreen) {
        /* Chrome, Safari and Opera */
        document.webkitExitFullscreen()
      } else if (document.msExitFullscreen) {
        /* IE/Edge */
        document.msExitFullscreen()
      }
    }

    if (this.props.config.toggleFullscreenEnabled) {
      this._debounce(() => {
        // console.log(tappingCount)
        tappingCount = 0
        if (video) this.isFullscreen() ? closeFullscreen() : openFullscreen()

        this.setState({ isfullscreenFeedbackHidden: true })
      }, 500)
      this.setState({ isfullscreenFeedbackHidden: false })
    }
  }

  /* outer height and inner height available by browsers default */
  isFullscreen = () => {
    return document.fullscreenElement != null
  }

  _updateQuality = id => {
    const player = this.props.player,
      { qualities } = this.state

    const q = qualities.map((pq, index) => {
      if (pq.id === id) {
        // console.log(pq, id)
        this._setQuality(id)
        return { ...pq, active: true }
      }
      return { ...pq, active: false }
    })

    if (player) {
      this._toggleQualityPopup()
      this.setState({ qualities: q })
    }
  }

  _toggleQualityPopup = () => {
    const quality = this._getElementById('vpcc-quality'),
      qualityPopupEl = _get(quality, 'children[0]', '')

    if (qualityPopupEl) {
      qualityPopupEl.style.display = qualityPopupEl.style.display === 'grid' ? 'none' : 'grid'
    }

    /** make sure subtitle popup is closed */
    const subtitle = this._getElementById('vpcc-subtitle'),
      subtitlePopupEl = _get(subtitle, 'children[0]', '')

    if (subtitlePopupEl) {
      subtitlePopupEl.style.display = 'none'
    }
  }

  _updateSubtitle = id => {
    const player = this.props.player,
      { subtitles } = this.state

    const filteredSubs = subtitles.map(s => {
      if (s.id === id) this._setSubtitle(s.id)
      return {
        ...s,
        active: s.id === id,
      }
    })

    if (player) {
      // player.audioTracks = id
      // player.textTrack = id
      // player.internalSetTextTrack(id) //legacy on 2.0.7
      this._toggleSubtitlePopup()
      this.setState({ subtitles: filteredSubs })
    }
  }

  _toggleSubtitlePopup = () => {
    const subtitle = this._getElementById('vpcc-subtitle'),
      subtitlePopupEl = _get(subtitle, 'children[0]', '')

    if (subtitlePopupEl) {
      subtitlePopupEl.style.display = subtitlePopupEl.style.display === 'grid' ? 'none' : 'grid'
    }

    /** make sure quality popup is closed */
    const quality = this._getElementById('vpcc-quality'),
      qualityPopupEl = _get(quality, 'children[0]', '')

    if (qualityPopupEl) {
      qualityPopupEl.style.display = 'none'
    }
  }

  _seekToLive = () => {
    const player = this.props.player
    if (player) {
      // console.log('_seekToLive', player.isLive())
      const video = player && player.getMediaElement()
      if (video) {
        // console.log('video', video, video.currentTime)
        video.currentTime = player.seekRange().end
      }
    }
  }

  _seekTo = n => {
    const player = this.props.player,
      isLive = player && player.isLive()

    if (player && !isLive) {
      const video = player && player.getMediaElement()
      if (video && this.props.config.seekBarEnabled) {
        video.pause() /* start seeking */
        this._debounce(() => {
          // console.log(tappingCount)
          if (video.currentTime + tappingCount * n < 0) {
            video.currentTime = 0
          } else if (video.currentTime + tappingCount * n > video.duration) {
            video.currentTime = video.duration
          } else {
            video.currentTime += tappingCount * n
          }

          tappingCount = 0
          video.play() /* end seeking */

          this.setState({ isSkipFeedbackHidden: true, skippedDuration: 0 })
        }, 500)

        this.setState({ isSkipFeedbackHidden: false, skippedDuration: tappingCount * n })
      }
    }
  }

  _debounce = fn => {
    clearTimeout(tappingTimer)
    if (fn) {
      tappingCount += 1
      tappingTimer = setTimeout(fn, 500)
    }
  }

  _skipVideo = r => {
    if (r && r.id) {
      if (window) {
        /** globalHistory is your custom history object, not default window.history from browser */
        if (window.globalHistory) {
          window.globalHistory.push(`/watch?v=${r.id}&autoplay=1`)
        } else {
          window.location.href = `/watch?v=${r.id}&autoplay=1`
        }
      }
    }
  }

  renderFeedback = () => {
    const player = this.props.player,
      video = player && player.getMediaElement(),
      isPaused = _get(video, 'paused', false),
      isMuted = _get(video, 'muted', false)
    const {
      isMuteFeedbackHidden,
      isPlayPauseFeedbackHidden,
      isSkipFeedbackHidden,
      skippedDuration,
      isfullscreenFeedbackHidden,
    } = this.state
    return (
      <Feedback onClick={this.handleFeedbackOnClick}>
        {!isSkipFeedbackHidden && (
          <button>{skippedDuration > 0 ? `+${skippedDuration}s` : `${skippedDuration}s`}</button>
        )}
        {!isPlayPauseFeedbackHidden && <button>{isPaused ? 'PLAY' : 'PAUSE'}</button>}
        {!isMuteFeedbackHidden && <button>{isMuted ? 'UNMUTE' : 'MUTED'}</button>}
        {!isfullscreenFeedbackHidden && (
          <button className={'square'}>{this.isFullscreen() ? 'EXIT FULLSCREEN' : 'ENTER FULLSCREEN'}</button>
        )}
      </Feedback>
    )
  }

  renderCue = () => {
    const { cue } = this.state
    const isPreroll = _get(this.props, 'isPreroll', false)
    const isHover = _get(this.props, 'isHover', false)

    return (
      <>
        {!cue.hidden && cue.text && !isPreroll && (
          <CueWrapper className={`${isHover ? '' : 'hide'}`}>
            <ReactMarkdown source={cue.text.replace(/-/g, '—')} escapeHtml={false} />
          </CueWrapper>
        )}
      </>
    )
  }

  render() {
    // console.log(this.props.player)
    // console.log(this.state)
    const player = this.props.player,
      isPreroll = _get(this.props, 'isPreroll', false),
      isLive = player && player.isLive()

    const video = player && player.getMediaElement()
    // if (preroll) console.log(preroll.currentTime)

    const isPaused = _get(video, 'paused', false),
      duration = isFinite(_get(video, 'duration', 0)) ? _get(video, 'duration', 0) : 0,
      currentTime = isFinite(_get(video, 'currentTime', 0)) ? _get(video, 'currentTime', 0) : 0,
      volume = _get(video, 'volume', 0),
      isMuted = _get(video, 'muted', false)
    // console.log(isPreroll, duration, currentTime)
    const { bufferedPercentage, qualities, subtitles } = this.state

    const progressbarPercentage = isLive ? '100%' : `${(currentTime / duration) * 100}%`,
      prerollProgressbarPercentage = `${(currentTime / duration) * 100}%`

    const canShowDuration = (isLive && isPreroll) || !isLive
    // console.log('cue', cue)
    // console.log(currentTime, duration)

    const recommendation = this.props.recommendation

    return (
      <>
        {this.renderFeedback()}
        {this.renderCue()}
        <div
          id={`vpcc-custom-controller-${this.props.id}`}
          refs={node => (this.rootController = node)}
          className={`${container} ${this.props.isHover ? '' : 'hide'}`}
        >
          <div className={'duration'}>
            {isLive && !isPreroll && (
              <p className={'live_text'} onClick={this._seekToLive}>
                LIVE
              </p>
            )}
            {isLive && !isPreroll && (
              <span onClick={this._seekToLive} className={'live_indicator'}>
                <div className={'live_indicator_beckground'} />
              </span>
            )}
            {canShowDuration && this._formatTime(duration - currentTime)}
          </div>
          <div className={'progress'}>
            <div className={'progress_wrapper'}>
              <div
                className={'progressbar_progress'}
                style={{ width: isPreroll ? prerollProgressbarPercentage : progressbarPercentage }}
              >
                {/* <span
                  id="vpcc-seek-dot"
                  className={'progressbar_dot'}
                  style={{ opacity: currentTime / duration === 0 ? 0 : 1 }}
                /> */}
              </div>
              <div
                className={'progressbar_progress_buffer'}
                style={{ width: `${isPreroll ? 0 : bufferedPercentage}%` }}
              ></div>
              <div className={'progressbar_progress_background'}></div>
              <input
                className={'seek'}
                id="vpcc-seek"
                value={currentTime}
                min="0"
                max={duration}
                type="range"
                step="0.01"
                onChange={this._updateSeekValue}
              />
              {!isLive && !isPreroll && (
                <div className={'tooltip'} id="vpcc-seek-tooltip">
                  00:00
                </div>
              )}
            </div>
          </div>

          <div className={'bottom_left_section'}>
            <Icons
              className={`${!isPaused ? 'pauseIcon' : 'playIcon'} ${
                this.props.config.togglePlayPauseEnabled ? '' : 'disabled'
              }`}
              onClick={this._togglePlayPause}
            >
              <div className={'tooltip withTooltip'}>{!isPaused ? 'Pause' : 'Play'} (p)</div>
            </Icons>
            {!isLive && !isPreroll && (
              <>
                <Icons className={`forwardIcon ${this.props.config.seekBarEnabled ? '' : 'disabled'}`} onClick={() => this._seekTo(10)}>
                  <div className={'tooltip withTooltip'}>Forward (⭢)</div>
                </Icons>
                <Icons className={`backwardIcon ${this.props.config.seekBarEnabled ? '' : 'disabled'}`} onClick={() => this._seekTo(-10)}>
                  <div className={'tooltip withTooltip'}>Backward (⭠)</div>
                </Icons>
              </>
            )}
            {recommendation && !isPreroll && (
              <Icons className={'upcommingIcon'} onClick={() => this._skipVideo(recommendation)}>
                <div className={'tooltip withTooltip'}>Skip To Next Video</div>
              </Icons>
            )}
            <div className={'volume'}>
              <Icons
                id="volume-button"
                className={`${isMuted || volume == 0 ? 'mutedIcon' : 'muteIcon'} ${
                  this.props.config.toggleMuteEnabled ? '' : 'disabled'
                }`}
                onClick={this._toggleMute}
              >
                <div className={'tooltip withTooltip'}>{isMuted ? 'Unmute' : 'Mute'} (m)</div>
              </Icons>
              {this.props.config.volumeBarEnabled && (
                <div className={'progress'}>
                  <div className={'progress_wrapper'}>
                    <div className={'progressbar_progress'} style={{ width: `${volume * 100}%` }}>
                      <span className={'progressbar_dot'} style={{ opacity: currentTime / duration === 0 ? 0 : 1 }} />
                    </div>
                    <div className={'progressbar_progress_background'}></div>
                    <VolumeBar>
                      <input
                        className={'slider seek'}
                        id="vpcc-volume"
                        value={volume}
                        type="range"
                        max="1"
                        min="0"
                        step="0.01"
                        onChange={this._updateVolume}
                      />
                    </VolumeBar>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className={'bottom_right_section'}>
            {!isPreroll && qualities.length > 1 && (
              <Icons id="vpcc-quality" className={'gearIcon'} onClick={this._toggleQualityPopup}>
                <div className={'quality_popup'}>
                  <div className={'quality_title'}>Qualities</div>
                  {qualities.map(q => (
                    <div
                      className={`quality_list ${q.active ? 'active' : ''}`}
                      onClick={() => this._updateQuality(q.id)}
                    >
                      {q.active && (
                        <div className={'quality_tick_wrapper'}>
                          <Icons className={'tickIcon'} onClick={this._toggleQualityPopup} />
                        </div>
                      )}
                      {q.height}
                    </div>
                  ))}
                </div>
                {/* <span>{qualities.map(q => q.active && q.height)}</span> */}
              </Icons>
            )}
            {!isPreroll && subtitles.length > 1 && (
              <Icons id="vpcc-subtitle" className={'chatIcon'} onClick={this._toggleSubtitlePopup}>
                <div className={'subtitle_popup'}>
                  <div className={'subtitle_title'}>Subtitles</div>
                  {subtitles.map(sub => (
                    <>
                      {sub.name && (
                        <div
                          className={`subtitle_list ${sub.active ? 'active' : ''}`}
                          onClick={() => this._updateSubtitle(sub.id)}
                        >
                          {sub.active && (
                            <div className={'subtitle_tick_wrapper'}>
                              <Icons className={'tickIcon'} onClick={this._toggleSubtitlePopup} />
                            </div>
                          )}
                          {sub.name}
                        </div>
                      )}
                    </>
                  ))}
                </div>
                {/* <span>{subtitles.map(sub => sub.active && sub.name)}</span> */}
              </Icons>
            )}
            <Icons
              id="vpcc-fullscreen"
              className={`${this.isFullscreen() ? 'exitFullscreenIcon' : 'enterFullscreenIcon'} ${
                this.props.config.toggleFullscreenEnabled ? '' : 'disabled'
              }`}
              onClick={this._toggleFullscreen}
            >
              <div className={'tooltip withTooltip'}>
                {this.isFullscreen() ? 'Exit Fullscreen' : 'Enter Fullscreen'} (f)
              </div>
            </Icons>
          </div>
        </div>
      </>
    )
  }
}

export default CustomController
