import React, { Component } from 'react'
import _get from 'lodash/get'
import Lazyload from '../lazyload';
import CountDown from './count-down';
import { setMultilineEllipsis } from '../utils/ellipsis';
import {
  playerContainer
} from './upcoming-video.style'

class UpcomingVideo extends Component {
  state = {
    adsHeight: 0,
    adsWidth: 0,
    isFullscreenMobile: false,
  }

  componentDidMount() {
    setMultilineEllipsis('upc-video-title')
    setMultilineEllipsis('upc-video-desc')
  }

  cancelUpcVideo = e => {
    if (this.props.handleCancelVideo) {
      this.props.handleCancelVideo()
    }
    e.preventDefault()
  }

  redirectToNextVideo = videoId => {
    if (window) {
      /** globalHistory is your custom history object, not default window.history from browser */
      if (window.globalHistory) {
        window.globalHistory.push(`/watch?v=${videoId}&autoplay=1`)
      } else {
        window.location.href = `/watch?v=${videoId}&autoplay=1`
      }
    }
  }

  render() {
    const { data, isMobile = false, startInterval = 20 } = this.props
    const { adsWidth, adsHeight, isFullscreenMobile } = this.state
    const playerWidth = adsWidth ? `${adsWidth}px` : '100%'
    const containerBottom = isMobile && !isFullscreenMobile ? {} : { bottom: '0' } //{ bottom: `calc(${adsHeight}px + 7rem)` }
    const thumbnail = _get(data, `images.cover[${isMobile ? 'landscape' : 'portrait'}`, '')

    return (
      <div className={playerContainer} style={{ width: playerWidth }}>
        <div className={'container'} style={containerBottom}>
          <div className={'poster'}>
            <Lazyload src={thumbnail} />
          </div>
          <div className={'content'}>
            <div className={'title'}>
              <p className="upc-video-title">{data.title}</p>
            </div>
            <div className={'desc'}>
              <p className="upc-video-desc">{data.shortDescription}</p>
            </div>
            {!isMobile && (
              <div className={'link'}>
                <a className={'play'} onClick={() => this.redirectToNextVideo(data.id)}>
                  <CountDown startSecond={startInterval} onTimeFinish={() => this.redirectToNextVideo(data.id)} />
                </a>
                <a className={'close'} onClick={this.cancelUpcVideo}>
                  Close
                </a>
              </div>
            )}
          </div>
          {isMobile && (
            <div className={'link'}>
              <a className={'play'} onClick={() => this.redirectToNextVideo(data.id)}>
                <CountDown
                  isMobile={isMobile}
                  startSecond={startInterval}
                  onTimeFinish={() => this.redirectToNextVideo(data.id)}
                />
              </a>
              <a className={'close'} onClick={this.cancelUpcVideo}>
                Close
              </a>
            </div>
          )}
        </div>
      </div>
    )
  }
}

export default UpcomingVideo
