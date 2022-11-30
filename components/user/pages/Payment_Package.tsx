function Payment_Package() {
  return (
    <div className="mx-3 max-w-[840px] mt-16 p-2 lg:p-12 lg:max-w-[1120px] lg:-ml-[30px] md:p-6 sm:p-4">
      <div className="lg:m-w-[840px]">
        <div className="pt-6" tabIndex={-1}>
          <h1 className="lg:block hidden font-sans text-3xl tracking-normal font-medium text-[rgb(32,33,36)] mt-0 mx-0 mb-2 p-0 text-center">
            Payment and subscription package
          </h1>
          <div className="font-sans text-sm font-normal tracking-wide text-[rgb(95,99,104)] mx-auto m-w-[600px] text-center">
            Your billing, transaction, recurring payments and upgrade
            information
          </div>
        </div>

        <div className="contain-style">
          <section className="pb-[20px] pt-4 md:flex md:items-stretch md:flex-wrap md:-ml-3 md:pt-0 md:w-[calc(100%+24px)] sm:pt-2">
            {/* Payment methods */}
            <div className="relative flex flex-col w-full md:w-full">
              <div
                className="flex flex-grow flex-shrink bg-white rounded-lg border border-solid border-[rgb(218,220,224)] 
              box-border overflow-hidden mt-2 md:mx-3 md:mt-6 sm:mt-4"
              >
                <div className="flex flex-col w-full">
                  <div className="min-h-[1px]">
                    <a
                      href="/account/payment/payment-method"
                      className="p-4 h-auto block bg-none border-none non-text-decoration text-left w-full box-border 
                      text-[rgb(26,115,232)] -outline-offset-4 md:pt-6 md:px-6"
                      data-rid="307"
                      data-nav-type="5"
                    >
                      <div className="flex">
                        <div className="flex flex-col flex-1">
                          <h2
                            className="font-sans text-base tracking-wide text-[rgb(32,33,36)] flex-grow-0 flex-shrink-0 m-0 p-0 
                          md:font-sans md:text-xl md:tracking-normal md:font-normal md:text-[rgb(32,33,36)]"
                          >
                            Payment methods
                          </h2>

                          <div
                            className="font-sans text-sm font-normal tracking-wide text-[rgb(95,99,104)] flex-grow flex-shrink m-0 
                            pt-2 px-0 pb-0"
                          >
                            <div>
                              With Codeflix Pay, you can save your payment
                              information for safer payments online, for
                              Assistants and in-store
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center justify-center flex-grow-0 flex-shrink-0 ml-4">
                          <div className="sm:hidden">
                            <figure
                              className="w-24 h-24 flex items-center justify-center m-0 overflow-hidden p-0"
                              aria-hidden="true"
                            >
                              <img
                                src="/paymentmethods_icon_96x96.png"
                                alt=""
                                aria-hidden="true"
                                data-iml="978"
                                data-atf="false"
                                className="h-full w-auto"
                              />
                            </figure>
                          </div>

                          <div className="hidden sm:flex">
                            <figure className="w-[316px] h-28 flex items-center justify-center m-0 overflow-hidden p-0">
                              <img
                                src="/paymentmethods_scene_316x112.png"
                                aria-hidden="true"
                                data-iml="978.0999999046326"
                                data-atf="true"
                                alt=""
                                className="h-full w-auto"
                              />
                            </figure>
                          </div>
                        </div>
                      </div>
                    </a>
                  </div>

                  <div className="mt-auto min-h-[1px]">
                    <div className="pl-0 md:0 md:pl-6" role="presentation">
                      <div className="border-t-[1px] border-t-[rgb(218,220,224) border-solid]"></div>
                    </div>

                    <div className="will-change relative outline-none overflow-hidden hover:bg-gray-50">
                      <a
                        href="/account/payment/payment-method"
                        data-rid="307"
                        data-nav-type="5"
                        className="h-full block bg-none border-none non-text-decoration text-left w-full box-border -outline-offset-4
                        text-[rgb(26,115,232)] pb-[18px] pt-[17px] px-4 md:pb-[18px] md:pt-[17px] md:px-6"
                      >
                        <div className="font-sans text-sm font-medium tracking-wide text-[rgb(26,115,232)]">
                          Manage payment methods
                        </div>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Transaction */}
            <div className="relative flex flex-col w-full md:w-full">
              <div
                className="flex flex-grow flex-shrink bg-white rounded-lg border border-solid border-[rgb(218,220,224)] 
              box-border overflow-hidden mt-2 md:mx-3 md:mt-6 sm:mt-4"
              >
                <div className="flex flex-col w-full">
                  <div className="min-h-[1px]">
                    <a
                      href="/account/payment/transaction"
                      className="p-4 h-auto block bg-none border-none non-text-decoration text-left w-full box-border 
                      text-[rgb(26,115,232)] -outline-offset-4 md:pt-6 md:px-6"
                      data-rid="307"
                      data-nav-type="5"
                    >
                      <div className="flex">
                        <div className="flex flex-col flex-1">
                          <h2
                            className="font-sans text-base tracking-wide text-[rgb(32,33,36)] flex-grow-0 flex-shrink-0 m-0 p-0 
                          md:font-sans md:text-xl md:tracking-normal md:font-normal md:text-[rgb(32,33,36)]"
                          >
                            Transaction
                          </h2>

                          <div
                            className="font-sans text-sm font-normal tracking-wide text-[rgb(95,99,104)] flex-grow flex-shrink m-0 
                            pt-2 px-0 pb-0"
                          >
                            <div>
                              Your purchases that you make through Codeflix and
                              the Assistant
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center justify-center flex-grow-0 flex-shrink-0 ml-4">
                          <div className="sm:hidden">
                            <figure
                              className="w-24 h-24 flex items-center justify-center m-0 overflow-hidden p-0"
                              aria-hidden="true"
                            >
                              <img
                                src="/purchases_icon_96x96.png"
                                alt=""
                                aria-hidden="true"
                                data-iml="978"
                                data-atf="false"
                                className="h-full w-auto"
                              />
                            </figure>
                          </div>

                          <div className="hidden sm:flex">
                            <figure className="w-[316px] h-28 flex items-center justify-center m-0 overflow-hidden p-0">
                              <img
                                src="/purchases_scene_316x112.png"
                                aria-hidden="true"
                                data-iml="978.0999999046326"
                                data-atf="true"
                                alt=""
                                className="h-full w-auto"
                              />
                            </figure>
                          </div>
                        </div>
                      </div>
                    </a>
                  </div>

                  <div className="mt-auto min-h-[1px]">
                    <div className="pl-0 md:0 md:pl-6" role="presentation">
                      <div className="border-t-[1px] border-t-[rgb(218,220,224) border-solid]"></div>
                    </div>

                    <div className="will-change relative outline-none overflow-hidden hover:bg-gray-50">
                      <a
                        href="/account/payment/transaction"
                        data-rid="307"
                        data-nav-type="5"
                        className="h-full block bg-none border-none non-text-decoration text-left w-full box-border -outline-offset-4
                        text-[rgb(26,115,232)] pb-[18px] pt-[17px] px-4 md:pb-[18px] md:pt-[17px] md:px-6"
                      >
                        <div className="font-sans text-sm font-medium tracking-wide text-[rgb(26,115,232)]">
                          Management transaction
                        </div>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Purchased packages */}
            <div className="relative flex flex-col w-full md:w-full">
              <div
                className="flex flex-grow flex-shrink bg-white rounded-lg border border-solid border-[rgb(218,220,224)] 
              box-border overflow-hidden mt-2 md:mx-3 md:mt-6 sm:mt-4"
              >
                <div className="flex flex-col w-full">
                  <div className="min-h-[1px]">
                    <a
                      href="/account/payment/purchased-packages"
                      className="p-4 h-auto block bg-none border-none non-text-decoration text-left w-full box-border 
                      text-[rgb(26,115,232)] -outline-offset-4 md:pt-6 md:px-6"
                      data-rid="307"
                      data-nav-type="5"
                    >
                      <div className="flex">
                        <div className="flex flex-col flex-1">
                          <h2
                            className="font-sans text-base tracking-wide text-[rgb(32,33,36)] flex-grow-0 flex-shrink-0 m-0 p-0 
                          md:font-sans md:text-xl md:tracking-normal md:font-normal md:text-[rgb(32,33,36)]"
                          >
                            Purchased packages
                          </h2>

                          <div
                            className="font-sans text-sm font-normal tracking-wide text-[rgb(95,99,104)] flex-grow flex-shrink m-0 
                            pt-2 px-0 pb-0"
                          >
                            <div>
                              Your movie packages are being subscribed through
                              Codeflix's service
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center justify-center flex-grow-0 flex-shrink-0 ml-4">
                          <div className="sm:hidden">
                            <figure
                              className="w-24 h-24 flex items-center justify-center m-0 overflow-hidden p-0"
                              aria-hidden="true"
                            >
                              <img
                                src="/subscriptions_icon_96x96.png"
                                alt=""
                                aria-hidden="true"
                                data-iml="978"
                                data-atf="false"
                                className="h-full w-auto"
                              />
                            </figure>
                          </div>

                          <div className="hidden sm:flex">
                            <figure className="w-[316px] h-28 flex items-center justify-center m-0 overflow-hidden p-0">
                              <img
                                src="/subscriptions_scene_316x112.png"
                                aria-hidden="true"
                                data-iml="978.0999999046326"
                                data-atf="true"
                                alt=""
                                className="h-full w-auto"
                              />
                            </figure>
                          </div>
                        </div>
                      </div>
                    </a>
                  </div>

                  <div className="mt-auto min-h-[1px]">
                    <div className="pl-0 md:0 md:pl-6" role="presentation">
                      <div className="border-t-[1px] border-t-[rgb(218,220,224) border-solid]"></div>
                    </div>

                    <div className="will-change relative outline-none overflow-hidden hover:bg-gray-50">
                      <a
                        href="/account/payment/purchased-packages"
                        data-rid="307"
                        data-nav-type="5"
                        className="h-full block bg-none border-none non-text-decoration text-left w-full box-border -outline-offset-4
                        text-[rgb(26,115,232)] pb-[18px] pt-[17px] px-4 md:pb-[18px] md:pt-[17px] md:px-6"
                      >
                        <div className="font-sans text-sm font-medium tracking-wide text-[rgb(26,115,232)]">
                          Manage purchased packages
                        </div>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

export default Payment_Package;
