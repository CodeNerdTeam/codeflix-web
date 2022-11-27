import { IoIosArrowForward } from "react-icons/io";
import { MdPayment } from "react-icons/md";

function AddPaymentMethod() {
  return (
    <div>
      <div className="h-auto visible mx-auto mt-6 mb-3 max-w-[1032px] py-0 px-6 relative align-baseline text-[100%] border-0 outline-0">
        <div className="font-sans font-normal tracking-normal text-lg">
          <a
            href=""
            className="text-[#5f6368] align-middle inline-block overflow-hidden relative"
            data-target-type="2"
            data-place-name="20"
          >
            <div className="mt-0" data-ui-reference="3008">
              <span>Payment methods</span>
            </div>
          </a>

          <div className="mx-[10px] align-middle inline-block fill-[rgba(0,0,0,.54)] leading-[0] text-[#5f6368]">
            <IoIosArrowForward className="h-5 w-5" />
          </div>

          <div className="text-[#202124] align-middle inline-block overflow-hidden relative">
            <div className="mt-0">
              <span>Add a payment method</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-[1032px] mt-6 mx-auto pb-16 border-0 outline-0 text-[100%] font-sans align-baseline py-0 px-6">
        <div className="text-[rgba(0,0,0,.87)] text-xl font-normal">
          Add a payment method
        </div>
        <div className="max-w-[640px]">
          <div className="Single-option-form-selector my-4 mx-0 self-center flex">
            <div
              className="float-left my-0 mr-6 mb-[2px] left-0 transition-all cursor-pointer text-2xl self-center fill-[rgba(0,0,0,.54)]
        text-[rgba(0,0,0,.54)]"
            >
              <MdPayment />
            </div>

            <div className="text-[rgba(0,0,0,.87)] text-sm w-full mt-0 self-center font-medium">
              <span className="relative align-middle">
                Add a credit or debit card
              </span>
            </div>
          </div>

          <div className="min-h-[48px] relative">
            <div
              className="cursor-pointer inline-block float-left fill-[rgba(0,0,0,.54)] h-6 w-6 mt-6 mr-6 mb-0 ml-0 transition-all
        text-[rgba(0,0,0,.54)] text-2xl text-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24px"
                height="24px"
                viewBox="0 0 24 24"
              >
                <text x={12} y={21} fontSize={24} textAnchor="middle">
                  #
                </text>
              </svg>
            </div>

            <div className="overflow-hidden relative transition">
              <div className="w-full transition-opacity overflow-hidden">
                <div className="overflow-hidden">
                  <div className="relative">
                    <div className="pb-1 relative box-border pt-2 px-0 flex flex-col">
                      <label className="cursor-auto block transition-all text-xs text-[#555] font-semibold">
                        Card number
                      </label>
                      <div className="mt-[1px] mb-[1px] mx-0 relative">
                        <input
                          type="tel"
                          name="cardnumber"
                          maxLength={19}
                          data-is-secure="true"
                          autoComplete="off-card-number"
                          aria-invalid="true"
                          placeholder="Enter your card number"
                          className="text-left font-semibold transition-all shadow-none bg-transparent text-[15px] h-7
                      leading-[27px] w-full align-middle outline-none max-w-none m-0 py-[1px] px-0 text-[rgba(0,0,0,.87)] box-border 
                      block border-b border-solid border-[rgba(0,0,0,.12)] focus:border-[rgb(26,115,232)]"
                        />
                      </div>

                      <div className="mt-6 absolute right-2 z-10 top-0">
                        <div className="ml-[2px] w-[35px] inline-block overflow-hidden">
                          <div className="inline-block">
                            <img
                              src="/visa.png"
                              alt=""
                              className="w-[35px] h-[25px]"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Month - Year - CVC */}
                  <div className="h-auto overflow-hidden mt-3">
                    <div className="justify-start flex items-center flex-wrap">
                      <div className="self-start flex-grow-0">
                        <div className="mr-6">
                          <div className="mb-0 max-w-none align-top inline-block">
                            <div data-date-type="2" data-format="M/yy">
                              {/* Month */}
                              <div className="inline-block w-[50px] align-top">
                                <div className="pb-1 relative box-border px-0 pt-2 flex flex-col">
                                  <label className="max-w-[50px] min-w-[15px] text-xs text-[#555] font-semibold">
                                    MONTH
                                  </label>

                                  <div className="mt-1 mx-0 mb-[1px] relative">
                                    <input
                                      type="tel"
                                      data-is-secure="false"
                                      aria-invalid="true"
                                      name="expirationDate-month"
                                      maxLength={2}
                                      autoComplete="cc-exp-month"
                                      className="text-left font-semibold transition-all shadow-none bg-transparent text-[15px] h-7
                                  leading-[27px] w-full align-middle outline-none max-w-none m-0 py-[1px] px-0 text-[rgba(0,0,0,.87)] box-border 
                                  block border-b border-solid border-[rgba(0,0,0,.12)] focus:border-[rgb(26,115,232)]"
                                    />
                                  </div>
                                </div>
                              </div>

                              <span className="inline-block leading-[70px] mt-[6px] mx-1 mb-0 align-top text-sm text-[#555] ">
                                /
                              </span>

                              {/* Year */}
                              <div className="inline-block w-[50px] align-top">
                                <div className="pb-1 relative box-border px-0 pt-2 flex flex-col">
                                  <label className="max-w-[50px] min-w-[15px] text-xs text-[#555] font-semibold">
                                    YEAR
                                  </label>

                                  <div className="mt-1 mx-0 mb-[1px] relative">
                                    <input
                                      type="tel"
                                      data-is-secure="false"
                                      aria-invalid="true"
                                      name="expirationDate-month"
                                      maxLength={2}
                                      autoComplete="cc-exp-month"
                                      className="text-left font-semibold transition-all shadow-none bg-transparent text-[15px] h-7
                                  leading-[27px] w-full align-middle outline-none max-w-none m-0 py-[1px] px-0 text-[rgba(0,0,0,.87)] box-border 
                                  block border-b border-solid border-[rgba(0,0,0,.12)] focus:border-[rgb(26,115,232)]"
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* CVC */}
                      <div className="flex-grow-0 self-start">
                        <div className="mb-0 max-w-none align-top inline-block">
                          <div className="pb-1 relative box-border px-0 pt-2 flex flex-col">
                            <label className="max-w-[50px] min-w-[15px] text-xs text-[#555] font-semibold">
                              CVC
                            </label>

                            <div className="mt-1 mx-0 mb-[1px] relative">
                              <input
                                type="tel"
                                data-is-secure="false"
                                aria-invalid="true"
                                name="expirationDate-month"
                                maxLength={3}
                                autoComplete="cc-exp-month"
                                className="text-left font-semibold transition-all shadow-none bg-transparent text-[15px] h-7
                                  leading-[27px] w-[80px] align-middle outline-none max-w-none m-0 py-[1px] px-0 text-[rgba(0,0,0,.87)] box-border 
                                  block border-b border-solid border-[rgba(0,0,0,.12)] focus:border-[rgb(26,115,232)]"
                              />

                              <div className="!p-0 absolute right-0 top-1/2 -translate-y-1/2 overflow-hidden z-[2]">
                                <span
                                  className="mb-3 p-5 text-[#616161] inline-block h-[20px] opacity-50 -top-[2px] w-[20px] align-middle cursor-default
                            ml-[5px] relative hover:opacity-100"
                                >
                                  <img
                                    src="/cvc.png"
                                    alt="CVC"
                                    className="max-w-[20px] max-h-[20px] align-bottom"
                                  />
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Cardholder name */}
                  <div className="h-auto overflow-hidden mt-3">
                    <div className="mb-0 max-w-none align-top">
                      <div className="relative box-border pt-2 px-0 pb-[20px] flex flex-col">
                        <label className="text-xs text-[#555] font-semibold">
                          Cardholder name
                        </label>

                        <div className="mt-[2px] mb-[1px] mx-0 relative">
                          <input
                            type="text"
                            name="cardHolderNameField"
                            aria-invalid="false"
                            placeholder="Enter your cardholder name"
                            className="text-left font-semibold transition-all shadow-none bg-transparent text-[15px] h-7
                      leading-[27px] w-full align-middle outline-none max-w-none m-0 py-[1px] px-0 text-[rgba(0,0,0,.87)] box-border 
                      block border-b border-solid border-[rgba(0,0,0,.12)] focus:border-[rgb(26,115,232)]"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Countries */}
                  <div className="h-auto overflow-hidden">
                    <div className="mt-0 max-w-none w-full min-w-[240px] box-border">
                      <div className="transition overflow-hidden">
                        <div className="max-w-none">
                          <div className="relative box-border flex flex-col px-0 pt-2 pb-5">
                            <div className="relative cursor-pointer box-border overflow-hidden w-auto block">
                              <div
                                className="select-none py-[1px] mx-0 mt-[10px] mb-0 h-auto box-border leading-[29px] align-top w-full
                          z-[2] text-left max-w-none bg-none border-none shadow-none font-medium pl-0 rounded-sm text-[#444]
                          cursor-default text-[11px] list-none min-w-[46px] outline-none pr-[18px ] non-text-decoration relative
                          inline-block"
                              >
                                <div
                                  className="w-full whitespace-nowrap overflow-hidden text-ellipsis text-left text-[15px] align-middle
                            my-auto mr-[6px] mb-0 relative inline-block"
                                >
                                  <div className="select-none w-full whitespace-nowrap overflow-hidden text-ellipsis text-[15px]">
                                    <select
                                      name=""
                                      id=""
                                      className="w-full outline-none text-[15px] font-semibold border-b border-solid border-[rgba(0,0,0,.12)] 
                                  text-[rgba(0,0,0,.87)] focus:border-[rgb(26,115,232)]"
                                    >
                                      <option className="options" value="0">
                                        VietNam (VN)
                                      </option>
                                      <option className="options" value="1">
                                        Japan (JP)
                                      </option>
                                    </select>
                                  </div>
                                </div>
                                <div></div>
                              </div>
                            </div>
                          </div>
                          <div></div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Address 1 */}
                  <div className="h-auto overflow-hidden mt-3">
                    <div className="mb-0 max-w-none align-top">
                      <div className="relative box-border pt-2 px-0 pb-[20px] flex flex-col">
                        <label className="text-xs text-[#555] font-semibold">
                          Address 1
                        </label>

                        <div className="mt-[2px] mb-[1px] mx-0 relative">
                          <input
                            type="text"
                            name="AddressField"
                            aria-invalid="false"
                            placeholder="Enter your address 1"
                            className="text-left font-semibold transition-all shadow-none bg-transparent text-[15px] h-7
                      leading-[27px] w-full align-middle outline-none max-w-none m-0 py-[1px] px-0 text-[rgba(0,0,0,.87)] box-border 
                      block border-b border-solid border-[rgba(0,0,0,.12)] focus:border-[rgb(26,115,232)]"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Address 2 */}
                  <div className="h-auto overflow-hidden mt-3">
                    <div className="mb-0 max-w-none align-top">
                      <div className="relative box-border pt-2 px-0 pb-[20px] flex flex-col">
                        <label className="text-xs text-[#555] font-semibold">
                          Address 2
                        </label>

                        <div className="mt-[2px] mb-[1px] mx-0 relative">
                          <input
                            type="text"
                            name="AddressField"
                            aria-invalid="false"
                            placeholder="Enter your address 2"
                            className="text-left font-semibold transition-all shadow-none bg-transparent text-[15px] h-7
                      leading-[27px] w-full align-middle outline-none max-w-none m-0 py-[1px] px-0 text-[rgba(0,0,0,.87)] box-border 
                      block border-b border-solid border-[rgba(0,0,0,.12)] focus:border-[rgb(26,115,232)]"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* City */}
                  <div className="h-auto overflow-hidden mt-3">
                    <div className="mb-0 max-w-none align-top">
                      <div className="relative box-border pt-2 px-0 pb-[20px] flex flex-col">
                        <label className="text-xs text-[#555] font-semibold">
                          City
                        </label>

                        <div className="mt-[2px] mb-[1px] mx-0 relative">
                          <input
                            type="text"
                            name="CityField"
                            aria-invalid="false"
                            placeholder="Enter your city"
                            className="text-left font-semibold transition-all shadow-none bg-transparent text-[15px] h-7
                      leading-[27px] w-full align-middle outline-none max-w-none m-0 py-[1px] px-0 text-[rgba(0,0,0,.87)] box-border 
                      block border-b border-solid border-[rgba(0,0,0,.12)] focus:border-[rgb(26,115,232)]"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Province */}
                  <div className="max-w-none float-left mr-[3%] w-[60%] box-border inline-block m-0 align-top mt-3">
                    <div className="w-full pt-2 px-0 pb-5 box-border block relative overflow-hidden">
                      <label className="text-xs text-[#555] font-semibold">
                        Province
                      </label>

                      <div className="mt-[2px] mb-[1px] mx-0 relative">
                        <input
                          type="text"
                          name="ProvinceField"
                          aria-invalid="false"
                          placeholder="Enter your province"
                          className="text-left font-semibold transition-all shadow-none bg-transparent text-[15px] h-7
                      leading-[27px] w-full align-middle outline-none max-w-none m-0 py-[1px] px-0 text-[rgba(0,0,0,.87)] box-border 
                      block border-b border-solid border-[rgba(0,0,0,.12)] focus:border-[rgb(26,115,232)]"
                        />
                      </div>
                    </div>
                  </div>

                  {/* ZIP code */}
                  <div className="max-w-none float-left w-[37%] box-border inline-block m-0 align-top mt-5">
                    <div className="relative box-border pt-2 px-0 pb-5 flex flex-col">
                      <label className="text-xs text-[#555] font-semibold">
                        ZIP code
                      </label>

                      <div className="mt-[2px] mb-[1px] mx-0 relative">
                        <input
                          type="text"
                          name="ProvinceField"
                          aria-invalid="false"
                          placeholder="Enter your province"
                          className="text-left font-semibold transition-all shadow-none bg-transparent text-[15px] h-7
                      leading-[27px] w-full align-middle outline-none max-w-none m-0 py-[1px] px-0 text-[rgba(0,0,0,.87)] box-border 
                      block border-b border-solid border-[rgba(0,0,0,.12)] focus:border-[rgb(26,115,232)]"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="tracking-wide font-medium text-[13px] leading-4 text-[#5f6368]">
          <div className="mt-5">
            By continuing, you agree to the Codeflix Payments Terms of Service.
            The privacy notice describes how Codeflix treats your data.
          </div>
        </div>

        <div className="mt-12 mb-2">
          {/* Save */}
          <div className="inline-block max-w-full">
            <div
              className="select-none bg-none border-none shadow-none align-top bg-[#1a73e8] text-white normal-case rounded
        text-sm font-medium h-9 tracking-wide leading-9 mr-6 px-6 cursor-pointer inline-block overflow-hidden relative box-border
        outline-0"
            >
              Save
            </div>
          </div>

          {/* Cancel */}
          <a
            href=""
            className="rounded text-sm font-medium h-9 tracking-wide leading-9 mr-6 px-6 normal-case align-top text-[#1a73e8]
        inline-block overflow-hidden relative hover:bg-[rgba(26,115,232,0.039)]"
          >
            <span>Cancel</span>
          </a>
        </div>
      </div>
    </div>
  );
}

export default AddPaymentMethod;
