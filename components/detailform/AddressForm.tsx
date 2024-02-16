"use client";
import React, { useEffect } from "react";
import { peraddressData, temporaryaddressData } from "./FormData";
import Outline from "../common/FormDetail/Outline";
import { ChevronRight } from "lucide-react";
import { Button } from "../ui/button";
import { provinces } from "../data/ProvinceList";
import { districtList } from "../data/DistrictList";
import { municipalityList } from "../data/MunicipalityList";
import { useToast } from "../ui/use-toast";
import { useAppDispatch, useAppSelector } from "@/redux/TypedHooks";
import { useRouter } from "next/navigation";
import { apiinstance } from "@/services/Api";
import { useSession } from "next-auth/react";
import { Updatelocalstorage } from "@/utils/Updatelocalstorage";

export default function AddressForm() {
  const { data: session } = useSession();
  const { toast } = useToast();
  const { personalInformation } = useAppSelector(
    (state) => state.profileInformation
  );
  const router = useRouter();
  const [temdistrict, setTemDistrict] = React.useState<any>(
    districtList.filter((item) => item.province === "province1")[0]?.districts
  );
  const [temmunicipality, setTemMunicipality] = React.useState<any>(
    municipalityList
      .filter((item) => item.province === "province1")[0]
      .data.filter((item: any) => item.district === "bhojpur")[0].municipalities
  );

  const [perdistrict, setPerDistrict] = React.useState<any>(
    districtList.filter((item) => item.province === "province1")[0]?.districts
  );
  const [permunicipality, setPerMunicipality] = React.useState<any>(
    municipalityList
      .filter((item) => item.province === "province1")[0]
      .data.filter((item: any) => item.district === "bhojpur")[0].municipalities
  );

  const [permanentAddress, setPermanentAddress] = React.useState<any>({
    province: "province1",
    district: "bhojpur",
    municipality: "",
    ward: "",
    tole: "",
    city: "",
  });
  const [temporaryaddress, setTemporaryAddress] = React.useState<any>({
    province: "province1",
    district: "bhojpur",
    municipality: "",
    ward: "",
    tole: "",
    city: "",
  });

  const handlePersonalData = async () => {
    if (
      !permanentAddress.province ||
      !permanentAddress.district ||
      !permanentAddress.municipality ||
      !permanentAddress.ward ||
      !permanentAddress.tole ||
      !permanentAddress.city ||
      !temporaryaddress.province ||
      !temporaryaddress.district ||
      !temporaryaddress.municipality ||
      !temporaryaddress.ward ||
      !temporaryaddress.tole ||
      !temporaryaddress.city
    ) {
      return Object.keys(permanentAddress).map((item) => {
        if (!permanentAddress[item]) {
          return toast({
            title: "Error",
            description: item + " is required field.",
          });
        } else if (!temporaryaddress[item]) {
          return toast({
            title: "Error",
            description: item + " is required.",
          });
        }
      });
    }
    if (Object.keys(personalInformation).length === 0) {
      toast({
        title: "Error",
        description: "Please fill personal information first.",
      });
      return router.push("personal/");
    }
    try {
      const addressInformation = { permanentAddress, temporaryaddress };
      const res = await apiinstance.post(
        `/user/information/${session?.user?.id}/personal`,
        { personalInformation, addressInformation }
      );
      if (res.status === 200) {
        toast({
          title: "Success",
          description: res.data.message,
          variant: "success",
        });
        Updatelocalstorage({ information_id: res.data._id });
        return router.push("citizenship/");
      } else {
        return toast({
          title: "Error",
          description: res.data.message,
        });
      }
    } catch (error: any) {
      console.log("err", error);
      return toast({
        title: "Error",
        description: error.message,
      });
    }
  };

  useEffect(() => {
    setPerDistrict(
      districtList.filter(
        (item) => item.province === permanentAddress.province
      )[0]?.districts
    );

    setPerMunicipality(
      municipalityList
        .filter((item) => item?.province === permanentAddress.province)[0]
        ?.data.filter(
          (item: any) => item.district === permanentAddress?.district
        )[0]?.municipalities
    );
  }, [permanentAddress]);

  useEffect(() => {
    setTemDistrict(
      districtList.filter(
        (item) => item.province === temporaryaddress.province
      )[0]?.districts
    );

    setTemMunicipality(
      municipalityList
        .filter((item) => item?.province === temporaryaddress.province)[0]
        ?.data.filter(
          (item: any) => item.district === temporaryaddress?.district
        )[0]?.municipalities
    );
  }, [temporaryaddress]);
  return (
    <div className=" flex flex-col w-full">
      <div className=" w-[100%] bg-custom-50 p-8 gap-8 flex flex-col">
        <Outline title="Permanent Address">
          <div className="grid grid-cols-3 gap-3 items-center justify-between w-full px-3 py-2">
            {peraddressData.map((item: any) => {
              return (
                <div className=" flex flex-col gap-1 items-start justify-start">
                  {item.type === "select" ? (
                    <>
                      <label>{item.placeholder}</label>
                      <select
                        className=" py-1 px-2 rounded-[6px] w-[90%] bg-custom-50 border-[1px] border-custom-100"
                        onChange={(e) =>
                          setPermanentAddress({
                            ...permanentAddress,
                            [item.name]: e.target.value,
                          })
                        }
                        required
                        value={permanentAddress[item.name]}
                      >
                        {item?.option === "pdistrict"
                          ? perdistrict?.map((option: any) => {
                              return (
                                <option value={option.value}>
                                  {option.name}
                                </option>
                              );
                            })
                          : item?.option === "pmunicipality"
                          ? permunicipality?.map((option: any) => {
                              return (
                                <option value={option.value}>
                                  {option.name}
                                </option>
                              );
                            })
                          : provinces.map((option: any) => {
                              return (
                                <option value={option.value}>
                                  {option.name}
                                </option>
                              );
                            })}
                      </select>
                    </>
                  ) : (
                    <>
                      <label>{item.placeholder}</label>
                      <input
                        placeholder={item.placeholder}
                        className=" w-[90%] py-1 px-2 rounded-[6px] bg-custom-50 border-custom-150 border-[1px] outline-1 focus:outline-none outline-custom-100"
                        type={item.type}
                        onChange={(e) =>
                          setPermanentAddress({
                            ...permanentAddress,
                            [item.name]: e.target.value,
                          })
                        }
                        required
                        value={permanentAddress[item.name]}
                      />
                    </>
                  )}
                </div>
              );
            })}
          </div>
        </Outline>
        <Outline title="Temporary Address">
          <div className=" w-full items-center justify-end flex px-3 -mt-3">
            <p
              className=" text-xs py-1 px-2 bg-custom-150 text-white cursor-pointer"
              onClick={() => setTemporaryAddress(permanentAddress)}
            >
              Same as Permanent Address
            </p>
          </div>
          <div className="grid grid-cols-3 gap-3 items-center justify-between w-full px-3 py-2">
            {temporaryaddressData.map((item: any) => {
              return (
                <div className=" flex flex-col gap-1 items-start justify-start">
                  {item.type === "select" ? (
                    <>
                      <label>{item.placeholder}</label>
                      <select
                        className=" py-1 px-2 rounded-[6px] w-[90%] bg-custom-50 border-[1px] border-custom-100"
                        onChange={(e) =>
                          setTemporaryAddress({
                            ...temporaryaddress,
                            [item.name]: e.target.value,
                          })
                        }
                        value={temporaryaddress[item.name]}
                      >
                        {item?.option === "tdistrict"
                          ? temdistrict?.map((option: any) => {
                              return (
                                <option value={option.value}>
                                  {option.name}
                                </option>
                              );
                            })
                          : item?.option === "tmunicipality"
                          ? temmunicipality?.map((option: any) => {
                              return (
                                <option value={option.value}>
                                  {option.name}
                                </option>
                              );
                            })
                          : provinces.map((option: any) => {
                              return (
                                <option value={option.value}>
                                  {option.name}
                                </option>
                              );
                            })}
                      </select>
                    </>
                  ) : (
                    <>
                      <label>{item.placeholder}</label>
                      <input
                        placeholder={item.placeholder}
                        className=" w-[90%] py-1 px-2 rounded-[6px] bg-custom-50 border-custom-150 border-[1px] outline-1 focus:outline-none outline-custom-100"
                        type={item.type}
                        onChange={(e) =>
                          setTemporaryAddress({
                            ...temporaryaddress,
                            [item.name]: e.target.value,
                          })
                        }
                        value={temporaryaddress[item.name]}
                      />
                    </>
                  )}
                </div>
              );
            })}
          </div>
        </Outline>
        <div className=" flex items-center justify-end w-full">
          <Button className=" rounded-sm" onClick={handlePersonalData}>
            Save
            <p>
              <ChevronRight width={17} />
            </p>
          </Button>
        </div>
      </div>
    </div>
  );
}
