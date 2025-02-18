export const timeConverter = date => {
    try {
      let hours = new Date(date)?.getHours();
      const minutes = new Date(date)?.getMinutes();
      return `${hours}:${minutes} ${Number(hours) > 12 ? `PM` : `AM`}`;
    } catch (error) {
      console.log(error?.message);
    }
  };
  