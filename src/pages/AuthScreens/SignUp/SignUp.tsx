import { Flex, Form, Checkbox } from "antd";

import { CustomButton } from "@Components/Button";
import useSignUpContainer from "./SignUpContainer";
import Input from "@Components/TextInput/TextInput";
import { VALIDATE } from "@Constants/validationConstants";
import AuthHeader from "@Components/AuthHeader/AuthHeader";
import ColoredText from "@Components/ColorText/ColorText";
import GoogleAutocomplete from "@Components/GoogleAutocomplete/GoogleAutocomplete";
import utilService from "@Utils/utils.service";
import PictureUpload from "@Components/PictureUpload";

export const MAP_OPTIONS = {
    types: ["address"],
    componentRestrictions: { country: "US" }
};

const SignUp = () => {
    const {
        form,
        handleSubmit,
        handleLoginClick,
        handlePlaceSelect,
        validateIsAgree,
        isSigningUp
    } = useSignUpContainer();

    return (
        <Flex vertical justify="center" className="px-20 py-12 h-full">
            <AuthHeader
                headerTitle="Create an Account"
                subTitle="Create a Seller account to continue"
            />
            <Form
                form={form}
                onKeyDown={(e) => utilService.preventFormSubmitOnSelectingAddress(e)}
                onFinish={handleSubmit}
                scrollToFirstError
                initialValues={{
                    isRemember: false,
                    store: {
                        name: "",
                        address: {
                            city: "",
                            fullAddress: "",
                            country: "",
                            state: "",
                            zipCode: ""
                        }
                    }
                }}
            >
                <Form.Item
                    name="profileImage"
                    className="text-center"
                    rules={[{ required: true, message: "Image is required." }]}
                >
                    <PictureUpload imgClasses={"rounded-full"} isLoading={false} />
                </Form.Item>
                <Form.Item name="firstName" rules={VALIDATE.SELLER_NAME as never}>
                    <Input label="Seller Name" placeholder="Enter seller name" />
                </Form.Item>

                <Form.Item name={["store", "name"]} rules={VALIDATE.STORE_NAME as never}>
                    <Input label="Store Name" placeholder="Enter store name" />
                </Form.Item>
                <Form.Item
                    name={["store", "address", "fullAddress"]}
                    rules={VALIDATE.STORE_ADDRESS as never}
                    shouldUpdate
                >
                    <GoogleAutocomplete
                        label={"Store Address"}
                        inputStyles="course-input"
                        placeholder={"Enter store address"}
                        onLocationSelect={handlePlaceSelect}
                        componentRestrictions={MAP_OPTIONS}
                    />
                </Form.Item>
                <Form.Item
                    name={["store", "address", "street"]}
                    rules={VALIDATE.STORE_ADDRESS_STREET as never}
                >
                    <Input label="Street Address" placeholder="Enter Street Address" />
                </Form.Item>
                <Form.Item
                    name={["store", "address", "city"]}
                    rules={VALIDATE.STORE_ADDRESS_CITY as never}
                >
                    <Input label="City Name" placeholder="Enter city name" />
                </Form.Item>
                <Form.Item
                    validateFirst
                    name={["store", "address", "state"]}
                    rules={VALIDATE.STORE_ADDRESS_STATE as never}
                >
                    <Input label="State Name" placeholder="Enter state name" />
                </Form.Item>
                <Form.Item
                    shouldUpdate
                    name={["store", "address", "country"]}
                    rules={VALIDATE.STORE_ADDRESS_COUNTRY as never}
                >
                    <Input label="Country Name" placeholder="Enter country name" />
                </Form.Item>
                <Form.Item
                    shouldUpdate
                    name={["store", "address", "zipCode"]}
                    rules={VALIDATE.STORE_ADDRESS_POSTAL_CODE as never}
                >
                    <Input label="Postal Code" placeholder="Enter postal code" />
                </Form.Item>
                <Form.Item name="email" rules={VALIDATE.EMAIL as never}>
                    <Input label="Email" placeholder="Enter your email" />
                </Form.Item>
                <Form.Item name="phoneNumber" rules={VALIDATE.PHONE as never}>
                    <Input label="Phone Number" placeholder="Enter phone number" />
                </Form.Item>
                <Form.Item name="password" rules={VALIDATE.PASSWORD_PATTERN as never}>
                    <Input isPassword label="Password" placeholder="Enter your password" />
                </Form.Item>
                <Form.Item
                    name={"isAgree"}
                    rules={[{ validator: validateIsAgree }]}
                    valuePropName="checked"
                >
                    <div className="flex items-start">
                        <Checkbox className="mx-2 mt-[2px]" />
                        <p>
                            By checking the mark, the user agrees to accept the Terms & Conditions
                            and Privacy Policy of the LWO application.
                        </p>
                    </div>
                </Form.Item>
                <Form.Item className="mt-8 text-center">
                    <CustomButton
                        title={"Sign Up"}
                        className="text-base w-[90%]"
                        isLoading={isSigningUp}
                    />
                </Form.Item>
            </Form>
            <p className="text-center text-#202224 text-large font-[500]">
                Already have an account?&nbsp;
                <ColoredText
                    text={"Login"}
                    onClick={handleLoginClick}
                    className="underline cursor-pointer"
                />
            </p>
        </Flex>
    );
};
export default SignUp;
