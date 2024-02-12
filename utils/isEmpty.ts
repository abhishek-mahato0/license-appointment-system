export const areAllObjectsEmpty = (value: Array<object>) => {
    console.log(value, "value")
    let isEmpty = false;
    value.map((item) => {
        if(item){
        if (Object.keys(item).length > 0) {
            Object.values(item).some((val: any) => (val==="" || val===null) && (isEmpty = true))
        }
       
    }
    });
    return isEmpty;
  };