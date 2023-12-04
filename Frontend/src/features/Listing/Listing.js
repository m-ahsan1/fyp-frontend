import axios from "axios";
import React from "react";
import StripeCheckout from "react-stripe-checkout";
import jsPDF from "jspdf";

function Listing({
  image,
  title,
  price,
  engine,
  mileage,
  modelYear,
  description,
  company,
}){
  const publishableKey =
    "pk_test_51OJKAXLYINFqcfoRE0wdt2axn9TVcPLJMeGZzmFBavqw5c8x2xTSRqxnVsjuGMWZIWDsYT6M4MB7eW8bUPFRNy2Z00u3wQxOhi";
  const payNow = async (token, price) => {
    try {
      const response = await axios({
        url: "http:localhost:3001/api/payment",
        method: "post",
        data: {
          amount: price,
          token,
        },
      });

      if (response.status === 200) {
        console.log("Payment was sucessful!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const generatePDF = () => {
    const doc = new jsPDF();

    // doc.addImage(image, "JPEG", 10, 10, [150, 100]);
    console.log(image);
    doc.setFontSize(16);
    doc.text(title, 70, 120);
    doc.text(`Price: ${price}`, 70, 140);
    doc.setFontSize(12);
    doc.text(`Company: ${company}`, 70, 160);
    doc.text(`Engine: ${engine}`, 70, 175);
    doc.text(`Mileage: ${mileage} miles`, 70, 190);
    doc.text(`Model Year: ${modelYear}`, 70, 205);
    doc.text(description, 70, 220, { align: "justify", width: 150 });

    doc.save("car-details.pdf");
  };

  return (
    <div className=" w-[400px] overflow-hidder rounded shadow-lg">
      <img className="w-[400px] h-[200px]" src={image} alt="Listed Car"></img>
      <div className="px-6 py-4">
        <div className="flex flex-row justify-between">
          <div className="font-bold text-xl mb-2  whitespace-normal">
            {title}
          </div>
          <div className="font-bold text-xl mb-2  whitespace-normal text-green-400">
            {price}
          </div>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none"
            onClick={generatePDF}
          >
            PDF
          </button>
        </div>
        <p className="text-gray-700 text-base">{description}</p>
      </div>
      <div className="px-6 pt-4 pb-2">
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
          {company}
        </span>
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
          {engine}
        </span>
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
          {modelYear}
        </span>
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
          {mileage}
        </span>
        <div className="flex flex-row justify-between">
          <StripeCheckout
            stripeKey={publishableKey}
            label="Pay"
            name="Pay with Credit Card"
            billingAddress
            shippingAddress
            amount={price}
            description={"Your total is " + price}
          token={payNow}
        />
      </div>
    </div>
  </div>
);
}
export default Listing;
