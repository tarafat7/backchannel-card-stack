
/**
 * Calculates the position, opacity, and z-index for each card in the stack
 */
export const calculateCardPositions = (
  index: number,
  expandedCardIndex: number | null,
  totalCards: number
): { translateY: number; opacity: number; zIndex: number } => {
  // Invert the order for display so first card is on top
  const displayIndex = expandedCardIndex === null ? 
    (totalCards - 1) - index : index;
  
  let translateY = 0;
  let opacity = 1;
  let zIndex = expandedCardIndex === null 
    ? totalCards - index  // In collapsed state, first card has highest z-index
    : (index === expandedCardIndex ? 10 : (index < expandedCardIndex ? 1 : 5 - (index - expandedCardIndex)));
  
  if (expandedCardIndex === null) {
    // When no card is expanded, create a stacked effect showing the top of each card
    // Invert the calculation so first card is on top, later cards peek from underneath
    // Limit the number of visible cards to avoid performance issues
    if (index < 20) {
      translateY = displayIndex * 45; // Stack cards with visible top portions
    } else {
      // Hide cards beyond the first 20 when collapsed to improve performance
      opacity = 0;
      translateY = 2000; // Move them far off-screen
    }
  } else {
    if (index === expandedCardIndex) {
      // This is the expanded card, show it at the top
      translateY = 0;
    } else if (index < expandedCardIndex) {
      // Cards that should be above the expanded card (hidden off-screen)
      translateY = -500;
      opacity = 0;
    } else {
      // Cards that should be below the expanded card, showing their tops
      // Only show a few cards below the expanded one
      if (index < expandedCardIndex + 8) {
        translateY = 250 + ((index - expandedCardIndex) * 45);
      } else {
        opacity = 0;
        translateY = 2000; // Move them far off-screen
      }
    }
  }

  return { translateY, opacity, zIndex };
};
