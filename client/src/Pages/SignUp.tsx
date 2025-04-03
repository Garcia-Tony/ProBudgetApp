import { useNavigate } from 'react-router-dom';

export function RegistrationForm() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-[#13878B]">
      <img
        src="/ProBudget.png"
        alt="ProBudget Logo"
        className="md:justify-center md:w-36 md:mb-8 w-32 mb-4"
      />
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
      <p className="text-xl mt-8 text-white md:text-2xl">
        Already have an account?{' '}
        <span
          className="md:text-2xl text-xl text-black cursor-pointer underline hover:text-[#00C3C9] transition"
          onClick={() => navigate('/log-in')}>
          Login
        </span>
      </p>
    </div>
  );
}
