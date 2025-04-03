export function RegistrationForm() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-[#13878B]">
      <div className="mb-1 md:flex justify-center">
        <label className="mb-1 block">
          <span className="md:text-3xl underline text-2xl text-white">
            Username
          </span>
          <input
            required
            name="username"
            placeholder="Username"
            type="text"
            className="text-2xl block border border-gray-600 rounded p-2 h-12 w-full md:w-[500px] lg:w-[600px] mb-2 mt-2"
          />
        </label>
      </div>
      <br></br>
      <div className="mb-1 md:flex justify-center">
        <label className="mb-1 block">
          <span className="md:text-3xl underline text-2xl text-white">
            Password
          </span>
          <input
            required
            name="password"
            placeholder="Password"
            type="password"
            className=" text-2xl block border border-gray-600 rounded p-2 h-12 w-full md:w-[500px] lg:w-[600px] mb-2 mt-2"
          />
        </label>
      </div>
      <button className="md:mt-8 md:md:flex justify-center text-2xl px-20 md:px-28 lg:px-36 text-center border rounded-full py-3 bg-white text-black mt-12 mx-auto block hover:bg-gray-200 transition">
        Sign Up
      </button>
    </div>
  );
}
