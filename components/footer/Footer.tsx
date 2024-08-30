function Footer() {
  return (
    <div className="bg-black ">
      <div className="pt-11 pb-20 text-white text-center flex flex-col gap-14 px-4 mx-auto xl:max-w-[73rem] ">
        <div className="flex flex-col items-center gap-3 ">
          <h1 className="text-md font-medium">
            Want to join our exclusive community?
          </h1>
          <span className="w-1/12 border-b mb-1"></span>
          <div className="flex flex-col  gap-3 md:flex-row w-full md:w-[70%] md:gap-0   2xl:w-[50%]">
            <input
              className="  placeholder-slate-500 font-light w-full rounded-md py-2 text-center  md:text-start md:pl-4 md:rounded-r-none"
              type="text"
              placeholder="Enter your email"
            />
            <input
              className="bg-[#ee5631] placeholder-black w-full rounded-md py-2 text-center font-semibold md:w-[50%]  2xl:w-[40%] md:rounded-l-none"
              type="text"
              placeholder="Subscribe"
            />
          </div>
        </div>
        <span className="w-full border-gray-600 border-[0.1px]"></span>
        <div className="flex flex-col  font-normal text-sm gap-4 md:flex-row md:justify-between md:items-center">
          {" "}
          <div className="gap-4 flex flex-col md:text-start">
            {" "}
            <h1>About Us </h1>
            <h1>Advertise With Us</h1>
            <h1>Meet the Team</h1>
            <h1>Industry Awards</h1>
            <h1>In the Press</h1>
            <h1>Contact Us</h1>
            <h1>How We Test</h1>
          </div>{" "}
          <div className="gap-4 flex flex-col md:text-end">
            {" "}
            <h1>Editorial Policy</h1>
            <h1>Corrections Policy</h1>
            <h1>Fact-Checking Policy</h1>
            <h1>Privacy Policy</h1>
            <h1>Terms and Conditions</h1>
            <h1>Manage Subscription</h1>
          </div>
        </div>
        <p className="font-light text-sm italic px-4 text-center">
          Man of Many provides content of a general nature that is designed for
          informational purposes only. The content is not intended to be a
          substitute for professional medical advice, diagnosis, or treatment or
          for professional financial advice. Click here for additional
          information.
        </p>
        <p className="font-light text-sm text-[#757577] xl:w-[50%] text-center mx-auto">
          © 2024 Man of Many Pty Ltd – Sydney, Australia ABN 73 163 331 280 MAN
          OF MANY® and its Logos are registered trademarks of Man of Many Pty
          Ltd.
        </p>
      </div>
    </div>
  );
}

export default Footer;
