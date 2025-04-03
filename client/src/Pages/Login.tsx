export function SignInForm() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-full bg-[#13878B] absolute top-0 left-0">
      <div className="mb-1 md:flex justify-center">
        <label className="mb-1 block">
          <span className="md:text-3xl underline text-2xl text-white">
            {' '}
            Username{' '}
          </span>
          <input
            required
            name="username"
            placeholder="Username"
            type="text"
            className="text-2xl block border border-gray-600 rounded p-2 h-12 w-full md:w-[500px] lg:w-[600px] mb-2 mt-2"
          />
        </label>
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
      </div>
    </div>
  );
}
