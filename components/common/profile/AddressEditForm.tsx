"use client";
import React, { useEffect, useRef } from "react";
import { ChevronRight, Edit } from "lucide-react";
import { useAppSelector } from "@/redux/TypedHooks";
import { useRouter } from "next/navigation";
import { apiinstance } from "@/services/Api";
import { useSession } from "next-auth/react";
import { districtList } from "@/components/data/DistrictList";
import { municipalityList } from "@/components/data/MunicipalityList";
import Outline from "../FormDetail/Outline";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  peraddressData,
  temporaryaddressData,
} from "@/components/detailform/FormData";
import { provinces } from "@/components/data/ProvinceList";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

type TAddressInformation = {
  addressInformation: any;
};
export default function AddressEditForm({
  addressInformation,
}: TAddressInformation) {
  const closeref = useRef<any>(null);
  const userInfo = JSON.parse(localStorage.getItem("userInfo") || "{}");
  const { toast } = useToast();
  const { personalInformation } = useAppSelector(
    (state) => state.profileInformation
  );
  const router = useRouter();

  const [temdistrict, setTemDistrict] = React.useState<any>(
    districtList.filter(
      (item) =>
        item.province_code == +addressInformation?.temporaryaddress?.province
    )
  );
  const [temmunicipality, setTemMunicipality] = React.useState<any>(
    municipalityList.filter(
      (item) =>
        item.district_code == addressInformation?.temporaryaddress?.district
    )
  );

  const [perdistrict, setPerDistrict] = React.useState<any>(
    districtList.filter(
      (item) =>
        item.province_code == addressInformation?.permanentAddress?.province
    )
  );
  const [permunicipality, setPerMunicipality] = React.useState<any>(
    municipalityList.filter(
      (item) =>
        item.district_code == addressInformation?.permanentAddress?.district
    )
  );

  const [permanentAddress, setPermanentAddress] = React.useState<any>({
    province: addressInformation?.permanentAddress?.province,
    district: addressInformation?.permanentAddress?.district,
    municipality: addressInformation?.permanentAddress?.municipality,
    ward: addressInformation?.permanentAddress?.ward,
    tole: addressInformation?.permanentAddress?.tole,
    city: addressInformation?.permanentAddress?.city,
  });
  const [temporaryaddress, setTemporaryAddress] = React.useState<any>({
    province: addressInformation?.temporaryaddress?.province,
    district: addressInformation?.temporaryaddress?.district,
    municipality: addressInformation?.temporaryaddress?.municipality,
    ward: addressInformation?.temporaryaddress?.ward,
    tole: addressInformation?.temporaryaddress?.tole,
    city: addressInformation?.temporaryaddress?.city,
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
      const payload = {
        permanent_address: permanentAddress,
        temporary_address: temporaryaddress,
      };
      const res = await apiinstance.put(
        `/user/information/${userInfo?.id}/personal`,
        payload
      );
      if (res.status === 200) {
        closeref.current && closeref.current.click();
        return toast({
          title: "Success",
          description: res.data.message,
          variant: "success",
        });
      }
      return toast({ title: "Error", description: res.data.message });
    } catch (error: any) {
      return toast({
        title: "Error",
        description: error.message,
      });
    }
  };

  useEffect(() => {
    setPerDistrict(
      districtList.filter(
        (item) => item.province_code == permanentAddress.province
      )
    );

    setPerMunicipality(
      municipalityList.filter(
        (item) => item?.district_code == permanentAddress.district
      )
    );
  }, [permanentAddress]);

  useEffect(() => {
    setTemDistrict(
      districtList.filter(
        (item) => item.province_code == temporaryaddress.province
      )
    );

    setTemMunicipality(
      municipalityList.filter(
        (item) => item.district_code == temporaryaddress.district
      )
    );
  }, [temporaryaddress]);
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Edit className="w-6 h-6 text-custom-150 cursor-pointer" />
      </DialogTrigger>
      <DialogContent className=" min-w-fit">
        <DialogHeader>
          <DialogTitle>Edit Address Information</DialogTitle>
          <DialogDescription>
            This is the address information edit form.
          </DialogDescription>
        </DialogHeader>
        <div className=" flex flex-col w-full">
          <div className=" w-[100%] bg-custom-50 p-2 gap-8 flex flex-col">
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
        <DialogFooter className="sm:justify-end">
          <DialogClose asChild>
            <Button
              type="button"
              variant="secondary"
              className=" hidden"
              ref={closeref}
            >
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
