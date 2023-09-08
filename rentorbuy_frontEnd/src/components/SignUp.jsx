import React from "react";

const SignUp = () => {
  return (
    <>
      <div className="mt-clearNav bg-neutralSilver ">
        <div className="mt-30 px-4 lg:px-14 max-w-screen-2xl mx-auto min-h-screen h-screen  ">
          <section className="p-6 dark:bg-gray-800 dark:text-gray-50">
            <form
              novalidate=""
              action=""
              className="container flex flex-col mx-auto space-y-12"
            >
              <fieldset className="grid grid-cols-4 gap-6 p-6 rounded-md shadow-sm dark:bg-gray-900">
                <div className="space-y-2 col-span-full lg:col-span-1">
                  <p className="font-medium">Personal Inormation</p>
                  <p className="text-xs">
                    Please provide us with personal information for our records.
                    The information given will only be used as needed for
                    administrative purposes. We abide strictly by PDPA
                    guidelines.Your privacy is in our best interest
                  </p>
                </div>
                <div className="grid grid-cols-6 gap-4 col-span-full lg:col-span-3">
                  <div className="col-span-full sm:col-span-3">
                    <label for="firstname" className="text-sm">
                      First name
                    </label>
                    <input
                      id="firstname"
                      type="text"
                      placeholder="First name"
                      className="w-full rounded-md focus:ring focus:ri focus:ri dark:border-gray-700 dark:text-gray-900"
                    />
                  </div>
                  <div className="col-span-full sm:col-span-3">
                    <label for="lastname" className="text-sm">
                      Last name
                    </label>
                    <input
                      id="lastname"
                      type="text"
                      placeholder="Last name"
                      className="w-full rounded-md focus:ring focus:ri focus:ri dark:border-gray-700 dark:text-gray-900"
                    />
                  </div>
                  <div className="col-span-full sm:col-span-3">
                    <label for="email" className="text-sm">
                      Email
                    </label>
                    <input
                      id="email"
                      type="email"
                      placeholder="Email"
                      className="w-full rounded-md focus:ring focus:ri focus:ri dark:border-gray-700 dark:text-gray-900"
                    />
                  </div>
                  <div className="col-span-full">
                    <label for="address" className="text-sm">
                      Address
                    </label>
                    <input
                      id="address"
                      type="text"
                      placeholder=""
                      className="w-full rounded-md focus:ring focus:ri focus:ri dark:border-gray-700 dark:text-gray-900"
                    />
                  </div>
                  <div className="col-span-full sm:col-span-2">
                    <label for="city" className="text-sm">
                      City
                    </label>
                    <input
                      id="city"
                      type="text"
                      placeholder=""
                      className="w-full rounded-md focus:ring focus:ri focus:ri dark:border-gray-700 dark:text-gray-900"
                    />
                  </div>
                  <div className="col-span-full sm:col-span-2">
                    <label for="state" className="text-sm">
                      State / Province
                    </label>
                    <input
                      id="state"
                      type="text"
                      placeholder=""
                      className="w-full rounded-md focus:ring focus:ri focus:ri dark:border-gray-700 dark:text-gray-900"
                    />
                  </div>
                  <div className="col-span-full sm:col-span-2">
                    <label for="zip" className="text-sm">
                      ZIP / Postal
                    </label>
                    <input
                      id="zip"
                      type="text"
                      placeholder=""
                      className="w-full rounded-md focus:ring focus:ri focus:ri dark:border-gray-700 dark:text-gray-900"
                    />
                  </div>
                </div>
              </fieldset>
            </form>
          </section>
        </div>
      </div>
    </>
  );
};

export default SignUp;
