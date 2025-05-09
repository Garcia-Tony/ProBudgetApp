import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useData } from '../components/User';
import { useExpenses } from '../components/ExpenseContext';

export function RecurringExpense() {
  const { expenses } = useExpenses();
  const { handleSignOut } = useData();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [popUp, setPopUp] = useState(false);
  const [expense, setExpense] = useState(false);

  const handlePopUp = () => setPopUp(true);
  const handleExpense = () => setExpense(true);
  const closePopUp = () => setPopUp(false);
  const toggleMenu = () => setIsMenuOpen((prev) => !prev);
  const closeExpense = () => setExpense(false);

  const getNextDueDate = (schedule: string, dueDate: string) => {
    const currentDate = new Date(dueDate);
    const nextDate = new Date(currentDate);

    const scheduleMap: Record<string, number> = {
      'every-week': 7,
      'every-month': 1,
      'every-3-months': 3,
      'every-6-months': 6,
      'every-year': 12,
    };

    if (schedule === 'every-week') {
      nextDate.setDate(currentDate.getDate() + scheduleMap[schedule]);
    } else if (scheduleMap[schedule]) {
      const newMonth = currentDate.getMonth() + scheduleMap[schedule];
      nextDate.setMonth(newMonth);

      if (nextDate.getDate() < currentDate.getDate()) {
        nextDate.setDate(0);
      }
    } else {
      return 'N/A';
    }

    return nextDate.toLocaleDateString('en-US', {
      month: '2-digit',
      day: '2-digit',
      year: 'numeric',
    });
  };

  return (
    <div className="relative flex-grow flex-1 pl-2 px-4">
      <div className="flex items-center w-full justify-between space-x-4">
        <button
          className="rounded py-2 px-1.5 bg-white hover:bg-gray-200 transition mt-6"
          onClick={toggleMenu}>
          <svg
            className="md:w-[50px] md:h-[50px] w-8 h-8 text-[#01898B]"
            viewBox="0 0 448 512">
            <path
              fill="currentColor"
              d="M16 132h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16C7.163 60 0 67.163 0 76v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16z"
            />
          </svg>
        </button>

        <img
          src="/ProBudget.png"
          alt="Pro Budget Logo"
          className="size-14 max-w-[60px] max-h-[60px] mt-5 md:size-20 md:mt-4 md:max-w-[150px] md:max-h-[150px]"
        />
        <div className=" flex-1 flex justify-center">
          <h2 className="md:text-6xl text-4xl font-bold text-center text-black ml-10 md:ml-[-10px] mr-40 mt-4 md:mt-7 md:mb-4 ">
            Recurring
          </h2>
        </div>

        <div className="absolute right-4 md:right-6 md:top-3 top-2 md:top-[22px]">
          <button
            onClick={() => {
              navigate('/calendar');
            }}>
            <svg
              className="mt-4 w-[55px] h-[50px] md:w-[60px] md:h-[60px] md:mt-[14px] text-[#01898B]"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path
                d="M9 2a1 1 0 0 1 1 1v1h4V3a1 1 0 1 1 2 0v1h3a2 2 0 0 1 2 2v13a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h3V3a1 1 0 0 1 1-1zM8 6H5v3h14V6h-3v1a1 1 0 1 1-2 0V6h-4v1a1 1 0 0 1-2 0V6zm11 5H5v8h14v-8z"
                strokeWidth="0"
                stroke="currentColor"
                fill="currentColor"
              />
            </svg>
          </button>

          <button onClick={handleExpense}>
            <svg
              className="mt-4 w-12 h-12 md:w-[60px] md:h-[60px] md:mt-[14px] text-[#01898B]"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path
                d="M8 12H12M16 12H12M12 12V8M12 12V16"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>

      <hr className="my-4 border-t-2 border-[#01898B] md:mt-4" />

      <p className="text-2xl text-black ml-2 md:text-3xl">
        {expenses.length === 0 ? 'No Recurring Expenses' : 'Recurring Expenses'}
      </p>

      <div className="space-y-3 mt-3 px-[5px]">
        {expenses.length === 0 && (
          <div className="">
            <div className="md:mb-2 md:h-20 h-16 mb-1 bg-[#EFEFEF] rounded-lg shadow-md shadow-[#00000099] border"></div>
            <div className="md:mb-2 md:h-20 h-16 mb-1 bg-[#EFEFEF] rounded-lg shadow-md shadow-[#00000099]"></div>
            <div className="md:mb-2 md:h-20 h-16 mb-1 bg-[#EFEFEF] rounded-lg shadow-md shadow-[#00000099]"></div>
          </div>
        )}

        {expenses.length > 0 &&
          expenses.map((expense, index) => (
            <div
              key={index}
              className="mb-[-4px] md:mb-[-5px] md:text-xl h-16 md:h-20 bg-[#EFEFEF] rounded-lg shadow-md shadow-[#00000099]">
              <div className="flex px-2 md:mt-2 mb-2 md:mb-3 pt-1">
                <p>{expense.name}</p>
              </div>
              <div className="flex justify-between items-center px-2">
                <p>
                  Next Due: {getNextDueDate(expense.schedule, expense.dueDate)}
                </p>
                <p>${expense.amount}</p>
              </div>
            </div>
          ))}
      </div>

      {expense && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-10">
          <div className="rounded-[50px] bg-[#cbcbcb] p-6 px-6 rounded shadow-lg text-center border border-black ">
            <h3 className="md:text-6xl text-5xl font-bold mb-5 mt-5 text-black font-extrabold">
              Add New <br />
              Expense?
            </h3>
            <button
              className="hover:bg-[#016B6D] transition md:text-5xl md:px-20 mt-6 px-18 text-4xl font-bold py-2 px-12 bg-[#067E81] text-black border border-black rounded-full"
              onClick={() => {
                navigate('/new-expense');
              }}>
              YES
            </button>
            <button
              className="hover:bg-[#505050] transition md:text-5xl md:px-20 mt-6 px-18 text-4xl font-bold py-2 px-14 ml-4 bg-[#696969] text-black border border-black rounded-full"
              onClick={closeExpense}>
              NO
            </button>
          </div>
        </div>
      )}

      {isMenuOpen && (
        <div
          className={`absolute top-0 left-0 h-screen w-64 bg-white shadow-md border transition-all transform ease-in-out
  ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'}
  shadow-lg shadow-black md:w-1/2`}>
          <button
            className="flex justify-center w-full mb-2"
            onClick={toggleMenu}>
            <svg
              className="w-[55px] h-[55px] md:w-[100px] md:h-[100px] mr-[180px] mt-5 md:mr-[82%]"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg">
              <path
                d="M11.707 5.293a1 1 0 0 1 0 1.414L7.414 11H19a1 1 0 1 1 0 2H7.414l4.293 4.293a1 1 0 0 1-1.414 1.414l-6-6a1 1 0 0 1 0-1.414l6-6a1 1 0 0 1 1.414 0z"
                fill="#01898B"
              />
            </svg>
          </button>

          <h2 className="text-4xl ml-3 text-[#01898B] font-bold mt-8 md:text-5xl md:ml-[25px]">
            Menu
          </h2>

          <button
            className="md:text-5xl md:px-28 md:ml-[25px] text-2xl block text-center border border-[#01898B] rounded-full py-1 md:py-2 px-[54px] ml-3 mt-7 bg-[#01898B] text-white  hover:bg-[#016B6D] transition"
            onClick={() => {
              navigate('/home');
            }}>
            Expense
          </button>

          <button
            className="md:text-5xl md:px-[100px] md:ml-[25px] text-2xl block text-center border border-[#01898B] rounded-full py-1 md:py-2 px-[47px] ml-3 mt-5 bg-[#01898B] text-white  hover:bg-[#016B6D] transition"
            onClick={() => {
              navigate('/recurring');
            }}>
            Recurring
          </button>

          <button
            className="md:text-5xl md:px-[115px] md:ml-[25px] text-2xl block text-center border border-[#01898B] rounded-full py-1 md:py-2 px-[55px] ml-3 mt-5 bg-[#01898B] text-white  hover:bg-[#016B6D] transition"
            onClick={handlePopUp}>
            Log Out
          </button>
        </div>
      )}

      {popUp && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-10">
          <div className="md:px-12 rounded-[50px] bg-[#cbcbcb] p-7 rounded shadow-lg text-center border border-black ">
            <h3 className="md:text-6xl text-5xl font-bold mb-5 mt-5 text-black">
              Log Out?
            </h3>
            <button
              className="hover:bg-[#055D5F] transition md:text-5xl md:px-20 mt-6 px-18 text-4xl font-bold py-2 px-12 bg-[#067E81] text-black border border-black rounded-full"
              onClick={() => {
                handleSignOut();
                navigate('/sign-up');
              }}>
              YES
            </button>
            <button
              className="hover:bg-[#505050] transition md:text-5xl md:px-20 mt-6 px-18 text-4xl font-bold py-2 px-14 ml-4 bg-[#696969] text-black border border-black rounded-full"
              onClick={closePopUp}>
              NO
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
