import React, { useEffect, useState } from "react";
import "./ReactGridLayout.css";

interface ReactGridLayoutProps {
  columns: number;
  numBoxes: number;
}

const ReactGridLayout: React.FC<ReactGridLayoutProps> = ({
  columns,
  numBoxes,
}) => {
  const [visibleBoxes, setVisibleBoxes] = useState<number[]>([]);
  const boxSize = 200;

  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const totalRows = Math.ceil(numBoxes / columns);
      const totalHeight = totalRows * boxSize;

      const currentScrollPos = window.scrollY;
      const startRow = Math.floor(currentScrollPos / boxSize);
      const endRow = Math.min(
        startRow + Math.ceil(windowHeight / boxSize),
        totalRows
      );

      const boxesToRender: number[] = [];
      for (let row = startRow; row < endRow; row++) {
        for (let col = 0; col < columns; col++) {
          const boxNumber = row * columns + col + 1;
          boxesToRender.push(boxNumber);
          console.log(`${boxNumber} WAS CALLED`);
        }
      }

      setVisibleBoxes(boxesToRender);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [numBoxes, columns]);

  return (
    <div className="grid-container">
      <div
        className="grid"
        style={{
          gridTemplateColumns: `repeat(${columns}, 1fr)`,
          height: numBoxes * (boxSize / columns),
        }}
      >
        {Array.from({ length: numBoxes }, (_, index) => (
          <div
            key={index}
            className={`grid-box ${
              visibleBoxes.includes(index + 1) ? "visible" : ""
            }`}
          >
            {`${index + 1}`}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReactGridLayout;
