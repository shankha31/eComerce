import { useEffect, useState } from "react";
import { Chart } from "react-google-charts";

const Analytics = () => {
  const [products, setProducts] = useState([]);
  const [revenueDetailsPerMonth, setRevenueDetailsPerMonth] = useState([]);
  const [productCount, setProductCount] = useState([]);
  const [orderCountByMonth, setOrderCountByMonth] = useState([]);
  const [orders, setOrders] = useState([]);
  const fetchAllProducts = () => {
    return new Promise(async (resolve) => {
      const response = await fetch("/products");
      const data = await response.json();
      resolve({ data });
    });
  };

  const fetchAllOrders = () => {
    return new Promise(async (resolve) => {
      const response = await fetch("/orders");
      const data = await response.json();
      resolve({ data });
    });
  };
  useEffect(() => {
    fetchAllProducts()
      .then((res) => {
        setProducts(res.data);
      })
      .catch((error) => {
        console.log(error);
      });

    fetchAllOrders()
      .then((res) => {
        setOrders(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    const temp = {};
    let productCountCategoryWise = [["category", "product count"]];
    for (let index = 0; index < products.length; index++) {
      if (products[index].category in temp) {
        temp[products[index].category] += 1;
      } else {
        temp[products[index].category] = 1;
      }
    }
    for (let key in temp) {
      productCountCategoryWise.push([key, temp[key]]);
    }
    setProductCount(productCountCategoryWise);
  }, [products]);

  useEffect(() => {
    const temp = {};
    const revenueTemp = {};
    const odersCount = [["Month", "Count"]];
    const revenueDetails = [["Month", "Revenue"]];
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    for (let index = 0; index < orders.length; index++) {
      const dateString = orders[index].createdAt;
      const date = new Date(dateString);
      const month = monthNames[date.getMonth()];
      if (month in temp) {
        temp[month] += 1;
      } else {
        temp[month] = 1;
      }
      if (month in revenueTemp) {
        revenueTemp[month] += orders[index]?.totalAmount;
      } else {
        revenueTemp[month] = orders[index]?.totalAmount;
      }
    }
    for (let key in temp) {
      odersCount.push([key, temp[key]]);
    }
    for (let key in revenueTemp) {
      revenueDetails.push([key, revenueTemp[key]]);
    }
    console.log(revenueDetails);
    setRevenueDetailsPerMonth(revenueDetails);
    setOrderCountByMonth(odersCount);
  }, [orders]);

  const options = {
    title: "Category wise product count",
    legend: "none",
    pieSliceText: "label",
    is3D: true,
    slices: {
      4: { offset: 0.2 },
      12: { offset: 0.3 },
      14: { offset: 0.4 },
      15: { offset: 0.5 },
    },
  };

  const orderGraphOptions = {
    title: "Orders",
    hAxis: { title: "Month", titleTextStyle: { color: "#333" } },
    vAxis: { title: "Order Count", minValue: 0 },
    chartArea: { width: "50%", height: "70%" },
  };
  const revenueGraphOptions = {
    title: "Revenue in $",
    hAxis: { title: "Month", titleTextStyle: { color: "#333" } },
    vAxis: { title: "Revenue Amount", minValue: 0 },
    chartArea: { width: "50%", height: "70%" },
  };
  return (
    <>
      <div className="p-10 bg-white min-h-screen">
        <h1 className="text-center text-3xl">Analytics</h1>
        {orderCountByMonth.length > 0 && (
          <Chart
            className="mt-20"
            chartType="AreaChart"
            width="100%"
            height="400px"
            data={orderCountByMonth}
            options={orderGraphOptions}
          />
        )}
        {productCount.length > 0 && (
          <Chart
            className="mt-20"
            chartType="PieChart"
            width="100%"
            height="600px"
            data={productCount}
            options={options}
          />
        )}
        {revenueDetailsPerMonth.length > 0 && (
          <Chart
            className="mt-20"
            chartType="AreaChart"
            width="100%"
            height="400px"
            data={revenueDetailsPerMonth}
            options={revenueGraphOptions}
          />
        )}
      </div>
    </>
  );
};
export default Analytics;
