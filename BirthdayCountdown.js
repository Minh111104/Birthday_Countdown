import { useState, useEffect } from "react";

const BirthdayCountdown = () => {
  const MY_BIRTHDAY_MONTH = 3; // March
  const MY_BIRTHDAY_DAY = 15;

  const calculateTimeLeft = () => {
    const now = new Date();
    let thisYear = now.getFullYear();
    let myBirthday = new Date(thisYear, MY_BIRTHDAY_MONTH - 1, MY_BIRTHDAY_DAY);

    if (myBirthday.getTime() < now.getTime()) {
      myBirthday = new Date(thisYear + 1, MY_BIRTHDAY_MONTH - 1, MY_BIRTHDAY_DAY);
    }

    const difference = myBirthday - now;
    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / (1000 * 60)) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-b from-yellow-300 to-yellow-100">
      <div className="bg-white p-8 rounded-2xl shadow-lg text-center">
        <h1 className="text-2xl font-bold mb-2">Countdown to My Birthday</h1>
        <span className="text-4xl">🎂</span>
        <div className="flex justify-center gap-4 mt-4">
          {Object.entries(timeLeft).map(([unit, value]) => (
            <div key={unit} className="bg-gray-100 p-4 rounded-lg text-center">
              <span className="text-3xl font-bold text-red-500">{value}</span>
              <p className="text-sm uppercase">{unit}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BirthdayCountdown;

