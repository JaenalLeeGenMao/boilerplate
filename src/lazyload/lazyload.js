import React, { PureComponent } from 'react'
import { bool, func, object, string, node } from 'prop-types'
import { container, fallbackImgContainer, lazyFade } from './style'
class Lazyload extends PureComponent {
  static propTypes = {
    alt: string,
    className: string,
    containerClassName: string,
    containerStyle: object,
    fadeIn: bool,
    width: string,
    height: string,
    initial: string,
    lazy: bool,
    src: string,
    style: object,
    webp: bool,
    onClick: func,
    children: node,
    onErrorShowDefault: bool,
    onEmptyShowDefault: bool,
    errorImgClassName: string,
    handleCallback: func,
  }

  static defaultProps = {
    alt: '',
    className: '',
    containerClassName: '',
    containerStyle: {},
    fadeIn: true,
    width: '100%',
    height: 'auto',
    initial: '',
    lazy: true,
    onClick: () => { },
    style: {},
    webp: true,
    children: null,
    src: null,
    onErrorShowDefault: false,
    onEmptyShowDefault: false,
    errorImgClassName: '',
    handleCallback: () => { },
  }

  constructor(props) {
    super(props)

    this.image = React.createRef()
    this.state = {
      isLoaded: false,
      sources: props.lazy ? props.initial : props.image,
      widthSet: false,
    }
  }

  componentDidMount() {
    const { src } = this.props
    this.props.handleCallback(false)
    if (src) {
      if (this.props.lazy) {
        if (this.loadPolyfills()) {
          this.initObserver()
        } else {
          this.loadImage(global.webpSupport && this.props.webp)
        }
      } else {
        this.loadImage(global.webpSupport && this.props.webp)
      }
    }
  }

  componentDidUpdate(prevProps) {
    this.props.handleCallback(this.state.load)
    const { src } = this.props
    if (src !== prevProps.src) {
      if (this.props.lazy) {
        if (this.loadPolyfills()) {
          this.initObserver()
        } else {
          this.loadImage(global.webpSupport && this.props.webp)
        }
      } else {
        this.loadImage(global.webpSupport && this.props.webp)
      }
    }
  }

  get dataProps() {
    const dataProps = {}

    Object.entries(this.props).forEach(([key, value]) => {
      if (key.startsWith('data-')) {
        dataProps[key] = value
      }
    })
    return dataProps
  }

  get imageWebPUrl() {
    return `${this.props.src}.webp`
  }

  initObserver = () => {
    const options = {
      threshold: [0.1, 0.5, 0.75, 1.0],
    }

    let io = new IntersectionObserver(entries => {
      const { isIntersecting, intersectionRatio } = entries[0]

      if (isIntersecting && intersectionRatio > 0) {
        this.createImage()
        io.disconnect()
        io = null
      }
    }, options)

    io.observe(this.image.current)
  }

  createImage = () => {
    this.loadImage(global.webpSupport && this.props.webp)
  }

  loadImage = (isWebP = false) => {
    const { src, onErrorShowDefault } = this.props
    const imageUrl = isWebP ? this.imageWebPUrl : src
    const image = new window.Image()
    let error = false

    image.onload = () => {
      if (this.image.current) {
        this.setState({
          sources: imageUrl,
          isLoaded: true
        })
      }
    }
    image.onerror = () => {
      if (isWebP) {
        this.loadImage()
      } else {
        error = true
        if (error && onErrorShowDefault) {
          this.setState({ isError: true, isLoaded: false })
        }
      }
    }
    image.src = imageUrl
  }

  loadPolyfills = () => {
    if (!this.supportsIntersectionObserver()) {
      return false
    }
    return true
  }

  supportsIntersectionObserver = () => {
    return 'IntersectionObserver' in global && 'IntersectionObserverEntry' in global && 'intersectionRatio' in IntersectionObserverEntry.prototype
  }

  render() {
    const { sources, isError, isLoaded } = this.state
    const { alt,
      containerClassName,
      containerStyle,
      style,
      onClick,
      children,
      className,
      src,
      errorImgClassName,
      onEmptyShowDefault,
      onHoverBorder,
      fallbackImageUri
    } = this.props

    const showChildren = children && !src
    return (
      <>
        {showChildren &&
          <div
            className={`${containerClassName || ''} ${container} ${lazyFade}`}
            style={{
              ...containerStyle
            }}
            onClick={onClick}
          >
            {children}
          </div>
        }
        {
          fallbackImageUri && <img src={fallbackImageUri} className={`${fallbackImgContainer} fallbackImg fadeIn`} style={{ opacity: isLoaded ? 0 : 1 }} />
        }
        {!showChildren &&
          <div
            className={`${containerClassName || ''} ${container} imageWrapper ${isLoaded ? 'loaded' : ''}`}
            style={{
              ...containerStyle,
              position: fallbackImageUri ? 'absolute' : 'relative',
              top: 0,
              left: 0
            }}
            onClick={onClick}
          >
            {onHoverBorder && <div className={'imageBorder'}></div>}

            {!isError && <img
              ref={this.image}
              className={`${className || ''} fadeIn`}
              style={{
                ...style,
                opacity: isLoaded ? 1 : 0,
              }}
              src={sources}
              alt={alt}
            />
            }
            {isError && !fallbackImageUri && <div className={`errorBackground ${errorImgClassName || ''}`} />}
          </div>
        }
      </>
    )
  }
}

export default Lazyload
