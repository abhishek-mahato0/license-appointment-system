export function handleFormData(item: any, register: any) {
  switch (item.type) {
    case "select":
      return (
        <>
          <label>{item.placeholder}</label>
          <select
            {...register(item.name, { required: true })}
            className=" py-1 px-2 rounded-[6px] w-[90%] bg-custom-50 border-[1px] border-custom-100"
          >
            {item.options &&
              item?.options.map((option: any) => {
                return <option value={option.value}>{option.name}</option>;
              })}
          </select>
        </>
      );
    default:
      return (
        <>
          <label>{item.placeholder}</label>
          <input
            {...register(item.name, { required: true })}
            placeholder={item.placeholder}
            className=" w-[90%] py-1 px-2 rounded-[6px] bg-custom-50 border-custom-150 border-[1px] outline-1 focus:outline-none outline-custom-100"
            type={item.type}
          />
        </>
      );
  }
}
