class CarouselPlugin {
  constructor( args ) {
    const wrapperContainers = document.querySelectorAll( '.carousel-wrapper' )

    this.Events( wrapperContainers, args )
  }

  Events( WrapperContainers, Args ) {
    const AddStylesToCarouselContainer = ( CarouselContainer, Gap ) => {
      CarouselContainer.style.paddingRight = `${ Gap }rem`
      CarouselContainer.style.scrollPaddingLeft = `${ Gap }rem`
    }

    const AddStylesToAllCards = ( Cards, CardsWidth, Gap ) => {
      Cards.forEach(( Card, Index ) => {
        Card.style.width = `${ CardsWidth }rem`
        
        Card.style.marginRight = `${ Gap }rem`

        if ( Index === 0 ) {
          Card.style.marginLeft = `${ Gap }rem`
        }
        if ( Index === Cards.length - 1 ) {
          Card.style.marginRight = 0
        }
      })
    }

    const AddEventListeners = ( NavigationButtons, CarouselContainer, CardsWidth ) => {
      NavigationButtons.forEach(Button => {
        if ( Button.classList.contains( 'navigation-button-left' ) ) {
          Button.addEventListener('click', () => {
            CarouselContainer.scrollLeft -= CardsWidth * 16
          })
        } else if ( Button.classList.contains( 'navigation-button-right' ) ) {
          Button.addEventListener('click', () => {
            CarouselContainer.scrollLeft += CardsWidth * 16
          })
        }
      })
    }

    WrapperContainers.forEach(WrapperContainer => {
      const carouselContainer = WrapperContainer.querySelector( '.carousel-container' )
      const cards = carouselContainer.querySelectorAll( '.card' )
      const navigationButtons = WrapperContainer.querySelectorAll( '.navigation-button' )

      function Events() {
        const carouselContainerWidth = carouselContainer.getBoundingClientRect().width / 16
        const cardsWidth = ( carouselContainerWidth - ( ( Args.gap * 2 ) + ( Args.gap * ( Args.numberOfActiveItems - 1 ) ) ) ) / Args.numberOfActiveItems      
  
        AddStylesToCarouselContainer( carouselContainer, Args.gap )
        AddStylesToAllCards( cards, cardsWidth, Args.gap )
        AddEventListeners( navigationButtons, carouselContainer, cardsWidth )
      }

      Events()
      window.onresize = Events
    })
  }
}