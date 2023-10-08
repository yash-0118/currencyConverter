import { useState } from 'react';
import { InputBox } from './components';
import useCurrencyInfo from './hooks/useCurrencyInfo';

function App() {
  const [fromAmount, setFromAmount] = useState(""); // Separate state for "From" currency
  const [toAmount, setToAmount] = useState(""); // Separate state for "To" currency
  const [fromCurrency, setFromCurrency] = useState("usd");
  const [toCurrency, setToCurrency] = useState("inr");
  const [convertedAmount, setConvertedAmount] = useState("");

  const currencyInfo = useCurrencyInfo(fromCurrency);

  const options = Object.keys(currencyInfo);

  const swap = () => {
    // Swap the "From" and "To" currencies
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
    // Swap the amounts as well
    setFromAmount(toAmount);
    setToAmount(fromAmount);
  };

  const convert = () => {
    setConvertedAmount(fromAmount * currencyInfo[toCurrency]);
  };

  return (
    <>
    <div className="w-full h-screen flex flex-wrap justify-center items-center bg-cover bg-no-repeat"  style={{
      backgroundImage: `url('https://img.freepik.com/premium-photo/abstract-background-images-wallpaper-ai-generated_643360-67425.jpg')`,
  }}>
    
      <div className="w-full">
      <h1 className='text-white text-center py-4 text-4xl'>Currency Converter</h1>
        <div className="w-full max-w-md mx-auto border border-gray-60 rounded-lg p-5 backdrop-blur-2xl bg-white/20">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              convert();
            }}
          >
            <div className="w-full mb-1">
              <InputBox
                label="From"
                amount={fromAmount}
                currencyOptions={options}
                onCurrencyChange={(currency) => setFromCurrency(currency)} // Update the "From" currency
                selectCurrency={fromCurrency}
                onAmountChange={(amount) => setFromAmount(amount)} // Update the "From" amount
              />
            </div>
            <div className="relative w-full h-0.5">
              <button
                type="button"
                className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-white rounded-md bg-blue-600 text-white px-2 py-0.5"
                onClick={swap}
              >
                Swap
              </button>
            </div>
            <div className="w-full mt-1 mb-4">
              <InputBox
                label="To"
                amount={convertedAmount}
                currencyOptions={options}
                onCurrencyChange={(currency) => setToCurrency(currency)} // Update the "To" currency
                selectCurrency={toCurrency}
                amountDisable
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg"
            >
              Convert {fromCurrency.toUpperCase()} to {toCurrency.toUpperCase()}
            </button>
          </form>
        </div>
      </div>
    </div>
    </>
  );
}

export default App;
