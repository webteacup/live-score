export const formatDate = (timestamp: number): string => {
    const options: Intl.DateTimeFormatOptions = {
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
    };
  
    const formattedDate = new Intl.DateTimeFormat('en-US', options).format(new Date(timestamp));
    return formattedDate.replace(/(\d+)(st|nd|rd|th)/, (_, day, suffix) => {
      const dayNumber = parseInt(day, 10);
      if (dayNumber >= 11 && dayNumber <= 13) {
        suffix = 'th';
      }
      return day + suffix;
    });
  };