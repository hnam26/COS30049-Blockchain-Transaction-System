import React from "react";

const BitcoinBalance = () => {
  return (
    <section className="bitcoin-balance">
      <div className="balance-info">
        <h2>Bitcoin balance</h2>
        <p>
          12.2081401 <span>$ 12,345.67</span>
        </p>
      </div>
      <div className="search-wallet">
        <input type="text" placeholder="Search wallet address..." />
      </div>
    </section>
  );
};

export default BitcoinBalance;