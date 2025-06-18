import { DeviceType } from "@/types/job-solution/device";
import {
  CameraOutlined,
  DeleteOutlined,
  PaperClipOutlined,
  PlusOutlined,
  SendOutlined,
} from "@ant-design/icons";
import {
  Button,
  Card,
  Collapse,
  Divider,
  Dropdown,
  Flex,
  Input,
  Row,
  Typography,
} from "antd";
import type { MenuProps } from "antd";
import { FC, useEffect, useRef, useState } from "react";
import {
  Controller,
  FormProvider,
  useFieldArray,
  useForm,
} from "react-hook-form";

import dynamic from "next/dynamic";
// import { getCookie } from "cookies-next";
// import { useAppDispatch } from "@/store/redux-hook";
// import { getRemainCredit } from "@/store/slices/userSlice";

const BaseButton = dynamic(
  () => import("@/components/job-solution/BaseButton")
);

const { TextArea } = Input;
const { Paragraph } = Typography;

type FormData = {
  upload: File | null;
  position: { value: string }[];
};

const ResumeExtraction: FC<DeviceType> = (): JSX.Element => {
  // const dispatch = useAppDispatch();
  const formMd = useForm<FormData>({
    mode: "onChange",
    defaultValues: {
      position: [{ value: "" }],
    },
  });
  const uploadRef = useRef<HTMLInputElement | null>(null);
  const captureRef = useRef<HTMLInputElement | null>(null);
  const [isSubmit, setIsSubmit] = useState(false);
  const [activeKey, setActiveKey] = useState<string[]>(["1"]);

  // const authToken = getCookie("token");
  const errors = formMd.formState.errors;

  const { fields, append, remove } = useFieldArray({
    control: formMd.control,
    name: "position",
  });

  const cardStyle: React.CSSProperties = {
    width: "100%",
    maxWidth: 520,
  };

  const items: MenuProps["items"] = [
    {
      label: (
        <Flex gap={8}>
          <PaperClipOutlined />
          <span>อัปโหลด</span>
        </Flex>
      ),
      key: "upload",
    },
    {
      label: (
        <Flex gap={8}>
          <CameraOutlined />
          <span>ถ่ายภาพ</span>
        </Flex>
      ),
      key: "capture",
    },
    {
      label: (
        <Flex gap={8}>
          <PlusOutlined />
          <span>เลือกจากคลัง</span>
        </Flex>
      ),
      key: "upload_from_library",
    },
  ];

  const handleMenuClick: MenuProps["onClick"] = (e) => {
    switch (e.key) {
      case "upload":
        uploadRef.current?.click();
        break;

      case "capture":
        captureRef.current?.click();
        break;

      default:
        break;
    }
  };

  const handleRemoveUploadFile = () => {
    formMd.setValue("upload", null);
    formMd.trigger("upload");
  };

  const handleUplaodFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files?.length) {
      const file = event.target.files[0];
      formMd.setValue("upload", file);
      formMd.trigger("upload");
    }
  };

  const handleAddFiledPosition = () => {
    append({ value: "" });
    formMd.trigger("position");
  };

  const handleRemovePosition = (fieldIndex: number) => {
    remove(fieldIndex);
  };
  const uploadFile = formMd.watch("upload");

  const handleSubmitForm = async (data: FormData) => {
    try {
      // console.log('data',data)
      const formData = new FormData();
      if (data.upload === null) return;
      // console.log('pass: have data',data)
      formData.append("file", data.upload);
      // formData.append('file_id_for_review', data.upload)

      // const { file_id_for_review }:{ file_id_for_review:string } = await fetch(`${process.env.apiURL}/upload/no-auth-for-review-ai-logic`,{
      //   method: "POST",
      //   headers: {
      //     'Authorization': 'Bearer ' + authToken,
      //   },
      //   body: formData,
      // }).then((data) => {
      //   return data.json()
      // }).catch((err) => {
      //   throw err
      // })

      // await fetch(
      //   `https://d46e-2001-44c8-432d-d49b-7cf8-5c8e-9cf3-3987.ngrok-free.app/ai/v1/resumes/extraction/upload/`,
      //   {
      //     method: "POST",
      //     headers: {
      //       Authorization: "Bearer " + authToken,
      //     },
      //     mode: "no-cors",
      //     body: formData,
      //   }
      // )
      //   .then(async (data) => {
      //     // const res = await data.json();
      //     // console.log("data", data, res);
      //     return data.json();
      //   })
      //   .catch((err) => {
      //     throw err;
      //   });

      // if(!file_id_for_review) throw new Error("unsuccess upload")
      // const { file_id_for_review }:{ file_id_for_review:string } = await fetch(`${process.env.apiURL}/upload/no-auth-for-review-ai-logic`,{
      //   method: "POST",
      //   headers: {
      //     'Authorization': 'Bearer ' + authToken,
      //   },
      //   body: formData,
      // }).then((data) => {
      //   return data.json()
      // }).catch((err) => {
      //   throw err
      // })
      // console.log('pass: upload file', file_id_for_review)
      setIsSubmit(true);
    } catch (err) {
      console.error("err", err);
    } finally {
      // dispatch(getRemainCredit());
    }
  };

  // console.log("authToken", authToken);

  const handleActiveKeyCollapse = (activeKey: string[]) => {
    setActiveKey(activeKey);
  };

  useEffect(() => {
    formMd.trigger();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // console.log(isSubmit, "setIsSubmit");

  return (
    <Card style={cardStyle}>
      <FormProvider {...formMd}>
        <form onSubmit={formMd.handleSubmit(handleSubmitForm)}>
          <Flex vertical>
            <Flex vertical gap={24} hidden={isSubmit}>
              <Flex vertical>
                <h1 className="font-medium text-[24px] sm:text-[24px] leading-[48px] text-[#1A34FF]">
                  เพิ่มข้อมูลผู้สมัคร
                </h1>
                {uploadFile ? (
                  <Card styles={{ body: { padding: "8px" } }}>
                    <Flex gap={8} justify="space-between" align="center">
                      <span>{uploadFile.name}</span>

                      <Button
                        htmlType="button"
                        type="text"
                        color="danger"
                        onClick={handleRemoveUploadFile}
                      >
                        <DeleteOutlined />
                      </Button>
                    </Flex>
                  </Card>
                ) : (
                  <Dropdown
                    menu={{
                      items,
                      onClick: handleMenuClick,
                    }}
                    trigger={["click"]}
                    placement="bottomRight"
                    overlayClassName="!min-w-[10rem]"
                  >
                    <BaseButton
                      type="default"
                      color="danger"
                      style={{ minHeight: "3rem" }}
                    >
                      <PlusOutlined />
                      <span>อัปโหลด</span>
                    </BaseButton>
                  </Dropdown>
                )}

                {/* Control File Input */}
                <label title="file"></label>
                <input
                  title="file"
                  type="file"
                  style={{ display: "none" }}
                  ref={(e) => {
                    uploadRef.current = e;
                    formMd.register("upload", {
                      validate: (file) => {
                        if (file) {
                          return true;
                        } else {
                          return "โปรดอัปโหลดรูปภาพ";
                        }
                      },
                    });
                  }}
                  onChange={handleUplaodFile}
                />
                <label title="file"></label>
                <input
                  title="file"
                  type="file"
                  capture="environment"
                  style={{ display: "none" }}
                  ref={(e) => {
                    captureRef.current = e;
                    formMd.register("upload", {
                      validate: (file) => {
                        if (file) {
                          // console.log(file, "file");
                          return true;
                        } else {
                          // console.log(file, "file");
                          return "check";
                        }
                      },
                    });
                  }}
                  onChange={handleUplaodFile}
                />
              </Flex>

              <Flex vertical gap={16}>
                <Flex justify="space-between" align="center">
                  <h1 className="font-medium text-[24px] sm:text-[24px] leading-[48px] text-[#1A34FF]">
                    เพิ่มข้อมูลตำแหน่งงาน
                  </h1>

                  <Flex gap={16}>
                    <Button
                      type="default"
                      htmlType="button"
                      onClick={handleAddFiledPosition}
                    >
                      <PlusOutlined />
                    </Button>
                  </Flex>
                </Flex>

                {/* <TextArea rows={4} placeholder="เพิ่มข้อมูลตำแหน่งงาน" /> */}

                {fields.map((field, index, array) => {
                  return (
                    <Controller
                      key={field.id}
                      control={formMd.control}
                      name={`position.${index}.value`}
                      rules={{ required: "โปรดกรอกตำแหน่งงาน" }}
                      render={({ field: { onChange, onBlur, value, ref } }) => (
                        <Row justify={"end"} style={{ gap: 16 }}>
                          <BaseButton
                            type="default"
                            htmlType="button"
                            disabled={array.length === 1}
                            onClick={() => {
                              handleRemovePosition(index);
                            }}
                          >
                            <DeleteOutlined />
                          </BaseButton>
                          <TextArea
                            rows={4}
                            placeholder="เพิ่มข้อมูลตำแหน่งงาน"
                            onChange={onChange}
                            onBlur={onBlur}
                            value={value}
                            ref={ref}
                          />
                        </Row>
                      )}
                    />
                  );
                })}
              </Flex>
            </Flex>

            <Flex vertical gap={16}>
              {isSubmit ? <Divider style={{ margin: 0 }} /> : <Divider />}

              <Flex vertical hidden={!isSubmit} gap={16}>
                <Card>
                  <h1 className="text-2xl font-medium text-[24px] sm:text-[24px] leading-[48px] text-[#1A34FF]">
                    ผลลัพธ์การสรุปข้อมูลของผู้สมัคร
                  </h1>
                  <Collapse
                    onChange={handleActiveKeyCollapse}
                    defaultActiveKey={["1"]}
                    ghost
                    expandIconPosition="end"
                    activeKey={activeKey}
                    items={[
                      {
                        key: "1",
                        label: (
                          <Paragraph
                            ellipsis={
                              activeKey.length > 0
                                ? false
                                : {
                                    rows: 1,
                                    expandable: true,
                                    symbol: "",
                                  }
                            }
                          >
                            Lorem Ipsum is simply dummy text of the printing and
                            typesetting industry.
                          </Paragraph>
                        ),
                        children: (
                          <span>
                            Lorem Ipsum has been the industry standard dummy
                            text ever since the 1500s, when an unknown printer
                            took a galley of type and scrambled it to make a
                            type specimen book. It has survived not only five
                            centuries, but also the leap into electronic
                            typesetting, remaining essentially unchanged. It was
                            popularised in the 1960s with the release of
                            Letraset sheets containing Lorem Ipsum passages, and
                            more recently with desktop publishing software like
                            Aldus PageMaker including versions of Lorem Ipsum.
                          </span>
                        ),
                      },
                    ]}
                  />
                </Card>
              </Flex>

              {isSubmit && (
                <BaseButton
                  htmlType="button"
                  type="default"
                  style={{ minHeight: "3rem" }}
                  onClick={() => {
                    setIsSubmit(false);
                  }}
                >
                  ย้อนกลับ
                </BaseButton>
              )}

              {!isSubmit && (
                <BaseButton
                  type="default"
                  style={{ minHeight: "3rem" }}
                  disabled={Object.keys(errors).length > 0}
                  htmlType="submit"
                >
                  <SendOutlined />
                  <span>ส่งข้อมูล</span>
                </BaseButton>
              )}
            </Flex>
          </Flex>
        </form>
      </FormProvider>
    </Card>
  );
};

export default ResumeExtraction;
