document.addEventListener("DOMContentLoaded", () => {
    const BASE_URL = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";

    const dropdowns = document.querySelectorAll(".dropdown select");
    const btn = document.querySelector("form button");
    const fromCurr = document.querySelector(".from select");
    const toCurr = document.querySelector(".to select");
    const amountInput = document.querySelector("#amount");
    const msg = document.querySelector(".msg");
    const fromFlag = document.querySelector("#fromFlag");
    const toFlag = document.querySelector("#toFlag");

    // const countryList = {
    //     AED: "AE", AFN: "AF", XCD: "AG", ALL: "AL", AMD: "AM", ANG: "AN",
    //     AOA: "AO", ARS: "AR", AUD: "AU", AZN: "AZ", BAM: "BA", BBD: "BB",
    //     BDT: "BD", BGN: "BG", BHD: "BH", BIF: "BI", BMD: "BM", BND: "BN",
    //     BOB: "BO", BRL: "BR", BSD: "BS", CAD: "CA", CHF: "CH", CLP: "CL",
    //     CNY: "CN", COP: "CO", CRC: "CR", CUP: "CU", CZK: "CZ", DKK: "DK",
    //     DOP: "DO", DZD: "DZ", EGP: "EG", ETB: "ET", EUR: "FR", FJD: "FJ",
    //     GBP: "GB", GEL: "GE", GHS: "GH", GIP: "GI", GMD: "GM", HKD: "HK",
    //     HNL: "HN", HRK: "HR", HUF: "HU", IDR: "ID", ILS: "IL", INR: "IN",
    //     IQD: "IQ", IRR: "IR", ISK: "IS", JMD: "JM", JOD: "JO", JPY: "JP",
    //     KES: "KE", KGS: "KG", KHR: "KH", KPW: "KP", KRW: "KR", KWD: "KW",
    //     KZT: "KZ", LAK: "LA", LBP: "LB", LKR: "LK", MAD: "MA", MDL: "MD",
    //     MGA: "MG", MKD: "MK", MMK: "MM", MNT: "MN", MOP: "MO", MRO: "MR",
    //     MUR: "MU", MVR: "MV", MWK: "MW", MXN: "MX", MYR: "MY", MZN: "MZ",
    //     NAD: "NA", NGN: "NG", NIO: "NI", NPR: "NP", NZD: "NZ", OMR: "OM",
    //     PAB: "PA", PEN: "PE", PHP: "PH", PKR: "PK", PLN: "PL", PYG: "PY",
    //     QAR: "QA", RON: "RO", RSD: "RS", RUB: "RU", RWF: "RW", SAR: "SA",
    //     SDG: "SD", SEK: "SE", SGD: "SG", SYP: "SY", THB: "TH", TJS: "TJ",
    //     TMT: "TM", TND: "TN", TRY: "TR", TTD: "TT", TWD: "TW", TZS: "TZ",
    //     UAH: "UA", UGX: "UG", USD: "US", UYU: "UY", UZS: "UZ", VND: "VN",
    //     YER: "YE", ZAR: "ZA", ZMK: "ZM", ZWD: "ZW"
    // };

    
    // dropdowns and set flags

    dropdowns.forEach((select) => {
        for (let currCode in countryList) {
            let newOption = document.createElement("option");
            newOption.innerText = currCode;
            newOption.value = currCode;
            select.appendChild(newOption);
        }
    });

    //defalt convert usd => inr

    fromCurr.value ="USD";
    toCurr.value = "INR";


    // update the flag when currency changes

    function updateFlag(selectElement, flagElement) {
        let currencyCode = selectElement.value;
        let countryCode = countryList[currencyCode];
        flagElement.src = `https://flagcdn.com/w40/${countryCode.toLowerCase()}.png`;
    }

    // Event listeners for dropdown 
    fromCurr.addEventListener("change", () => updateFlag(fromCurr, fromFlag));
    toCurr.addEventListener("change", () => updateFlag(toCurr, toFlag));

    // Fetch and display convert rate
    btn.addEventListener("click", async (evt) => {
        evt.preventDefault();
        let amount = parseFloat(amountInput.value);

        if (isNaN(amount) || amount <= 0) {
            msg.innerText = "Please enter a valid amount!";
            return;
        }

        let URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}.json`;
        try {
            let response = await fetch(URL);
            let data = await response.json();
            let rate = data[fromCurr.value.toLowerCase()][toCurr.value.toLowerCase()];
            let convertedAmount = (amount * rate).toFixed(2);
            msg.innerText = `${amount} ${fromCurr.value} = ${convertedAmount} ${toCurr.value}`;
        } catch (error) {
            msg.innerText = "Error fetching conversion rates. Please try again!";
        }
    });

    // Set initial flags
    updateFlag(fromCurr, fromFlag);
    updateFlag(toCurr, toFlag);
});
