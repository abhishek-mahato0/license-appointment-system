export const customStyles = {
    control: (base: any, state: { isFocused: any; }) => ({
      ...base,
      background: '#e3f2ff',
      // match with the menu
      borderRadius:"3px 3px 0 0",
      // Overwrittes the different states of border
      borderColor: "#0388f8" ,
      // Removes weird border around container
      boxShadow: state.isFocused ? null : null,
      "&:hover": {
        // Overwrittes the different states of border
        borderColor: '#0388f8'
      }
    }),
    menu: (base: any) => ({
      ...base,
      // override border radius to match the box
      borderRadius: 0,
      // kill the gap
      marginTop: 0
    }),
    menuList: (base: any) => ({
      ...base,
      // kill the white space on first and last option
      padding: 0
    })
  };