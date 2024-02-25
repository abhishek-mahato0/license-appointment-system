export const convertDate = (dateString: Date) => {
    const date = new Date(dateString);
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
  }

  export const capitalizeFirstLetter=(string:string)=> {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  export const getCustomDate=(days:number)=>{
    const date = new Date();
    date.setDate(date.getDate() + days);
    return date;
  }