import { useCallback, useEffect, useState } from "react";

import styles from "./Chart.module.css";

const chartData = [
  { id: "dep-1", name: "Legal", ticketCount: 32, colour: "#3F888F" },
  { id: "dep-2", name: "Sales", ticketCount: 20, colour: "#FFA420" },
  { id: "dep-3", name: "Engineering", ticketCount: 60, colour: "#287233" },
  { id: "dep-4", name: "Manufacturing", ticketCount: 5, colour: "#4E5452" },
  { id: "dep-5", name: "Maintenance", ticketCount: 14, colour: "#642424" },
  {
    id: "dep-6",
    name: "Human Resourcing",
    ticketCount: 35,
    colour: "#1D1E33",
  },
  { id: "dep-7", name: "Events", ticketCount: 43, colour: "#E1CC4F" },
];

const getData = () =>
  new Promise(resolve => {
    setTimeout(resolve, 500, chartData);
  });

// Issue tracking application by building a chart.

export const Chart = () => {
  const [data, setData] = useState<any>(null);
  const [hoveredBarId, setHoveredBarId] = useState<number>(0);

  useEffect(() => {
    const data = getData();

    data
      .then(res => {
        // console.log(res);
        setData(res);
      })
      .catch(err => console.log(err));
  }, []);

  const handleOnMouseOver = (e: MouseEvent) => {
    setHoveredBarId(e.target?.closest("#bar")?.getAttribute("data-barid"));
  };

  const handleSort = useCallback(() => {
    const newData = data.sort((a, b) => {
      return a.ticketCount - b.ticketCount;
    });

    setData(newData);
  }, [data]);

  return (
    <>
      <button onClick={() => handleSort()}>Sort ascending</button>
      <div
        style={{
          display: "flex",
          alignItems: "flex-end",
          gap: "0.5rem",
          justifyContent: "space-between",
          padding: "0 0.25rem",
          border: "1px solid black",
        }}
        onMouseOver={e => handleOnMouseOver(e)}
      >
        {data?.map(({ id, name, ticketCount, colour }: any) => {
          return (
            <div
              id="bar"
              key={id}
              style={{
                backgroundColor: colour,
                width: "50px",
                height: `${ticketCount * 5}px`,
                position: "relative",
                flex: 1,
              }}
              data-count={ticketCount}
              data-barid={id}
            >
              <span
                style={{
                  display: hoveredBarId === id ? "inline-block" : "none",
                  backgroundColor: "grey",
                  color: "white",
                  fontSize: "0.5rem",
                  position: "absolute",
                  top: "10%",
                  right: "0%",
                  transform: "translateX(25px)",
                  zIndex: 2,
                  whiteSpace: "nowrap",
                }}
              >
                {name} ({ticketCount})
              </span>
            </div>
          );
        })}
      </div>
    </>
  );
};
